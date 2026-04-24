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
 * Behaviour matches the original Layout effects 1:1:
 *   - `.topy-tilt`            -> VanillaTilt
 *   - `.fade-wrapper .fade-top` -> staggered fade-up on scroll
 *   - `.appear-down`          -> scale + fade on scroll
 *   - `.title-anim`           -> per-character split text reveal
 *
 * If a page has none of those classes the effects are no-ops, so it's safe
 * to mount unconditionally.
 */
const ClientAnimations: React.FC = () => {
  useEffect(() => {
    let cancelled = false;
    let cleanups: Array<() => void> = [];
    let idleId: number | undefined;
    let timeoutId: number | undefined;
    let loadHandler: (() => void) | null = null;

    const run = async () => {
      const [{ default: gsap }, { ScrollTrigger }, { default: SplitType }, { default: VanillaTilt }] =
        await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("split-type"),
          import("vanilla-tilt"),
        ]);

      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.config({
        limitCallbacks: true,
        ignoreMobileResize: true,
      });

      // ---- Vanilla Tilt -----------------------------------------------
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

      // ---- Fade up ----------------------------------------------------
      // Performance notes:
      //   1. The previous implementation declared `scrub: 0.5` on every
      //      trigger even though the tween fires once via `onEnter` +
      //      `once: true`. `scrub` forces ScrollTrigger to read each
      //      element's `getBoundingClientRect()` on every scroll frame for
      //      the rest of the page lifetime — pure waste. Removing it cuts
      //      the dominant "forced reflow" source flagged by Lighthouse.
      //   2. The original loop interleaved writes (`gsap.set` on each
      //      element) with reads (`ScrollTrigger.create` computing the
      //      trigger position) → layout thrash on first paint. We now do
      //      ALL the writes in a single `gsap.set(targets, …)` pass, then
      //      hand the targets to `ScrollTrigger.batch` which performs all
      //      DOM reads in one batched layout instead of N separate ones.
      const fadeCtx = gsap.context(() => {
        const targets = gsap.utils.toArray<HTMLElement>(
          ".fade-wrapper .fade-top"
        );
        if (targets.length === 0) return;
        gsap.set(targets, { opacity: 0, y: 100, willChange: "opacity, transform" });
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

      // ---- Appear down ------------------------------------------------
      const appearCtx = gsap.context(() => {
        document.querySelectorAll(".appear-down").forEach((section) => {
          gsap.fromTo(
            section,
            { scale: 0.8, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1.5,
              scrollTrigger: {
                trigger: section,
                scrub: 1,
                start: "top bottom",
                end: "bottom center",
                markers: false,
              },
            }
          );
        });
      });
      cleanups.push(() => appearCtx.revert());

      // ---- Split text title animation --------------------------------
      if (document.querySelectorAll(".title-anim").length > 0) {
        const split = new SplitType(".title-anim");
        const splitCtx = gsap.context(() => {
          document.querySelectorAll(".title-anim").forEach((titleAnim) => {
            titleAnim.querySelectorAll(".char").forEach((char, idx) => {
              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: char,
                  start: "top 90%",
                  end: "bottom 60%",
                  scrub: false,
                  markers: false,
                  toggleActions: "play none none none",
                },
              });
              tl.from(char, {
                duration: 0.8,
                x: 70,
                delay: idx * 0.03,
                autoAlpha: 0,
              });
            });
          });
        });
        cleanups.push(() => {
          splitCtx.revert();
          try {
            split.revert();
          } catch {
            /* DOM may have been removed during route change */
          }
        });
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
