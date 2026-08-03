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
              {/*
                These two numbers do two different jobs, and the original
                1200×900 got the second one wrong.

                WIDTH is layout. `.unset` clears the global `img{max-width:100%}`
                (see _global.scss), and `.award__thumb img{max-width:100%}` only
                comes back under 992px — so on desktop this image lays out at
                exactly its `width` attribute, deliberately overflowing the
                690px column to be clipped by the circular mask. Changing it
                changes the composition, so it stays 1200.

                HEIGHT is aspect ratio. The file is 945×584 (1.618:1), and the
                global `img{height:auto}` means the rendered height always
                follows that true ratio — 1200 × 584/945 = 741. Declaring 900
                told the browser to reserve a 4:3 box that then collapsed by
                159px the moment the bytes landed: a layout shift on every
                load, for nothing. 741 makes the reserved box the box we
                actually get.

                Verified against the previous build: desktop renders 1200×741
                and mobile 382×236, both byte-identical to before.

                `sizes` now states the real slot — container width minus
                Bootstrap's 2×15px gutter below lg, the fixed 1200px above it.
                The old `50vw` under-described the desktop slot by 40%, so the
                browser fetched a 750px file for a 1200px box.
              */}
              <Image
                src="/images/about-us.webp"
                alt="Quantel Solutions global technology team"
                width={1200}
                height={741}
                sizes="(max-width: 991px) calc(100vw - 30px), 1200px"
                quality={70}
                loading="lazy"
                decoding="async"
                className="unset fade-left"
              />
            </div>
          </div>
          <div className="col-12 col-lg-6 col-xxl-5 offset-xxl-1">
            <div className="award__content section__content">
              <span className="sub-title">
                Who We Are
                <i className="fa-solid fa-arrow-right"></i>
              </span>
              <h2 className="title title-anim">
                The Technology Partner Global Businesses Trust, Based in{" "}
                <span>London</span>
              </h2>
              <div className="paragraph">
                <p>
                  Quantel Solutions is a technology company headquartered in
                  London. We work with startups, scaleups, and enterprises
                  across the UK, US, UAE, and Asia-Pacific to build digital
                  products, launch SaaS platforms, and drive measurable growth.
                </p>
                <p>
                  We don&apos;t believe in one-size-fits-all packages. As the
                  SaaS development company and digital agency USA, UK, and UAE
                  businesses rely on, we tailor every solution to your industry,
                  your market, and your goals - the way a true technology
                  partner should.
                </p>
              </div>
              <div className="award__content-meta">
                <div className="single">
                  <h3 className="type-h4">2021</h3>
                  <h3 className="type-h4">Where It All Began</h3>
                  <p>Founded with a mission to help ambitious businesses grow through better technology.</p>
                </div>
                <div className="single">
                  <h3 className="type-h4">2023</h3>
                  <h3 className="type-h4">100+ Clients Served</h3>
                  <p>Expanded our team and hit a major milestone serving businesses internationally.</p>
                </div>
                <div className="single">
                  <h3 className="type-h4">2026</h3>
                  <h3 className="type-h4">Global Delivery Across 3 Continents</h3>
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
