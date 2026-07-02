import React from "react";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/seo/Seo";
import GeoLanding from "@/components/containers/geo/GeoLanding";

import { SITE_URL } from "@/lib/seo";
import { getGeoRegionBySlug } from "@/data/geo";

const region = getGeoRegionBySlug("uae")!;

const UaePage = () => {
  const url = `${SITE_URL}/uae`;

  // Region-specific LocalBusiness JSON-LD (per the SEO brief).
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Quantel Solutions Dubai",
    url,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    areaServed: {
      "@type": "Country",
      name: "United Arab Emirates",
    },
    description:
      "Technology company serving Dubai and UAE businesses with SaaS development, AI solutions, web development and white-label software.",
  };

  return (
    <Layout header={2} footer={1}>
      <Seo
        title="Technology & SaaS Company Dubai, UAE | Quantel Solutions"
        description="Quantel Solutions serves businesses across Dubai and the UAE. SaaS development, AI solutions, web development & white-label software. Book a free call."
        pathname="/uae"
        keywords={[
          "technology company Dubai",
          "SaaS development UAE",
          "AI solutions Dubai",
          "web development UAE",
          "white label software Dubai",
        ]}
        breadcrumbs={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "UAE & Middle East", url },
        ]}
        jsonLd={localBusinessJsonLd}
      />

      <GeoLanding region={region} />
    </Layout>
  );
};

export default UaePage;