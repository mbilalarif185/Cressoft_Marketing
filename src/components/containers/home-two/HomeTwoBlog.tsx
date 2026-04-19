import React, { memo, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import type { BlogPostMeta } from "@/types/blog";

function formatBlogDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-MY", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

type HomeTwoBlogProps = {
  posts: BlogPostMeta[];
};

/**
 * Homepage blog slider — drives content from `content/blog` (see `@/lib/blog`).
 * Repeats entries when there are fewer than 6 so the Swiper loop stays smooth.
 */
const HomeTwoBlog = ({ posts }: HomeTwoBlogProps) => {
  const slides = useMemo(() => {
    if (posts.length === 0) return [];
    if (posts.length >= 6) return posts.slice(0, 9);
    return Array.from({ length: Math.max(6, posts.length) }, (_, i) =>
      posts[i % posts.length]
    );
  }, [posts]);

  if (slides.length === 0) {
    return null;
  }

  return (
    <section className="section blog blog-two">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section__header--secondary">
              <div className="row gaper align-items-center">
                <div className="col-12 col-lg-8">
                  <div className="section__header text-center text-lg-start mb-0">
                    <span className="sub-title">
                      News &amp; blog
                      <i className="fa-solid fa-arrow-right"></i>
                    </span>
                    <h2 className="title title-anim">
                      What&apos;s new on the blog
                    </h2>
                  </div>
                </div>
                <div className="col-12 col-lg-4">
                  <div className="slide-group justify-content-center justify-content-lg-end">
                    <button
                      aria-label="previous item"
                      className="slide-btn prev-blog"
                      type="button"
                    >
                      <i className="fa-light fa-angle-left"></i>
                    </button>
                    <button
                      aria-label="next item"
                      className="slide-btn next-blog"
                      type="button"
                    >
                      <i className="fa-light fa-angle-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="blog-two__slider-w">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          slidesPerGroup={1}
          speed={800}
          loop={true}
          roundLengths={false}
          centeredSlides={true}
          centeredSlidesBounds={false}
          modules={[Autoplay, Navigation]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            nextEl: ".next-blog",
            prevEl: ".prev-blog",
          }}
          breakpoints={{
            992: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 2,
            },
          }}
          className="blog-two__slider"
        >
          {slides.map((post, idx) => (
            <SwiperSlide key={`${post.slug}-${idx}`}>
              <div className="blog-two__slider-single topy-tilt">
                <div className="blog__single-thumb">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="blog-two__thumb-link"
                  >
                    <Image
                      src={post.cover}
                      alt=""
                      fill
                      className="blog-two__thumb-img"
                      sizes="(max-width: 420px) 100vw, 400px"
                      loading="lazy"
                      decoding="async"
                    />
                  </Link>
                </div>
                <div className="blog__single-content">
                  <h4>
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h4>
                  <div className="blog__single-meta">
                    <Link href="/blog" className="sub-title">
                      {post.category}
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                    <p>{formatBlogDate(post.date)}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default memo(HomeTwoBlog);
