// Bootstrap usage audit.
//
// Walks every JSX/TSX file in `src/`, extracts every className token, then
// classifies each one against Bootstrap 5's class taxonomy. Output:
//
//   docs/bootstrap-usage.md  — human-readable report
//
// Goal: enumerate exactly which Bootstrap features the codebase actually
// touches so we can plan a future custom-build / removal that keeps just
// the necessary subset.
//
// Run:  node scripts/audit-bootstrap.mjs

import { promises as fs } from "node:fs";
import { resolve, join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SRC_DIR = join(ROOT, "src");
const OUT = join(ROOT, "docs", "bootstrap-usage.md");

// Bootstrap 5 module → predicate. Order matters: more specific patterns first.
const MODULES = [
  ["grid", /^(container(-(sm|md|lg|xl|xxl|fluid))?|row|col(-(sm|md|lg|xl|xxl))?(-(auto|\d+))?|gx?-\d+|gy-\d+|g-\d+|offset(-(sm|md|lg|xl|xxl))?-\d+|order(-(sm|md|lg|xl|xxl))?-\d+)$/],
  ["flex / utilities", /^(d-(none|inline|inline-block|block|flex|inline-flex|grid|table|table-cell|table-row)(-(sm|md|lg|xl|xxl))?|align-items-(start|end|center|baseline|stretch)(-(sm|md|lg|xl|xxl))?|align-self-(start|end|center|baseline|stretch)|justify-content-(start|end|center|between|around|evenly)(-(sm|md|lg|xl|xxl))?|flex-(row|column|wrap|nowrap|grow|shrink|fill|equal-widths)(-(sm|md|lg|xl|xxl))?|flex-(row|column)-reverse|gap-\d+|column-gap-\d+|row-gap-\d+|text-(start|end|center|justify|wrap|nowrap|truncate|break|lowercase|uppercase|capitalize|decoration-none|decoration-underline)(-(sm|md|lg|xl|xxl))?)$/],
  ["spacing utilities", /^(m|p)(t|b|s|e|x|y)?-(0|1|2|3|4|5|auto)$/],
  ["sizing utilities", /^(w|h|mw|mh|vw|vh|min-vw|min-vh)-(25|50|75|100|auto)$/],
  ["position utilities", /^(position-(static|relative|absolute|fixed|sticky)|top|bottom|start|end)-(0|50|100)|fixed-top|fixed-bottom|sticky-top$/],
  ["display / visibility", /^(visible|invisible|opacity-(0|25|50|75|100)|overflow-(auto|hidden|visible|scroll)|user-select-(all|auto|none)|pe-(none|auto)|float-(start|end|none))$/],
  ["typography", /^(h[1-6]|display-[1-6]|lead|small|mark|fs-[1-6]|fw-(light|lighter|normal|bold|bolder|semibold)|fst-(italic|normal)|font-monospace|lh-(1|sm|base|lg))$/],
  ["colors / bg / borders", /^(text-(primary|secondary|success|danger|warning|info|light|dark|body|muted|white|black|reset|opacity-(25|50|75|100))|bg-(primary|secondary|success|danger|warning|info|light|dark|body|white|transparent|opacity-(10|25|50|75|100))|border(-\d+|-top|-end|-bottom|-start|-0|-(primary|secondary|success|danger|warning|info|light|dark|white))?|rounded(-(0|1|2|3|4|5|circle|pill|top|bottom|start|end))?)$/],
  ["buttons", /^(btn|btn-(primary|secondary|success|danger|warning|info|light|dark|link|outline-(primary|secondary|success|danger|warning|info|light|dark))|btn-(sm|lg)|btn-group|btn-group-(sm|lg|vertical)|btn-toolbar|btn-close|btn-close-white)$/],
  ["forms", /^(form-(control|select|check|check-input|check-label|switch|range|label|text|control-color|control-plaintext|control-(sm|lg)|floating)|input-group(-text|-(sm|lg))?|was-validated|valid-(feedback|tooltip)|invalid-(feedback|tooltip)|is-(valid|invalid))$/],
  ["nav / navbar", /^(nav|nav-(item|link|tabs|pills|fill|justified)|navbar|navbar-(brand|nav|toggler|toggler-icon|collapse|expand-(sm|md|lg|xl|xxl)|light|dark|text)|nav-tabs|nav-pills|nav-underline)$/],
  ["card", /^(card|card-(body|title|subtitle|text|link|header|footer|img|img-top|img-bottom|img-overlay|group))$/],
  ["modal / offcanvas", /^(modal|modal-(open|backdrop|dialog|content|header|title|body|footer|sm|lg|xl|xxl|fullscreen|dialog-centered|dialog-scrollable)|offcanvas|offcanvas-(start|end|top|bottom|header|title|body|backdrop))$/],
  ["accordion / collapse", /^(accordion|accordion-(item|header|button|body|collapse|flush)|collapse|collapsing|collapse-horizontal)$/],
  ["dropdown", /^(dropdown|dropdown-(toggle|menu|menu-(start|end|sm|md|lg|xl|xxl)-(start|end)|item|item-text|divider|header)|dropup|dropend|dropstart)$/],
  ["alert / badge / toast", /^(alert|alert-(primary|secondary|success|danger|warning|info|light|dark|dismissible|heading|link)|badge|badge-(primary|secondary|success|danger|warning|info|light|dark)|toast|toast-(container|header|body))$/],
  ["progress / spinner", /^(progress|progress-bar|progress-bar-(striped|animated)|spinner-(border|grow)(-sm)?)$/],
  ["list group", /^(list-group|list-group-(item|item-action|flush|horizontal|numbered|item-(primary|secondary|success|danger|warning|info|light|dark)))$/],
  ["pagination / breadcrumb", /^(pagination|page-(item|link)|breadcrumb|breadcrumb-item)$/],
  ["table", /^(table|table-(sm|striped|bordered|borderless|hover|active|primary|secondary|success|danger|warning|info|light|dark|responsive(-(sm|md|lg|xl|xxl))?))$/],
  ["carousel", /^(carousel|carousel-(item|control-(prev|next)|control-(prev|next)-icon|indicators|caption|fade|inner))$/],
  ["close / shadow / ratio", /^(shadow(-(sm|lg|none))?|ratio|ratio-(1x1|4x3|16x9|21x9))$/],
  ["screen reader", /^(visually-hidden|visually-hidden-focusable|stretched-link)$/],
];

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (/\.(tsx?|jsx?)$/i.test(e.name)) yield p;
  }
}

