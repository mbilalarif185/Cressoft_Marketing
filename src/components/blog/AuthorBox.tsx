import Image from "next/image";

import { formatBlogDate } from "@/lib/blog/format-date";
import type { CmsAuthor } from "@/lib/blog/cms-data";

type AuthorBoxProps = {
  author: CmsAuthor;
  publishedAt: string;
  readingMinutes: number;
};

/**
 * Minimal author byline used by the admin preview (and available to the public
 * article layout if wired in). Styled by `.author-box` in `_admin-cms.scss`.
 */
export default function AuthorBox({
  author,
  publishedAt,
  readingMinutes,
}: AuthorBoxProps) {
  const initials = author.name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");

  return (
    <div className="author-box">
      <span className="author-box__avatar" aria-hidden={!author.avatarSrc}>
        {author.avatarSrc ? (
          <Image src={author.avatarSrc} alt={author.name} width={48} height={48} />
        ) : (
          initials
        )}
      </span>
      <div className="author-box__meta">
        <p className="author-box__name">{author.name}</p>
        <p className="author-box__sub">
          {author.role ? <span>{author.role}</span> : null}
          {author.role ? <span aria-hidden> · </span> : null}
          <time dateTime={publishedAt}>{formatBlogDate(publishedAt)}</time>
          <span aria-hidden> · </span>
          {readingMinutes} min read
        </p>
      </div>
    </div>
  );
}