import type { GetServerSideProps } from "next";
import { getAllPostMeta } from "@/lib/blog";

// Legacy URL — homepage Swiper components still link to `/blog-single`.
// Redirect to the most-recent post so the link is never broken, and
// callers/crawlers learn the canonical path.
export const getServerSideProps: GetServerSideProps = async () => {
  const [latest] = getAllPostMeta();
  return {
    redirect: {
      destination: latest ? `/blog/${latest.slug}` : "/blog",
      permanent: false,
    },
  };
};

const BlogSingleRedirect = () => null;
export default BlogSingleRedirect;
