/**
 * Ensures only one `next dev` uses the port. Two instances writing the same
 * `.next` folder (common when 3000 is busy and Next falls back to 3001) causes
 * missing `.next/server/pages/*.js` and broken HMR.
 */
const net = require("net");
const { spawn } = require("child_process");

const port = Number(process.env.PORT || 3000);

function isPortTaken(p) {
  return new Promise((resolve) => {
    const s = net.createServer();
    s.unref();
    s.once("error", (e) => resolve(e.code === "EADDRINUSE"));
    s.listen(p, "127.0.0.1", () => {
      s.close(() => resolve(false));
    });
  });
}

(async () => {
  if (await isPortTaken(port)) {
    console.error(
      `\n[dev] Port ${port} is already in use. Stop the other process (often another "next dev" or Cursor terminal) before starting again.\n` +
        `      Running two Next dev servers in the same folder corrupts .next and breaks HMR.\n`
    );
    process.exit(1);
  }

  const child = spawn(
    "npx",
    ["next", "dev", "-p", String(port)],
    { stdio: "inherit", shell: true, cwd: process.cwd() }
  );
  child.on("exit", (code) => process.exit(code ?? 0));
})();
