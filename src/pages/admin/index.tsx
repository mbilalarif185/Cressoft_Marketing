import type { GetServerSideProps } from "next";

import AdminShell from "@/components/admin/AdminShell";
import PostList from "@/components/admin/PostList";
import { loadAllRecords } from "@/lib/blog/storage";
import type { BlogPostRecord } from "@/lib/blog/types";

type DashboardProps = {
  posts: BlogPostRecord[];
};

export default function AdminDashboardPage({ posts }: DashboardProps) {
  return (
    <AdminShell title="All posts">
      <PostList initialPosts={posts} />
    </AdminShell>
  );
}

// Auth is enforced by middleware.ts before this runs.
export const getServerSideProps: GetServerSideProps<DashboardProps> = async () => {
  const posts = await loadAllRecords();
  const sorted = [...posts].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
  return { props: { posts: sorted } };
};