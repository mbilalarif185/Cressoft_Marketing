/**
 * Ensures only one `next dev` uses the project's `.next` folder. Two instances
 * writing the same `.next` corrupts the dev bundle and breaks HMR.
 *
 * Behaviour:
 *   - If PORT is explicitly set (env var) and taken → fail loudly.
 *   - Otherwise default to 3000, and if it's taken, automatically search the
 *     next free port in 3001..3050 and start there.
 *   - A PID lockfile at `.next/dev.lock` blocks a second dev server in the
 *     SAME project folder (the actual cause of chunk-404 corruption); a
 *     port collision with some unrelated process is fine — just move ports.
 *
 * IMPORTANT (Windows + paths with spaces, e.g. "Cressoft Marketing"):
 * Do NOT use `npx next ...` with `shell: true` — argument parsing can drop
 * `--turbo`, silently falling back to webpack dev. That leads to missing
 * `.next/server` chunks (`Cannot find module './NNN.js'`) and a flood of
 * `/_next/static/chunks/main.js` / `react-refresh.js` 404s.
 *
 * We spawn `node <abs path to next CLI>` with an argv array (no shell).
 *
 * Default: Turbopack (`--turbo`). Opt out: `npm run dev:webpack`.
 */
const net = require("net");
const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");

const DEFAULT_PORT = 3000;
const MAX_PORT_OFFSET = 50;

const portFromEnv = process.env.PORT ? Number(process.env.PORT) : null;
const requestedPort = portFromEnv ?? DEFAULT_PORT;
const portIsLockedByUser = portFromEnv !== null;

const useWebpack =
  process.argv.includes("--webpack") ||
  process.env.NEXT_DEV_WEBPACK === "1" ||
  process.env.NEXT_DEV_WEBPACK === "true";

const projectRoot = process.cwd();
const nextBin = path.join(projectRoot, "node_modules", "next", "dist", "bin", "next");
const nextDir = path.join(projectRoot, ".next");
const lockFile = path.join(nextDir, "dev.lock");

function isPortTaken(p) {
  return new Promise((resolve) => {
    const s = net.createServer();
    s.unref();
    s.once("error", (e) => resolve(e.code === "EADDRINUSE"));
    s.listen(p, () => {
      s.close(() => resolve(false));
    });
  });
}

async function findFreePort(start, maxOffset) {
  for (let offset = 0; offset <= maxOffset; offset++) {
    const candidate = start + offset;
    if (candidate > 65535) break;
    // eslint-disable-next-line no-await-in-loop
    if (!(await isPortTaken(candidate))) return candidate;
  }
  return null;
}

function pidIsAlive(pid) {
  if (!pid || Number.isNaN(pid)) return false;
  try {
    // Signal 0 doesn't kill — it just throws if the pid is gone.
    process.kill(pid, 0);
    return true;
  } catch (e) {
    return e.code === "EPERM";
  }
}

function readExistingLock() {
  try {
    const raw = fs.readFileSync(lockFile, "utf8");
    const data = JSON.parse(raw);
    return typeof data === "object" && data ? data : null;
  } catch {
    return null;
  }
}

function acquireLock(port) {
  const existing = readExistingLock();
  if (existing && pidIsAlive(existing.pid)) {
    console.error(
      `\n[dev] Another "next dev" is already running for this project (pid ${existing.pid}, port ${existing.port}).\n` +
        `      Stop it first — running two dev servers in the same folder corrupts .next and causes chunk 404 loops.\n`
    );
    process.exit(1);
  }

  try {
    fs.mkdirSync(nextDir, { recursive: true });
    fs.writeFileSync(
      lockFile,
      JSON.stringify({ pid: process.pid, port, startedAt: new Date().toISOString() }),
      "utf8"
    );
  } catch (err) {
    console.warn(`[dev] Could not write lockfile (${lockFile}): ${err.message}`);
  }
}

function releaseLock() {
  try {
    const existing = readExistingLock();
    // Only remove the lock if we own it.
    if (existing && existing.pid === process.pid) {
      fs.unlinkSync(lockFile);
    }
  } catch {
    /* ignore */
  }
}

(async () => {
  if (!fs.existsSync(nextBin)) {
    console.error(
      `[dev] Next.js CLI not found at:\n  ${nextBin}\nRun npm install from the project root.\n`
    );
    process.exit(1);
  }

  // Resolve which port we should actually start on.
  let port = requestedPort;
  if (await isPortTaken(port)) {
    if (portIsLockedByUser) {
      console.error(
        `\n[dev] Port ${port} is already in use and PORT is pinned via env. ` +
          `Free the port or unset PORT and rerun.\n`
      );
      process.exit(1);
    }

    const fallback = await findFreePort(port + 1, MAX_PORT_OFFSET);
    if (fallback === null) {
      console.error(
        `\n[dev] Port ${port} is in use and no free port was found in the range ` +
          `${port + 1}-${port + MAX_PORT_OFFSET}.\n`
      );
      process.exit(1);
    }
    console.warn(
      `[dev] Port ${port} is busy — starting on port ${fallback} instead.\n` +
        `      (Set PORT=${port} to fail instead of falling back.)\n`
    );
    port = fallback;
  }

  acquireLock(port);

  const cleanup = () => {
    releaseLock();
  };
  process.on("exit", cleanup);
  process.on("SIGINT", () => process.exit(0));
  process.on("SIGTERM", () => process.exit(0));
  process.on("uncaughtException", (err) => {
    console.error("[dev] Uncaught exception:", err);
    cleanup();
    process.exit(1);
  });

  const args = [nextBin, "dev", "-p", String(port)];
  if (!useWebpack) {
    args.splice(2, 0, "--turbo");
  } else if (process.platform === "win32") {
    console.warn(
      "[dev] Webpack dev (NEXT_DEV_WEBPACK). If you see missing './NNN.js' or chunk 404s: npm run clean && npm run dev\n"
    );
  }

  const host = process.env.DEV_HOST || process.env.HOST;
  if (host) {
    args.push("-H", host);
  }

  if (!useWebpack) {
    console.log(`[dev] Starting Next with Turbopack (--turbo) on port ${port}.\n`);
  }

  const child = spawn(process.execPath, args, {
    stdio: "inherit",
    cwd: projectRoot,
    env: { ...process.env, PORT: String(port) },
    shell: false,
  });

  child.on("error", (err) => {
    console.error("[dev] Failed to spawn Next.js:", err);
    cleanup();
    process.exit(1);
  });

  child.on("exit", (code) => {
    cleanup();
    process.exit(code ?? 0);
  });
})();
