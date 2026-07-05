import { remark } from "remark";
import remarkHtml from "remark-html";

import { normalizeMarkdownExternalLinks } from "@/lib/blog/normalize-markdown-links";

/**
 * Renders trusted markdown (admin-authored CMS content) to an HTML string.
 * NOTE: output is NOT sanitized — only use with trusted (admin-authored)
 * content. If you ever accept untrusted markdown, add `rehype-sanitize`.
 */
export async function renderMarkdown(markdown: string): Promise<string> {
  const normalized = normalizeMarkdownExternalLinks(markdown);
  const file = await remark().use(remarkHtml).process(normalized);
  return String(file);
}