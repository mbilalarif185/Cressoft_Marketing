import React from "react";
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
function SponsorLogo({ src, label }: { src: StaticImageData; label: string }) {
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
}

const HomeTwoSponsor = () => {
  return (
    <div className="sponsor section liner bg-white">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="section__header text-center">
              <span className="sub-title mb-0">
                TRUSTED BY STARTUPS
                <i className="fa-solid fa-arrow-right"></i>
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
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                breakpoints={{
                  1400: {
                    slidesPerView: 6,
                  },
                  1200: {
                    slidesPerView: 4,
                  },
                  992: {
                    slidesPerView: 3,
                  },
                  576: {
                    slidesPerView: 2,
                  },
                }}
                className="sponsor__slider"
              >
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <SponsorLogo src={one} label="Best Car Rental Dubai" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <SponsorLogo src={two} label="CMS" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <SponsorLogo src={three} label="Educrest" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <SponsorLogo src={four} label="Golf club" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <SponsorLogo src={six} label="Legendary" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <SponsorLogo src={seven} label="Roshan Consultancy" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <SponsorLogo src={eight} label="Stla" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <SponsorLogo src={nine} label="Top ranked solar" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <SponsorLogo src={ten} label="Webcloud" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <SponsorLogo src={one} label="Best Car Rental Dubai" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <SponsorLogo src={two} label="CMS" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <SponsorLogo src={three} label="Educrest" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <SponsorLogo src={four} label="Golf club" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <SponsorLogo src={six} label="Legendary" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <SponsorLogo src={seven} label="Roshan Consultancy" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <SponsorLogo src={eight} label="Stla" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <SponsorLogo src={nine} label="Top ranked solar" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <SponsorLogo src={ten} label="Webcloud" />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTwoSponsor;
