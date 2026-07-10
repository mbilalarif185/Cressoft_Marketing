import React, { memo, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import type { BlogPostMeta } from "@/types/blog";

function formatDate(iso: string, opts: Intl.DateTimeFormatOptions) {
  try {
    return new Date(iso).toLocaleDateString("en-GB", opts);
  } catch {
    return iso;
  }
}

type HomeTwoBlogProps = {
  posts: BlogPostMeta[];
};

/**
 * Homepage blog — "Field notes" editorial layout (content from `content/blog`).
 *
 * Replaces the old Swiper carousel, which hid post titles behind a dark overlay
 * and showed contextless covers on the side slides. This is a static editorial
 * split: a featured lead article on the left, and the remaining posts as a
 * "ledger" list on the right — every title, category, read time and date
 * visible at a glance. Styling lives in `src/styles/sections/_blog-home.scss`.
 */
const HomeTwoBlog = ({ posts }: HomeTwoBlogProps) => {
  const { lead, rest } = useMemo(() => {
    if (posts.length === 0) return { lead: null, rest: [] as BlogPostMeta[] };
    // Posts arrive newest-first: the latest leads, the next three fill the list.
    const [lead, ...others] = posts;
    return { lead, rest: others.slice(0, 3) };
  }, [posts]);

  if (!lead) return null;

  return (
    <section className="section home-blog">
      <div className="container">
        {/* ---- Section header ---- */}
        <div className="home-blog__head">
          <div>
            <span className="home-blog__eyebrow">Field notes</span>
            <h2 className="home-blog__title">How we think about building software</h2>
          </div>
          <Link href="/blog" className="home-blog__viewall">
            Browse all articles
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </Link>
        </div>

        <div className="home-blog__grid">
          {/* ---- Lead article ---- */}
          <article className="home-blog__lead">
            <Link
              href={`/blog/${lead.slug}`}
              className="home-blog__lead-media"
              aria-label={lead.title}
            >
              <Image
                src={lead.cover}
                alt=""
                fill
                className="home-blog__lead-img"
                sizes="(max-width: 992px) 100vw, 620px"
                priority={false}
              />
            </Link>
            <div className="home-blog__lead-body">
              <span className="home-blog__kicker">
                <span className="home-blog__cat">{lead.category}</span>
                <span className="home-blog__sep" aria-hidden="true">·</span>
                {lead.readingMinutes} min read
                <span className="home-blog__sep" aria-hidden="true">·</span>
                {formatDate(lead.date, { day: "numeric", month: "long", year: "numeric" })}
              </span>
              <h3 className="home-blog__lead-title">
                <Link href={`/blog/${lead.slug}`}>{lead.title}</Link>
              </h3>
              <p className="home-blog__lead-dek">{lead.description}</p>
              <Link href={`/blog/${lead.slug}`} className="home-blog__readmore">
                Read the full piece
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </Link>
            </div>
          </article>

          {/* ---- Ledger list ---- */}
          <div className="home-blog__list">
            {rest.map((post) => (
              <article key={post.slug} className="home-blog__item">
                <Link
                  href={`/blog/${post.slug}`}
                  className="home-blog__item-thumb"
                  aria-label={post.title}
                  tabIndex={-1}
                >
                  <Image
                    src={post.cover}
                    alt=""
                    fill
                    className="home-blog__item-img"
                    sizes="120px"
                  />
                </Link>
                <div className="home-blog__item-body">
                  <span className="home-blog__kicker">
                    <span className="home-blog__cat">{post.category}</span>
                    <span className="home-blog__sep" aria-hidden="true">·</span>
                    {post.readingMinutes} min read
                  </span>
                  <h4 className="home-blog__item-title">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h4>
                  <time className="home-blog__date" dateTime={post.date}>
                    {formatDate(post.date, { day: "numeric", month: "short", year: "numeric" })}
                  </time>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(HomeTwoBlog);
