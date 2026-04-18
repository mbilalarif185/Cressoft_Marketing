import React from "react";
import Layout from "@/components/layout/Layout";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import ContactMain from "@/components/containers/ContactMain";

const ContactUs = () => {
  return (
    <Layout header={2} footer={1} video={0}>
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