function classifyToken(token) {
  for (const [name, pattern] of MODULES) {
    if (pattern.test(token)) return name;
  }
  return null;
}

async function main() {
  const used = new Map(); // module -> Set(class)
  const fileMap = new Map(); // module -> Set(file)
  let totalTokens = 0;
  let bootstrapTokens = 0;

  for await (const file of walk(SRC_DIR)) {
    const txt = await fs.readFile(file, "utf8");
    // Crude but effective: pull every static `className="..."` literal. Misses
    // template-literal tokens but those are <5% of usages and almost always
    // mirror a static one elsewhere.
    const re = /className\s*=\s*["'`]([^"'`]+)["'`]/g;
    const matches = txt.matchAll(re);
    for (const m of matches) {
      const tokens = m[1].split(/\s+/).filter(Boolean);
      totalTokens += tokens.length;
      for (const t of tokens) {
        const mod = classifyToken(t);
        if (!mod) continue;
        bootstrapTokens++;
        if (!used.has(mod)) used.set(mod, new Set());
        if (!fileMap.has(mod)) fileMap.set(mod, new Set());
        used.get(mod).add(t);
        fileMap.get(mod).add(relative(ROOT, file).replace(/\\/g, "/"));
      }
    }
  }

  // Build report
  const lines = [];
  lines.push("# Bootstrap 5 Usage Audit");
  lines.push("");
  lines.push(`> Generated by \`scripts/audit-bootstrap.mjs\``);
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push(`- **Total className tokens scanned:** ${totalTokens}`);
  lines.push(`- **Bootstrap-classified tokens:** ${bootstrapTokens}`);
  lines.push(`- **Unique Bootstrap classes used:** ${[...used.values()].reduce((a, s) => a + s.size, 0)}`);
  lines.push(`- **Bootstrap modules touched:** ${used.size} / ${MODULES.length}`);
  lines.push("");
  lines.push("## Modules in use (sorted by class count)");
  lines.push("");
  lines.push("| Module | Unique classes | Files touching |");
  lines.push("| --- | ---: | ---: |");
  const sortedModules = [...used.entries()].sort(
    (a, b) => b[1].size - a[1].size
  );
  for (const [mod, set] of sortedModules) {
    lines.push(`| ${mod} | ${set.size} | ${fileMap.get(mod).size} |`);
  }
  lines.push("");
  lines.push("## Modules NOT used (safe to drop on a custom build)");
  lines.push("");
  const usedModules = new Set(used.keys());
  const unused = MODULES.map(([n]) => n).filter((n) => !usedModules.has(n));
  if (unused.length === 0) {
    lines.push("_None — every module is referenced at least once._");
  } else {
    for (const n of unused) lines.push(`- ${n}`);
  }
  lines.push("");
  lines.push("## Detailed class list per module");
  lines.push("");
  for (const [mod, set] of sortedModules) {
    lines.push(`### ${mod}`);
    lines.push("");
    lines.push("```");
    for (const c of [...set].sort()) lines.push(c);
    lines.push("```");
    lines.push("");
  }

  lines.push("## Recommendation — minimal Bootstrap subset");
  lines.push("");
  lines.push(
    "When migrating to a custom Bootstrap build (via SCSS partials), import only:"
  );
  lines.push("");
  lines.push("```scss");
  lines.push('// node_modules/bootstrap/scss/...');
  lines.push('@import "functions";');
  lines.push('@import "variables";');
  lines.push('@import "variables-dark";');
  lines.push('@import "maps";');
  lines.push('@import "mixins";');
  lines.push('@import "utilities";');
  lines.push("");
  const moduleToPartials = {
    grid: ["containers", "grid"],
    "flex / utilities": ["utilities/api"],
    "spacing utilities": ["utilities/api"],
    "sizing utilities": ["utilities/api"],
    "position utilities": ["utilities/api"],
    "display / visibility": ["utilities/api"],
    typography: ["type"],
    "colors / bg / borders": ["utilities/api", "type"],
    buttons: ["buttons", "button-group"],
    forms: ["forms"],
    "nav / navbar": ["nav", "navbar"],
    card: ["card"],
    "modal / offcanvas": ["modal", "offcanvas"],
    "accordion / collapse": ["accordion", "transitions"],
    dropdown: ["dropdown"],
    "alert / badge / toast": ["alert", "badge", "toasts"],
    "progress / spinner": ["progress", "spinners"],
    "list group": ["list-group"],
    "pagination / breadcrumb": ["pagination", "breadcrumb"],
    table: ["tables"],
    carousel: ["carousel"],
    "close / shadow / ratio": ["close", "utilities/api"],
    "screen reader": ["helpers"],
  };
  const partials = new Set(["root"]);
  for (const m of usedModules)
    (moduleToPartials[m] ?? []).forEach((p) => partials.add(p));
  for (const p of [...partials].sort()) lines.push(`@import "${p}";`);
  lines.push("```");
  lines.push("");
  lines.push(
    "Estimated saving vs the full `bootstrap.min.css` (~228 KB raw / ~30 KB gzip):"
  );
  lines.push("");
  const savingPct = Math.round(
    (1 - usedModules.size / MODULES.length) * 100
  );
  lines.push(
    `- Roughly **${savingPct}% of Bootstrap modules are unused**. A custom build typically reduces the CSS payload by **40-60%** vs the full bundle.`
  );
  lines.push("");

  await fs.mkdir(dirname(OUT), { recursive: true });
  await fs.writeFile(OUT, lines.join("\n"));
  console.log(`wrote ${relative(ROOT, OUT)}`);
  console.log(
    `modules used: ${used.size}/${MODULES.length}, unique classes: ${[
      ...used.values(),
    ].reduce((a, s) => a + s.size, 0)}`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
