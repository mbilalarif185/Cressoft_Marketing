import React from "react";
import Image, { type StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import one from "public/images/achievement/one.png";
import two from "public/images/achievement/two.png";
import three from "public/images/achievement/three.png";
import four from "public/images/achievement/four.png";
import five from "public/images/achievement/five.png";
function AchievementLogo({ src, label }: { src: StaticImageData; label: string }) {
  return (
    <Image
      src={src}
      alt={`Achievement: ${label}`}
      width={160}
      height={160}
      sizes="(max-width: 400px) 45vw, (max-width: 768px) 22vw, 140px"
      loading="lazy"
      decoding="async"
    />
  );
}

const OurAchievement = () => {
  return (
    <section className="section achievements">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="section__header text-center">
              <span className="sub-title">
                Achievements
                <i className="fa-solid fa-arrow-right"></i>
              </span>
              <h2 className="title title-anim">Achievements</h2>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="achievements__slider-w">
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                slidesPerGroup={1}
                speed={800}
                loop={true}
                centeredSlides={false}
                modules={[Autoplay]}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                className="achievements__slider"
                breakpoints={{
                  1200: {
                    slidesPerView: 5,
                  },
                  768: {
                    slidesPerView: 4,
                  },
                  400: {
                    slidesPerView: 2,
                  },
                }}
              >
                <SwiperSlide>
                  <div className="achievements__slider-single">
                    <AchievementLogo src={one} label="Milestone one" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="achievements__slider-single">
                    <AchievementLogo src={two} label="Milestone two" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="achievements__slider-single">
                    <AchievementLogo src={three} label="Milestone three" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="achievements__slider-single">
                    <AchievementLogo src={four} label="Milestone four" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="achievements__slider-single">
                    <AchievementLogo src={five} label="Milestone five" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="achievements__slider-single">
                    <AchievementLogo src={one} label="Milestone one" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="achievements__slider-single">
                    <AchievementLogo src={two} label="Milestone two" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="achievements__slider-single">
                    <AchievementLogo src={three} label="Milestone three" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="achievements__slider-single">
                    <AchievementLogo src={four} label="Milestone four" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="achievements__slider-single">
                    <AchievementLogo src={five} label="Milestone five" />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurAchievement;
