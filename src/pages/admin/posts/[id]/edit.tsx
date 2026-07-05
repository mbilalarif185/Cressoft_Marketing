import type { GetServerSideProps } from "next";

import PostForm from "@/components/admin/PostForm";
import { getRecordById } from "@/lib/blog/storage";
import type { BlogPostRecord } from "@/lib/blog/types";

type EditPageProps = {
  post: BlogPostRecord;
};

export default function EditPostPage({ post }: EditPageProps) {
  return <PostForm mode="edit" initial={post} />;
}

// Auth is enforced by middleware.ts before this runs.
export const getServerSideProps: GetServerSideProps<EditPageProps> = async (
  context,
) => {
  const id = String(context.params?.id ?? "");
  const post = await getRecordById(id);
  if (!post) return { notFound: true };
  return { props: { post } };
};