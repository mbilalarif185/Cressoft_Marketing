/**
 * scripts/purge-css.mjs
 * ---------------------------------------------------------------------------
 * Strips unused rules out of the built CSS bundles, in place, after
 * `next build`.
 *
 * WHY POST-BUILD RATHER THAN A POSTCSS PLUGIN
 * -------------------------------------------
 * Running PurgeCSS as a PostCSS plugin means it only ever sees the *source*
 * (`src/**` JSX). That misses two things badly:
 *   • markup produced at build time from markdown (`content/**`), whose class
 *     names and bare tags never appear in any .tsx file, and
 *   • the real, final DOM — including anything a component composes from
 *     template literals.
 * Running afterwards lets us feed PurgeCSS the prerendered HTML Next just
 * wrote to `.next/server/pages/**.html`, which is the actual ground truth for
 * every static/SSG route. Source files are then unioned on top to cover
 * client-only branches that never appear in a prerender (`ssr: false`
 * components, error states, the whole admin area).
 *
 * Rewriting the files in place is safe: the content hash in each filename was
 * fixed by webpack and the emitted HTML already references it, so shrinking
 * the bytes behind that name breaks nothing. The trade-off is that the hash no
 * longer matches the file's contents — irrelevant here because the name is
 * still unique per build and served `immutable`.
 *
 * SAFETY
 * ------
 * Anything injected at runtime cannot appear in either content source, so it
 * is safelisted explicitly below. When in doubt the rule is kept: a stale
 * kilobyte is cheaper than a broken layout.
 *
 * Run `npm run build:nopurge` to skip this step when bisecting a visual bug.
 * ---------------------------------------------------------------------------
 */
import { PurgeCSS } from "purgecss";
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CSS_DIR = path.join(ROOT, ".next", "static", "css");

/**
 * PurgeCSS runs every `content`/`css` entry through a glob matcher, and glob
 * treats `\` as an escape character — so a native Windows path silently
 * matches nothing and PurgeCSS returns zero results instead of erroring.
 * Every path handed to it must be POSIX-separated.
 */
const posix = (p) => p.split(path.sep).join("/");

/** Recursively collect files under `dir` matching `test`, POSIX-separated. */
async function collect(dir, test, out = []) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out; // directory absent — nothing to contribute
  }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await collect(p, test, out);
    else if (test(e.name)) out.push(posix(p));
  }
  return out;
}

/**
 * Class names and selector fragments that are attached by JS at runtime and
 * therefore appear in neither the prerendered HTML nor the source tree.
 */
const safelist = {
  standard: [
    /* Document scaffolding — no class/id parts for PurgeCSS to match on. */
    "html",
    "body",
    ":root",
    "*",

    /* next/image swaps these on load; Next's own runtime containers. */
    /^__next/,
    /^next-/,

    /* SplitType rewrites every `.title-anim` heading into per-word/char
       spans at runtime (see ClientAnimations.tsx). */
    "char",
    "word",
    "line",

    /* GSAP / ScrollTrigger state hooks used by the scroll animations. */
    /^gsap/,
    /^fade/,
    /^appear/,
    "is-active",
    "active",
    "show",
    "showing",
    "collapse",
    "collapsing",
    "collapsed",
    "hide",
    "hidden",
    "open",
    "opened",
    "sticky",
    "scrolled",
    "animate",
    "in-view",
  ],
  /* Whole families whose members are generated dynamically. */
  greedy: [
    /* Swiper builds its slide/pagination/navigation state classes in JS. */
    /swiper/,
    /* Font Awesome + the Glyphter icon font are referenced from string
       templates and markdown, not always as literal JSX classNames. */
    /^fa-/,
    /^fas\b/,
    /^far\b/,
    /^fab\b/,
    /^fa\b/,
    /^xpovio/,
    /^icon-/,
    /* Bootstrap components driven by its JS (accordion is used on /faq). */
    /^accordion/,
    /^modal/,
    /^offcanvas/,
    /^dropdown/,
    /^tooltip/,
    /^popover/,
    /^carousel/,
    /^nav/,
    /^btn/,
    /* vanilla-tilt writes inline transforms but keys off this hook. */
    /tilt/,
    /* MDXEditor (admin) — its CSS now ships separately, but the wrapper
       classes live in the main bundle. */
    /^mdxeditor/,
    /^admin-/,
    /^cm-/,
  ],
};

