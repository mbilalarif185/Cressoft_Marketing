// Formats an ISO date (or yyyy-mm-dd) into a human-readable string.
export function formatBlogDate(input: string): string {
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return input;
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}