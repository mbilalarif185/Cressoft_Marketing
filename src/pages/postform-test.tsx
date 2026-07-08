import PostForm from "@/components/admin/PostForm";

// Throwaway page to reproduce the editor caret bug inside the REAL PostForm.
// Not linked anywhere; delete after debugging.
export default function PostFormTest() {
  return <PostForm mode="create" />;
}