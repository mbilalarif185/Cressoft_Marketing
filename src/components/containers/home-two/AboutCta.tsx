import React from "react";
import Link from "next/link";

const AboutCta = () => {
  return (
    <section className="cta-s section">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div
              className="cta__wrapper"
              data-background="assets/images/cta-bg.webp"
            >
              <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-9 col-xl-8 col-xxl-9">
                  <div className="section__header text-center">
                    <h2 className="title">
                      Ready to Work With a Technology Partner That Delivers?
                    </h2>
                    <p className="custom-margin">
                      We work with a limited number of new clients each quarter. If you are building a SaaS product, need white label software or want to automate your business with AI — book a free 30-minute discovery call. No pitch. No pressure. Just an honest conversation about what you are trying to build.
                    </p>
                  </div>
                  <div className="section__header text-center">
                    <Link href="/contact">
              <span className="sub-title">
                Book a Free Discovery Call
                <i className="fa-solid fa-arrow-right"></i>
              </span>
              </Link>
              </div>
                  {/* <div className="footer__single-form">
                    <form action="#" method="post">
                      <div className="input-email">
                        <input
                          type="email"
                          name="subscribe-news"
                          id="subscribeNews"
                          placeholder="Enter Your Email"
                          required
                        />
                        <button type="submit" className="subscribe">
                          <i className="fa-sharp fa-solid fa-paper-plane"></i>
                        </button>
                      </div>
                    </form>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCta;
