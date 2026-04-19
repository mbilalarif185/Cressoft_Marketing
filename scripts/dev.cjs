/**
 * Ensures only one `next dev` uses the port. Two instances writing the same
 * `.next` folder corrupts the dev bundle and breaks HMR.
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

const port = Number(process.env.PORT || 3000);
const useWebpack =
  process.argv.includes("--webpack") ||
  process.env.NEXT_DEV_WEBPACK === "1" ||
  process.env.NEXT_DEV_WEBPACK === "true";

const nextBin = path.join(process.cwd(), "node_modules", "next", "dist", "bin", "next");

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

(async () => {
  if (!fs.existsSync(nextBin)) {
    console.error(
      `[dev] Next.js CLI not found at:\n  ${nextBin}\nRun npm install from the project root.\n`
    );
    process.exit(1);
  }

  if (await isPortTaken(port)) {
    console.error(
      `\n[dev] Port ${port} is already in use. Stop the other process (another "next dev" or IDE task) before starting again.\n` +
        `      Two dev servers in the same folder corrupt .next and cause chunk 404 loops.\n`
    );
    process.exit(1);
  }

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
    console.log("[dev] Starting Next with Turbopack (--turbo).\n");
  }

  const child = spawn(process.execPath, args, {
    stdio: "inherit",
    cwd: process.cwd(),
    env: process.env,
    shell: false,
  });

  child.on("error", (err) => {
    console.error("[dev] Failed to spawn Next.js:", err);
    process.exit(1);
  });

  child.on("exit", (code) => process.exit(code ?? 0));
})();
