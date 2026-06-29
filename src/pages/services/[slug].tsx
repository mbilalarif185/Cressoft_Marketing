import React from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/seo/Seo";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import ServiceDetail from "@/components/containers/services/ServiceDetail";
import ServiceCta from "@/components/containers/services/ServiceCta";

import {
  SERVICE_SLUGS,
  getServiceBySlug,
  type Service,
} from "@/data/services";
import { SITE_URL, serviceSchema } from "@/lib/seo";

type ServicePageProps = {
  service: Service;
};

const ServicePage = ({ service }: ServicePageProps) => {
  const url = `${SITE_URL}/services/${service.slug}`;

  // Service JSON-LD — unique per page, pointing at this page's canonical URL.
  const serviceJsonLd = {
    ...serviceSchema({
      name: service.name,
      description: service.metaDescription,
      url,
    }),
    // Surface the concrete capabilities as an offer catalog so this page is
    // eligible for richer service results.
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.name} capabilities`,
      itemListElement: service.features.map((f) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: f.title,
          description: f.description,
        },
      })),
    },
  };

  // BreadcrumbList for this page (Home › Services › <service>).
  const breadcrumbs = [
    { name: "Home", url: `${SITE_URL}/` },
    { name: "Services", url: `${SITE_URL}/marketing-solutions` },
    { name: service.shortName, url },
  ];

  return (
    <Layout header={2} footer={1}>
      <Seo
        title={service.metaTitle}
        description={service.metaDescription}
        pathname={`/services/${service.slug}`}
        keywords={service.keywords}
        image={`${SITE_URL}/images/digital-marketing-agency.webp`}
        imageAlt={`${service.name} by Quantel Solutions`}
        breadcrumbs={breadcrumbs}
        jsonLd={serviceJsonLd}
      />

      <CmnBanner
        title={service.name}
        navigation={service.shortName}
        parent="Services"
        parentLink="/marketing-solutions"
        description={service.heroDescription}
      />

      <ServiceDetail service={service} />

      <ServiceCta service={service} />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: SERVICE_SLUGS.map((slug) => ({ params: { slug } })),
    // All service pages are known at build time; anything else is a 404.
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ServicePageProps> = async ({
  params,
}) => {
  const slug = params?.slug as string;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { notFound: true };
  }

  return { props: { service } };
};

export default ServicePage;
