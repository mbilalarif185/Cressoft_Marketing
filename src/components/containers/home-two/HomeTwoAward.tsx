import React from "react";
import Image from "next/image";
import Link from "next/link";

const HomeTwoAward = () => {
  return (
    <section className="section award">
      <div className="container">
        <div className="row gaper align-items-center">
          <div className="col-12 col-lg-6">
            <div className="award__thumb dir-rtl">
              <Image
                src="/images/about-us.webp"
                alt="Quantel Solutions global technology team"
                width={1200}
                height={900}
                sizes="(max-width: 991px) 100vw, 50vw"
                loading="lazy"
                decoding="async"
                className="unset fade-left"
              />
            </div>
          </div>
          <div className="col-12 col-lg-6 col-xxl-5 offset-xxl-1">
            <div className="award__content section__content">
              <span className="sub-title">
                Who We Are?
                <i className="fa-solid fa-arrow-right"></i>
              </span>
              <h2 className="title title-anim">
                Your Global Technology Partner, Based in <span>London</span>
              </h2>
              <div className="paragraph">
                <p>
                  Quantel Solutions is a full-service technology company
                  headquartered in London. We work with startups, scaleups,
                  and enterprises across the UK, US, UAE, and Asia-Pacific to
                  build digital products, launch SaaS platforms, and drive
                  measurable growth.
                </p>
                <p>
                  We don&apos;t believe in one-size-fits-all packages. Every
                  solution we craft is tailored to your industry, your market,
                  and your goals - engineered to scale across borders.
                </p>
              </div>
              <div className="award__content-meta">
                <div className="single">
                  <h4>2021</h4>
                  <h4>Where It All Began</h4>
                  <p>Founded with a mission to help ambitious businesses grow through better technology.</p>
                </div>
                <div className="single">
                  <h4>2023</h4>
                  <h4>100+ Clients Served</h4>
                  <p>Expanded our team and hit a major milestone serving businesses internationally.</p>
                </div>
                <div className="single">
                  <h4>2026</h4>
                  <h4>Global Delivery Across 3 Continents</h4>
                  <p>Scaled delivery across the UK, US, and UAE with a 5-star client reputation.</p>
                </div>
              </div>
              <div className="section__content-cta">
                <Link href="/about-us" className="btn btn--primary">
                  Know More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Image
        src="/images/agency/dot-large.webp"
        alt=""
        width={80}
        height={80}
        sizes="48px"
        loading="lazy"
        decoding="async"
        className="dot"
        aria-hidden
      />
      <Image
        src="/images/agency/dot-large.webp"
        alt=""
        width={80}
        height={80}
        sizes="48px"
        loading="lazy"
        decoding="async"
        className="dot-two"
        aria-hidden
      />
    </section>
  );
};

export default HomeTwoAward;
