import React from "react";
import Link from "next/link";
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_MAILTO_HREF,
  second_EMAIL,
  second_MAILTO_HREF,
  CONTACT_MAPS_EMBED_URL,
  CONTACT_MAPS_PLACE_URL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL_HREF,
  CONTACT_WHATSAPP_MESSAGE_SHORT,
  contactWhatsAppHref,
} from "@/constants/contact";

/**
 * Contact-card icons, inlined as SVGs so they take the brand colour via
 * `currentColor` (set on `.contact-m .thumb` → `var(--primary-color)`, the
 * logo azure). Previously these were baked-orange `.webp` rasters that could
 * not be recoloured. Thin 1.6px rounded strokes match the original line look.
 */
const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

const PhoneIcon = () => (
  <svg {...iconProps}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg {...iconProps}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
    <path d="m3 6 9 6.5L21 6" />
  </svg>
);

const LocationIcon = () => (
  <svg {...iconProps}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="2.8" />
  </svg>
);

const TimeIcon = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="9.5" />
    <path d="M12 7v5l3.5 2" />
  </svg>
);

const ContactMain = () => {
  return (
    <section className="section contact-m fade-wrapper">
      <div className="container">
        <div className="row gaper">
          <div className="col-12 col-sm-6 col-xl-3">
            <div className="contact-m__single topy-tilt fade-top">
              <div className="thumb">
                <PhoneIcon />
              </div>
              <div className="content">
                <h4>Phone &amp; WhatsApp</h4>
                <div className="contact-m__line">
                  <span className="contact-m__label">Call</span>
                  <Link
                    href={CONTACT_PHONE_TEL_HREF}
                    className="contact-m__value"
                  >
                    {CONTACT_PHONE_DISPLAY}
                  </Link>
                </div>
                <div className="contact-m__line">
                  <span className="contact-m__label">WhatsApp</span>
                  <Link
                    href={contactWhatsAppHref(CONTACT_WHATSAPP_MESSAGE_SHORT)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-m__value"
                  >
                    {CONTACT_PHONE_DISPLAY}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-xl-3">
            <div className="contact-m__single topy-tilt fade-top">
              <div className="thumb">
                <MailIcon />
              </div>
              <div className="content">
                <h4>Mail Address</h4>
                <div className="contact-m__line">
                  <span className="contact-m__label">Support</span>
                  <Link
                    href={CONTACT_MAILTO_HREF}
                    className="contact-m__value"
                  >
                    {CONTACT_EMAIL}
                  </Link>
                </div>
                <div className="contact-m__line">
                  <span className="contact-m__label">Sales</span>
                  <Link
                    href={second_MAILTO_HREF}
                    className="contact-m__value"
                  >
                    {second_EMAIL}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-xl-3">
            <div className="contact-m__single topy-tilt fade-top">
              <div className="thumb">
                <LocationIcon />
              </div>
              <div className="content">
                <h4>Our Location</h4>
                <p>
                  <a
                    href={CONTACT_MAPS_PLACE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {CONTACT_ADDRESS}
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-xl-3">
            <div className="contact-m__single topy-tilt fade-top">
              <div className="thumb">
                <TimeIcon />
              </div>
              <div className="content">
                <h4>Office Hour</h4>
                <p>Monday - Friday<br></br> 9 am - 5:30 pm</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="map-wrapper">
              <div className="row gaper">
                <div className="col-12 col-lg-6">
                  <div className="contact__map fade-top">
                    <iframe
                      src={CONTACT_MAPS_EMBED_URL}
                      width="100"
                      height="800"
                      style={{ border: "0px" }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="contact-main__form  fade-top">
                    <h3>Leave A Message</h3>
                    <form
                      action="#"
                      method="post"
                      className="section__content-cta"
                    >
                      <div className="group-wrapper">
                        <div className="group-input ">
                          <input
                            type="text"
                            name="contact-name"
                            id="contactName"
                            placeholder="Name"
                          />
                        </div>
                        <div className="group-input ">
                          <input
                            type="email"
                            name="contact-email"
                            id="contactEmail"
                            placeholder="Email"
                          />
                        </div>
                      </div>
                      <div className="group-input drt">
                        <select className="subject">
                          <option data-display="Subject">Subject</option>
                          <option value="1">Account</option>
                          <option value="2">Service</option>
                          <option value="3">Pricing</option>
                          <option value="4">Support</option>
                        </select>
                      </div>
                      <div className="group-input ">
                        <textarea
                          name="contact-message"
                          id="contactMessage"
                          placeholder="Message"
                        ></textarea>
                      </div>
                      <div className="form-cta justify-content-start">
                        <button type="submit" className="btn btn--primary">
                          Send Message
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMain;
