import { useEffect } from "react";

/**
 * ClientAnimations
 * ----------------------------------------------------------------------------
 * Layout-wide GSAP / ScrollTrigger / SplitType / VanillaTilt initialisation,
 * lifted out of `Layout.tsx` so the heavy animation libs can be loaded via
 * `next/dynamic({ ssr: false })`. This keeps gsap (~75 KB), ScrollTrigger
 * (~35 KB), split-type (~10 KB) and vanilla-tilt (~15 KB) out of the shared
 * client bundle and out of every page's First Load JS.
 *
 * Performance hot-spots historically flagged by Lighthouse on this file:
 *
 *   1. `.title-anim` was creating ONE ScrollTrigger PER CHARACTER. A title
 *      with ~50 chars produced 50 trigger instances, each running rect
 *      reads on every scroll frame → "Forced reflow while executing
 *      JavaScript" + huge "Reduce main-thread work" times. Now collapsed
 *      to a single ScrollTrigger per title that staggers all chars from
 *      one tween — ~50× fewer trigger callbacks, no rect reads after the
 *      one-off start position is computed.
 *
 *   2. `.appear-down` used `scrub: 1`, forcing ScrollTrigger to read each
 *      element's position on every scroll frame for the lifetime of the
 *      page. Replaced with a once-only `onEnter` tween — same visual
 *      result, zero scroll-time layout cost.
 *
 *   3. `.fade-wrapper .fade-top` writes are batched into a single
 *      `gsap.set` and reads run via `ScrollTrigger.batch` so the browser
 *      performs at most one layout per batched group, instead of one per
 *      element.
 *
 *   4. Heavy-lib imports stay behind `requestIdleCallback` so they never
 *      compete with LCP / TBT.
 */
