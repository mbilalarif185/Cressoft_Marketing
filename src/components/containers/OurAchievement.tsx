import React, { memo } from "react";
import Image, { type StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import one from "public/images/achievement/one.webp";
import two from "public/images/achievement/two.webp";
import three from "public/images/achievement/three.webp";
import four from "public/images/achievement/four.webp";
import five from "public/images/achievement/five.webp";

// Same hand-duplication clean-up as HomeTwoSponsor: Swiper's `loop` mode
// clones slides itself, so the previously hand-duplicated 10-slide list
// is collapsed back to 5 unique entries. Result: ~50% fewer DOM nodes,
// fewer <Image> hydration calls, and a smaller HTML payload — every
// achievement icon was being shipped twice for nothing.
const ACHIEVEMENTS: Array<{ src: StaticImageData; label: string }> = [
  { src: one, label: "Milestone one" },
  { src: two, label: "Milestone two" },
  { src: three, label: "Milestone three" },
  { src: four, label: "Milestone four" },
  { src: five, label: "Milestone five" },
];

const AchievementLogo = memo(function AchievementLogo({
  src,
  label,
}: {
  src: StaticImageData;
  label: string;
}) {
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
});

const ACHIEVEMENT_BREAKPOINTS = {
  1200: { slidesPerView: 5 },
  768: { slidesPerView: 4 },
  400: { slidesPerView: 2 },
} as const;

const ACHIEVEMENT_AUTOPLAY = {
  delay: 5000,
  disableOnInteraction: false,
  pauseOnMouseEnter: true,
} as const;

const OurAchievement = () => {
  return (
    <section className="section achievements">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="section__header text-center">
              <span className="sub-title">
                Achievements
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
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
                autoplay={ACHIEVEMENT_AUTOPLAY}
                breakpoints={ACHIEVEMENT_BREAKPOINTS}
                className="achievements__slider"
              >
                {ACHIEVEMENTS.map((a) => (
                  <SwiperSlide key={a.label}>
                    <div className="achievements__slider-single">
                      <AchievementLogo src={a.src} label={a.label} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(OurAchievement);
