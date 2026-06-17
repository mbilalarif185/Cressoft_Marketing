import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CONTACT_WHATSAPP_MESSAGE_AGENCY,
  contactWhatsAppHref,
} from "@/constants/contact";
import thumbone from "public/images/agency/pic1.webp";
import thumbtwo from "public/images/agency/pic2.webp";
import dotlarge from "public/images/agency/dot-large.webp";

const Agency = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  // GSAP + ScrollTrigger (~75 KB combined) are loaded lazily inside the
  // effect so they never enter the page-level bundle. The IntersectionObserver
  // gate ensures they only fetch when the section is actually about to appear
  // — keeping /about-us First Load JS minimal for users who never reach this
  // section (bounce, navigation, mobile fold above).
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    let cancelled = false;
    let revert: (() => void) | null = null;

    const init = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const bars = gsap.utils.toArray<HTMLElement>(".skill-bar-single");

        bars.forEach((bar) => {
          const wrapper = bar.querySelector<HTMLElement>("[data-percent]");
          const fill = bar.querySelector<HTMLElement>(".skill-bar-percent");
          const value = bar.querySelector<HTMLElement>(".percent-value");
          if (!wrapper || !fill || !value) return;

          const percentAttr = wrapper.getAttribute("data-percent") || "0%";
          const percentNum = parseFloat(percentAttr) || 0;

          gsap.set(fill, { width: 0 });
          value.textContent = "0%";

          const tl = gsap.timeline({
            defaults: { duration: 2, ease: "power2.out" },
            scrollTrigger: {
              trigger: bar,
              start: "top 85%",
              once: true,
            },
          });

          tl.to(fill, { width: percentAttr }, 0).to(
            value,
            {
              textContent: String(percentNum),
              snap: { textContent: 1 },
              modifiers: {
                textContent: (v: string) => `${Math.round(parseFloat(v))}%`,
              },
            },
            0
          );
        });
      }, sectionRef);

      revert = () => ctx.revert();
    };

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            io.disconnect();
            init();
          }
        },
        { rootMargin: "200px 0px" }
      );
      io.observe(root);
      return () => {
        cancelled = true;
        io.disconnect();
        revert?.();
      };
    }

    init();
    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  return (
    <section ref={sectionRef} className="section agency">
      <div className="container">
        <div className="row gaper align-items-center">
          <div className="col-12 col-lg-6">
            <div className="agency__thumb">
              <Image
                src={thumbone}
                alt="Quantel Solutions global technology team"
                width={451}
                height={585}
                sizes="(max-width: 991px) 100vw, 45vw"
                priority
                fetchPriority="high"
                className="thumb-one fade-left"
              />
              <Image
                src={thumbtwo}
                alt="Product strategy discussion at Quantel Solutions"
                width={450}
                height={584}
                sizes="(max-width: 991px) 100vw, 45vw"
                loading="lazy"
                decoding="async"
                className="thumb-two fade-right"
              />
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="agency__content section__content">
              <h2 className="custom-heading">
              <span className="sub-title">
                WELCOME TO QUANTEL SOLUTIONS
                <i className="fa-solid fa-arrow-right"></i>
              </span>
              </h2>
              <h2 className="title title-anim">
                We Are Your Global Technology Partner, Based in London

              </h2>
              <div className="paragraph">
                <p>
                  At Quantel Solutions, we believe every business deserves
                  world-class technology. Headquartered in London, we are a
                  full-service technology company helping startups, scaleups,
                  and enterprises across the UK, US, UAE, and beyond build
                  digital products that scale. From SaaS platforms and
                  white-label products to enterprise AI, web and mobile apps,
                  and growth marketing, our team of specialists delivers
                  integrated digital solutions that drive real business
                  outcomes, not just vanity metrics.
                </p>
              </div>
              <div className="skill-wrap">
                <div className="skill-bar-single">
                  <div className="skill-bar-title">
                    <p className="primary-text">Web & App Development</p>
                  </div>
                  <div className="skill-bar-wrapper" data-percent="98%">
                    <div className="skill-bar">
                      <div className="skill-bar-percent">
                        <span className="percent-value"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="skill-bar-single">
                  <div className="skill-bar-title">
                    <p className="primary-text">AI Solutions</p>
                  </div>
                  <div className="skill-bar-wrapper" data-percent="95%">
                    <div className="skill-bar">
                      <div className="skill-bar-percent">
                        <span className="percent-value"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="skill-bar-single">
                  <div className="skill-bar-title">
                    <p className="primary-text">Search Engine Optimization</p>
                  </div>
                  <div className="skill-bar-wrapper" data-percent="90%">
                    <div className="skill-bar">
                      <div className="skill-bar-percent">
                        <span className="percent-value"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section__content-cta">
                <Link
                  href={contactWhatsAppHref(
                    CONTACT_WHATSAPP_MESSAGE_AGENCY
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                >
                  Let&apos;s Build Your Product
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Image
        src={dotlarge}
        alt=""
        width={80}
        height={80}
        sizes="48px"
        loading="lazy"
        decoding="async"
        className="dot-large"
        aria-hidden
      />
    </section>
  );
};

export default Agency;
