import React from "react";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/seo/Seo";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import ContactMain from "@/components/containers/ContactMain";

import { SITE_URL } from "@/lib/seo";

const ContactUs = () => {
  return (
    <Layout header={2} footer={1}>
      <Seo
        title="Contact Cressoft — Digital Marketing Agency in Malaysia"
        description="Talk to Cressoft Marketing — a digital marketing agency in Kota Damansara, Selangor helping Malaysian SMEs and startups grow with SEO, Google Ads, and social media marketing."
        pathname="/contact"
        keywords={[
          "contact digital marketing agency Malaysia",
          "marketing agency Kota Damansara",
        ]}
        breadcrumbs={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Contact", url: `${SITE_URL}/contact` },
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Cressoft Marketing",
          url: `${SITE_URL}/contact`,
          inLanguage: "en-MY",
          mainEntity: { "@id": `${SITE_URL}/#organization` },
        }}
      />
      <CmnBanner
        title="Contact Us"
        navigation="Contact Us"
        description="We're a Malaysian digital marketing agency based in Kota Damansara,
         Selangor helping SMEs, startups, and growing brands across Malaysia get found online,
          generate leads, and scale with confidence. Let's talk about your business."
      />
      <ContactMain />
    </Layout>
  );
};

export default ContactUs;
