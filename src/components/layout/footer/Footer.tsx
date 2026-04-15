import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "public/images/white.png";
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_MAILTO_HREF,
  CONTACT_MAPS_PLACE_URL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL_HREF,
} from "@/constants/contact";
import { CRESSOFT_SOCIAL } from "@/constants/socialLinks";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer
      className="footer section pb-0"
      style={{ backgroundImage: "url('/images/footer/footer-bg.png')" }}
    >
      <div className="container">
        <div className="row gaper">
          <div className="col-12 col-lg-5 col-xl-6 ">
            <div className="footer__single ">
              <Link href="/" className="logo">
                <Image src={logo} alt="Image"
                  height={200}
                  width={200} />
              </Link>
               <div className="paragraph pt-3">
                <p>
                  Cressoft Marketing is a full-service digital marketing agency in Malaysia <br></br>
                  helping SMEs, startups, 
                  and growing brands build their online presence <br></br>and generate real results.
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
                <Link href="contact" className="btn btn--secondary">
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
                      <Link href="success-stories">Our Work</Link>
                  </li>
                  <li>
                    <Link href="blog">News & Blog</Link>
                  </li>
                  <li>
                    <Link href="contact">Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-2 col-xl-2">
            <div className="footer__single">
              <div className="footer__single-intro">
                <h5>Digital solutions</h5>
              </div>
              <div className="footer__single-content">
                <ul>
                  <li>
                    <Link href="marketing-solutions">SEO</Link>
                  </li>
                  <li>
                    <Link href="marketing-solutions">AI Solutions</Link>
                  </li>
                  <li>
                    <Link href="marketing-solutions">Web Development</Link>
                  </li>
                  <li>
                    <Link href="marketing-solutions">App Development</Link>
                  </li>
                  
                </ul>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-2 col-xl-2">
            <div className="footer__single">
              <div className="footer__single-intro">
                <h5>Information</h5>
              </div>
              <div className="footer__single-content">
                <ul>
                  <li>
                    <Link href="about-us">Who We Are</Link>
                  </li>
                  <li>
                    <Link href="faq">FAQs</Link>
                  </li>
                  <li>
                    <Link href="blog">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href="contact-us">Terms & Condition</Link>
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
                      <span id="copyYear">{currentYear}</span> Cressoft {" "}
                      
                       
                      . All Rights Reserved
                    </p>
                  </div>
                </div>
                <div className="col-12 col-lg-4">
                  <div className="social justify-content-center justify-content-lg-end">
                    <Link
                      href={CRESSOFT_SOCIAL.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-facebook-f"></i>
                    </Link>
                    <Link
                      href={CRESSOFT_SOCIAL.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-linkedin-in"></i>
                    </Link>
                    <Link
                      href={CRESSOFT_SOCIAL.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
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
