import React from "react";
import Layout from "@/components/layout/Layout";
import CmnBanner from "@/components/layout/banner/CmnBanner";
import ErrorMain from "@/components/containers/ErrorMain";

const ErrorPage = () => {
  return (
    <Layout header={2} footer={5} video={0}>
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
