import React, { memo, useMemo } from "react";
import Link from "next/link";
import Head from "next/head";
import { SITE_URL } from "@/lib/seo";

/**
 * "Roadmap ledger" services section.
 *
 * The old version was a decorative Swiper double-marquee of giant service
 * names — moving links, clipped text, and 01–10 numbering that encoded
 * nothing. This version takes the header's own claim ("we cover every layer
 * of your digital roadmap") literally: the ten services are grouped into the
 * three layers a product actually moves through, in order, connected by a
 * vertical gradient spine. Static HTML — no Swiper runtime in this chunk,
 * every service is a crawlable, keyboard-focusable row link.
 */

type LayerService = {
  title: string;
  slug: string;
  /** One-line promise, distilled from the service's copy in data/services.ts. */
  promise: string;
};

type Layer = {
  key: string;
  /** "01" | "02" | "03" — a real sequence: design/build → launch → grow. */
  index: string;
  title: string;
  /** One sentence saying what this layer of the roadmap is for. */
  hint: string;
  services: LayerService[];
};

const LAYERS: Layer[] = [
  {
    key: "build",
    index: "01",
    title: "Design & Build",
    hint: "Product engineering from first wireframe to production.",
    services: [
      {
        title: "SaaS Development",
        slug: "saas-development",
        promise: "Multi-tenant platforms built to grow from first customer to thousandth.",
      },
      {
        title: "Web Development",
        slug: "web-development",
        promise: "Fast, SEO-ready websites and web apps engineered to convert.",
      },
      {
        title: "Mobile App Development",
        slug: "mobile-app-development",
        promise: "iOS and Android from one codebase, launched to both stores.",
      },
      {
        title: "UI / UX Design",
        slug: "ui-ux-design",
        promise: "Research-led interfaces that feel effortless and earn trust.",
      },
    ],
  },
  {
    key: "launch",
    index: "02",
    title: "Launch & Operate",
    hint: "Ready-to-run platforms and back-office systems, live under your brand in weeks.",
    services: [
      {
        title: "White-Label Platforms",
        slug: "white-label-solutions",
        promise: "Proven CRM, ERP and commerce products shipped under your brand in weeks.",
      },
      {
        title: "Ecommerce Solutions",
        slug: "ecommerce-solutions",
        promise: "Shopify, WooCommerce and custom storefronts engineered to sell.",
      },
      {
        title: "ERP Solutions",
        slug: "erp-solutions",
        promise: "Finance, inventory and operations connected into one source of truth.",
      },
    ],
  },
  {
    key: "grow",
    index: "03",
    title: "Grow & Automate",
    hint: "The marketing and AI layer that compounds after launch.",
    services: [
      {
        title: "Search Engine Optimization",
        slug: "seo",
        promise: "Technical SEO, content and links that compound month after month.",
      },
      {
        title: "Social Media Marketing",
        slug: "social-media-marketing",
        promise: "Strategy, creative and paid campaigns that turn attention into pipeline.",
      },
      {
        title: "AI Solutions",
        slug: "ai-automation",
        promise: "Copilots, chatbots and workflow automation with measurable ROI.",
      },
    ],
  },
];

const serviceHref = (slug: string) => `/services/${slug}`;

const HomeTwoOffer = () => {
  // Schema.org ItemList helps Google understand this is a list of services
  // offered by the business - improves rich-result eligibility. Order follows
  // the on-page roadmap grouping.
  const jsonLd = useMemo(() => {
    const flat = LAYERS.flatMap((l) => l.services);
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "End-to-end technology services for global businesses",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: flat.length,
      itemListElement: flat.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          name: s.title,
          description: s.promise,
          url: `${SITE_URL}${serviceHref(s.slug)}`,
          provider: {
            "@type": "Organization",
            name: "Quantel Solutions",
            url: SITE_URL,
          },
          areaServed: { "@type": "Country", name: "United Kingdom" },
        },
      })),
    };
  }, []);

  return (
    <section className="section offer-stack" aria-labelledby="offer-stack-heading">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          key="offer-stack-jsonld"
        />
      </Head>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <header className="section__header text-center">
              <span className="sub-title">
                What We Offer
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </span>
              <h2 id="offer-stack-heading" className="title title-anim">
                End-to-end technology services for global businesses
              </h2>
              <p>
                From SaaS, web, and mobile development to AI automation and
                growth marketing - our technology services cover every layer
                of your digital roadmap.
              </p>
            </header>
          </div>
        </div>

        <div className="offer-stack__grid">
          {LAYERS.map((layer) => (
            <div className="offer-stack__layer" key={layer.key}>
              <div className="offer-stack__rail">
                <div className="offer-stack__rail-inner">
                  <span className="offer-stack__node" aria-hidden="true"></span>
                  <span className="offer-stack__index" aria-hidden="true">
                    {layer.index}
                  </span>
                  <h3 className="offer-stack__label">{layer.title}</h3>
                  <p className="offer-stack__hint">{layer.hint}</p>
                </div>
              </div>

              <ul className="offer-stack__rows">
                {layer.services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={serviceHref(s.slug)}
                      prefetch={false}
                      className="offer-stack__row"
                      aria-label={`Learn more about our ${s.title} services`}
                    >
                      <span className="offer-stack__name">{s.title}</span>
                      <span className="offer-stack__promise">{s.promise}</span>
                      <span className="offer-stack__arrow" aria-hidden="true">
                        <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(HomeTwoOffer);
