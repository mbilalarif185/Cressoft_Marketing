import React, { useId, useMemo, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";

import stepDiscover from "public/images/work/discover.webp";
import stepWireframes from "public/images/work/wire.webp";
import stepDesign from "public/images/work/ui.webp";
import stepDevelopment from "public/images/work/development.webp";

type Step = {
  /** Two-digit progress label (e.g. "25", "50"). */
  percent: string;
  title: string;
  /** Short caption shown next to the preview image. */
  caption: string;
  /** Preview image displayed in the always-visible panel below the cards. */
  image: StaticImageData;
  /** Alt text — left empty for decorative previews (preferred). */
  imageAlt?: string;
  /** Extra column class for the staircase offset (`work-two`, `work-three`…). */
  offsetClass?: string;
};

const STEPS: Step[] = [
  {
    percent: "25",
    title: "Discover & Strategy",
    caption: "We audit your market position, competitors, and target segments across Malaysia's diverse demographics.",
    image: stepDiscover,
  },
  {
    percent: "50",
    title: "Wireframes & User Flows",
    caption: "We design bilingual (BM/EN) user journeys tailored for Malaysian consumer behaviour and mobile-first usage.",
    image: stepWireframes,
    offsetClass: "work-two",
  },
  {
    percent: "75",
    title: "Hi-Fidelity Design",
    caption: "Pixel-perfect interfaces aligned with your brand — optimised for Malaysian platforms like Shopee, Lazada, and local news portals.",
    image: stepDesign,
    offsetClass: "work-three",
  },
  {
    percent: "100",
    title: "Development Phase",
    caption: "Built for speed, PDPA compliance, and Malaysian payment ecosystems — DuitNow, FPX, Boost, and more.",
    image: stepDevelopment,
    offsetClass: "work-four",
  },
];

const WorkStepsProject = () => {
  const headingId = useId();
  const sectionRef = useRef<HTMLElement | null>(null);
  const previewId = useId();

  const [activeStep, setActiveStep] = useState(0);

  const activePreview = STEPS[activeStep] ?? STEPS[0];

  // schema.org/HowTo — these are ordered process steps, perfect for the
  // HowTo rich-result type on Google search.
  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How We Work With Malaysian Businesses",
      step: STEPS.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.title,
      })),
    }),
    []
  );

  return (
    <>
      <section
        ref={sectionRef}
        className="section work-steps work-alt fade-wrapper"
        aria-labelledby={headingId}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section__header--secondary">
                <div className="row gaper align-items-center">
                  <div className="col-12 col-lg-5 col-xxl-5">
                    <div className="section__header text-center text-lg-start mb-0">
                      <span className="sub-title">
                        working steps
                        <i
                          className="fa-solid fa-arrow-right"
                          aria-hidden="true"
                        ></i>
                      </span>
                      <h2 id={headingId} className="title title-anim">
                        How We Work With Malaysian Businesses
                      </h2>
                    </div>
                  </div>
                  <div className="col-12 col-lg-7 col-xxl-5 offset-xxl-2">
                    <div className="text-center text-lg-start">
                      <p>
                        Every Malaysian market is unique — whether you&apos;re
                        targeting urban millennials in KL, B40 communities in
                        East Malaysia, or corporate procurement teams in
                        Putrajaya. Our process is built to understand your
                        audience first, then design solutions that convert.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ol className="row work-steps__list" aria-label="Working steps">
            {STEPS.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <li
                  key={step.percent}
                  className={`col-12 col-sm-6 col-xl-3 work-steps__item ${
                    step.offsetClass ?? ""
                  }`}
                >
                  <button
                    type="button"
                    className={
                      "work-steps__single fade-top" +
                      (isActive ? " work-steps__single-active" : "")
                    }
                    onMouseEnter={() => setActiveStep(index)}
                    onFocus={() => setActiveStep(index)}
                    onClick={() => setActiveStep(index)}
                    aria-pressed={isActive}
                    aria-controls={previewId}
                    aria-label={`Show preview for step ${index + 1}: ${step.title}`}
                  >
                    <span aria-hidden="true">
                      {step.percent}
                      <br />%
                    </span>
                    <h3 className="work-steps__title">
                      {step.title}
                      <i
                        className="fa-regular fa-image work-steps__hint"
                        aria-hidden="true"
                      ></i>
                    </h3>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Always-visible preview panel — updates as the user hovers / taps a step.
              Keeping the image in one consistent location makes the interaction
              obvious and avoids the off-screen clipping issues of the old
              cursor-following thumbnails. */}
          <div
            id={previewId}
            className="work-steps__preview"
            role="region"
            aria-live="polite"
            aria-label="Step preview"
          >
            <div className="work-steps__preview-frame">
              {STEPS.map((step, index) => (
                <Image
                  key={step.percent}
                  src={step.image}
                  alt={
                    activeStep === index
                      ? step.imageAlt ?? `Preview for ${step.title}`
                      : ""
                  }
                  fill
                  sizes="(max-width: 768px) 100vw, 720px"
                  placeholder="blur"
                  priority={index === 0}
                  className={
                    "work-steps__preview-image" +
                    (activeStep === index
                      ? " work-steps__preview-image--active"
                      : "")
                  }
                  style={{ objectFit: "cover" }}
                />
              ))}
            </div>
            <div className="work-steps__preview-meta">
              <span className="work-steps__preview-step" aria-hidden="true">
                Step {activeStep + 1} / {STEPS.length}
              </span>
              <strong className="work-steps__preview-title">
                {activePreview.title}
              </strong>
              <p className="work-steps__preview-caption">
                {activePreview.caption}
              </p>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
};

export default WorkStepsProject;
