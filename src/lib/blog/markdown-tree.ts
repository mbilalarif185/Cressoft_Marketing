import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import type { Root, RootContent } from "hast";

/**
 * A hast (HTML AST) tree, stripped of source positions so it survives the
 * `getStaticProps` → `__NEXT_DATA__` JSON round-trip cheaply.
 */
export type BlogContentTree = Root;

/**
 * WHY THIS EXISTS (do not swap back to `next-mdx-remote` on the client).
 *
 * `next-mdx-remote`'s `<MDXRemote>` hydrates by evaluating the compiled MDX
 * *source string* in the browser:
 *
 *   Reflect.construct(Function, keys.concat(compiledSource))   // = new Function
 *
 * Our CSP deliberately withholds `'unsafe-eval'` (see the rationale block in
 * `next.config.js`), so every blog post threw
 * `EvalError: Evaluating a string as JavaScript violates … 'unsafe-eval'`
 * during hydration. The prerendered HTML was correct — only hydration died —
 * which surfaced as the `_app.tsx` error boundary wiping the whole page.
 *
 * So the markdown is turned into a plain hast tree here, at build time, and
 * rendered on the client with `hast-util-to-jsx-runtime`, which walks that tree
 * with `React.createElement` and never evaluates a string. Same component
 * mapping, same output, no eval — and the MDX runtime leaves the client bundle.
 *
 * Server-only module: it reaches into the unified/remark toolchain, so keep it
 * out of anything that ends up in a client component.
 */
export async function markdownToContentTree(
  markdown: string,
): Promise<BlogContentTree> {
  const processor = unified()
    .use(remarkParse)
    // Tables, strikethrough, autolinks, task lists — matches what the MDX
    // pipeline enabled before.
    .use(remarkGfm)
    // `allowDangerousHtml` keeps inline/raw HTML in the tree as `raw` nodes
    // instead of dropping it; `rehypeRaw` then re-parses those into real
    // elements. Admin-authored CMS posts may embed HTML blocks, and MDX used
    // to render them (as JSX), so this preserves existing behaviour.
    //
    // NOT sanitized — same trust model as `lib/render-markdown.ts`: the only
    // authors are authenticated admins. Add `rehype-sanitize` after
    // `rehypeRaw` if untrusted markdown ever reaches this path.
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    // Keeps `id` attributes on headings so `#anchor` URLs still work. As
    // before, headings are deliberately NOT autolink-wrapped — the `a`
    // component styles every anchor as a blue underlined link, which would
    // turn headings into giant links.
    .use(rehypeSlug);

  const tree = (await processor.run(processor.parse(markdown))) as Root;
  return stripPositions(tree);
}

/**
 * Drops `position` (and unified's internal `data`) from every node.
 *
 * These are line/column bookkeeping that no renderer reads, but they roughly
 * double the JSON that gets inlined into the page as `__NEXT_DATA__` — worth
 * removing on an article-length tree.
 */
function stripPositions<T extends Root | RootContent>(node: T): T {
  delete (node as { position?: unknown }).position;
  if ("data" in node) delete (node as { data?: unknown }).data;
  if ("children" in node && Array.isArray(node.children)) {
    node.children.forEach((child) => stripPositions(child));
  }
  return node;
}
