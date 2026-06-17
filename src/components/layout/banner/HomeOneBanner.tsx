import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CONTACT_EMAIL,
  CONTACT_MAILTO_HREF,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL_HREF,
} from "@/constants/contact";
import { QUANTEL_SOCIAL } from "@/constants/socialLinks";
import banneronethumb from "public/images/quantel-solutions.webp";

const HomeOneBanner = () => {
  // GSAP loads after `load` + idle - avoids competing with LCP image/font.
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
        <div className="banner__media g-ban-one" aria-hidden="true">
          <Image
            src={banneronethumb}
            alt=""
            className="banner-one-thumb"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
          />
        </div>
        <div className="banner__overlay" aria-hidden="true" />
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="banner__content">
                <span className="banner__badge">
                  <i className="fa-solid fa-globe" aria-hidden="true"></i>
                  Global Technology Partner
                </span>
                <h1 className="text-start fw-9 mb-0">
                  Scale Your Business with
                  <span className="text-stroke"> Intelligent</span>
                  <span className="interval">
                    <i className=""></i> Digital Solutions
                  </span>
                </h1>
                <div className="banner__content-inner">
                  <p>
                    From SaaS platforms and white-label products to enterprise
                    AI and growth marketing - we help startups and enterprises
                    across the UK, US, UAE, and beyond build smarter.
                  </p>
                  <div className="banner__cta-group">
                    <Link href="/marketing-solutions" className="btn btn--primary">
                      Explore Solutions
                    </Link>
                    <Link href="/success-stories" className="btn btn--secondary">
                      View Our Work
                    </Link>
                  </div>
                  <div className="cta section__content-cta banner__stats">
                    <div className="single">
                      <h5 className="fw-7">5+</h5>
                      <p className="fw-5">Years of delivery</p>
                    </div>
                    <div className="single">
                      <h5 className="fw-7">500+</h5>
                      <p className="fw-5">Projects delivered</p>
                    </div>
                    <div className="single">
                      <h5 className="fw-7">UK · US · UAE</h5>
                      <p className="fw-5">Core markets</p>
                    </div>
                    <div className="single">
                      <h5 className="fw-7">98%</h5>
                      <p className="fw-5">Client retention</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="banner-left-text banner-social-text d-none d-md-flex">
          <Link href={CONTACT_MAILTO_HREF}>mail : {CONTACT_EMAIL}</Link>
          <Link href={CONTACT_PHONE_TEL_HREF}>Call : {CONTACT_PHONE_DISPLAY}</Link>
        </div>
        <div className="banner-right-text banner-social-text d-none d-md-flex">
          <Link
            href={QUANTEL_SOCIAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            Linkedin
          </Link>
          <Link
            href={QUANTEL_SOCIAL.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            instagram
          </Link>
        </div>
       
      </section>
      
    </>
  );
};

export default HomeOneBanner;
