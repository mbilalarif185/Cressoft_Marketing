/** Site-wide contact details — single source of truth for UI, links, and SEO helpers. */

export const CONTACT_PHONE_DISPLAY = "+44 7879 301606";

/** Use in `tel:` links (digits after +, no spaces). */
export const CONTACT_PHONE_TEL_HREF = "tel:+447879301606";

export const CONTACT_EMAIL = "support@quantel.uk";

export const CONTACT_MAILTO_HREF = "mailto:support@quantel.uk";

export const CONTACT_ADDRESS =
  "20 Fenchurch Street, London, EC3M 3BY, United Kingdom";

/** WhatsApp wa.me path (country + number, no + or spaces). */
export const CONTACT_WHATSAPP_E164 = "447879301606";

export function contactWhatsAppHref(message: string): string {
  return `https://wa.me/${CONTACT_WHATSAPP_E164}?text=${encodeURIComponent(message)}`;
}

export const CONTACT_WHATSAPP_MESSAGE_SHORT =
  "Hello I want to know more about your services";

export const CONTACT_WHATSAPP_MESSAGE_AGENCY =
  "Hi there, I visited the Quantel Solutions website and I'm interested in your services. I'd like to know more about how you can help my business.";

const mapsQuery = encodeURIComponent(CONTACT_ADDRESS);

/** Opens Google Maps search for the office address. */
export const CONTACT_MAPS_PLACE_URL = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

/** Embeddable map (no API key) for contact page iframe. */
export const CONTACT_MAPS_EMBED_URL = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;
