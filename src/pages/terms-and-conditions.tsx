import React from "react";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/seo/Seo";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import TermsAndConditionsMain from "@/components/containers/legal/TermsAndConditionsMain";

import { SITE_URL } from "@/lib/seo";

const TermsAndConditionsPage = () => {
  return (
    <Layout header={2} footer={1}>
      <Seo
        title="Terms & Conditions — Quantel Solutions"
        description="The terms that govern your use of quantel.uk and the technology services provided by Quantel Solutions."
        pathname="/terms-and-conditions"
        breadcrumbs={[
          { name: "Home", url: `${SITE_URL}/` },
          {
            name: "Terms & Conditions",
            url: `${SITE_URL}/terms-and-conditions`,
          },
        ]}
      />
      <CmnBanner
        title="Terms & Conditions"
        navigation="Terms & Conditions"
        description="The ground rules for using our website and engaging Quantel Solutions for technology and digital services."
      />
      <TermsAndConditionsMain />
    </Layout>
  );
};

export default TermsAndConditionsPage;
