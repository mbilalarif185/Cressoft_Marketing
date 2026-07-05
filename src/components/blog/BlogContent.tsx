type BlogContentProps = { html: string };

/**
 * Renders the HTML string produced by `lib/render-markdown.ts` from trusted,
 * admin-authored markdown. Output is not sanitized — see the note in
 * render-markdown.ts. Styled by `.blog-content` in `_admin-cms.scss`.
 */
export default function BlogContent({ html }: BlogContentProps) {
  return (
    <div
      className="blog-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}