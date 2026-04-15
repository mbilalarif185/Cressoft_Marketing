import React, { useCallback, useMemo, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import one from "public/images/portfolio/lcr.png";
import two from "public/images/portfolio/mock.png";
import three from "public/images/portfolio/bcr.png";
import four from "public/images/portfolio/edu.png";
import five from "public/images/portfolio/ilham.png";
import six from "public/images/portfolio/hookah.png";

type PortfolioCategory = "design" | "development" | "technology";

type FilterId = "*" | `.${PortfolioCategory}`;

type FilterTab = {
  id: FilterId;
  step: string;
  label: string;
  ariaLabel: string;
};

const FILTER_TABS: FilterTab[] = [
  {
    id: "*",
    step: "01",
    label: "All",
    ariaLabel: "Show all portfolio categories",
  },
  {
    id: ".design",
    step: "02",
    label: "Design",
    ariaLabel: "Filter portfolio by design work",
  },
  {
    id: ".development",
    step: "03",
    label: "Development",
    ariaLabel: "Filter portfolio by development work",
  },
  {
    id: ".technology",
    step: "04",
    label: "Technology",
    ariaLabel: "Filter portfolio by technology work",
  },
];

type PortfolioItem = {
  id: string;
  /** One or more categories — item shows when any listed category matches the active filter. */
  categories: PortfolioCategory[];
  image: StaticImageData;
  alt: string;
  /** Destination when the project image is clicked (internal page or full URL). */
  href: string;
  isActiveTile?: boolean;
};

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "p-1",
    categories: ["technology"],
    image: one,
    alt: "Technology and digital marketing portfolio project preview",
    href: "https://legendarycarrental.ae/",
    isActiveTile: true,
  },
  {
    id: "p-2",
    categories: ["design", "technology"],
    image: two,
    alt: "Brand and web design portfolio project preview",
    href: "https://legendarycarrental.com/",
  },
  {
    id: "p-3",
    categories: ["development"],
    image: three,
    alt: "Web development portfolio project preview",
    href: "https://bestcarrentaldubai.ae/",
  },
  {
    id: "p-4",
    categories: ["technology"],
    image: four,
    alt: "Technology solutions portfolio project preview",
    href: "https://educrestmigration.com/",
  },
  {
    id: "p-5",
    categories: ["design"],
    image: five,
    alt: "Creative design portfolio project preview",
    href: "https://ilhamekhizar.com/",
  },
  {
    id: "p-6",
    categories: ["development"],
    image: six,
    alt: "Additional development portfolio project preview",
    href: "https://www.hookahfuntasia.com.my/",
  },
];

/** Marquee slide count matches original layout (7 slides). */
const MARQUEE_SLIDE_COUNT = 7;

const srOnlyHeading: React.CSSProperties = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};

function isItemVisibleForFilter(
  activeFilter: FilterId,
  categories: PortfolioCategory[]
) {
  if (activeFilter === "*") return true;
  return categories.some((c) => activeFilter === `.${c}`);
}

const PortfolioGridCard = React.memo(function PortfolioGridCard({
  item,
  activeFilter,
}: {
  item: PortfolioItem;
  activeFilter: FilterId;
}) {
  const visible = isItemVisibleForFilter(activeFilter, item.categories);
  const categoryClasses = item.categories.join(" ");
  const colClass = `col-12 col-md-6 col-xl-4 filter-item-space grid-item-main ${categoryClasses}`;
  const visibilityClass = visible ? "" : "hidden";

  const articleClass =
    "portfolio__single topy-tilt fade-top" +
    (item.isActiveTile ? " portfolio__single-active" : "");

  return (
    <div className={`${colClass} ${visibilityClass}`.trim()}>
      <article className={articleClass}>
        <Link
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View project — ${item.alt} (opens in new tab)`}
        >
          <Image
            src={item.image}
            alt={item.alt}
            width={600}
            height={450}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      </article>
    </div>
  );
});

const HomeTwoPortfolio = () => {
  const [activeFilter, setActiveFilter] = useState<FilterId>("*");

  const onFilterClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const next = e.currentTarget.dataset.filter as FilterId | undefined;
    if (next) setActiveFilter(next);
  }, []);

  const marqueeSlides = useMemo(
    () =>
      Array.from({ length: MARQUEE_SLIDE_COUNT }, (_, index) => ({
        key: `marquee-${index}`,
        useStroke: index % 2 === 1,
      })),
    []
  );

  return (
    <section
      className="section portfolio portfolio-two portfolio-filter fade-wrapper"
      aria-labelledby="home-two-portfolio-heading"
    >
      <h2 id="home-two-portfolio-heading" style={srOnlyHeading}>
        Featured portfolio and case studies
      </h2>

      <div className="portfolio__text-slider-w">
        <Swiper
          slidesPerView="auto"
          spaceBetween={40}
          speed={5000}
          loop
          centeredSlides
          modules={[Autoplay]}
          autoplay={{
            delay: 1,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            reverseDirection: false,
          }}
          className="portfolio__text-slider"
        >
          {marqueeSlides.map(({ key, useStroke }) => (
            <SwiperSlide key={key}>
              <div className="portfolio__text-slider-single">
                <p className={`h1${useStroke ? " str" : ""}`}>
                  <Link href="/portfolio">
                    digital portfolio
                    <i className="fa-sharp fa-solid fa-arrow-down-right" aria-hidden />
                  </Link>
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-6 col-xl-4 text-center">
            <nav aria-label="Portfolio categories">
              <div className="portfolio-two__filter-btn section__header g-ind">
                {FILTER_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    data-filter={tab.id}
                    aria-pressed={activeFilter === tab.id}
                    aria-label={tab.ariaLabel}
                    className={activeFilter === tab.id ? "active" : ""}
                    onClick={onFilterClick}
                  >
                    <span>{tab.step}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </div>

        <div className="row masonry-grid">
          {PORTFOLIO_ITEMS.map((item) => (
            <PortfolioGridCard
              key={item.id}
              item={item}
              activeFilter={activeFilter}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeTwoPortfolio;
