import React from "react";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/seo/Seo";
import ServiceDetailsMain from "@/components/containers/service-details/ServiceDetailsMain";
import ServiceDetailsBanner from "@/components/layout/banner/ServiceDetailsBanner";
import UxProcess from "@/components/containers/service-details/UxProcess";
import CtaTwo from "@/components/containers/service-details/CtaTwo";

import { PRIMARY_SERVICES, SITE_URL, serviceSchema } from "@/lib/seo";

const ServiceDetails = () => {
  return (
    <Layout header={2} footer={5}>
      <Seo
        title="Service Details - Quantel Solutions"
        description="Detailed view of a Quantel Solutions service - scope, deliverables, and process for startups, scaleups, and enterprises."
        pathname="/service-single"
        keywords={[
          "SaaS development service",
          "white label software service",
          "AI solutions service",
        ]}
        breadcrumbs={[
          { name: "Home", url: `${SITE_URL}/` },
          {
            name: "Services",
            url: `${SITE_URL}/marketing-solutions`,
          },
          { name: "Service Details", url: `${SITE_URL}/service-single` },
        ]}
        jsonLd={PRIMARY_SERVICES.map((s) =>
          serviceSchema({
            name: s.name,
            description: s.description,
            url: `${SITE_URL}/service-single`,
          })
        )}
      />
      <ServiceDetailsBanner />
      <ServiceDetailsMain />
      <UxProcess />
      <CtaTwo />
    </Layout>
  );
};

export default ServiceDetails;
