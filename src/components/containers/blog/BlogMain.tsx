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

  const categoryLedger = useMemo(() => {
    const total = Math.max(1, posts.length);
    return categories.map((cat) => {
      const count = posts.filter((p) => p.category === cat).length;
      return { cat, count, share: count / total };
    });
  }, [categories, posts]);

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
                            alt={post.coverAlt || post.title}
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
            <div className="blog-main__sidebar blog-explorer">
              <div className="blog-explorer__block">
                <span className="blog-explorer__eyebrow">Search</span>
                <form
                  className="blog-explorer__search"
                  onSubmit={handleSearchSubmit}
                  role="search"
                >
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
                  <button type="submit" aria-label="Search articles">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </form>
              </div>

              <div className="blog-explorer__block">
                <span className="blog-explorer__eyebrow">
                  Browse topics
                  <em>
                    {posts.length} {posts.length === 1 ? "article" : "articles"}
                  </em>
                </span>
                <ul className="topic-ledger">
                  <li>
                    <button
                      type="button"
                      className={`topic-ledger__row${
                        activeCategory === null ? " is-active" : ""
                      }`}
                      style={{ "--share": 1 } as React.CSSProperties}
                      onClick={() => handleCategoryClick(null)}
                      aria-pressed={activeCategory === null}
                    >
                      <span className="topic-ledger__name">All posts</span>
                      <span className="topic-ledger__count">
                        {posts.length}
                      </span>
                    </button>
                  </li>
                  {categoryLedger.map(({ cat, count, share }) => {
                    const isActive = activeCategory === cat;
                    return (
                      <li key={cat}>
                        <button
                          type="button"
                          className={`topic-ledger__row${
                            isActive ? " is-active" : ""
                          }`}
                          style={{ "--share": share } as React.CSSProperties}
                          onClick={() =>
                            handleCategoryClick(isActive ? null : cat)
                          }
                          aria-pressed={isActive}
                        >
                          <span className="topic-ledger__name">{cat}</span>
                          <span className="topic-ledger__count">{count}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {recentPosts.length > 0 && (
                <div className="blog-explorer__block">
                  <span className="blog-explorer__eyebrow">Recent posts</span>
                  <div className="blog-explorer__recent">
                    {recentPosts.map((post) => (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="recent-item"
                      >
                        <span className="recent-item__thumb">
                          <Image
                            src={post.cover}
                            alt={post.coverAlt || post.title}
                            width={120}
                            height={90}
                          />
                        </span>
                        <span className="recent-item__body">
                          <span className="recent-item__date">
                            {formatDate(post.date)}
                          </span>
                          <span className="recent-item__title">
                            {post.title}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {tags.length > 0 && (
                <div className="blog-explorer__block">
                  <span className="blog-explorer__eyebrow">Tags</span>
                  <div className="blog-explorer__tags">
                    {tags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          setQuery(tag);
                          setActiveCategory(null);
                          setPage(1);
                        }}
                      >
                        {tag}
                      </button>
                    ))}
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
