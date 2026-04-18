import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import type { BlogPost, BlogPostMeta } from "@/types/blog";

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
    month: "2-digit",
    year: "numeric",
  });
};

// Custom MDX components — keep typography aligned with the existing theme.
const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="h3 bd-mdx__h2" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="h4 bd-mdx__h3" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="bd-mdx__list" {...props} />
  ),
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol className="bd-mdx__list bd-mdx__list--ordered" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="bd-mdx__quote" {...props} />
  ),
  a: ({ href, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="bd-mdx__link"
          {...rest}
        />
      );
    }
    return (
      <Link href={href ?? "#"} className="bd-mdx__link" {...(rest as any)} />
    );
  },
  hr: () => <hr className="bd-mdx__hr" />,
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
      // Clipboard blocked — silently no-op.
    }
  };

  return (
    <section className="section blog-main blog-details fade-wrapper">
      <div className="container">
        <div className="row gaper">
          <div className="col-12 col-xl-8">
            <article className="blog-details__content">
              <div className="bd-thumb fade-top">
                <Image
                  src={post.cover}
                  alt={post.title}
                  width={1600}
                  height={900}
                  priority
                  sizes="(min-width: 1200px) 800px, 100vw"
                />
              </div>

              <div className="bd-content">
                <div className="bd-meta">
                  <div className="meta__left">
                    <p>
                      <strong>Written by:</strong> {post.author}
                    </p>
                    <span></span>
                    <p>{formatDate(post.date)}</p>
                    <span></span>
                    <p>{post.readingMinutes} min read</p>
                  </div>
                </div>

                <div className="bd-content-info bd-mdx">
                  <MDXRemote {...source} components={mdxComponents} />
                </div>
              </div>

              <div className="bd-tags">
                <div className="tags-left">
                  <p>Tags:</p>
                  <div className="tags-content">
                    {post.tags.length === 0 ? (
                      <span className="bd-tags__empty">—</span>
                    ) : (
                      post.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/blog?tag=${encodeURIComponent(tag)}`}
                        >
                          {tag}
                        </Link>
                      ))
                    )}
                  </div>
                </div>
                <div className="tags-right">
                  <p>Share:</p>
                  <ul className="social bd-share">
                    <li>
                      <a
                        href={shareLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Share on X (Twitter)"
                      >
                        <i className="fa-brands fa-x-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href={shareLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Share on Facebook"
                      >
                        <i className="fa-brands fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href={shareLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Share on LinkedIn"
                      >
                        <i className="fa-brands fa-linkedin-in"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href={shareLinks.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Share on WhatsApp"
                      >
                        <i className="fa-brands fa-whatsapp"></i>
                      </a>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={handleCopy}
                        aria-label="Copy link"
                        title={copied ? "Link copied!" : "Copy link"}
                        className={copied ? "is-copied" : ""}
                      >
                        <i
                          className={
                            copied
                              ? "fa-solid fa-check"
                              : "fa-solid fa-link"
                          }
                        ></i>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              {related.length > 0 && (
                <div className="bd-related">
                  <div className="bd-related__head">
                    <h3 className="h3">You might also like</h3>
                  </div>
                  <div className="row gaper">
                    {related.map((rp) => (
                      <div key={rp.slug} className="col-12 col-md-6">
                        <Link
                          href={`/blog/${rp.slug}`}
                          className="bd-related__card"
                        >
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
                            <span className="bd-related__cat">
                              {rp.category}
                            </span>
                            <h4 className="h5">{rp.title}</h4>
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

              <div className="blog-details__pagination">
                <div className="row gaper">
                  <div className="col-md-6">
                    {prev ? (
                      <div className="single">
                        <Link href={`/blog/${prev.slug}`}>
                          <i className="fa-solid fa-arrow-left-long"></i>
                          Previous Blog
                        </Link>
                        <div className="latest-single">
                          <div className="latest-thumb">
                            <Link href={`/blog/${prev.slug}`}>
                              <Image
                                src={prev.cover}
                                alt={prev.title}
                                width={120}
                                height={90}
                              />
                            </Link>
                          </div>
                          <div className="latest-content">
                            <p>{formatDate(prev.date)}</p>
                            <p>
                              <Link href={`/blog/${prev.slug}`}>
                                {prev.title}
                              </Link>
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div className="col-md-6">
                    {next ? (
                      <div className="single single--alt">
                        <Link href={`/blog/${next.slug}`}>
                          Next Blog
                          <i className="fa-solid fa-arrow-right-long"></i>
                        </Link>
                        <div className="latest-single">
                          <div className="latest-thumb">
                            <Link href={`/blog/${next.slug}`}>
                              <Image
                                src={next.cover}
                                alt={next.title}
                                width={120}
                                height={90}
                              />
                            </Link>
                          </div>
                          <div className="latest-content">
                            <p>{formatDate(next.date)}</p>
                            <p>
                              <Link href={`/blog/${next.slug}`}>
                                {next.title}
                              </Link>
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </article>
          </div>

          <aside className="col-12 col-xl-4">
            <div className="blog-main__sidebar">
              <div className="widget">
                <div className="widget__head">
                  <h5 className="h5">Search</h5>
                </div>
                <div className="widget-search">
                  <form action="/blog" method="get">
                    <div className="form-group-input">
                      <input
                        type="search"
                        name="q"
                        placeholder="Search articles…"
                      />
                      <button type="submit" aria-label="Search">
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {recentPosts.length > 0 && (
                <div className="widget">
                  <div className="widget__head">
                    <h5 className="h5">Recent Posts</h5>
                  </div>
                  <div className="widget__latest">
                    {recentPosts.map((rp) => (
                      <div key={rp.slug} className="latest-single">
                        <div className="latest-thumb">
                          <Link href={`/blog/${rp.slug}`}>
                            <Image
                              src={rp.cover}
                              alt={rp.title}
                              width={120}
                              height={90}
                            />
                          </Link>
                        </div>
                        <div className="latest-content">
                          <p>{formatDate(rp.date)}</p>
                          <p>
                            <Link href={`/blog/${rp.slug}`}>{rp.title}</Link>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="widget">
                <div className="widget__head">
                  <h5 className="h5">Category</h5>
                </div>
                <div className="widget__list">
                  <ul>
                    <li>
                      <Link href="/blog">{post.category}</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsMain;
