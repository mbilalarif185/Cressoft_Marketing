import React, { memo } from "react";
import Image, { type StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import one from "public/images/sponsor/Best-Car-Rental-Dubai-.webp";
import two from "public/images/sponsor/CMS.webp";
import three from "public/images/sponsor/Educrest.webp";
import four from "public/images/sponsor/Golf-club.webp";
import six from "public/images/sponsor/Legendary.webp";
import seven from "public/images/sponsor/roshan-consultancy.webp";
import eight from "public/images/sponsor/Stla.webp";
import nine from "public/images/sponsor/Top-ranked-solar.webp";
import ten from "public/images/sponsor/Webcloud.webp";

// Single source of truth — previously each logo was rendered TWICE in
// the JSX (17 SwiperSlides instead of 9) "to fill the loop". Swiper's
// own `loop` mode already clones slides internally as needed, so the
// hand-duplication added 9 extra DOM nodes + 9 extra <Image> instances
// per page load for zero visual benefit. Removing them shrinks the
// home-two DOM, the rendered HTML payload, and the slide-update work
// Swiper performs on every transition.
const SPONSORS: Array<{ src: StaticImageData; label: string }> = [
  { src: one, label: "Best Car Rental Dubai" },
  { src: two, label: "CMS" },
  { src: three, label: "Educrest" },
  { src: four, label: "Golf club" },
  { src: six, label: "Legendary" },
  { src: seven, label: "Roshan Consultancy" },
  { src: eight, label: "Stla" },
  { src: nine, label: "Top ranked solar" },
  { src: ten, label: "Webcloud" },
];

const SponsorLogo = memo(function SponsorLogo({
  src,
  label,
}: {
  src: StaticImageData;
  label: string;
}) {
  return (
    <Image
      src={src}
      alt={`Client logo: ${label}`}
      width={220}
      height={100}
      sizes="(max-width: 576px) 50vw, (max-width: 1200px) 22vw, 16vw"
      loading="lazy"
      decoding="async"
    />
  );
});

const SPONSOR_BREAKPOINTS = {
  1400: { slidesPerView: 6 },
  1200: { slidesPerView: 4 },
  992: { slidesPerView: 3 },
  576: { slidesPerView: 2 },
} as const;

const SPONSOR_AUTOPLAY = {
  delay: 3000,
  disableOnInteraction: false,
  pauseOnMouseEnter: true,
} as const;

const HomeTwoSponsor = () => {
  return (
    <div className="sponsor section liner bg-white">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="section__header text-center">
              <span className="sub-title mb-0">
                TRUSTED BY STARTUPS
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </span>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="sponsor__slider-w">
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                slidesPerGroup={1}
                speed={1200}
                loop={true}
                roundLengths={true}
                centeredSlides={true}
                centeredSlidesBounds={false}
                modules={[Autoplay]}
                autoplay={SPONSOR_AUTOPLAY}
                breakpoints={SPONSOR_BREAKPOINTS}
                className="sponsor__slider"
              >
                {SPONSORS.map((s) => (
                  <SwiperSlide key={s.label}>
                    <div className="sponsor__slider-item">
                      <SponsorLogo src={s.src} label={s.label} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(HomeTwoSponsor);
