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
import { HERO_BANNER, STAR_ICON } from "@/lib/image-dimensions";

const HomeOneBanner = () => {
  // GSAP loads after `load` + idle — avoids competing with LCP image/font.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const wideEnough = window.matchMedia("(min-width: 577px)");
    if (!wideEnough.matches) return;
    if (document.querySelectorAll(".g-ban-one").length === 0) return;

    let cancelled = false;
    let revert: (() => void) | null = null;
    let idleId: number | undefined;
    let timeoutId: number | undefined;
    let loadHandler: (() => void) | null = null;

    const runGsap = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
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
    };

    const schedule = () => {
      if (cancelled) return;
      const w = window as Window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
        cancelIdleCallback?: (id: number) => void;
      };
      if (typeof w.requestIdleCallback === "function") {
        idleId = w.requestIdleCallback(() => {
          if (!cancelled) void runGsap();
        }, { timeout: 2800 });
      } else {
        timeoutId = window.setTimeout(() => {
          if (!cancelled) void runGsap();
        }, 200);
      }
    };

    if (document.readyState === "complete") {
      schedule();
    } else {
      loadHandler = () => schedule();
      window.addEventListener("load", loadHandler);
    }

    return () => {
      cancelled = true;
      if (loadHandler) window.removeEventListener("load", loadHandler);
      const w = window as Window & { cancelIdleCallback?: (id: number) => void };
      if (idleId != null && typeof w.cancelIdleCallback === "function") {
        w.cancelIdleCallback(idleId);
      }
      if (timeoutId != null) window.clearTimeout(timeoutId);
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
          width={HERO_BANNER.width}
          height={HERO_BANNER.height}
          priority
          fetchPriority="high"
          sizes="(max-width: 576px) 0px, (max-width: 992px) 70vw, min(60vw, 720px)"
        />
        <Image
          src={star}
          alt=""
          aria-hidden="true"
          className="star"
          width={STAR_ICON.width}
          height={STAR_ICON.height}
          loading="lazy"
          decoding="async"
          sizes="48px"
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
