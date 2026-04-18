import React, { Fragment, useState } from "react";
import dynamic from "next/dynamic";
import HeaderTwo from "./header/HeaderTwo";
import Footer from "./footer/Footer";

/**
 * Animation glue (gsap + ScrollTrigger + split-type + vanilla-tilt) is loaded
 * on the client only and *after* hydration. This keeps ~135 KB of JS out of
 * the shared First Load bundle and out of the critical path entirely — the
 * page is interactive long before any tween code is fetched.
 */
const ClientAnimations = dynamic(() => import("./ClientAnimations"), {
  ssr: false,
  loading: () => null,
});

type LayoutProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
};

const Layout = ({ children, header, footer }: LayoutProps) => {
  const [openNav, setOpenNav] = useState(false);

  const handleNav = () => {
    setOpenNav(!openNav);
  };

  // Stable string (no leading/trailing whitespace) — avoids SSR/CSR className drift.
  const combinedClassName = `my-app${openNav ? " body-active" : ""}`;

  return (
    <Fragment>
      <div className={combinedClassName}>
        {header === 2 && (
          <HeaderTwo
            openNav={openNav}
            handleNav={handleNav}
            setOpenNav={setOpenNav}
          />
        )}

        <main>{children}</main>
        {footer === 1 && <Footer />}

        <ClientAnimations />
      </div>
    </Fragment>
  );
};

export default Layout;
