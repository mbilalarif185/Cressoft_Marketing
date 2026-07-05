export function slugifyTitle(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

export function ensureUniqueSlug(
  base: string,
  existing: string[],
  currentSlug?: string,
): string {
  const normalized = slugifyTitle(base) || "post";
  if (currentSlug === normalized) return normalized;
  if (!existing.includes(normalized)) return normalized;
  let i = 2;
  while (existing.includes(`${normalized}-${i}`)) i += 1;
  return `${normalized}-${i}`;
}