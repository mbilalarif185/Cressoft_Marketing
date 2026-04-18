import React from "react";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/seo/Seo";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import ErrorMain from "@/components/containers/ErrorMain";

const ErrorPage = () => {
  return (
    <Layout header={2} footer={5}>
      <Seo
        title="Page Not Found"
        description="The page you are looking for may have been moved or removed. Use the navigation or return home to keep exploring Cressoft Marketing."
        pathname="/404"
        noindex
      />
      <CmnBanner
        title="Error"
        navigation="Error"
        description="The page you are looking for may have been moved or removed. Use the navigation or return home to keep exploring our site."
      />
      <ErrorMain />
    </Layout>
  );
};

export default ErrorPage;
