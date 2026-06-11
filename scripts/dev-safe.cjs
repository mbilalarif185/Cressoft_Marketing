/**
 * Same as `dev.cjs` but defaults to port 3100 when PORT is unset (avoids clashes
 * with another app on 3000). Run: `npm run dev:safe`
 * Use `npm run dev:clean` when you need a fresh `.next` before starting dev.
 */
process.env.PORT = process.env.PORT || "3100";
require("./dev.cjs");
