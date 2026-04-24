import React from "react";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/seo/Seo";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import PrivacyPolicyMain from "@/components/containers/legal/PrivacyPolicyMain";

import { SITE_URL } from "@/lib/seo";

const PrivacyPolicyPage = () => {
  return (
    <Layout header={2} footer={1}>
      <Seo
        title="Privacy Policy — Cressoft Marketing Malaysia"
        description="How Cressoft Marketing collects, uses, and protects your personal data in line with Malaysia's Personal Data Protection Act 2010 (PDPA)."
        pathname="/privacy-policy"
        breadcrumbs={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Privacy Policy", url: `${SITE_URL}/privacy-policy` },
        ]}
      />
      <CmnBanner
        title="Privacy Policy"
        navigation="Privacy Policy"
        description="We take your privacy seriously. This page explains what data we collect, how we use it, and the choices you have under Malaysia's PDPA."
      />
      <PrivacyPolicyMain />
    </Layout>
  );
};

export default PrivacyPolicyPage;
