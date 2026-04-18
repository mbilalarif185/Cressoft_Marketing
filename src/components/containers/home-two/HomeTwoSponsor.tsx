import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import one from "public/images/sponsor/Best-Car-Rental-Dubai-.png";
import two from "public/images/sponsor/CMS.png";
import three from "public/images/sponsor/Educrest.png";
import four from "public/images/sponsor/Golf-club.webp";
import six from "public/images/sponsor/Legendary.png";
import seven from "public/images/sponsor/roshan-consultancy.png";
import eight from "public/images/sponsor/Stla.png";
import nine from "public/images/sponsor/Top-ranked-solar.png";
import ten from "public/images/sponsor/Webcloud.png";

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
                    <Image src={one} alt="Image" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src={two} alt="Image" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src={three} alt="Image" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src={four} alt="Image" />
                  </div>
                </SwiperSlide>
               
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src={six} alt="Image" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src={seven} alt="Image" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src={eight} alt="Image" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src={nine} alt="Image" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src={ten} alt="Image" />
                  </div>
                </SwiperSlide>
                 <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src={one} alt="Image" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src={two} alt="Image" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src={three} alt="Image" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src={four} alt="Image" />
                  </div>
                </SwiperSlide>
               
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src={six} alt="Image" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src={seven} alt="Image" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src={eight} alt="Image" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src={nine} alt="Image" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="sponsor__slider-item">
                    <Image src={ten} alt="Image" />
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
