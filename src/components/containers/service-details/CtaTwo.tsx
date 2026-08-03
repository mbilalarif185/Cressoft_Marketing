import React from "react";
import Link from "next/link";
import {
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL_HREF,
} from "@/constants/contact";

const CtaTwo = () => {
  return (
    <section className="cta-two section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-xxl-11">
            <div className="cta-two-wrapper">
              <div className="row gaper align-items-center">
                <div className="col-12 col-lg-8">
                  <div className="cta-two__content">
                    <span>LET'S GET STARTED</span>
                    <h2 className="title-anim">Ready to Grow Your Business Online?</h2>
                    {/*
                      A phone CTA, not a section heading — it was an <h5>
                      sitting directly under the <h2> above, which put a
                      three-level jump into the document outline for no
                      semantic gain. A <p> carrying the .h5 class keeps the
                      exact same type size while leaving the heading tree
                      contiguous.
                    */}
                    <p className="type-h5">
                      <Link href={CONTACT_PHONE_TEL_HREF}>
                        call: {CONTACT_PHONE_DISPLAY}
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="col-12 col-lg-4">
                  <div className="text-start text-lg-end">
                    <Link href="contact-us" className="btn btn--tertiary">
                      start a project
                      <i className="fa-sharp fa-solid fa-arrow-up-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaTwo;
