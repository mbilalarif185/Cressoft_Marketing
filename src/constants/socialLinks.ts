/** Official Quantel Solutions social profiles (single source of truth). */
export const QUANTEL_SOCIAL = {
  instagram: "https://www.instagram.com/quantelsolutions/",
  facebook:
    "https://www.facebook.com/people/Quantel-Solutions/61591475250724/",
  // Retained for in-UI footer/header links. NOTE: intentionally NOT included
  // in the schema.org `sameAs` array (see SCHEMA_SAME_AS below) for this pass.
  linkedin: "https://linkedin.com/company/quantel-solutions",
} as const;

/**
 * Social profiles surfaced in structured data (`sameAs`) for the Organization
 * and LocalBusiness schemas. Single source of truth so the two schemas can
 * never drift apart. LinkedIn is deliberately excluded for now.
 */
export const SCHEMA_SAME_AS: string[] = [
  QUANTEL_SOCIAL.instagram,
  QUANTEL_SOCIAL.facebook,
];
