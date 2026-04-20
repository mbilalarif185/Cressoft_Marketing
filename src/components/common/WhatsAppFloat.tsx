import React from "react";
import {
  contactWhatsAppHref,
  CONTACT_WHATSAPP_MESSAGE_AGENCY,
} from "@/constants/contact";

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
      aria-label="Chat with Cressoft on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <span className="wa-float__pulse" aria-hidden="true" />
      <span className="wa-float__icon" aria-hidden="true">
        {/* Official WhatsApp brand glyph (FontAwesome path) inlined so the
            icon renders pixel-correctly regardless of the slim icon subset.
            `fill="currentColor"` lets the SCSS keep colour control. */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          focusable="false"
          role="img"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M380.9 97.1C339-3.1 217.5-31.6 144.9 41 71.6 113.7 70.9 220 117.3 297.4l-26 95.1 97.4-25.5C282 419 388 379.4 432.9 296.6c41-77.3 24.2-181.4-52-199.5zm-156.8 359c-32.4 0-63.4-9.4-90.6-26.5l-65.5 17.2 17.5-63.7c-19-29.7-29.1-64.6-29.1-100.5 0-103.7 84.6-188.3 188.3-188.3 50.3 0 97.5 19.5 132.9 55s55 82.6 55 132.9c-.1 103.6-84.7 188.3-188.5 188.3zm103.4-141.8c-5.7-2.8-33.5-16.5-38.7-18.3-5.2-1.9-9-2.8-12.8 2.8-3.8 5.7-14.7 18.3-18 22.1-3.3 3.8-6.6 4.2-12.3 1.4-33.6-16.8-55.7-30-77.8-68-5.9-10.1 5.9-9.4 16.8-31.3 1.9-3.8.9-7.1-.5-9.9-1.4-2.8-12.8-30.7-17.5-42-4.6-11-9.3-9.5-12.8-9.7-3.3-.2-7.1-.2-10.9-.2s-9.9 1.4-15.1 7.1-19.8 19.4-19.8 47.2 20.3 54.7 23.1 58.5c2.8 3.8 39.9 60.9 96.7 85.4 35.8 15.5 49.8 16.8 67.7 14.1 10.9-1.6 33.5-13.7 38.2-26.9 4.7-13.2 4.7-24.5 3.3-26.9-1.4-2.5-5.2-3.9-10.9-6.7z"
          />
        </svg>
      </span>
      <span className="wa-float__label">Chat with us</span>
    </a>
  );
};

export default WhatsAppFloat;
