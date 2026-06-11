import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { BlogPostMeta } from "@/types/blog";

type BlogMainProps = {
  posts: BlogPostMeta[];
  categories: string[];
  tags: string[];
};

const POSTS_PER_PAGE = 5;

const formatDate = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const BlogMain = ({ posts, categories, tags }: BlogMainProps) => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (activeCategory && p.category !== activeCategory) return false;
      if (!q) return true;
      const haystack = [
        p.title,
        p.description,
        p.category,
        p.author,
        ...p.tags,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [posts, query, activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (safePage - 1) * POSTS_PER_PAGE,
    safePage * POSTS_PER_PAGE
  );

  const recentPosts = posts.slice(0, 4);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
  };

  const handleCategoryClick = (cat: string | null) => {
    setActiveCategory(cat);
    setPage(1);
  };

  const goToPage = (n: number) => {
    if (n < 1 || n > totalPages) return;
    setPage(n);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="section blog-main fade-wrapper">
      <div className="container">
        <div className="row gaper">
          <div className="col-12 col-xl-8">
            <div className="blog-main__content">
              {(activeCategory || query) && (
                <div className="blog-main__filter-bar">
                  <p>
                    Showing <strong>{filtered.length}</strong>{" "}
                    {filtered.length === 1 ? "post" : "posts"}
                    {activeCategory && (
                      <>
                        {" "}
                        in <strong>{activeCategory}</strong>
                      </>
                    )}
                    {query && (
                      <>
                        {" "}
                        matching <strong>&ldquo;{query}&rdquo;</strong>
                      </>
                    )}
                  </p>
                  <button
                    type="button"
                    className="blog-main__filter-clear"
                    onClick={() => {
                      setQuery("");
                      setActiveCategory(null);
                      setPage(1);
                    }}
                  >
                    Clear filters
                    <i
                      className="fa-solid fa-xmark"
                      aria-hidden="true"
                    ></i>
                  </button>
                </div>
              )}

              {pageItems.length === 0 ? (
                <div className="blog-main__empty fade-top">
                  <h4 className="h4">No posts found.</h4>
                  <p>
                    Try a different search term or clear the filter to see
                    everything we&apos;ve published.
                  </p>
                </div>
              ) : (
                pageItems.map((post) => (
                  <article
                    key={post.slug}
                    className="blog-main__single fade-top"
                  >
                    <div className="thumb">
                      <div className="thumb-link">
                        <Link href={`/blog/${post.slug}`}>
                          <Image
                            src={post.cover}
                            alt={post.title}
                            width={1200}
                            height={720}
                            sizes="(min-width: 1200px) 720px, 100vw"
                          />
                        </Link>
                      </div>
                      <div className="meta">
                        <div className="meta__left">
                          <p>
                            <strong>Written by:</strong> {post.author}
                          </p>
                          <span></span>
                          <p>{formatDate(post.date)}</p>
                          <span></span>
                          <p>{post.readingMinutes} min read</p>
                        </div>
                        <div className="meta__right">
                          <button
                            type="button"
                            onClick={() => handleCategoryClick(post.category)}
                            aria-label={`Filter by ${post.category}`}
                          >
                            {post.category}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="content">
                      <h4 className="h4">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h4>
                      <p>{post.description}</p>
                      <div className="cta">
                        <Link
                          href={`/blog/${post.slug}`}
                          aria-label={`Read ${post.title}`}
                        >
                          <i className="fa-sharp fa-regular fa-arrow-right"></i>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))
              )}

              {totalPages > 1 && (
                <div className="pagination-wrapper">
                  <ul className="pagination">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (n) => (
                        <li key={n}>
                          <button
                            type="button"
                            className={n === safePage ? "active" : ""}
                            onClick={() => goToPage(n)}
                            aria-current={n === safePage ? "page" : undefined}
                          >
                            {String(n).padStart(2, "0")}
                          </button>
                        </li>
                      )
                    )}
                    <li>
                      <button
                        type="button"
                        onClick={() => goToPage(safePage + 1)}
                        disabled={safePage >= totalPages}
                        aria-label="Next page"
                      >
                        <i className="fa-sharp fa-regular fa-arrow-right"></i>
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <aside className="col-12 col-xl-4">
            <div className="blog-main__sidebar">
              <div className="widget">
                <div className="widget__head">
                  <h5 className="h5">Search</h5>
                </div>
                <div className="widget-search">
                  <form onSubmit={handleSearchSubmit}>
                    <div className="form-group-input">
                      <input
                        type="search"
                        name="blog-search"
                        id="blogSearch"
                        placeholder="Search articles…"
                        value={query}
                        onChange={(e) => {
                          setQuery(e.target.value);
                          setPage(1);
                        }}
                      />
                      <button type="submit" aria-label="Search">
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="widget">
                <div className="widget__head">
                  <h5 className="h5">Categories</h5>
                </div>
                <div className="widget__list">
                  <ul>
                    <li>
                      <button
                        type="button"
                        className={`blog-main__cat-btn${
                          activeCategory === null ? " is-active" : ""
                        }`}
                        onClick={() => handleCategoryClick(null)}
                      >
                        All posts
                        <span>{posts.length}</span>
                      </button>
                    </li>
                    {categories.map((cat) => {
                      const count = posts.filter(
                        (p) => p.category === cat
                      ).length;
                      const isActive = activeCategory === cat;
                      return (
                        <li key={cat}>
                          <button
                            type="button"
                            className={`blog-main__cat-btn${
                              isActive ? " is-active" : ""
                            }`}
                            onClick={() =>
                              handleCategoryClick(isActive ? null : cat)
                            }
                          >
                            {cat}
                            <span>{count}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {recentPosts.length > 0 && (
                <div className="widget">
                  <div className="widget__head">
                    <h5 className="h5">Recent Posts</h5>
                  </div>
                  <div className="widget__latest">
                    {recentPosts.map((post) => (
                      <div key={post.slug} className="latest-single">
                        <div className="latest-thumb">
                          <Link href={`/blog/${post.slug}`}>
                            <Image
                              src={post.cover}
                              alt={post.title}
                              width={120}
                              height={90}
                            />
                          </Link>
                        </div>
                        <div className="latest-content">
                          <p>{formatDate(post.date)}</p>
                          <p>
                            <Link href={`/blog/${post.slug}`}>
                              {post.title}
                            </Link>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tags.length > 0 && (
                <div className="widget">
                  <div className="widget__head">
                    <h5 className="h5">Tags</h5>
                  </div>
                  <div className="widget__tags">
                    <ul>
                      {tags.map((tag) => (
                        <li key={tag}>
                          <button
                            type="button"
                            onClick={() => {
                              setQuery(tag);
                              setActiveCategory(null);
                              setPage(1);
                            }}
                          >
                            {tag}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default BlogMain;
