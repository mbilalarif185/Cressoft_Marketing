import React from "react";

/**
 * Decorative "next page" sentinel rendered at the bottom of the homepage.
 *
 * Performance note
 * ----------------
 * The previous version imported `swiper/react`, the `Autoplay` module and
 * two Swiper CSS files purely so a slider could be commented-out — the
 * markup was never rendered, but webpack still pulled the entire Swiper
 * runtime (~70 KB minified, on top of what other home-two sections already
 * load) into this chunk. PageSpeed flagged it under "Unused JavaScript".
 * Stripping the imports removes Swiper from this code path entirely.
 *
 * If the marquee is ever re-enabled, lift it into its own dynamic chunk
 * via `next/dynamic` so the Swiper cost is paid only when the marquee is
 * actually mounted.
 */
const NextPageNull = () => {
  return (
    <section className="section next-page pb-0" aria-hidden="true">
      <div className="next__text-slider-w" />
      <div className="lines d-none d-lg-flex">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </section>
  );
};

export default React.memo(NextPageNull);
