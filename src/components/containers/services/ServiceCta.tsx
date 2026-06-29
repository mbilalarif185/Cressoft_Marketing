import React from "react";
import Link from "next/link";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import type { Service } from "@/data/services";
import {
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL_HREF,
  contactWhatsAppHref,
} from "@/constants/contact";

/**
 * Bottom-of-page CTA for an individual /services/<slug> page.
 *
 * Each service closes on a finished, distinct CTA design. The one consistent,
 * REAL grounding element is the service's own icon, rendered as a gradient
 * badge — no placeholder/mockup chrome. Distinctness comes from genuine art
 * direction (background, composition, accent) per service. The body
 * (heading / subcopy / actions / chips) is shared via <CtaBody> so conversion
 * and accessibility stay consistent. Styles live in
 * src/styles/sections/_service-cta.scss (namespaced `.scta*`).
 */

const waHref = (service: Service) =>
  contactWhatsAppHref(`Hi Quantel, I'd like to talk about ${service.name}.`);

const IconBadge = ({
  service,
  xl = false,
}: {
  service: Service;
  xl?: boolean;
}) => (
  <span
    className={`scta__badge${xl ? " scta__badge--xl" : ""}`}
    aria-hidden="true"
  >
    <i className={service.icon}></i>
  </span>
);

type BodyProps = {
  service: Service;
  align?: "center" | "start";
  showChips?: boolean;
  badge?: boolean;
};

