import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logoLightBg from "public/images/logo/quantel_solutions_light.png";
import { LOGO_INTRINSIC } from "@/lib/image-dimensions";
import Offcanvas from "./Offcanvas";

interface HeaderProps {
  openNav: boolean;
  setOpenNav: (value: boolean) => void;
  handleNav: () => void;
}

const HeaderTwo = ({ openNav, handleNav, setOpenNav }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const scrolledRef = useRef(false);
  const rafRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = 0;
        const next = window.scrollY > 50;
        if (next !== scrolledRef.current) {
          scrolledRef.current = next;
          setScrolled(next);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const defaultClasses = "primary-navbar cmn-nav";

  const combinedClasses = `${
    scrolled ? " navbar-active" : " "
  } ${defaultClasses}`;

  // The header sits on the light "Daylight Studio" canvas site-wide, so it
  // always uses the light-background (dark-ink) logo. The footer/offcanvas are
  // dark islands and keep the dark-background (white) mark.
  const logoSrc = logoLightBg;

  return (
    <>
      <header className="header">
        <div className={combinedClasses}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <nav className="navbar p-0">
                  <div className="navbar__logo">
                    <Link href="/" aria-label="go to home">
                      <Image
                        src={logoSrc}
                        priority
                        alt="Quantel Solutions"
                        width={LOGO_INTRINSIC.width}
                        height={LOGO_INTRINSIC.height}
                        sizes="(max-width: 768px) 180px, 220px"
                        className="navbar-logo-img"
                      />
                    </Link>
                  </div>
                  <div className="navbar__menu">
                    <ul>
                      <li className="navbar__item nav-fade">
                        <Link href="/">Home</Link>
                      </li>
                     
                      <li className="navbar__item nav-fade">
                        <Link href="/about-us">About</Link>
                      </li>
                      <li className="navbar__item navbar__item--has-children nav-fade">
                        <button

                        >
                           <Link href="/marketing-solutions">Services</Link>
                        </button>

                      </li>
                      <li className="navbar__item navbar__item--has-children nav-fade">
                        <button

                        >
                         <Link href="/success-stories">Our Work</Link>
                        </button>
                        
                      </li>
                      
                      <li className="navbar__item navbar__item--has-children nav-fade">
                        <button
                          
                        >
                          <Link href="/blog">Blog</Link>
                        </button>
                        
                      </li>
                       <li className="navbar__item nav-fade">
                        <Link href="/contact">Contact Us</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="navbar__options">
                    <div className="navbar__mobile-options d-none d-sm-flex">
                      <Link href="/contact" className="btn btn--secondary">
                        Book a Call
                      </Link>
                    </div>
                    <button
                      className="open-mobile-menu d-flex d-xl-none"
                      aria-label="toggle mobile menu"
                      onClick={handleNav}
                    >
                      <i className="fa-light fa-bars-staggered"></i>
                    </button>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Offcanvas openNav={openNav} setOpenNav={setOpenNav} />
    </>
  );
};

export default HeaderTwo;
