import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import type { BlogPost, BlogPostMeta } from "@/types/blog";
import CressoftBlogHtml from "@/components/blog/CressoftBlogHtml";

type BlogDetailsMainProps = {
  post: Omit<BlogPost, "content">;
  source: MDXRemoteSerializeResult;
  related: BlogPostMeta[];
  recentPosts: BlogPostMeta[];
  prev: BlogPostMeta | null;
  next: BlogPostMeta | null;
  /** Absolute, canonical URL of the post — used by share buttons. */
  url: string;
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="bd-prose__h2" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="bd-prose__h3" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="bd-prose__p" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="bd-prose__ul" {...props} />
  ),
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol className="bd-prose__ol" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="bd-prose__quote" {...props} />
  ),
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="bd-prose__table-wrap">
      <table className="bd-prose__table" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead {...props} />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => <tr {...props} />,
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th {...props} />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td {...props} />
  ),
  hr: () => <hr className="bd-prose__hr" />,
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="bd-prose__strong" {...props} />
  ),
  a: ({ href, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="bd-prose__a"
          {...rest}
        />
      );
    }
    return (
      <Link href={href ?? "#"} className="bd-prose__a" {...(rest as any)} />
    );
  },
  CressoftBlogHtml,
  img: ({
    src,
    alt,
    width,
    height,
    className,
    style,
  }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    if (!src || typeof src !== "string") return null;
    const w =
      typeof width === "number"
        ? width
        : typeof width === "string"
          ? parseInt(width, 10) || 1200
          : 1200;
    const h =
      typeof height === "number"
        ? height
        : typeof height === "string"
          ? parseInt(height, 10) || 630
          : 630;
    return (
      <Image
        src={src}
        alt={alt ?? ""}
        width={w}
        height={h}
        sizes="(max-width: 768px) 100vw, min(792px, 85vw)"
        className={["bd-prose__img", className].filter(Boolean).join(" ")}
        style={style}
        loading="lazy"
        decoding="async"
      />
    );
  },
};

