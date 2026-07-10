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
 * The newest post leads as a full-width feature (cover left, body right),
 * followed by the next three posts as a card row. Styling lives in
 * `src/styles/sections/_blog-home.scss`.
 */
const HomeTwoBlog = ({ posts }: HomeTwoBlogProps) => {
  const { lead, rest } = useMemo(() => {
    if (posts.length === 0) return { lead: null, rest: [] as BlogPostMeta[] };
    // Posts arrive newest-first; the latest leads, the next three fill the row.
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

        {/* ---- Feature: the latest post, full width ---- */}
        <article className="home-blog__feature">
          <Link
            href={`/blog/${lead.slug}`}
            className="home-blog__feature-media"
            aria-label={lead.title}
          >
            <Image
              src={lead.cover}
              alt=""
              fill
              className="home-blog__feature-img"
              sizes="(max-width: 992px) 100vw, 720px"
              priority={false}
            />
          </Link>
          <div className="home-blog__feature-body">
            <span className="home-blog__kicker">
              <span className="home-blog__latest">Latest</span>
              <span className="home-blog__cat">{lead.category}</span>
              <span className="home-blog__sep" aria-hidden="true">·</span>
              {lead.readingMinutes} min read
              <span className="home-blog__sep" aria-hidden="true">·</span>
              {formatDate(lead.date, { day: "numeric", month: "long", year: "numeric" })}
            </span>
            <h3 className="home-blog__feature-title">
              <Link href={`/blog/${lead.slug}`}>{lead.title}</Link>
            </h3>
            <p className="home-blog__feature-dek">{lead.description}</p>
            <Link href={`/blog/${lead.slug}`} className="home-blog__readmore">
              Read the full piece
              <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>
        </article>

        {/* ---- Card row: the next three posts ---- */}
        <div className="home-blog__row">
          {rest.map((post) => (
            <article key={post.slug} className="home-blog__card">
              <Link
                href={`/blog/${post.slug}`}
                className="home-blog__card-media"
                aria-label={post.title}
                tabIndex={-1}
              >
                <Image
                  src={post.cover}
                  alt=""
                  fill
                  className="home-blog__card-img"
                  sizes="(max-width: 992px) 96px, 400px"
                />
              </Link>
              <div className="home-blog__card-body">
                <span className="home-blog__kicker">
                  <span className="home-blog__cat">{post.category}</span>
                  <span className="home-blog__sep" aria-hidden="true">·</span>
                  {post.readingMinutes} min read
                </span>
                <h4 className="home-blog__card-title">
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
    </section>
  );
};

export default memo(HomeTwoBlog);
