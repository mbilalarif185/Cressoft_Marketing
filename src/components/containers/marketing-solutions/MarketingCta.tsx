import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL_HREF,
  contactWhatsAppHref,
  CONTACT_WHATSAPP_MESSAGE_AGENCY,
} from "@/constants/contact";

type SlotStatus = "open" | "limited" | "open-quiet";

type Slot = {
  day: string;
  date: string;
  time: string;
  status: SlotStatus;
};

// Rotating set of times so the three visible slots aren't all on the same hour.
const SLOT_TIMES = ["10:30 AM", "2:00 PM", "4:30 PM"] as const;
// Fixed status pattern per row: featured / urgency / quiet — keeps the visual
// hierarchy of the card intact regardless of which weekday is rendered.
const SLOT_STATUSES: SlotStatus[] = ["open", "limited", "open-quiet"];

/**
 * Compute the next `count` working-day slots starting from `from`. Saturdays
 * are working days for us — only Sundays are skipped.
 */
function computeSlots(count: number, from: Date = new Date()): Slot[] {
  const slots: Slot[] = [];
  const cursor = new Date(from);
  cursor.setHours(0, 0, 0, 0);
  cursor.setDate(cursor.getDate() + 1); // start tomorrow, never today

  let i = 0;
  // Hard cap on the loop just in case (~3 weeks of look-ahead is plenty).
  let safety = 21;
  while (slots.length < count && safety-- > 0) {
    const dow = cursor.getDay();
    if (dow !== 0) {
      slots.push({
        day: cursor.toLocaleDateString("en-US", { weekday: "short" }),
        date: cursor.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
        }),
        time: SLOT_TIMES[i % SLOT_TIMES.length],
        status: SLOT_STATUSES[i % SLOT_STATUSES.length],
      });
      i++;
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  return slots;
}

// Server-rendered placeholder slots. Identical between server and first client
// render (so React's hydration check passes), then replaced on mount with the
// real upcoming dates via `useEffect`.
const PLACEHOLDER_SLOTS: Slot[] = SLOT_TIMES.map((time, i) => ({
  day: "—",
  date: "Loading",
  time,
  status: SLOT_STATUSES[i],
}));

const AGENDA = [
  "Senior strategist · Not a sales rep or junior exec",
  "3 quick wins for the next 30 days",
  "90-day Plan · Actionable Roadmap, Yours to keep",
];

const TRUST = [
  { icon: "fa-solid fa-shield-check", label: "100% free" },
  { icon: "fa-solid fa-clock", label: "30 minutes" },
  { icon: "fa-solid fa-ban", label: "No Sales Pitch" },
];

