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
                alt="Cressoft digital marketing team and office in Malaysia"
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
                Your Local Digital Marketing Partner in <span>Malaysia</span>
              </h2>
              <div className="paragraph">
                <p>
                 We're Cressoft Marketing a full-service digital agency 
                 based in Kota Damansara, Kuala Lumpur. 
                 We work with Malaysian SMEs, startups, and
                  growing brands to build their digital presence 
                  and generate real, measurable results.
                </p>
                <p>
                  We don't believe in one size fits all packages. 
                  Every strategy we craft is tailored to your industry, 
                  your market, and your goals because we 
                  understand the Malaysian business landscape inside out.
                </p>
              </div>
              <div className="award__content-meta">
                <div className="single">
                  <h4>2014</h4>
                  <h4>Where It All Began</h4>
                  <p>Launched in Kota Damansara with a mission to help Malaysian businesses grow online.</p>
                </div>
                <div className="single">
                  <h4>2018</h4>
                  <h4>100+ Clients Served</h4>
                  <p>Expanded our team and hit a major milestone serving businesses across Malaysia.</p>
                </div>
                <div className="single">
                  <h4>2022</h4>
                  <h4>Top-Rated Agency in KL</h4>
                  <p>Earned 5-star reputation across Google, Facebook, and industry directories.</p>
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
        src="/images/star.webp"
        alt=""
        width={120}
        height={120}
        sizes="80px"
        loading="lazy"
        decoding="async"
        className="star"
        aria-hidden
      />
      <Image
        src="/images/star.webp"
        alt=""
        width={120}
        height={120}
        sizes="80px"
        loading="lazy"
        decoding="async"
        className="star-two"
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