const ClientAnimations: React.FC = () => {
  useEffect(() => {
    let cancelled = false;
    let cleanups: Array<() => void> = [];
    let idleId: number | undefined;
    let timeoutId: number | undefined;
    let loadHandler: (() => void) | null = null;

    const run = async () => {
      // Probe DOM upfront — if NONE of the animation hooks exist on the
      // current page we can avoid the entire heavy-lib download. Skipping
      // these imports on minimal pages (legal, 404, single-blog) saves
      // ~135 KB of JS execution.
      const hasTilt = document.querySelector(".topy-tilt") !== null;
      const hasFade =
        document.querySelector(".fade-wrapper .fade-top") !== null;
      const hasAppear = document.querySelector(".appear-down") !== null;
      const hasTitle = document.querySelector(".title-anim") !== null;

      if (!hasTilt && !hasFade && !hasAppear && !hasTitle) return;

      // `prefers-reduced-motion`: skip ALL non-essential animation work.
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const needGsap = hasFade || hasAppear || hasTitle;
      const needScrollTrigger = needGsap;
      const needSplitType = hasTitle;
      const needTilt = hasTilt;

      // Conditionally fetch only the libraries we actually need on the
      // current page. Dynamic imports are de-duped by webpack so this
      // doesn't blow up the bundle, but it does shrink the network/parse
      // cost on simple pages.
      const [gsapMod, stMod, splitMod, tiltMod] = await Promise.all([
        needGsap ? import("gsap") : Promise.resolve(null),
        needScrollTrigger ? import("gsap/ScrollTrigger") : Promise.resolve(null),
        needSplitType ? import("split-type") : Promise.resolve(null),
        needTilt ? import("vanilla-tilt") : Promise.resolve(null),
      ]);

      if (cancelled) return;

      const gsap = gsapMod?.default;
      const ScrollTrigger = stMod?.ScrollTrigger;
      const SplitType = splitMod?.default;
      const VanillaTilt = tiltMod?.default;

      if (gsap && ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.config({
          limitCallbacks: true,
          ignoreMobileResize: true,
        });
      }

      // ---- Vanilla Tilt -----------------------------------------------
      if (VanillaTilt && hasTilt) {
        const tiltElements = document.querySelectorAll<HTMLElement>(".topy-tilt");
        tiltElements.forEach((el) => {
          VanillaTilt.init(el, { max: 5, speed: 3000 });
        });
        cleanups.push(() => {
          tiltElements.forEach((el) => {
            (el as HTMLElement & { vanillaTilt?: { destroy: () => void } })
              .vanillaTilt?.destroy();
          });
        });
      }

      if (!gsap || !ScrollTrigger) return;

      // ---- Fade up ----------------------------------------------------
      // All writes happen in ONE `gsap.set(targets, …)` call. Reads happen
      // inside `ScrollTrigger.batch`, which performs a single batched
      // layout for the whole group instead of N individual reads.
      if (hasFade) {
        const fadeCtx = gsap.context(() => {
          const targets = gsap.utils.toArray<HTMLElement>(
            ".fade-wrapper .fade-top"
          );
          if (targets.length === 0) return;
          gsap.set(targets, {
            opacity: 0,
            y: 100,
            willChange: "opacity, transform",
          });
          ScrollTrigger.batch(targets, {
            start: "top 100%",
            once: true,
            onEnter: (batch) => {
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.15,
                overwrite: true,
                clearProps: "willChange",
              });
            },
          });
        });
        cleanups.push(() => fadeCtx.revert());
      }

      // ---- Appear down ------------------------------------------------
      // Previous implementation used `scrub: 1`, which forces a
      // `getBoundingClientRect` read on EVERY scroll frame for the
      // lifetime of the page → the dominant "Forced reflow while
      // executing JavaScript" source flagged by Lighthouse on the home
      // and about pages. Replaced with a one-shot `onEnter` tween: same
      // visual outcome, zero scroll-time layout cost.
      if (hasAppear) {
        const appearCtx = gsap.context(() => {
          const targets = gsap.utils.toArray<HTMLElement>(".appear-down");
          if (targets.length === 0) return;
          gsap.set(targets, {
            scale: 0.8,
            opacity: 0,
            willChange: "transform, opacity",
          });
          ScrollTrigger.batch(targets, {
            start: "top 90%",
            once: true,
            onEnter: (batch) => {
              gsap.to(batch, {
                scale: 1,
                opacity: 1,
                duration: 1.5,
                stagger: 0.08,
                overwrite: true,
                clearProps: "willChange",
              });
            },
          });
        });
        cleanups.push(() => appearCtx.revert());
      }

      // ---- Split-text title animation ---------------------------------
      // BEFORE: created one `gsap.timeline` + ScrollTrigger PER CHARACTER.
      //   A 50-char title → 50 trigger instances, each running scroll
      //   callbacks. With multiple titles per page that's 200–400+
      //   triggers, all reading rects on every scroll → catastrophic
      //   "Reduce main-thread work" + "Forced reflow" warnings.
      //
      // AFTER: one ScrollTrigger PER TITLE that animates all its chars in
      //   a single staggered `from` tween. Same visual reveal, but the
      //   trigger count drops by ~98% and there are no rect reads after
      //   the start position is calculated once.
      if (SplitType && hasTitle) {
        const titles = Array.from(
          document.querySelectorAll<HTMLElement>(".title-anim")
        );
        if (titles.length > 0) {
          const splits = titles.map((t) => new SplitType(t, { types: "chars" }));
          const titleCtx = gsap.context(() => {
            titles.forEach((title) => {
              const chars = title.querySelectorAll<HTMLElement>(".char");
              if (chars.length === 0) return;
              gsap.set(chars, {
                x: 70,
                autoAlpha: 0,
                willChange: "transform, opacity",
              });
              gsap.to(chars, {
                x: 0,
                autoAlpha: 1,
                duration: 0.8,
                stagger: 0.03,
                ease: "power2.out",
                overwrite: true,
                clearProps: "willChange",
                scrollTrigger: {
                  trigger: title,
                  start: "top 90%",
                  once: true,
                },
              });
            });
          });
          cleanups.push(() => {
            titleCtx.revert();
            splits.forEach((s) => {
              try {
                s.revert();
              } catch {
                /* DOM may have been removed during route change */
              }
            });
          });
        }
      }
    };

    const schedule = () => {
      if (cancelled) return;
      const w = window as Window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
        cancelIdleCallback?: (id: number) => void;
      };
      if (typeof w.requestIdleCallback === "function") {
        idleId = w.requestIdleCallback(() => {
          if (!cancelled) void run();
        }, { timeout: 3200 });
      } else {
        timeoutId = window.setTimeout(() => {
          if (!cancelled) void run();
        }, 250);
      }
    };

    if (document.readyState === "complete") {
      schedule();
    } else {
      loadHandler = () => schedule();
      window.addEventListener("load", loadHandler);
    }

    return () => {
      cancelled = true;
      if (loadHandler) window.removeEventListener("load", loadHandler);
      const w = window as Window & { cancelIdleCallback?: (id: number) => void };
      if (idleId != null && typeof w.cancelIdleCallback === "function") {
        w.cancelIdleCallback(idleId);
      }
      if (timeoutId != null) window.clearTimeout(timeoutId);
      cleanups.forEach((fn) => {
        try {
          fn();
        } catch {
          /* ignore */
        }
      });
      cleanups = [];
    };
  }, []);

  return null;
};

export default ClientAnimations;
