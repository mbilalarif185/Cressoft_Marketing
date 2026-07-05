import type { NextApiResponse } from "next";

/**
 * Revalidate the public blog pages after a create/edit/delete.
 *
 * NOTE (Pages Router port): the App-Router guide used `revalidatePath()` from
 * `next/cache`. In the Pages Router, on-demand ISR is triggered via
 * `res.revalidate(path)`. Only pages backed by `getStaticProps` can be
 * revalidated — that is `/blog` (list) and `/blog/[slug]` (article); the admin
 * screens use `getServerSideProps` and are always fresh. Failures are
 * swallowed so a revalidation hiccup never fails the save itself.
 */
export async function revalidateBlogPaths(
  res: NextApiResponse,
  slug?: string,
): Promise<void> {
  const paths = ["/blog"];
  if (slug) paths.push(`/blog/${slug}`);
  await Promise.all(
    paths.map(async (p) => {
      try {
        await res.revalidate(p);
      } catch (err) {
        console.error(`[revalidate] ${p}`, err);
      }
    }),
  );
}