const BlogDetailsMain = ({
  post,
  source,
  related,
  recentPosts,
  prev,
  next,
  url,
}: BlogDetailsMainProps) => {
  const [copied, setCopied] = useState(false);

  const shareText = encodeURIComponent(post.title);
  const shareUrl = encodeURIComponent(url);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`,
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked
    }
  };

  return (
    <section
      className={[
        "blog-article",
        "section",
        "blog-main",
        "blog-details",
        "fade-wrapper",
        post.hideBlogBanner ? "blog-article--embedded-html" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="container">
        <div className="row g-4 g-xl-5">
          <div className="col-12 col-xl-8">
            <article
              className={[
                "blog-article__paper",
                post.hideBlogBanner ? "blog-article__paper--cressoft-html" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div
                className={[
                  "blog-article__body",
                  "blog-article__body--first",
                  "bd-mdx",
                  "bd-prose",
                  post.hideBlogBanner ? "blog-article__body--cressoft-html" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <MDXRemote {...source} components={mdxComponents} />
              </div>

              <footer className="blog-article__footer">
                <div className="blog-article__tags">
                  <span className="blog-article__tags-label">Tagged in</span>
                  <div className="blog-article__tags-list">
                    {post.tags.length === 0 ? (
                      <span className="text-muted">—</span>
                    ) : (
                      post.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/blog?tag=${encodeURIComponent(tag)}`}
                          className="blog-article__tag"
                        >
                          {tag}
                        </Link>
                      ))
                    )}
                  </div>
                </div>

                <div className="blog-article__share">
                  <span className="blog-article__share-label">Share this post</span>
                  <div className="blog-article__share-actions">
                    <a
                      href={shareLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="blog-article__share-btn"
                      aria-label="Share on X"
                    >
                      <i className="fa-brands fa-x-twitter"></i>
                    </a>
                    <a
                      href={shareLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="blog-article__share-btn"
                      aria-label="Share on Facebook"
                    >
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                    <a
                      href={shareLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="blog-article__share-btn"
                      aria-label="Share on LinkedIn"
                    >
                      <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                    <a
                      href={shareLinks.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="blog-article__share-btn"
                      aria-label="Share on WhatsApp"
                    >
                      <i className="fa-brands fa-whatsapp"></i>
                    </a>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className={`blog-article__share-btn ${copied ? "is-copied" : ""}`}
                      aria-label={copied ? "Link copied" : "Copy link"}
                      title={copied ? "Copied!" : "Copy link"}
                    >
                      <i
                        className={
                          copied ? "fa-solid fa-check" : "fa-solid fa-link"
                        }
                      ></i>
                    </button>
                  </div>
                </div>
              </footer>

              {related.length > 0 && (
                <div className="blog-article__related">
                  <h2 className="blog-article__related-title">Read next</h2>
                  <div className="row g-4">
                    {related.map((rp) => (
                      <div key={rp.slug} className="col-12 col-md-6">
                        <Link href={`/blog/${rp.slug}`} className="bd-related__card h-100">
                          <div className="bd-related__thumb">
                            <Image
                              src={rp.cover}
                              alt={rp.title}
                              width={600}
                              height={360}
                              sizes="(min-width: 768px) 360px, 100vw"
                            />
                          </div>
                          <div className="bd-related__body">
                            <span className="bd-related__cat">{rp.category}</span>
                            <h3 className="h5 mb-0">{rp.title}</h3>
                            <span className="bd-related__cta">
                              Read article
                              <i className="fa-sharp fa-solid fa-arrow-up-right"></i>
                            </span>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <nav className="blog-article__pager" aria-label="Previous and next posts">
                <div className="row g-4">
                  <div className="col-md-6">
                    {prev ? (
                      <Link href={`/blog/${prev.slug}`} className="blog-article__pager-card">
                        <div className="blog-article__pager-thumb">
                          <Image
                            src={prev.cover}
                            alt=""
                            width={72}
                            height={72}
                          />
                        </div>
                        <div className="blog-article__pager-copy">
                          <span className="blog-article__pager-label">
                            <i className="fa-solid fa-arrow-left-long"></i>
                            Previous
                          </span>
                          <span className="blog-article__pager-title">{prev.title}</span>
                        </div>
                      </Link>
                    ) : (
                      <div />
                    )}
                  </div>
                  <div className="col-md-6">
                    {next ? (
                      <Link
                        href={`/blog/${next.slug}`}
                        className="blog-article__pager-card blog-article__pager-card--next"
                      >
                        <div className="blog-article__pager-thumb">
                          <Image
                            src={next.cover}
                            alt=""
                            width={72}
                            height={72}
                          />
                        </div>
                        <div className="blog-article__pager-copy">
                          <span className="blog-article__pager-label">
                            Next
                            <i className="fa-solid fa-arrow-right-long"></i>
                          </span>
                          <span className="blog-article__pager-title">{next.title}</span>
                        </div>
                      </Link>
                    ) : null}
                  </div>
                </div>
              </nav>
            </article>
          </div>

          <aside className="col-12 col-xl-4">
            <div className="blog-sidebar blog-main__sidebar">
              <div className="blog-sidebar__widget">
                <h2 className="blog-sidebar__widget-title">Find an article</h2>
                <form action="/blog" method="get" className="blog-sidebar__search">
                  <label htmlFor="blog-search-q" className="visually-hidden">
                    Search articles
                  </label>
                  <div className="blog-sidebar__search-row">
                    <input
                      id="blog-search-q"
                      type="search"
                      name="q"
                      placeholder="Type a topic or keyword"
                      autoComplete="off"
                      aria-describedby="blog-search-hint"
                    />
                    <button type="submit" aria-label="Search">
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                  </div>
                  <p id="blog-search-hint" className="blog-sidebar__hint">
                    We&apos;ll take you to the blog with your search applied.
                  </p>
                </form>
              </div>

              {recentPosts.length > 0 && (
                <div className="blog-sidebar__widget">
                  <h2 className="blog-sidebar__widget-title">Latest on the blog</h2>
                  <ul className="blog-sidebar__recent">
                    {recentPosts.map((rp) => (
                      <li key={rp.slug}>
                        <Link href={`/blog/${rp.slug}`} className="blog-sidebar__recent-link">
                          <div className="blog-sidebar__recent-thumb">
                            <Image
                              src={rp.cover}
                              alt=""
                              width={80}
                              height={64}
                            />
                          </div>
                          <div>
                            <time dateTime={rp.date}>{formatDate(rp.date)}</time>
                            <span className="blog-sidebar__recent-title">{rp.title}</span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="blog-sidebar__widget blog-sidebar__widget--cta">
                <h2 className="blog-sidebar__widget-title">This article</h2>
                <p className="blog-sidebar__cta-lead mb-2">Filed under</p>
                <Link href="/blog" className="blog-sidebar__category-pill">
                  {post.category}
                </Link>
                <Link href="/contact" className="btn btn--primary w-100 mt-3">
                  Talk to our team
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsMain;
