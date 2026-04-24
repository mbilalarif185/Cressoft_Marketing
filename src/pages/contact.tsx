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
        description="Get in touch with Cressoft Marketing, a digital marketing agency based in Kota Damansara, Selangor. Contact us via phone, WhatsApp, or email to grow your business online."
        pathname="/contact"
        keywords={[
          "contact Cressoft Marketing",
          "digital agency contact Malaysia",
          "hire digital marketing agency Malaysia",
          "WhatsApp digital agency Malaysia",
          "Kota Damansara marketing agency",
        ]}
        image={`${SITE_URL}/images/home/banner.webp`}
        imageAlt="Contact Cressoft Marketing — Digital Agency Malaysia"
        webPageType="ContactPage"
        breadcrumbs={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Contact Us", url: `${SITE_URL}/contact` },
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Cressoft Marketing",
          url: SITE_URL,
          email: "info@cressoft.net",
          telephone: "+601128890942",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Cova Square",
            addressLocality: "Kota Damansara",
            addressRegion: "Selangor",
            addressCountry: "MY",
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
        description="We're a Malaysian digital marketing agency based in Kota Damansara,
         Selangor helping SMEs, startups, and growing brands across Malaysia get found online,
          generate leads, and scale with confidence. Let's talk about your business."
      />
      <ContactMain />
    </Layout>
  );
};

export default ContactUs;
