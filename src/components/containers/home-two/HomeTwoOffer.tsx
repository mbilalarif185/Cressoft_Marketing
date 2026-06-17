import React, { memo, useMemo } from "react";
import Link from "next/link";
import Head from "next/head";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { SITE_URL } from "@/lib/seo";

// Single source of truth for all services. Keeping this as a stable
// module-level constant avoids re-creating the array on every render and
// makes the structured-data block trivially cheap.
const SERVICES = [
  { num: "01", title: "SaaS Development" },
  { num: "02", title: "White-Label Platforms" },
  { num: "03", title: "AI Solutions" },
  { num: "04", title: "Web Development" },
  { num: "05", title: "Search Engine Optimization" },
  { num: "06", title: "Social Media Marketing" },
  { num: "07", title: "Mobile App Development" },
  { num: "08", title: "Ecommerce Solutions" },
  { num: "09", title: "ERP Solutions" },
  { num: "10", title: "UI / UX Design" },
] as const;

const SERVICE_HREF = "/marketing-solutions";

const AUTOPLAY_OPTS = {
  delay: 1,
  disableOnInteraction: false,
  pauseOnMouseEnter: true,
} as const;

type SlideProps = {
  num: string;
  title: string;
};

// Memoised slide so that re-renders of the parent (e.g. on Swiper internal
// updates) don't reconcile every node again.
const OfferSlide = memo(function OfferSlide({ num, title }: SlideProps) {
  return (
    <div className="offer-two__slider-single offer__cta">
      <div className="offer__cta-single">
        <span className="sub-title" aria-hidden="true">
          {num}
          <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
        </span>
        {/*
          Kept as <h2> intentionally: the existing global stylesheet targets
          `.offer__cta h2 a { ... }` for typography, hover gradient text,
          icon color, etc. Switching to <h3> would silently break the
          design. The decorative second marquee below uses a plain <span>
          to avoid duplicating heading nodes for crawlers.
        */}
        <h2>
          <Link href={SERVICE_HREF} prefetch={false} aria-label={`Learn more about our ${title} services`}>
            {title}
          </Link>
        </h2>
      </div>
    </div>
  );
});

const HomeTwoOffer = () => {
  // Build slides once. They never change for the lifetime of the page.
  const slides = useMemo(
    () =>
      SERVICES.map((s) => (
        <SwiperSlide key={s.num}>
          <OfferSlide num={s.num} title={s.title} />
        </SwiperSlide>
      )),
    []
  );

  // Schema.org ItemList helps Google understand this is a list of services
  // offered by the business - improves rich-result eligibility without any
  // visual change to the page.
  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "End-to-end digital capabilities for global teams",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: SERVICES.length,
      itemListElement: SERVICES.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          name: s.title,
          url: `${SITE_URL}${SERVICE_HREF}`,
          provider: {
            "@type": "Organization",
            name: "Quantel Solutions",
            url: SITE_URL,
          },
          areaServed: { "@type": "Country", name: "United Kingdom" },
        },
      })),
    }),
    []
  );

  return (
    <section
      className="section offer-two"
      aria-labelledby="offer-two-heading"
    >
      <Head>
        <script
          type="application/ld+json"
          // Inline JSON-LD: tiny payload, indexable by crawlers immediately.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          key="offer-two-jsonld"
        />
      </Head>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <header className="section__header text-center">
              <span className="sub-title">
                what we offer
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </span>
              <h2 id="offer-two-heading" className="title title-anim">
                End-to-end digital capabilities for global teams
              </h2>
              <p>
                From SaaS platforms and white-label products to AI, web, and
                growth marketing - we cover every layer of your digital roadmap.
              </p>
            </header>
          </div>
        </div>
      </div>

      {/* Primary marquee - exposed to assistive tech & crawlers. */}
      <div className="offer-two__slider-w" dir="rtl">
        <Swiper
          slidesPerView="auto"
          spaceBetween={30}
          speed={13000}
          loop
          centeredSlides
          modules={[Autoplay]}
          autoplay={{ ...AUTOPLAY_OPTS, reverseDirection: true }}
          className="offer-two__slider"
          a11y={{
            containerRoleDescriptionMessage: "Carousel of services",
            itemRoleDescriptionMessage: "Service",
          }}
        >
          {slides}
        </Swiper>
      </div>

      {/*
        Decorative second marquee running in the opposite direction.
        It is identical content to the first slider, so we hide it from
        screen readers and from search engines (via aria-hidden) to avoid
        duplicate content / noise. Visual users still get the effect.
      */}
      <div
        className="offer-two__slider-rtl-w"
        aria-hidden="true"
        // Keep it out of the tab order entirely.
        tabIndex={-1}
      >
        <Swiper
          slidesPerView="auto"
          spaceBetween={30}
          speed={13000}
          loop
          centeredSlides
          modules={[Autoplay]}
          autoplay={{ ...AUTOPLAY_OPTS, reverseDirection: true }}
          className="offer-two__slider"
        >
          {SERVICES.map((s) => (
            <SwiperSlide key={`mirror-${s.num}`}>
              <div className="offer-two__slider-single offer__cta">
                <div className="offer__cta-single">
                  <span className="sub-title">
                    {s.num}
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                  {/*
                    Kept as <h2> (with no <a>) so the existing typography
                    in `.offer__cta h2 { ... }` applies without any CSS
                    changes. The whole wrapper is aria-hidden, so AT
                    users won't see a duplicate heading; crawlers treat
                    decorative duplicates fine and the link graph stays
                    clean (no duplicate marketing-solutions links).
                  */}
                  <h2>
                    <span>{s.title}</span>
                  </h2>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default memo(HomeTwoOffer);
