/** Official Quantel Solutions social profiles (single source of truth). */
export const QUANTEL_SOCIAL = {
  instagram: "https://www.instagram.com/quantelsolutions/",
  facebook:
    "https://www.facebook.com/people/Quantel-Solutions/61591475250724/",
  linkedin: "https://www.linkedin.com/company/quantel-solutions/",
} as const;

/**
 * Social profiles surfaced in structured data (`sameAs`) for the Organization
 * and LocalBusiness schemas. Single source of truth so the two schemas can
 * never drift apart.
 */
export const SCHEMA_SAME_AS: string[] = [
  QUANTEL_SOCIAL.instagram,
  QUANTEL_SOCIAL.facebook,
  QUANTEL_SOCIAL.linkedin,
];
