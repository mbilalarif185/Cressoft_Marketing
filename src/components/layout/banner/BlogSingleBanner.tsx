import React from "react";
import Link from "next/link";

type BlogSingleBannerProps = {
  title: string;
  category: string;
  date: string;
  readingMinutes: number;
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

const BlogSingleBanner = ({
  title,
  category,
  date,
  readingMinutes,
}: BlogSingleBannerProps) => {
  return (
    <section
      className="cmn-banner bg-img"
      style={{ backgroundImage: "url('/images/banner/cmn-banner-bg.png')" }}
    >
      <div className="container">
        <div className="row gaper align-items-center">
          <div className="col-12">
            <div className="text-center text-lg-start">
              <div className="blog-single-banner__meta">
                <span className="blog-single-banner__pill">{category}</span>
                <span>{formatDate(date)}</span>
                <span aria-hidden="true">·</span>
                <span>{readingMinutes} min read</span>
              </div>
              <h1 className="title title-anim">{title}</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/">
                      <i className="fa-solid fa-house"></i>
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link href="/blog">Blog</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {category}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSingleBanner;
