import React, { useId, useMemo } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, FreeMode } from "swiper/modules";
import "swiper/swiper-bundle.css";
import hrone from "public/images/portfolio/lcr.png";
import hrtwo from "public/images/portfolio/mock.png";
import hrthree from "public/images/portfolio/bcr.png";
import hrfour from "public/images/portfolio/edu.png";
import hrfive from "public/images/portfolio/ilham.png";
import hrsix from "public/images/portfolio/hookah.png";

type Project = {
  title: string;
  href: string;
  image: StaticImageData;
  alt: string;
};

const PROJECTS: Project[] = [
  {
    title: " Digital Website Development",
    href: "https://legendarycarrental.ae/",
    image: hrone,
    alt: "Legendary Car Rental ",
  },
  {
    title: "Brand Identity Difference",
    href: "https://legendarycarrental.com/",
    image: hrtwo,
    alt: "Brand identity project",
  },
  {
    title: "Marketing App Solutions",
    href: "https://bestcarrentaldubai.ae/",
    image: hrthree,
    alt: "Marketing app solutions project",
  },
  {
    title: "Web Application",
    href: "https://educrestmigration.com/",
    image: hrfour,
    alt: "LMS web application project",
  },
  {
    title: "Search Engine Optimization",
    href: "https://ilhamekhizar.com/",
    image: hrfive,
    alt: "Brand identity project",
  },
  {
    title: "Digital Website Development",
    href: "https://www.hookahfuntasia.com.my/",
    image: hrsix,
    alt: "Digital Marketing",
  },
];

const ProjectMain = () => {
  const headingId = useId();

  // schema.org/ItemList JSON-LD — helps Google index portfolio entries
  // and link them to the project-single pages.
  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: PROJECTS.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: p.href,
        name: p.title,
      })),
    }),
    []
  );

  // Suffix to scope navigation classes if the component is rendered twice.
  const navSuffix = useMemo(
    () => headingId.replace(/[^a-zA-Z0-9]/g, ""),
    [headingId]
  );
  const prevClass = `prev-project-${navSuffix}`;
  const nextClass = `next-project-${navSuffix}`;

  return (
    <section
      className="section project-sl-section"
      aria-labelledby={headingId}
    >
      <h2 id={headingId} className="visually-hidden">
        Selected Projects
      </h2>

      <Swiper
        // `slidesPerView="auto"` lets each `.project-sl__single` keep its
        // CSS-defined width (360px desktop / 280px mobile) — same look as
        // the original GSAP layout, just with proper drag/swipe + arrows.
        slidesPerView="auto"
        spaceBetween={0}
        speed={700}
        loop={PROJECTS.length > 4}
        freeMode={{ enabled: true, momentum: true, momentumRatio: 0.6 }}
        modules={[Autoplay, Navigation, FreeMode]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={{ prevEl: `.${prevClass}`, nextEl: `.${nextClass}` }}
        className="project-sl"
        a11y={{
          prevSlideMessage: "Previous project",
          nextSlideMessage: "Next project",
        }}
      >
        {PROJECTS.map((project, index) => (
          <SwiperSlide key={`${project.title}-${index}`}>
            <article className="project-sl__single">
              <div className="thumb">
                <Link href={project.href} aria-label={project.title}>
                  <Image
                    src={project.image}
                    alt={project.alt}
                    placeholder="blur"
                    sizes="(min-width: 1400px) 25vw, (min-width: 992px) 33vw, (min-width: 576px) 50vw, 90vw"
                  />
                </Link>
              </div>
              <div className="content">
                <h3>
                  <Link href={project.href}>{project.title}</Link>
                </h3>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="container">
        <div className="slide-group justify-content-center mt-5">
          <button
            type="button"
            aria-label="Previous project"
            className={`slide-btn ${prevClass}`}
          >
            <i className="fa-light fa-angle-left" aria-hidden="true"></i>
          </button>
          <button
            type="button"
            aria-label="Next project"
            className={`slide-btn ${nextClass}`}
          >
            <i className="fa-light fa-angle-right" aria-hidden="true"></i>
          </button>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
};

export default ProjectMain;
