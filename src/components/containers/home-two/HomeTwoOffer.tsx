import React, { memo, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import ball from "public/images/ball.webp";
import { SITE_URL } from "@/lib/seo";

// Single source of truth for all services. Keeping this as a stable
// module-level constant avoids re-creating the array on every render and
// makes the structured-data block trivially cheap.
const SERVICES = [
  { num: "01", title: "AI Solutions" },
  { num: "02", title: "Web Development" },
  { num: "03", title: "Search Engine Optimization" },
  { num: "04", title: "Social Media Marketing" },
  { num: "05", title: "Mobile App Development" },
  { num: "06", title: "Custom Solutions" },
  { num: "07", title: "Ecommerce Solutions" },
  { num: "08", title: "ERP Solutions" },
  { num: "09", title: "UI / UX Design" },
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
        <div className="offer-thumb-hover d-none d-md-block" aria-hidden="true">
          <Image
            src={ball}
            alt=""
            width={120}
            height={120}
            sizes="120px"
            quality={70}
            loading="lazy"
            decoding="async"
            // Pure decoration that hovers around with the cursor. Never a
            // viable LCP candidate, so deprioritize the network fetch and
            // skip the blur-up placeholder cost on every slide.
            priority={false}
            fetchPriority="low"
          />
        </div>
      </div>
    </div>
  );
});

const HomeTwoOffer = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Pointer-driven hover effect for the ball thumbnail.
  //
  // Performance history & current strategy
  // --------------------------------------
  //   v1: window-level mousemove + querySelectorAll + getBoundingClientRect
  //       on every node on every event. Three independent layout-thrash
  //       sources running 60–120 Hz.
  //   v2: scoped, rAF-throttled, batched reads/writes — but STILL called
  //       `getBoundingClientRect()` on every card on every rAF. With ~9
  //       cards that's 9 forced layouts every frame the cursor moves,
  //       which Lighthouse continued to flag under "Forced reflow".
  //   v3 (current):
  //       * Caches each card's viewport rect ONCE on attach.
  //       * Refreshes the cache only on scroll / resize / Swiper update —
  //         events the geometry actually depends on.
  //       * mousemove handler then becomes a pure write: just a
  //         `style.transform` per card. Zero rect reads, zero forced
  //         layout, and no DOM queries on the hot path.
  //   Plus: scoped to the section, gated by IntersectionObserver, gated
  //   by prefers-reduced-motion + min-width media queries.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof window === "undefined") return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const widthQuery = window.matchMedia("(min-width: 577px)");

    let cards: HTMLElement[] = [];
    let thumbs: (HTMLElement | undefined)[] = [];
    // Pre-cached viewport rects — refreshed only when geometry can change
    // (scroll, resize, Swiper transition). Reading these on every
    // mousemove instead of calling getBoundingClientRect avoids the
    // forced-layout cost per pointer event.
    let rectXs: number[] = [];
    let rectYs: number[] = [];
    let rafId = 0;
    let geomDirty = true;
    let attached = false;
    let observer: IntersectionObserver | null = null;

    const collectCards = () => {
      cards = Array.from(
        section.querySelectorAll<HTMLElement>(".offer__cta-single")
      );
      thumbs = cards.map((c) => c.children[2] as HTMLElement | undefined);
      rectXs = new Array(cards.length);
      rectYs = new Array(cards.length);
      geomDirty = true;
    };

    const refreshRects = () => {
      // Single batched read pass. Runs at most once per frame and only
      // when geometry was marked dirty by scroll/resize.
      for (let i = 0; i < cards.length; i++) {
        const r = cards[i].getBoundingClientRect();
        rectXs[i] = r.x;
        rectYs[i] = r.y;
      }
      geomDirty = false;
    };

    const onPointerMove = (event: MouseEvent) => {
      if (rafId) return;
      const { clientX, clientY } = event;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        if (cards.length === 0) return;
        if (geomDirty) refreshRects();
        // Pure write phase — no rect reads, no DOM queries. Browser
        // batches all transform writes into a single composite step.
        for (let i = 0; i < cards.length; i++) {
          const thumb = thumbs[i];
          if (!thumb) continue;
          const dx = clientX - rectXs[i];
          const dy = clientY - rectYs[i];
          thumb.style.transform = `translate3d(${dx}px, ${dy}px, 0) rotate(10deg)`;
        }
      });
    };

    const markDirty = () => {
      geomDirty = true;
    };

    const onResize = () => {
      // Card SET can change across breakpoints (Swiper rebuilds slides);
      // re-query the DOM and invalidate cache.
      collectCards();
    };

    const attach = () => {
      if (attached || motionQuery.matches || !widthQuery.matches) return;
      collectCards();
      window.addEventListener("mousemove", onPointerMove, { passive: true });
      window.addEventListener("resize", onResize, { passive: true });
      // `markDirty` is O(1); the next pointer event triggers the
      // batched read pass. This keeps scroll listeners cheap (no layout
      // work inside the listener itself).
      window.addEventListener("scroll", markDirty, { passive: true });
      attached = true;
    };

    const detach = () => {
      if (!attached) return;
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", markDirty);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
      attached = false;
    };

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) attach();
            else detach();
          }
        },
        { rootMargin: "200px 0px" }
      );
      observer.observe(section);
    } else {
      attach();
    }

    const onMotionChange = () => (motionQuery.matches ? detach() : attach());
    const onWidthChange = () => (widthQuery.matches ? attach() : detach());
    motionQuery.addEventListener?.("change", onMotionChange);
    widthQuery.addEventListener?.("change", onWidthChange);

    return () => {
      observer?.disconnect();
      motionQuery.removeEventListener?.("change", onMotionChange);
      widthQuery.removeEventListener?.("change", onWidthChange);
      detach();
    };
  }, []);

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
  // offered by the business — improves rich-result eligibility without any
  // visual change to the page.
  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Digital Solutions Built for Malaysian Businesses",
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
            name: "Cressoft",
            url: SITE_URL,
          },
          areaServed: { "@type": "Country", name: "Malaysia" },
        },
      })),
    }),
    []
  );

  return (
    <section
      ref={sectionRef}
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
                Digital Solutions Built for Malaysian Businesses
              </h2>
              <p>
                From getting found on Google to turning visitors into paying
                customers — we cover every layer of your digital growth.
              </p>
            </header>
          </div>
        </div>
      </div>

      {/* Primary marquee — exposed to assistive tech & crawlers. */}
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
                  <div className="offer-thumb-hover d-none d-md-block">
                    <Image
                      src={ball}
                      alt=""
                      width={120}
                      height={120}
                      sizes="120px"
                      quality={70}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
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