/** Shared, conversion-focused content stack used inside every frame. */
const CtaBody = ({
  service,
  align = "center",
  showChips = true,
  badge = false,
}: BodyProps) => {
  const { cta } = service;
  return (
    <div className={`scta__body scta__body--${align}`}>
      {badge && <IconBadge service={service} />}
      <h2 className="scta__heading">{cta.heading}</h2>
      <p className="scta__subcopy">{cta.subcopy}</p>
      <div className="scta__actions">
        <Link href="/contact" className="scta__primary">
          <span>{cta.primaryLabel}</span>
          <i className="fa-sharp fa-solid fa-arrow-right" aria-hidden="true"></i>
        </Link>
        <Link
          href={waHref(service)}
          target="_blank"
          rel="noopener noreferrer"
          className="scta__secondary"
          aria-label={`Message us on WhatsApp about ${service.shortName}`}
        >
          <WhatsAppIcon className="wa-icon" />
          WhatsApp us
        </Link>
        <Link
          href={CONTACT_PHONE_TEL_HREF}
          className="scta__phone"
          aria-label={`Call us at ${CONTACT_PHONE_DISPLAY}`}
        >
          <i className="fa-solid fa-phone" aria-hidden="true"></i>
          {CONTACT_PHONE_DISPLAY}
        </Link>
      </div>
      {showChips && (
        <ul className="scta__chips" aria-label="What to expect">
          {cta.assurances.map((item) => (
            <li key={item}>
              <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Frame = ({
  variant,
  tone,
  label,
  children,
}: {
  variant: string;
  tone: "dark" | "light" | "onbrand";
  label: string;
  children: React.ReactNode;
}) => (
  <section
    className={`section scta scta--${tone} sctaf sctaf--${variant}`}
    aria-label={label}
  >
    <div className="container">{children}</div>
  </section>
);

/* ===================================================================== */
/* Per-service finished frames                                            */
/* ===================================================================== */

// 1) SaaS — dark panel, concentric rings orbiting the icon (split)
const RingsCta = ({ service }: { service: Service }) => (
  <Frame variant="rings" tone="dark" label="Get started with SaaS development">
    <div className="sctaf-rings">
      <CtaBody service={service} align="start" />
      <div className="sctaf-rings__visual" aria-hidden="true">
        <span className="sctaf-rings__ring" />
        <span className="sctaf-rings__ring" />
        <span className="sctaf-rings__ring" />
        <span className="sctaf-rings__core">
          <i className={service.icon}></i>
        </span>
      </div>
    </div>
  </Frame>
);

// 2) White-label — light card, gradient top edge, centered
const TopEdgeCta = ({ service }: { service: Service }) => (
  <Frame variant="topedge" tone="light" label="Get started with white-label platforms">
    <div className="sctaf-topedge">
      <CtaBody service={service} align="center" badge />
    </div>
  </Frame>
);

// 3) AI — dark gradient-border island, centered
const RingBorderCta = ({ service }: { service: Service }) => (
  <Frame variant="ring-border" tone="dark" label="Get started with AI and automation">
    <div className="sctaf-ringborder">
      <div className="sctaf-ringborder__inner">
        <CtaBody service={service} align="center" badge />
      </div>
    </div>
  </Frame>
);

// 4) Web — full brand-gradient band, white on colour
const BandCta = ({ service }: { service: Service }) => (
  <Frame variant="band" tone="onbrand" label="Get started with web development">
    <div className="sctaf-band">
      <i className={`sctaf-band__wm ${service.icon}`} aria-hidden="true"></i>
      <CtaBody service={service} align="center" badge />
    </div>
  </Frame>
);

// 5) SEO — sand panel, oversized icon offset left (split)
const OffsetCta = ({ service }: { service: Service }) => (
  <Frame variant="offset" tone="light" label="Get started with SEO">
    <div className="sctaf-offset">
      <div className="sctaf-offset__visual" aria-hidden="true">
        <IconBadge service={service} xl />
      </div>
      <CtaBody service={service} align="start" />
    </div>
  </Frame>
);

// 6) Social — light card, soft gradient corner glow
const WedgeCta = ({ service }: { service: Service }) => (
  <Frame variant="wedge" tone="light" label="Get started with social media marketing">
    <div className="sctaf-wedge">
      <span className="sctaf-wedge__glow" aria-hidden="true" />
      <CtaBody service={service} align="center" badge />
    </div>
  </Frame>
);

// 7) Mobile — dark island, gradient accent bar
const BarCta = ({ service }: { service: Service }) => (
  <Frame variant="bar" tone="dark" label="Get started with mobile app development">
    <div className="sctaf-bar">
      <CtaBody service={service} align="center" badge />
    </div>
  </Frame>
);

// 8) Custom software — dark fine-grid island
const GridCta = ({ service }: { service: Service }) => (
  <Frame variant="grid" tone="dark" label="Get started with custom software">
    <div className="sctaf-grid">
      <CtaBody service={service} align="center" badge />
    </div>
  </Frame>
);

// 9) Ecommerce — white card, icon badge split right
const SplitCta = ({ service }: { service: Service }) => (
  <Frame variant="split" tone="light" label="Get started with ecommerce">
    <div className="sctaf-split">
      <CtaBody service={service} align="start" />
      <div className="sctaf-split__visual" aria-hidden="true">
        <IconBadge service={service} xl />
      </div>
    </div>
  </Frame>
);

// 10) ERP — dark radial-glow island, centered
const IslandCta = ({ service }: { service: Service }) => (
  <Frame variant="island" tone="dark" label="Get started with ERP solutions">
    <div className="sctaf-island">
      <CtaBody service={service} align="center" badge />
    </div>
  </Frame>
);

// 11) UI/UX — minimal white card, hairline divider, centered
const MinimalCta = ({ service }: { service: Service }) => (
  <Frame variant="minimal" tone="light" label="Get started with UI/UX design">
    <div className="sctaf-minimal">
      <CtaBody service={service} align="center" badge />
    </div>
  </Frame>
);

/* ===================================================================== */

const FRAMES: Record<string, React.FC<{ service: Service }>> = {
  "saas-development": RingsCta,
  "white-label-solutions": TopEdgeCta,
  "ai-automation": RingBorderCta,
  "web-development": BandCta,
  seo: OffsetCta,
  "social-media-marketing": WedgeCta,
  "mobile-app-development": BarCta,
  "custom-software": GridCta,
  "ecommerce-solutions": SplitCta,
  "erp-solutions": IslandCta,
  "ui-ux-design": MinimalCta,
};

const ServiceCta = ({ service }: { service: Service }) => {
  const FrameForService = FRAMES[service.slug] ?? IslandCta;
  return <FrameForService service={service} />;
};

export default ServiceCta;
