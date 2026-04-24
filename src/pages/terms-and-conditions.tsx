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
        title="Terms & Conditions — Cressoft Marketing Malaysia"
        description="The terms that govern your use of cressoft.net and the digital marketing services provided by Cressoft Marketing in Malaysia."
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
        description="The ground rules for using our website and engaging Cressoft Marketing for digital marketing services in Malaysia."
      />
      <TermsAndConditionsMain />
    </Layout>
  );
};

export default TermsAndConditionsPage;
