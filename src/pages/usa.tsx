import React from "react";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/seo/Seo";
import GeoLanding from "@/components/containers/geo/GeoLanding";

import { SITE_URL } from "@/lib/seo";
import { getGeoRegionBySlug } from "@/data/geo";

const region = getGeoRegionBySlug("usa")!;

const UsaPage = () => {
  const url = `${SITE_URL}/usa`;

  // Region-specific ProfessionalService JSON-LD (per the SEO brief). The US has
  // no local address, so it maps to ProfessionalService rather than
  // LocalBusiness.
  const professionalServiceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Quantel Solutions USA",
    url,
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    description:
      "Technology company serving US businesses with SaaS development, AI solutions, web development and white-label software from a London headquarters.",
  };

  return (
    <Layout header={2} footer={1}>
      <Seo
        title="Technology & SaaS Company USA | Quantel Solutions"
        description="Quantel Solutions serves US businesses with SaaS development, AI solutions, web development & white-label software. London-based global team. Book a free call."
        pathname="/usa"
        keywords={[
          "technology company USA",
          "SaaS development USA",
          "AI solutions US",
          "web development USA",
          "white label software USA",
        ]}
        breadcrumbs={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "United States", url },
        ]}
        jsonLd={professionalServiceJsonLd}
      />

      {/*
        The four flagship services link to their dedicated USA landing pages;
        every other service keeps the global /services/<slug> link.
      */}
      <GeoLanding
        region={region}
        serviceLinks={{
          "saas-development": "/usa/saas-development",
          "ai-automation": "/usa/ai-automation",
          "white-label-solutions": "/usa/white-labelling",
          "web-development": "/usa/web-development",
        }}
      />
    </Layout>
  );
};

export default UsaPage;