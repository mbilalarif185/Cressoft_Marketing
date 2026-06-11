import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import star from "public/images/testimonial/star.webp";
import thumb from "public/images/test-.webp";

type HomeTwoTestimonialProps = {
  /** Optional marquee headline shown above/below the testimonial slider. */
  marqueeText?: string;
  /**
   * Optional href the marquee text links to. Accepts internal paths
   * (e.g. "/success-stories") or fully-qualified URLs (e.g. wa.me links).
   */
  marqueeHref?: string;
};

// How many times to repeat the marquee text inside the loop. Swiper's
// `loop` mode requires at least a couple of slides to animate cleanly,
// and repeating the phrase a few times produces the seamless ticker
// effect without us having to ship duplicated JSX from every caller.
const MARQUEE_REPEAT = 6;

const testimonials = [
  {
    quote:
      "Quantel rebuilt our logistics platform as a proper multi-tenant SaaS product. Within four months we onboarded our first enterprise clients and cut manual operations dramatically. They think like product partners, not just a vendor.",
    author: "James Whitfield",
    location: "Founder, Whitfield Logistics Ltd, London",
  },
  {
    quote:
      "We launched a fully white-labelled retail platform with Quantel and went to market in record time. The AI-driven recommendations they built measurably lifted our conversion rate. A genuinely world-class team.",
    author: "Sarah Al-Mansouri",
    location: "CEO, Luminae Retail, Dubai",
  },
  {
    quote:
      "The Quantel team scaled our SaaS infrastructure and shipped automation that saved our ops team hundreds of hours a month. Professional, responsive, and they deliver exactly what they promise.",
    author: "David Chen",
    location: "CTO, PivotTech Inc., San Francisco",
  },
];

const HomeTwoTestimonial = ({
  marqueeText,
  marqueeHref,
}: HomeTwoTestimonialProps) => {
  const showMarquee = Boolean(marqueeText && marqueeText.trim());
  const isExternal = !!marqueeHref && /^(https?:)?\/\//.test(marqueeHref);

  // Pulled out so the same JSX can be rendered at the top of the section
  // without duplicating the (somewhat large) Swiper config block.
  const marquee = showMarquee ? (
    <div
      className="testimonial__text-slider testimonial__text-slider--top"
      aria-label={marqueeText}
    >
      <Swiper
        slidesPerView="auto"
        spaceBetween={30}
        speed={9000}
        loop
        allowTouchMove={false}
        modules={[Autoplay]}
        autoplay={{
          delay: 1,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        a11y={{ enabled: false }}
      >
        {Array.from({ length: MARQUEE_REPEAT }).map((_, i) => (
          <SwiperSlide key={i}>
            <div className="testimonial__text-slider-single">
              <h2>
                {marqueeHref ? (
                  isExternal ? (
                    <a
                      href={marqueeHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-hidden={i === 0 ? undefined : "true"}
                      tabIndex={i === 0 ? 0 : -1}
                    >
                      {marqueeText}
                      <i
                        className="fa-solid fa-arrow-right"
                        aria-hidden="true"
                      ></i>
                    </a>
                  ) : (
                    <Link
                      href={marqueeHref}
                      prefetch={false}
                      aria-hidden={i === 0 ? undefined : "true"}
                      tabIndex={i === 0 ? 0 : -1}
                    >
                      {marqueeText}
                      <i
                        className="fa-solid fa-arrow-right"
                        aria-hidden="true"
                      ></i>
                    </Link>
                  )
                ) : (
                  <span aria-hidden={i === 0 ? undefined : "true"}>
                    {marqueeText}
                    <i
                      className="fa-solid fa-arrow-right"
                      aria-hidden="true"
                    ></i>
                  </span>
                )}
              </h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  ) : null;

  return (
    <section
      className="section testimonial-two"
      aria-label="Client testimonials section"
    >
      {marquee}
      <div className="container">
        <div className="row gaper align-items-center">
          <div className="col-12 col-lg-5 col-xxl-4">
            <div className="testimonial-two__thumb">
              <Image
                src={thumb}
                alt="Team member with client success highlights"
                sizes="(min-width: 1400px) 420px, (min-width: 992px) 36vw, 100vw"
              />
            </div>
          </div>
          <div className="col-12 col-lg-7 col-xxl-7 offset-xxl-1">
            <div className="testimonial-two__content section__content testimonial-g-con">
              <p className="sub-title">
                testimonial
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </p>
              <h2 className="title title-anim">
                What Our Happy Clients Say
              </h2>
              <div className="quote">
                <i
                  className="fa-sharp fa-solid fa-quote-right"
                  aria-hidden="true"
                ></i>
              </div>
              <div className="testimonial-two__slider-w">
                <Swiper
                  slidesPerView={1}
                  spaceBetween={30}
                  speed={1000}
                  loop={true}
                  centeredSlides={true}
                  modules={[Autoplay]}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                    reverseDirection: false,
                  }}
                  className="testimonial-two__slider"
                  aria-label="Client testimonials carousel"
                >
                  {testimonials.map((testimonial, index) => (
                    <SwiperSlide key={`${testimonial.author}-${index}`}>
                      <article className="testimonial-two__slider-single">
                        <div className="paragraph">
                          <blockquote className="secondary-text">
                            <q>{testimonial.quote}</q>
                          </blockquote>
                        </div>
                        <div className="author-meta">
                          {/* <div className="author-meta__thumb">
                            <Image
                              src={avatar}
                              alt={`${testimonial.author} profile photo`}
                              sizes="80px"
                            />
                          </div> */}
                          <div className="author-meta__content">
                            <h3>{testimonial.author}</h3>
                            <p>{testimonial.location}</p>
                          </div>
                        </div>
                      </article>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Image src={star} alt="" className="star" aria-hidden="true" sizes="48px" />
    </section>
  );
};

export default React.memo(HomeTwoTestimonial);