/**
 * Refuse to write a bundle that shrank past this fraction of its original
 * size. A purge that aggressive almost always means the content globs missed
 * (wrong path, empty prerender directory) rather than that the CSS really was
 * 80% dead — and silently shipping a stripped stylesheet is far worse than
 * failing the build.
 */
const MIN_RETAINED_FRACTION = 0.2;

async function main() {
  const cssFiles = await collect(CSS_DIR, (n) => n.endsWith(".css"));
  if (cssFiles.length === 0) {
    console.log("purge-css: no CSS bundles found — did `next build` run?");
    return;
  }

  const html = await collect(
    path.join(ROOT, ".next", "server", "pages"),
    (n) => n.endsWith(".html"),
  );
  const source = await collect(path.join(ROOT, "src"), (n) =>
    /\.(tsx|ts|jsx|js|mjs)$/.test(n),
  );
  const markdown = [
    ...(await collect(path.join(ROOT, "content"), (n) => /\.mdx?$/.test(n))),
    ...(await collect(path.join(ROOT, "data"), (n) =>
      /\.(mdx?|json|ts|js)$/.test(n),
    )),
  ];

  const content = [...html, ...source, ...markdown];
  console.log(
    `purge-css: ${cssFiles.length} bundle(s) against ${html.length} prerendered page(s) + ${source.length} source + ${markdown.length} content file(s)`,
  );

  const before = {};
  for (const f of cssFiles) before[f] = (await stat(f)).size;

  const results = await new PurgeCSS().purge({
    content,
    css: cssFiles,
    safelist,
    // Preserve @font-face and @keyframes blocks even when the purger cannot
    // prove they are referenced — dropping either is a visible regression.
    fontFace: false,
    keyframes: false,
    variables: false,
    // Bootstrap and the theme both rely on attribute selectors
    // (`[data-bs-toggle]`, `[dir="rtl"]`, `[aria-expanded]`); the default
    // extractor tokenises those out of the HTML fine, but widen the word
    // pattern so BEM names with `__`/`--` survive intact.
    defaultExtractor: (c) => c.match(/[\w-/:%.]+(?<!:)/g) || [],
  });

  if (results.length !== cssFiles.length) {
    throw new Error(
      `expected ${cssFiles.length} result(s), got ${results.length} — ` +
        `PurgeCSS matched none of the css globs (check path separators)`,
    );
  }

  let totalBefore = 0;
  let totalAfter = 0;
  for (const r of results) {
    const b = before[r.file] ?? 0;
    const a = Buffer.byteLength(r.css);
    if (b > 0 && a / b < MIN_RETAINED_FRACTION) {
      throw new Error(
        `${path.basename(r.file)} shrank to ${((a / b) * 100).toFixed(0)}% ` +
          `(${(b / 1024).toFixed(1)} KB → ${(a / 1024).toFixed(1)} KB) — ` +
          `refusing to write. The content globs are probably wrong.`,
      );
    }
    await writeFile(r.file, r.css, "utf8");
    totalBefore += b;
    totalAfter += a;
    console.log(
      `  ${path.basename(r.file).padEnd(26)} ${(b / 1024).toFixed(1).padStart(7)} KB → ${(a / 1024).toFixed(1).padStart(7)} KB  (-${(((b - a) / b) * 100 || 0).toFixed(0)}%)`,
    );
  }
  console.log(
    `purge-css: ${(totalBefore / 1024).toFixed(1)} KB → ${(totalAfter / 1024).toFixed(1)} KB ` +
      `(saved ${((totalBefore - totalAfter) / 1024).toFixed(1)} KB uncompressed)`,
  );
}

main().catch((err) => {
  console.error("purge-css failed:", err);
  process.exit(1);
});
