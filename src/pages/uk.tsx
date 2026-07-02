import React from "react";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/seo/Seo";
import GeoLanding from "@/components/containers/geo/GeoLanding";

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

  return (
    <Layout header={2} footer={1}>
      <Seo
        title="Technology & SaaS Company London, UK | Quantel Solutions"
        description="Quantel Solutions is a London-based technology company. SaaS development, AI solutions, web development & white-label software for UK businesses. Book a free call."
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
        jsonLd={localBusinessJsonLd}
      />

      <GeoLanding region={region} />
    </Layout>
  );
};

export default UkPage;