const MarketingCta = () => {
  const whatsAppHref = useMemo(
    () => contactWhatsAppHref(CONTACT_WHATSAPP_MESSAGE_AGENCY),
    []
  );

  // Render placeholder slots on the server / first client paint (so SSR HTML
  // matches and we avoid hydration warnings), then swap in real upcoming
  // weekday slots after mount. Recomputes once per session — fresh every
  // page load.
  const [slots, setSlots] = useState<Slot[]>(PLACEHOLDER_SLOTS);

  useEffect(() => {
    setSlots(computeSlots(3));
  }, []);

  return (
    <section
      className="section marketing-cta"
      aria-labelledby="marketing-cta-title"
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-xxl-11">
            <div className="marketing-cta__panel">
              {/* Decorative glow + gradient border (purely visual) */}
              <span className="marketing-cta__glow" aria-hidden="true" />

              <div className="marketing-cta__layout">
                {/* ============== LEFT: pitch + actions ============== */}
                <div className="marketing-cta__pitch">
                  <span className="marketing-cta__pill">
                    <span className="marketing-cta__dot" aria-hidden="true" />
                    Free 30-Minute Strategy Audit

                  </span>

                  {/*
                    Do NOT add `title-anim` here. SplitType (run globally in
                    Layout.tsx) shreds the contents of any .title-anim element
                    into per-character spans React doesn't own. Because this
                    heading also contains a React-managed child (the
                    `marketing-cta__highlight` span on "growth"), the next
                    re-render — HMR edit, slot state update, anything —
                    throws `Failed to execute 'removeChild' on 'Node'`.
                    The shimmer animation on the highlight is pure CSS and
                    still plays.
                  */}
                  <h2
                    id="marketing-cta-title"
                    className="marketing-cta__title"
                  >
                    Find out Exactly Where Your Next Wave of Growth is Coming From
                  </h2>

                  <p className="marketing-cta__lead">
                    Book a no-obligation call with a senior Cressoft strategist.
                     We'll audit your current marketing, identify your three 
                     biggest quick-win opportunities, and send you a
                     written 90 day growth plan within 24 hours completely free, no strings attached.
                  </p>

                  <div className="marketing-cta__actions">
                    <Link
                      href="/contact"
                      className="marketing-cta__btn-primary"
                    >
                      <span>Book My free audit</span>
                      <i
                        className="fa-sharp fa-solid fa-arrow-right"
                        aria-hidden="true"
                      ></i>
                    </Link>
                    <Link
                      href={whatsAppHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="marketing-cta__btn-secondary"
                      aria-label="Message us on WhatsApp"
                    >
                      <i
                        className="fa-brands fa-whatsapp"
                        aria-hidden="true"
                      ></i>
                      WhatsApp US Now
                    </Link>
                  </div>

                  <ul
                    className="marketing-cta__trust"
                    aria-label="Reassurance"
                  >
                    {TRUST.map((item) => (
                      <li key={item.label}>
                        <i className={item.icon} aria-hidden="true"></i>
                        {item.label}
                      </li>
                    ))}
                    <li>
                      <Link
                        href={CONTACT_PHONE_TEL_HREF}
                        className="marketing-cta__phone"
                        aria-label={`Call us at ${CONTACT_PHONE_DISPLAY}`}
                      >
                        <i
                          className="fa-solid fa-phone"
                          aria-hidden="true"
                        ></i>
                        {CONTACT_PHONE_DISPLAY}
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* ============== RIGHT: booking preview card ============== */}
                <aside
                  className="marketing-cta__preview"
                  aria-label="What your audit call looks like"
                >
                  <div className="marketing-cta__preview-card">
                    <div className="marketing-cta__preview-header">
                      <span
                        className="marketing-cta__preview-icon"
                        aria-hidden="true"
                      >
                        <i className="fa-solid fa-calendar-check"></i>
                      </span>
                      <div>
                        <strong>Your Audit Call</strong>
                        <small>Next 3 Slots </small>
                      </div>
                    </div>

                    <ul
                      className="marketing-cta__slots"
                      aria-label="Available time slots this week"
                    >
                      {slots.map((slot, i) => (
                        <li
                          key={`${slot.day}-${slot.time}`}
                          className={
                            "marketing-cta__slot" +
                            (i === 0 ? " marketing-cta__slot--featured" : "")
                          }
                        >
                          <span className="marketing-cta__slot-day">
                            <strong>{slot.day}</strong>
                            <small>{slot.date}</small>
                          </span>
                          <span className="marketing-cta__slot-time">
                            {slot.time}
                          </span>
                          <span
                            className={`marketing-cta__slot-status marketing-cta__slot-status--${slot.status}`}
                          >
                            {slot.status === "limited"
                              ? "1 left"
                              : "Available"}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="marketing-cta__preview-divider" aria-hidden="true" />

                    <div className="marketing-cta__agenda">
                      <span className="marketing-cta__agenda-heading">
                        On the call
                      </span>
                      <ul>
                        {AGENDA.map((item) => (
                          <li key={item}>
                            <i
                              className="fa-solid fa-circle-check"
                              aria-hidden="true"
                            ></i>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketingCta;
