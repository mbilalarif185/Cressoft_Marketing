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
        <div className="row gaper">
          <div className="col-12 col-lg-5">
            <div className="agency__thumb">
              <div className="agency__thumb-media">
                <Image
                  src={thumbone}
                  alt="Quantel Solutions global technology team"
                  width={451}
                  height={585}
                  sizes="(max-width: 991px) 86vw, 38vw"
                  priority
                  fetchPriority="high"
                  className="thumb-one fade-left"
                />
                <Image
                  src={thumbtwo}
                  alt="Product strategy discussion at Quantel Solutions"
                  width={450}
                  height={584}
                  sizes="(max-width: 991px) 44vw, 18vw"
                  loading="lazy"
                  decoding="async"
                  className="thumb-two fade-right"
                />
                <div className="agency__stamp" aria-hidden="true">
                  <span className="agency__stamp-est">Est. 2021</span>
                  <span className="agency__stamp-place">London &middot; EC3M</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-7">
            <div className="agency__content section__content">
              <h2 className="custom-heading">
              <span className="sub-title">
                OUR STORY
                <i className="fa-solid fa-arrow-right"></i>
              </span>
              </h2>
              <h2 className="title title-anim">
                Built in London. Trusted Across the UK, USA and UAE.
              </h2>
              <div className="paragraph">
                <p>
                  Quantel Solutions was founded in London in 2021 with a
                  straightforward mission: give ambitious businesses access to
                  the kind of technology partner that used to be reserved for
                  companies with enterprise budgets and in-house engineering
                  teams.
                </p>
                <p>
                  In the early days, we worked with a handful of UK startups
                  who had big ideas but no clear path to building them. We
                  helped them move from concept to working product — SaaS
                  platforms, white-label systems, web applications — and stayed
                  with them through launch, growth and beyond.
                </p>
                <p>
                  That model worked. Clients came back for the next project.
                  They referred us to other founders. Word spread across the UK
                  market and then into the UAE and United States.
                </p>
                <p>
                  Today, Quantel Solutions is a team of 50+ specialists —
                  developers, designers, AI engineers, digital marketers and
                  product strategists — operating across three global markets
                  from our London headquarters at 20 Fenchurch Street.
                </p>
                <p>
                  We have delivered 500+ projects with a 98% client retention
                  rate. We work with pre-revenue startups building their first
                  SaaS MVP and established enterprises scaling their technology
                  infrastructure. We work with agencies who white-label our
                  services and businesses who need AI automation to replace
                  manual workflows.
                </p>
                <p>
                  What has not changed since 2021 is the commitment that
                  started us: every client gets a partner who genuinely cares
                  about the outcome — not just the delivery.
                </p>
              </div>
              <div className="skill-wrap">
                <div className="skill-bar-single">
                  <div className="skill-bar-title">
                    <p className="primary-text">SaaS Development</p>
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
                    <p className="primary-text">AI Automation</p>
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
                    <p className="primary-text">White Label Software</p>
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
