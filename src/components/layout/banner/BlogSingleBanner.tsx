import React from "react";
import Link from "next/link";

type BlogSingleBannerProps = {
  title: string;
  description?: string;
  category: string;
  author: string;
  date: string;
  readingMinutes: number;
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-MY", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const breadcrumbTitle = (t: string, max = 48) =>
  t.length <= max ? t : `${t.slice(0, max).trim()}…`;

const BlogSingleBanner = ({
  title,
  description,
  category,
  author,
  date,
  readingMinutes,
}: BlogSingleBannerProps) => {
  return (
    <section className="blog-single-hero">
      <div className="blog-single-hero__media" aria-hidden="true" />

      <div className="container blog-single-hero__inner">
        <div className="row">
          <div className="col-12 col-xl-8">
            <div className="blog-single-hero__column">
              <div className="blog-single-hero__toolbar">
                <Link href="/blog" className="blog-single-hero__back">
                  <i className="fa-solid fa-arrow-left-long" aria-hidden="true" />
                  All articles
                </Link>
              </div>

              <nav className="blog-single-hero__breadcrumb" aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link href="/">
                      <i className="fa-solid fa-house"></i>
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link href="/blog">Blog</Link>
                  </li>
                  <li
                    className="breadcrumb-item active text-truncate"
                    aria-current="page"
                    title={title}
                  >
                    {breadcrumbTitle(title)}
                  </li>
                </ol>
              </nav>

              <p className="blog-single-hero__eyebrow">{category}</p>

              <h1 className="blog-single-hero__title">{title}</h1>

              <ul className="blog-single-hero__meta" aria-label="Article details">
                <li className="blog-single-hero__meta-item">
                  <i className="fa-regular fa-user" aria-hidden="true"></i>
                  <span>{author}</span>
                </li>
                <li className="blog-single-hero__meta-item" aria-hidden="true">
                  <span className="blog-single-hero__meta-sep">·</span>
                </li>
                <li className="blog-single-hero__meta-item">
                  <i className="fa-regular fa-calendar" aria-hidden="true"></i>
                  <time dateTime={date}>{formatDate(date)}</time>
                </li>
                <li className="blog-single-hero__meta-item" aria-hidden="true">
                  <span className="blog-single-hero__meta-sep">·</span>
                </li>
                <li className="blog-single-hero__meta-item">
                  <i className="fa-regular fa-clock" aria-hidden="true"></i>
                  <span>{readingMinutes} min read</span>
                </li>
              </ul>

              {description ? (
                <p className="blog-single-hero__lead">{description}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSingleBanner;
