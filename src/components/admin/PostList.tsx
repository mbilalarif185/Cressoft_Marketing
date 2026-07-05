import Link from "next/link";
import { useState } from "react";

import { formatBlogDate } from "@/lib/blog/format-date";
import type { BlogPostRecord } from "@/lib/blog/types";

type PostListProps = {
  initialPosts: BlogPostRecord[];
};

export default function PostList({ initialPosts }: PostListProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete(id: string, title: string) {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeletingId(id);
    setError(null);
    const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
    setDeletingId(null);
    if (!res.ok) {
      setError("Could not delete post. Please try again.");
      return;
    }
    setPosts((prev) => prev.filter((p) => p.id !== id));
    // Do not refresh here — a stale Blob CDN read could re-insert the deleted post.
  }

  if (posts.length === 0) {
    return (
      <p className="admin-empty">
        No posts yet.{" "}
        <Link href="/admin/posts/new" className="admin-link">
          Create your first post
        </Link>
        .
      </p>
    );
  }

  return (
    <div className="admin-list">
      {error ? <p className="admin-alert admin-alert--error">{error}</p> : null}
      <ul className="admin-list__items">
        {posts.map((post) => (
          <li key={post.id} className="admin-list__item">
            <div className="admin-list__info">
              <div className="admin-list__heading">
                <p className="admin-list__title">{post.title}</p>
                <span
                  className={`admin-badge admin-badge--${
                    post.status === "published" ? "published" : "draft"
                  }`}
                >
                  {post.status}
                </span>
              </div>
              <p className="admin-list__meta">
                /blog/{post.slug} · {formatBlogDate(post.publishedAt)}
                {post.category ? ` · ${post.category}` : ""}
              </p>
            </div>
            <div className="admin-list__actions">
              <Link
                href={`/admin/preview/${post.slug}`}
                className="admin-btn admin-btn--ghost admin-btn--sm"
              >
                Preview
              </Link>
              <Link
                href={`/admin/posts/${post.id}/edit`}
                className="admin-btn admin-btn--ghost admin-btn--sm"
              >
                Edit
              </Link>
              <button
                type="button"
                disabled={deletingId === post.id}
                onClick={() => handleDelete(post.id, post.title)}
                className="admin-btn admin-btn--danger admin-btn--sm"
              >
                {deletingId === post.id ? "Deleting…" : "Delete"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}