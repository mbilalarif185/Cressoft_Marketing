/**
 * Markdown treats URLs without a scheme as relative paths.
 * On /blog/my-post, [text](quantel.uk) becomes /blog/quantel.uk.
 * Prefix https:// for domain-like targets (not site paths like /contact).
 */
export function needsHttpsPrefix(url: string): boolean {
  const u = url.trim();
  if (!u || u.startsWith("/") || u.startsWith("#") || u.startsWith(".")) return false;
  if (/^[a-z][a-z0-9+.-]*:/i.test(u)) return false;
  return /^[\w-]+(\.[\w-]+)+([\/?#].*)?$/i.test(u) || /^www\./i.test(u);
}

export function normalizeMarkdownExternalLinks(markdown: string): string {
  return markdown.replace(/(?<!!)\[([^\]]+)\]\(([^)\s]+)\)/g, (match, text, url) => {
    if (!needsHttpsPrefix(url)) return match;
    return `[${text}](https://${url.replace(/^\/+/, "")})`;
  });
}