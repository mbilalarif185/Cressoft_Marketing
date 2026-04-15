import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import star from "public/images/testimonial/star.png";
import thumb from "public/images/test-.png";

// Homepage testimonial copy — edit here. If the browser still shows old text after
// saving, stop dev server, run `npm run clean`, then `npm run dev` again.
const testimonials = [
  {
    quote:
      "Cressoft transformed our online presence completely. Within 4 months, our website traffic doubled and we started getting consistent leads through Google — something we struggled with for years. Highly recommended for any Malaysian business serious about digital marketing",
    author: "Hafiz Rahman",
    location: "Founder, HR Consultancy, Kuala Lumpur",
  },
  {
    quote:
      "We hired Cressoft for our social media marketing and the results were beyond expectations. Our Instagram following grew by 300% and we saw a direct increase in walk-in customers. The team truly understands the Malaysian audience.",
    author: "Nurul Ain Yusof",
    location: "Owner, The Bloom Café, Petaling Jaya",
  },
  {
    quote:
      "The Cressoft team built our e-commerce website from scratch and handled our Google Ads. Our online sales went up 5x in the first 6 months. Professional, responsive, and they actually deliver what they promise.",
    author: "David Lim",
    location: "Director, TechGear Malaysia, Selangor",
  },
];

const HomeTwoTestimonial = () => {
  return (
    <section
      className="section testimonial-two"
      aria-label="Client testimonials section"
    >
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
                  key={testimonials.map((t) => `${t.quote}|${t.author}`).join("|||")}
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
                        <div className="author-meta author-meta--no-thumb">
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

export default HomeTwoTestimonial;
