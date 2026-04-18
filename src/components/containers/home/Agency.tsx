import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CONTACT_WHATSAPP_MESSAGE_AGENCY,
  contactWhatsAppHref,
} from "@/constants/contact";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import thumbone from "public/images/agency/pic1.png";
import thumbtwo from "public/images/agency/pic2.png";
import star from "public/images/star.png";
import dotlarge from "public/images/agency/dot-large.png";

gsap.registerPlugin(ScrollTrigger);
const Agency = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // gsap.context scopes selectors to this section AND auto-reverts every
    // tween + ScrollTrigger on cleanup (Strict Mode / Fast Refresh safe).
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

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section agency">
      <div className="container">
        <div className="row gaper align-items-center">
          <div className="col-12 col-lg-6">
            <div className="agency__thumb">
              <Image
                src={thumbone}
                alt="Image"
                className="thumb-one fade-left"
                priority
              />
              <Image
                src={thumbtwo}
                alt="Image"
                className="thumb-two fade-right"
                priority
              />
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="agency__content section__content">
              <h2 className="custom-heading">
              <span className="sub-title">
                WELCOME TO CRESSOFT MARKETING
                <i className="fa-solid fa-arrow-right"></i>
              </span>
              </h2>
              <h2 className="title title-anim">
                We Are Your Digital Marketing Agency in Kuala Lumpur

              </h2>
              <div className="paragraph">
                <p>
                  At Cressoft Marketing, we believe every business deserves to
                  be found online. Based in the heart of Kuala Lumpur, we are a
                  full-service digital marketing agency helping SMEs, startups,
                  and growing brands across Malaysia cut through the noise and
                  connect with the right audience, at the right time, on the
                  right platform. From data-driven SEO strategies and
                  high-converting Google Ads campaigns to scroll-stopping
                  social media content and beautifully crafted websites, our
                  team of specialists delivers integrated digital solutions
                  that drive real business outcomes, not just vanity metrics.
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
                  Let's Grow Your Business
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Image src={star} alt="Image" className="star" priority />
      <Image src={dotlarge} alt="Image" className="dot-large" priority />
    </section>
  );
};

export default Agency;
