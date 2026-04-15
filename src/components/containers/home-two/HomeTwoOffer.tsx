import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import ball from "public/images/ball.png";

const HomeTwoOffer = () => {
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const caseStudyItems = document.querySelectorAll(".offer__cta-single");
      const deviceWidth = window.innerWidth;

      if (deviceWidth > 576) {
        caseStudyItems.forEach((item) => {
          const contentBox = item.getBoundingClientRect();
          const dx = event.clientX - contentBox.x;
          const dy = event.clientY - contentBox.y;
          const thirdChild = item.children[2] as HTMLElement;
          thirdChild.style.transform = `translate(${dx}px, ${dy}px) rotate(10deg)`;
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="section offer-two">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="section__header text-center">
              <span className="sub-title">
                what we offer
                <i className="fa-solid fa-arrow-right"></i>
              </span>
              <h2 className="title title-anim">Digital Solutions Built for Malaysian Businesses</h2>
              <br></br>
              <p>From getting found on Google to turning visitors into paying customers — we cover every layer of your digital growth.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="offer-two__slider-w" dir="rtl">
        <Swiper
          slidesPerView="auto"
          spaceBetween={30}
          speed={13000}
          loop={true}
          centeredSlides={true}
          modules={[Autoplay]}
          autoplay={{
            delay: 1,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            reverseDirection: true,
          }}
          className="offer-two__slider"
        >
          <SwiperSlide>
            <div className="offer-two__slider-single offer__cta">
              <div className="offer__cta-single">
                <span className="sub-title">
                  01
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
                <h2>
                  <Link href="marketing-solutions">UI / UX Design</Link>
                </h2>
                <div className="offer-thumb-hover d-none d-md-block">
                  <Image src={ball} alt="Image" />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="offer-two__slider-single offer__cta">
              <div className="offer__cta-single">
                <span className="sub-title">
                  02
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
                <h2>
                  <Link href="marketing-solutions">Web Development</Link>
                </h2>
                <div className="offer-thumb-hover d-none d-md-block">
                  <Image src={ball} alt="Image" />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="offer-two__slider-single offer__cta">
              <div className="offer__cta-single">
                <span className="sub-title">
                  03
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
                <h2>
                  <Link href="marketing-solutions">ERP Solutions</Link>
                </h2>
                <div className="offer-thumb-hover d-none d-md-block">
                  <Image src={ball} alt="Image" />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="offer-two__slider-single offer__cta">
              <div className="offer__cta-single">
                <span className="sub-title">
                  04
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
                <h2>
                  <Link href="marketing-solutions">Social Media Marketing</Link>
                </h2>
                <div className="offer-thumb-hover d-none d-md-block">
                  <Image src={ball} alt="Image" />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="offer-two__slider-single offer__cta">
              <div className="offer__cta-single">
                <span className="sub-title">
                  05
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
                <h2>
                  <Link href="marketing-solutions">Mobile App Development</Link>
                </h2>
                <div className="offer-thumb-hover d-none d-md-block">
                  <Image src={ball} alt="Image" />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="offer-two__slider-single offer__cta">
              <div className="offer__cta-single">
                <span className="sub-title">
                  06
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
                <h2>
                  <Link href="marketing-solutions">Custom Solutions</Link>
                </h2>
                <div className="offer-thumb-hover d-none d-md-block">
                  <Image src={ball} alt="Image" />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="offer-two__slider-single offer__cta">
              <div className="offer__cta-single">
                <span className="sub-title">
                  07
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
                <h2>
                  <Link href="marketing-solutions">Ecommerce Solutions</Link>
                </h2>
                <div className="offer-thumb-hover d-none d-md-block">
                  <Image src={ball} alt="Image" />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="offer-two__slider-single offer__cta">
              <div className="offer__cta-single">
                <span className="sub-title">
                  08
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
                <h2>
                  <Link href="marketing-solutions">Search Engine Optimization</Link>
                </h2>
                <div className="offer-thumb-hover d-none d-md-block">
                  <Image src={ball} alt="Image" />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="offer-two__slider-single offer__cta">
              <div className="offer__cta-single">
                <span className="sub-title">
                  05
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
                <h2>
                  <Link href="marketing-solutions">AI Solutions</Link>
                </h2>
                <div className="offer-thumb-hover d-none d-md-block">
                  <Image src={ball} alt="Image" />
                </div>
              </div>
            </div>
          </SwiperSlide>
          
        </Swiper>
      </div>
      <div className="offer-two__slider-rtl-w">
        <Swiper
          slidesPerView="auto"
          spaceBetween={30}
          speed={13000}
          loop={true}
          centeredSlides={true}
          modules={[Autoplay]}
          autoplay={{
            delay: 1,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            reverseDirection: true,
          }}
          className="offer-two__slider"
        >
          <SwiperSlide>
            <div className="offer-two__slider-single offer__cta">
              <div className="offer__cta-single">
                <span className="sub-title">
                  01
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
                <h2>
                  <Link href="marketing-solutions">UI / UX Design</Link>
                </h2>
                <div className="offer-thumb-hover d-none d-md-block">
                  <Image src={ball} alt="Image" />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="offer-two__slider-single offer__cta">
              <div className="offer__cta-single">
                <span className="sub-title">
                  02
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
                <h2>
                  <Link href="marketing-solutions">Web Development</Link>
                </h2>
                <div className="offer-thumb-hover d-none d-md-block">
                  <Image src={ball} alt="Image" />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="offer-two__slider-single offer__cta">
              <div className="offer__cta-single">
                <span className="sub-title">
                  03
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
                <h2>
                  <Link href="marketing-solutions">ERP Solutions</Link>
                </h2>
                <div className="offer-thumb-hover d-none d-md-block">
                  <Image src={ball} alt="Image" />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="offer-two__slider-single offer__cta">
              <div className="offer__cta-single">
                <span className="sub-title">
                  04
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
                <h2>
                  <Link href="marketing-solutions">Social Media Marketing</Link>
                </h2>
                <div className="offer-thumb-hover d-none d-md-block">
                  <Image src={ball} alt="Image" />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="offer-two__slider-single offer__cta">
              <div className="offer__cta-single">
                <span className="sub-title">
                  05
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
                <h2>
                  <Link href="marketing-solutions">Mobile App Development</Link>
                </h2>
                <div className="offer-thumb-hover d-none d-md-block">
                  <Image src={ball} alt="Image" />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="offer-two__slider-single offer__cta">
              <div className="offer__cta-single">
                <span className="sub-title">
                  06
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
                <h2>
                  <Link href="marketing-solutions">Custom Solutions</Link>
                </h2>
                <div className="offer-thumb-hover d-none d-md-block">
                  <Image src={ball} alt="Image" />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="offer-two__slider-single offer__cta">
              <div className="offer__cta-single">
                <span className="sub-title">
                  07
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
                <h2>
                  <Link href="marketing-solutions">Ecommerce Solutions</Link>
                </h2>
                <div className="offer-thumb-hover d-none d-md-block">
                  <Image src={ball} alt="Image" />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="offer-two__slider-single offer__cta">
              <div className="offer__cta-single">
                <span className="sub-title">
                  08
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
                <h2>
                  <Link href="marketing-solutions">Search Engine Optimization</Link>
                </h2>
                <div className="offer-thumb-hover d-none d-md-block">
                  <Image src={ball} alt="Image" />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="offer-two__slider-single offer__cta">
              <div className="offer__cta-single">
                <span className="sub-title">
                  05
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
                <h2>
                  <Link href="marketing-solutions">AI Solutions</Link>
                </h2>
                <div className="offer-thumb-hover d-none d-md-block">
                  <Image src={ball} alt="Image" />
                </div>
              </div>
            </div>
          </SwiperSlide>
          
        </Swiper>
      </div>
    </section>
  );
};

export default HomeTwoOffer;
