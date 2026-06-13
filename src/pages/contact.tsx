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
        title="Contact Quantel Solutions - Global Technology & SaaS Partner"
        description="Get in touch with Quantel Solutions, a London-headquartered technology company. Contact us via phone, WhatsApp, or email to build your SaaS product, white-label platform, or growth programme."
        pathname="/contact"
        keywords={[
          "contact Quantel Solutions",
          "technology partner contact London",
          "hire SaaS development team UK",
          "WhatsApp technology agency UK",
          "London software company",
        ]}
        image={`${SITE_URL}/images/home/banner.webp`}
        imageAlt="Contact Quantel Solutions - Global Technology & SaaS Partner"
        webPageType="ContactPage"
        breadcrumbs={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Contact Us", url: `${SITE_URL}/contact` },
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Quantel Solutions",
          url: SITE_URL,
          email: "support@quantel.uk",
          telephone: "+447879301606",
          address: {
            "@type": "PostalAddress",
            streetAddress: "20 Fenchurch Street",
            addressLocality: "London",
            addressRegion: "England",
            postalCode: "EC3M 3BY",
            addressCountry: "GB",
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ],
              opens: "10:00",
              closes: "19:00",
            },
          ],
        }}
      />
      <CmnBanner
        title="Contact Us"
        navigation="Contact Us"
        description="We're a London-headquartered technology company helping startups, scaleups,
         and enterprises across the UK, US, UAE, and beyond build SaaS products, launch
          platforms, and scale with confidence. Let's talk about your business."
      />
      <ContactMain />
    </Layout>
  );
};

export default ContactUs;
