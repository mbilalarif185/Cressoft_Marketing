import React from "react";
import Link from "next/link";

interface BannerProps {
  title?: any;
  navigation?: any;
  parent?: any;
  parentLink?: any;
  /** Intro paragraph shown beside the title; omit to hide the text column. */
  description?: string;
}

const CmnBanner = ({
  title,
  navigation,
  parent,
  parentLink,
  description,
}: BannerProps) => {
  return (
    <>
      <section
        className="cmn-banner bg-img"
        style={{ backgroundImage: "url('/images/banner/cmn-banner-bg.png')" }}
      >
        <div className="container">
          <div className="row gaper align-items-center">
            <div
              className={
                description
                  ? "col-12 col-lg-5 col-xl-7"
                  : "col-12 col-lg-10 col-xl-8"
              }
            >
              <div className="text-center text-lg-start">
                <h1 className="title title-anim">{title}</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link href="/">
                        <i className="fa-solid fa-house"></i>
                        Home
                      </Link>
                    </li>
                    {parent && (
                      <li className="breadcrumb-item">
                        <Link href={parentLink}>{parent}</Link>
                      </li>
                    )}
                    <li className="breadcrumb-item active" aria-current="page">
                      {navigation}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            {description ? (
              <div className="col-12 col-lg-7 col-xl-5">
                <div className="text-center text-lg-start">
                  <p className="primary-text">{description}</p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
};

export default CmnBanner;
