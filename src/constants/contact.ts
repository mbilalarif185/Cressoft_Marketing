/** Site-wide contact details — single source of truth for UI, links, and SEO helpers. */

export const CONTACT_PHONE_DISPLAY = "+6011 1102 0111";

/** Use in `tel:` links (digits after +, no spaces). */
export const CONTACT_PHONE_TEL_HREF = "tel:+601111020111";

export const CONTACT_EMAIL = "info@cressoft.net";

export const CONTACT_MAILTO_HREF = "mailto:info@cressoft.net";
export const second_EMAIL = "sam@cressoft.net";

export const second_MAILTO_HREF = "mailto:sam@cressoft.net";

export const CONTACT_ADDRESS = "Cova Square, Kota Damansara, Malaysia";

/** WhatsApp wa.me path (country + number, no + or spaces). */
export const CONTACT_WHATSAPP_E164 = "601111020111";

export function contactWhatsAppHref(message: string): string {
  return `https://wa.me/${CONTACT_WHATSAPP_E164}?text=${encodeURIComponent(message)}`;
}

export const CONTACT_WHATSAPP_MESSAGE_SHORT =
  "Hello I want to know more about your services";

export const CONTACT_WHATSAPP_MESSAGE_AGENCY =
  "Hi there, I visited your website and I'm interested in your digital marketing services. I'd like to know more about your pricing, services, and how you can help grow my business. Please get in touch with me.";

const mapsQuery = encodeURIComponent(CONTACT_ADDRESS);

/** Opens Google Maps search for the office address. */
export const CONTACT_MAPS_PLACE_URL = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

/** Embeddable map (no API key) for contact page iframe. */
export const CONTACT_MAPS_EMBED_URL = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;
