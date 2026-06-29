import React from "react";
import Image from "next/image";
import Link from "next/link";
import eleven from "public/images/portfolio/eleven.webp";
import twelve from "public/images/portfolio/twelve.webp";
import thirteen from "public/images/portfolio/thirteen.webp";
import fourteen from "public/images/portfolio/fourteen.webp";
import fifteen from "public/images/portfolio/fifteen.webp";
import sixteen from "public/images/portfolio/sixteen.webp";
import seventeen from "public/images/portfolio/seventeen.webp";
import eighteen from "public/images/portfolio/eighteen.webp";

const PortfolioMain = () => {
  return (
    <section className="section portfolio-m fade-wrapper">
      <div className="container">
        {/* SEO/a11y: supplies the H2 level between the page H1 ("Portfolio
            Gallery" from CmnBanner) and the H3 project titles, so the heading
            outline doesn't skip from H1 to H3. */}
        <h2 className="visually-hidden">Quantel Solutions portfolio projects</h2>
        <div className="row gaper">
          <div className="col-12 col-lg-6">
            <div className="portfolio-m__single topy-tilt fade-top">
              <div className="thumb">
                <Link href="/success-stories">
                  <Image src={eleven} alt="LMS web application project delivered by Quantel Solutions" />
                </Link>
              </div>
              <div className="content">
                <div className="tr">
                  <Link href="/success-stories">
                    <i className="icon-arrow-top-right"></i>
                  </Link>
                </div>
                <h3 className="light-title-lg">
                  <Link href="/success-stories">LMS web application</Link>
                </h3>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="portfolio-m__single topy-tilt fade-top">
              <div className="thumb">
                <Link href="/success-stories">
                  <Image src={twelve} alt="LMS web application project delivered by Quantel Solutions" />
                </Link>
              </div>
              <div className="content">
                <div className="tr">
                  <Link href="/success-stories">
                    <i className="icon-arrow-top-right"></i>
                  </Link>
                </div>
                <h3 className="light-title-lg">
                  <Link href="/success-stories">LMS web application</Link>
                </h3>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 col-xxl-3">
            <div className="portfolio-m__single topy-tilt fade-top">
              <div className="thumb">
                <Link href="/success-stories">
                  <Image src={fifteen} alt="LMS web application project delivered by Quantel Solutions" />
                </Link>
              </div>
              <div className="content">
                <div className="tr">
                  <Link href="/success-stories">
                    <i className="icon-arrow-top-right"></i>
                  </Link>
                </div>
                <h3 className="light-title-lg">
                  <Link href="/success-stories">LMS web application</Link>
                </h3>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 col-xxl-3">
            <div className="portfolio-m__single topy-tilt fade-top">
              <div className="thumb">
                <Link href="/success-stories">
                  <Image src={sixteen} alt="LMS web application project delivered by Quantel Solutions" />
                </Link>
              </div>
              <div className="content">
                <div className="tr">
                  <Link href="/success-stories">
                    <i className="icon-arrow-top-right"></i>
                  </Link>
                </div>
                <h3 className="light-title-lg">
                  <Link href="/success-stories">LMS web application</Link>
                </h3>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 col-xxl-3">
            <div className="portfolio-m__single topy-tilt fade-top">
              <div className="thumb">
                <Link href="/success-stories">
                  <Image src={seventeen} alt="LMS web application project delivered by Quantel Solutions" />
                </Link>
              </div>
              <div className="content">
                <div className="tr">
                  <Link href="/success-stories">
                    <i className="icon-arrow-top-right"></i>
                  </Link>
                </div>
                <h3 className="light-title-lg">
                  <Link href="/success-stories">LMS web application</Link>
                </h3>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 col-xxl-3">
            <div className="portfolio-m__single topy-tilt fade-top">
              <div className="thumb">
                <Link href="/success-stories">
                  <Image src={eighteen} alt="LMS web application project delivered by Quantel Solutions" />
                </Link>
              </div>
              <div className="content">
                <div className="tr">
                  <Link href="/success-stories">
                    <i className="icon-arrow-top-right"></i>
                  </Link>
                </div>
                <h3 className="light-title-lg">
                  <Link href="/success-stories">LMS web application</Link>
                </h3>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="portfolio-m__single topy-tilt fade-top">
              <div className="thumb">
                <Link href="/success-stories">
                  <Image src={thirteen} alt="LMS web application project delivered by Quantel Solutions" />
                </Link>
              </div>
              <div className="content">
                <div className="tr">
                  <Link href="/success-stories">
                    <i className="icon-arrow-top-right"></i>
                  </Link>
                </div>
                <h3 className="light-title-lg">
                  <Link href="/success-stories">LMS web application</Link>
                </h3>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="portfolio-m__single topy-tilt fade-top">
              <div className="thumb">
                <Link href="/success-stories">
                  <Image src={fourteen} alt="LMS web application project delivered by Quantel Solutions" />
                </Link>
              </div>
              <div className="content">
                <div className="tr">
                  <Link href="/success-stories">
                    <i className="icon-arrow-top-right"></i>
                  </Link>
                </div>
                <h3 className="light-title-lg">
                  <Link href="/success-stories">LMS web application</Link>
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="section__content-cta text-center">
              <button className="btn btn--secondary">Load More..</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioMain;
