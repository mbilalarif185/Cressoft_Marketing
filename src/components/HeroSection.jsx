"use client";
// HeroSection.jsx — Quantel Solutions
// -----------------------------------------------------------------------------
// Full-width, white/light hero with a subtle aerial-London video behind an 85%
// white wash, a live "projects delivering" ticker, a stats row, and a partner
// marquee.
//
// STYLING lives in SCSS, not Tailwind: this project is SCSS-based (no Tailwind
// configured), so all visual rules are in
//   src/styles/sections/_hero-section.scss   (imported from main.scss)
// and the markup below just carries semantic `qs-hero__*` / `qs-partners__*`
// class names. To restyle, edit that partial — not this file.
//
// EDITING GUIDE — copy lives in the *_DATA consts so you can change wording
// without touching markup. Swap VIDEO_SRC / POSTER_SRC for your own assets.
// -----------------------------------------------------------------------------

import { useEffect, useState } from "react";

/* ----------------------------- Swappable assets ---------------------------- */
// Replace with your own muted aerial London/UK loop (MP4/WebM). Keep it short
// (8–15s) and well-compressed — it sits under an 85% white wash so heavy detail
// is wasted bandwidth. POSTER shows instantly while the video buffers.
// faststart build: the `moov` atom is at the front of the file, so the browser
// can begin playback after the first bytes instead of downloading the whole
// clip first (the original /london.mp4 had moov at the end → ~10s blank wait
// before the video appeared in production). Regenerate with
// `node scripts/faststart-video.js` after replacing the source video.
const VIDEO_SRC = "/london-faststart.mp4"; // swap for your own aerial loop
const POSTER_SRC = "/images/home/banner.webp"; // existing asset as a fallback

/* -------------------------------- Content data ----------------------------- */
const TRUST = [
  "500+ projects delivered",
  "98% client retention rate",
  "5+ years of delivery",
  "UK · USA · UAE coverage",
];

// Live ticker messages — cycled one at a time. `ago` is shown as-is (these are
// illustrative social proof, not real timestamps).
const FEED = [
  {
    client: "TechStart London",
    ago: "now",
    text: "SaaS platform ready — launching next week 🚀",
  },
  {
    client: "Dubai Ventures",
    ago: "2m",
    text: "AI dashboard delivered. Client loves it ✅",
  },
  {
    client: "NYC FinTech Co",
    ago: "5m",
    text: "White-label CRM — going live today 🎉",
  },
];

/* -------------------------------- Component -------------------------------- */
export default function HeroSection() {
  // Live ticker: advance one message every 3s.
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % FEED.length), 3000);
    return () => clearInterval(id);
  }, []);

  const msg = FEED[active];

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="qs-hero">
        {/* --- Background video + 85% white wash (decorative) --- */}
        <div className="qs-hero__bg" aria-hidden="true">
          <video
            className="qs-hero__video"
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          {/* The wash keeps everything readable on white while motion shows through */}
          <div className="qs-hero__wash" />
          {/* Faint brand tint in the top-right ties it to the Quantel palette */}
          <div className="qs-hero__tint" />
        </div>

        {/* --- Hero content --- */}
        <div className="qs-hero__inner">
          <div className="qs-hero__grid">
            {/* LEFT: pitch */}
            <div className="qs-hero__content">
              {/* Eyebrow pill */}
              <span className="qs-hero__eyebrow">
                🌍 Global Technology Partner
                <span className="qs-hero__eyebrow-sep">·</span> UK
                <span className="qs-hero__eyebrow-sep">·</span> USA
                <span className="qs-hero__eyebrow-sep">·</span> UAE
              </span>

              {/* H1 — leads with the core SaaS/AI/Web product positioning,
                  keeping the accent-span design for the "scale" clause. */}
              <h1 className="qs-hero__title">
                We Build Your SaaS, AI &amp; Web Products
                <span className="qs-hero__title-accent">
                  {" "}
                  — and Scale Them Globally.
                </span>
              </h1>

              {/* Subheadline — full-service technology company positioning. */}
              <p className="qs-hero__sub">
                Quantel Solutions is a full-service technology company
                headquartered in London. We help startups and enterprises
                across the UK, USA and UAE build SaaS platforms, white-label
                products, and AI-powered solutions — fully delivered for you.
              </p>

              {/* CTAs */}
              <div className="qs-hero__actions">
                <a href="/contact" className="qs-hero__cta-primary">
                  Book a free call
                  <span className="qs-hero__arrow" aria-hidden="true">
                    →
                  </span>
                </a>
                <a href="/success-stories" className="qs-hero__cta-secondary">
                  View our work
                </a>
              </div>

              {/* Trust bullets */}
              <ul className="qs-hero__trust">
                {TRUST.map((item) => (
                  <li key={item} className="qs-hero__trust-item">
                    <svg
                      className="qs-hero__check"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.1 3.1 6.8-6.8a1 1 0 011.4 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT: live social-proof widget (hidden on mobile via SCSS) */}
            <div className="qs-hero__aside">
              <div className="qs-hero__widget">
                {/* Widget header */}
                <div className="qs-hero__widget-head">
                  <span className="qs-hero__widget-title">Quantel Projects</span>
                  <span className="qs-hero__status">
                    <span className="qs-hero__dot" />
                    online · delivering
                  </span>
                </div>

                {/* Cycling message (decorative — hidden from screen readers) */}
                <div className="qs-hero__feed" aria-hidden="true">
                  <div key={active} className="qs-hero__msg">
                    <span className="qs-hero__avatar">
                      {msg.client.slice(0, 2).toUpperCase()}
                    </span>
                    <div className="qs-hero__msg-body">
                      <div className="qs-hero__msg-top">
                        <strong className="qs-hero__msg-name">{msg.client}</strong>
                        <span className="qs-hero__msg-ago">{msg.ago}</span>
                      </div>
                      <p className="qs-hero__msg-text">{msg.text}</p>
                    </div>
                  </div>

                  {/* Progress dots mirror which message is showing */}
                  <div className="qs-hero__dots">
                    {FEED.map((_, i) => (
                      <span
                        key={i}
                        className={`qs-hero__dot-prog${
                          i === active ? " is-active" : ""
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Footer counter */}
                <div className="qs-hero__widget-foot">
                  <span className="qs-hero__counter">
                    <span aria-hidden="true">↑</span>
                    +12 projects delivered this month
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
