import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CONTACT_EMAIL,
  CONTACT_MAILTO_HREF,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL_HREF,
} from "@/constants/contact";
import { CRESSOFT_SOCIAL } from "@/constants/socialLinks";
import banneronethumb from "public/images/home/banner.webp";
import star from "public/images/star.png";

const HomeOneBanner = () => {
  // Defer GSAP entirely until the hero image has painted. We `await import`
  // both libraries inside the effect so they are *not* part of the page's
  // initial JS payload and never block LCP — the parallax tween adds polish
  // post-LCP on viewports >576px only.
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth <= 576) return;
    if (document.querySelectorAll(".g-ban-one").length === 0) return;

    let cancelled = false;
    let revert: (() => void) | null = null;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/dist/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".banner",
            start: "center center",
            end: "+=100%",
            scrub: true,
            pin: false,
          },
        });
        tl.set(".g-ban-one", { y: "-10%" });
        tl.to(".g-ban-one", {
          opacity: 0,
          scale: 2,
          y: "100%",
          zIndex: -1,
          duration: 2,
        });
      });
      revert = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  return (
    <>
      <section className="banner">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="banner__content">
                <h1 className="text-uppercase text-start fw-9 mb-0 title-anim">
                  Malaysia's
                  <span className="text-stroke">Trusted</span>
                  <span className="interval">
                    <i className=""></i> Digital Growth Partner
                  </span>
                </h1>
                <div className="banner__content-inner">
                  <p>
                    We help Malaysian businesses attract more customers, 
                    rank higher on Google, and build a brand that stands out 
                    through strategic digital marketing, high converting 
                    websites, and data-driven results.
                  </p>
                  <div className="cta section__content-cta">
                    <div className="single">
                      <h5 className="fw-7">12+</h5>
                      <p className="fw-5">years of experience</p>
                    </div>
                    <div className="single">
                      <h5 className="fw-7 ">25k <span >Projects Delivered</span></h5>
                      <p className="fw-5">Trusted by SMEs Across Malaysia</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Image
          src={banneronethumb}
          alt="Cressoft digital marketing agency Malaysia hero illustration"
          className="banner-one-thumb d-none d-sm-block g-ban-one"
          priority
          fetchPriority="high"
          sizes="(max-width: 992px) 80vw, 60vw"
        />
        <Image
          src={star}
          alt=""
          aria-hidden="true"
          className="star"
          loading="lazy"
        />
        <div className="banner-left-text banner-social-text d-none d-md-flex">
          <Link href={CONTACT_MAILTO_HREF}>mail : {CONTACT_EMAIL}</Link>
          <Link href={CONTACT_PHONE_TEL_HREF}>Call : {CONTACT_PHONE_DISPLAY}</Link>
        </div>
        <div className="banner-right-text banner-social-text d-none d-md-flex">
          <Link
            href={CRESSOFT_SOCIAL.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            instagram
          </Link>
          <Link
            href={CRESSOFT_SOCIAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            Linkedin
          </Link>
          <Link
            href={CRESSOFT_SOCIAL.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            facebook
          </Link>
        </div>
       
      </section>
      
    </>
  );
};

export default HomeOneBanner;
