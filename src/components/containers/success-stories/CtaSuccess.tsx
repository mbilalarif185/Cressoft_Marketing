import React from "react";
import Link from "next/link";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import {
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL_HREF,
  contactWhatsAppHref,
  CONTACT_WHATSAPP_MESSAGE_AGENCY,
} from "@/constants/contact";

type Stat = {
  value: string;
  label: string;
};

const STATS: Stat[] = [
  { value: "500+", label: "Projects delivered" },
  { value: "5 yrs", label: "Delivering globally" },
  { value: "98%", label: "Client retention rate" },
  { value: "48 hrs", label: "Discovery call turnaround" },
];

const CtaSuccess = () => {
  const whatsAppHref = contactWhatsAppHref(CONTACT_WHATSAPP_MESSAGE_AGENCY);

  return (
    <section className="cta-success section" aria-labelledby="cta-success-title">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-xxl-11">
            <div className="cta-success__wrapper">
              {/* Decorative gradient orbs - purely visual */}
              <span className="cta-success__orb cta-success__orb--one" aria-hidden="true" />
              <span className="cta-success__orb cta-success__orb--two" aria-hidden="true" />

              <div className="cta-success__grid">
                <div className="cta-success__content">
                  <span className="cta-success__eyebrow">
                    <i className="fa-solid fa-bolt" aria-hidden="true"></i>
                   LET&apos;S BUILD TOGETHER
                  </span>
                  <h2 id="cta-success-title" className="cta-success__title title-anim">
                    Join 500+ businesses across the UK, US, UAE,
                    and beyond.
                  </h2>
                  <p className="cta-success__lead">
                    We partner with a limited number of new clients each quarter.
                    If you&apos;re comparing IT service providers, let&apos;s see
                    if we&apos;re a good fit - no pressure, no hard sell.
                  </p>

                  <div className="cta-success__actions">
                    <Link href="/contact" className="cta-success__btn-primary">
                      BOOK A DISCOVERY CALL
                      <i className="fa-sharp fa-solid fa-arrow-up-right" aria-hidden="true"></i>
                    </Link>
                    <Link
                      href={whatsAppHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cta-success__btn-ghost"
                      aria-label="Chat with our team on WhatsApp"
                    >
                      <WhatsAppIcon className="wa-icon" />
                      Message Us on WhatsApp
                    </Link>
                  </div>

                  <Link
                    href={CONTACT_PHONE_TEL_HREF}
                    className="cta-success__phone"
                    aria-label={`Call us at ${CONTACT_PHONE_DISPLAY}`}
                  >
                    <i className="fa-solid fa-phone" aria-hidden="true"></i>
                    <span>
                      <small>Or call us directly</small>
                      <strong>{CONTACT_PHONE_DISPLAY}</strong>
                    </span>
                  </Link>
                </div>

                <ul className="cta-success__stats" aria-label="Agency results at a glance">
                  {STATS.map((stat) => (
                    <li key={stat.label} className="cta-success__stat">
                      <span className="cta-success__stat-value">{stat.value}</span>
                      <span className="cta-success__stat-label">{stat.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSuccess;
