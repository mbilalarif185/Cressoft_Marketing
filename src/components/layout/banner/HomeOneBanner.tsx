import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CONTACT_EMAIL,
  CONTACT_MAILTO_HREF,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL_HREF,
} from "@/constants/contact";
import { CRESSOFT_SOCIAL } from "@/constants/socialLinks";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import banneronethumb from "public/images/home/banner.webp";
import star from "public/images/star.png";

gsap.registerPlugin(ScrollTrigger);
const HomeOneBanner = () => {
  const [videoActive, setVideoActive] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const device_width = window.innerWidth;
      if (
        document.querySelectorAll(".g-ban-one").length > 0 &&
        device_width > 576
      ) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".banner",
            start: "center center",
            end: "+=100%",
            scrub: true,
            pin: false,
          },
        });

        tl.set(".g-ban-one", {
          y: "-10%",
        });

        tl.to(".g-ban-one", {
          opacity: 0,
          scale: 2,
          y: "100%",
          zIndex: -1,
          duration: 2,
        });
      }
    }
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
          alt="Image"
          className="banner-one-thumb d-none d-sm-block g-ban-one"
        />
        <Image src={star} alt="Image" className="star" />
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
