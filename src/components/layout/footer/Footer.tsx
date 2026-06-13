import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "public/images/logo/quantel_solutions_dark.png";
import { LOGO_INTRINSIC } from "@/lib/image-dimensions";
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_MAILTO_HREF,
  CONTACT_MAPS_PLACE_URL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL_HREF,
} from "@/constants/contact";
import { QUANTEL_SOCIAL } from "@/constants/socialLinks";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer
      className="footer section pb-0"
      // Background image moved to CSS (`.footer { background-image: url(...) }`
      // in `_footer.scss`). Inline `style={{ backgroundImage: ... }}` forces
      // React to re-allocate the style object on every render and prevents
      // the browser from deferring/lazy-fetching the asset like it does for
      // off-viewport CSS backgrounds. CSS-driven backgrounds also let the
      // browser pick `image-set()` / `content-visibility: auto` at the
      // section level for further savings.
    >
      <div className="container">
        <div className="row gaper">
          <div className="col-12 col-lg-4 col-xl-4 ">
            <div className="footer__single ">
              <Link href="/" className="logo">
                <Image
                  src={logo}
                  alt="Quantel Solutions"
                  width={LOGO_INTRINSIC.width}
                  height={LOGO_INTRINSIC.height}
                  sizes="(max-width: 768px) 200px, 260px"
                  className="footer-logo-img"
                />
              </Link>
               <div className="paragraph pt-3">
                <p>
                  Global technology &amp; digital partner for SaaS, white-label, <br></br>
                  and growth. We help startups and enterprises across the UK, US,
                  UAE, <br></br>and beyond build smarter and scale faster.
                </p>
              </div>
              <div className="footer__single-meta">
                <a
                  href={CONTACT_MAPS_PLACE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-sharp fa-solid fa-location-dot"></i>
                  {CONTACT_ADDRESS}
                </a>
                <Link href={CONTACT_MAILTO_HREF}>
                  <i className="fa-sharp fa-solid fa-envelope"></i>
                  {CONTACT_EMAIL}
                </Link>
                <br></br>
                <Link href={CONTACT_PHONE_TEL_HREF}>
                  <i className="fa-sharp fa-solid fa-phone-volume"></i>
                  {CONTACT_PHONE_DISPLAY}
                </Link>
                
              </div>
              <div className="footer__cta text-start">
                <Link href="/contact" className="btn btn--secondary">
                  book a call now
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-2 col-xl-2">
            <div className="footer__single">
              <div className="footer__single-intro">
                <h5>quick links</h5>
              </div>
              <div className="footer__single-content">
                <ul>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                      <Link href="/success-stories">Our Work</Link>
                  </li>
                  <li>
                    <Link href="/blog">News & Blog</Link>
                  </li>
                  <li>
                    <Link href="/contact">Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-2 col-xl-2">
            <div className="footer__single">
              <div className="footer__single-intro">
                <h5>Solutions</h5>
              </div>
              <div className="footer__single-content">
                <ul>
                  <li>
                    <Link href="/marketing-solutions">SaaS Development</Link>
                  </li>
                  <li>
                    <Link href="/marketing-solutions">White-Label Platforms</Link>
                  </li>
                  <li>
                    <Link href="/marketing-solutions">AI &amp; Automation</Link>
                  </li>
                  <li>
                    <Link href="/marketing-solutions">Web &amp; App Development</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-2 col-xl-2">
            <div className="footer__single">
              <div className="footer__single-intro">
                <h5>Regions</h5>
              </div>
              <div className="footer__single-content">
                <ul>
                  <li>
                    <Link href="/contact">United Kingdom</Link>
                  </li>
                  <li>
                    <Link href="/contact">United States</Link>
                  </li>
                  <li>
                    <Link href="/contact">UAE &amp; MENA</Link>
                  </li>
                  <li>
                    <Link href="/contact">Asia-Pacific</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-2 col-xl-2">
            <div className="footer__single">
              <div className="footer__single-intro">
                <h5>Company</h5>
              </div>
              <div className="footer__single-content">
                <ul>
                  <li>
                    <Link href="/about-us">About</Link>
                  </li>
                  <li>
                    <Link href="/faq">FAQs</Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href="/terms-and-conditions">Terms & Conditions</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="footer__copyright">
              <div className="row align-items-center gaper">
                <div className="col-12 col-lg-8">
                  <div className="footer__copyright-text text-center text-lg-start">
                    <p>
                      Copyright &copy;
                      <span id="copyYear">{currentYear}</span> Quantel Solutions
                      . All Rights Reserved
                    </p>
                  </div>
                </div>
                <div className="col-12 col-lg-4">
                  <div className="social justify-content-center justify-content-lg-end">
                    <Link
                      href={QUANTEL_SOCIAL.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Quantel Solutions on LinkedIn"
                    >
                      <i className="fa-brands fa-linkedin-in"></i>
                    </Link>
                    <Link
                      href={QUANTEL_SOCIAL.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Quantel Solutions on Instagram"
                    >
                      <i className="fa-brands fa-instagram"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
