import React from "react";
import {
  contactWhatsAppHref,
  CONTACT_WHATSAPP_MESSAGE_AGENCY,
} from "@/constants/contact";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";

/**
 * Site-wide floating WhatsApp call-to-action.
 *
 * Rendered once at the root of `Layout` so it appears on every page (home,
 * blog, blog single, contact, etc.). Anchored bottom-right, sits below the
 * offcanvas overlay (`z-index: 9999`) but above all page content. Hidden in
 * print output via the matching SCSS partial.
 *
 * Uses the existing `contactWhatsAppHref` helper + `CONTACT_WHATSAPP_*`
 * constants so the destination number and default message stay in sync with
 * the contact page and other WhatsApp CTAs across the site.
 */
const WhatsAppFloat = () => {
  const href = contactWhatsAppHref(CONTACT_WHATSAPP_MESSAGE_AGENCY);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-float"
      aria-label="Chat with Quantel Solutions on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <span className="wa-float__icon" aria-hidden="true">
        <WhatsAppIcon />
      </span>
      <span className="wa-float__label">Chat with us</span>
    </a>
  );
};

export default WhatsAppFloat;
