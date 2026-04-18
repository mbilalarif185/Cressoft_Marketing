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

    const run = async () => {
      const [{ default: gsap }, { ScrollTrigger }, { default: SplitType }, { default: VanillaTilt }] =
        await Promise.all([
          import("gsap"),
          import("gsap/dist/ScrollTrigger"),
          import("split-type"),
          import("vanilla-tilt"),
        ]);

      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

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
      const fadeCtx = gsap.context(() => {
        document.querySelectorAll(".fade-wrapper").forEach((wrap) => {
          wrap.querySelectorAll(".fade-top").forEach((element, idx) => {
            const delay = idx * 0.15;
            gsap.set(element, { opacity: 0, y: 100 });
            ScrollTrigger.create({
              trigger: element,
              start: "top 100%",
              end: "bottom 20%",
              scrub: 0.5,
              onEnter: () => {
                gsap.to(element, { opacity: 1, y: 0, duration: 1, delay });
              },
              once: true,
            });
          });
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

    run();

    return () => {
      cancelled = true;
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
