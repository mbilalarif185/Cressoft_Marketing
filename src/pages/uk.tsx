import React from "react";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/seo/Seo";
import GeoLanding from "@/components/containers/geo/GeoLanding";
import UkContent, { UK_FAQS } from "@/components/containers/geo/UkContent";

import { SITE_URL } from "@/lib/seo";
import { getGeoRegionBySlug } from "@/data/geo";

const region = getGeoRegionBySlug("uk")!;

const UkPage = () => {
  const url = `${SITE_URL}/uk`;

  // Region-specific LocalBusiness JSON-LD (per the SEO brief).
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Quantel Solutions London",
    url,
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressRegion: "England",
      addressCountry: "GB",
    },
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    description:
      "London-based technology company providing SaaS development, AI solutions, web development and white-label software for UK businesses.",
  };

  // FAQPage JSON-LD for the UK-specific accordion, built from the same
  // UK_FAQS array the accordion renders so the two can never drift apart.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: UK_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <Layout header={2} footer={1}>
      <Seo
        title="Technology & SaaS Company London, UK | Quantel Solutions"
        description="Quantel Solutions is a London-based technology partner for UK startups and businesses. SaaS development, AI automation, web development and white label software. Headquartered at 20 Fenchurch Street, London."
        pathname="/uk"
        keywords={[
          "technology company London",
          "SaaS development UK",
          "AI solutions UK",
          "web development London",
          "white label software UK",
        ]}
        breadcrumbs={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "United Kingdom", url },
        ]}
        jsonLd={[localBusinessJsonLd, faqJsonLd]}
      />

      <GeoLanding region={region} afterStats={<UkContent />} />
    </Layout>
  );
};

export default UkPage;