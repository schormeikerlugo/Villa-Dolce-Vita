/* ==========================================================================
   scroll.ts — Global scroll experience (Lenis smooth-scroll + GSAP reveals)
   --------------------------------------------------------------------------
   Responsibilities:
   1. Boot Lenis for buttery smooth scrolling (reschio-style feel).
   2. Sync Lenis with GSAP's ticker + ScrollTrigger.
   3. Provide reusable, declarative scroll behaviours driven by data-attributes
      so .astro components stay clean and don't ship bespoke JS each:
        - [data-reveal]        fade + rise in when entering the viewport
        - [data-parallax="0.2"] subtle parallax on the element (0..1 strength)
        - [data-pin-fade]      crossfade a pinned media panel on scroll
   4. Respect prefers-reduced-motion (no smooth scroll, instant reveals).
   ========================================================================== */

import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let lenis: Lenis | null = null;
let rafCallback: ((time: number) => void) | null = null;

/** Boot Lenis and wire it to GSAP's ticker + ScrollTrigger. */
function initSmoothScroll() {
  if (prefersReducedMotion()) return;

  lenis = new Lenis({
    // Longer duration + gentle exponential ease = fluid, app-like inertia.
    duration: 1.35,
    easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.5,
    lerp: 0.09,
  });

  document.documentElement.classList.add("lenis");

  lenis.on("scroll", ScrollTrigger.update);
  rafCallback = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(rafCallback);
  gsap.ticker.lagSmoothing(0);
}

/** [data-reveal] — staggered fade + rise as elements enter the viewport. */
function initReveals() {
  const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]");
  if (!targets.length) return;

  if (prefersReducedMotion()) {
    targets.forEach((el) => el.classList.add("is-revealed"));
    return;
  }

  targets.forEach((el) => {
    const delay = parseFloat(el.dataset.revealDelay ?? "0");
    gsap.fromTo(
      el,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
          onEnter: () => el.classList.add("is-revealed"),
        },
      },
    );
  });
}

/**
 * initSectionReveals — gives every <section> a soft, app-like entrance as it
 * scrolls into view (fade + gentle rise). Sections that opt out with
 * [data-no-reveal], the hero, pinned sections, and full-screen media sections
 * are skipped so their own choreography isn't disturbed.
 */
function initSectionReveals() {
  const sections = gsap.utils.toArray<HTMLElement>("main > section, main > *");

  const skip = (el: HTMLElement) =>
    el.hasAttribute("data-no-reveal") ||
    el.hasAttribute("data-pin-fade") ||
    el.classList.contains("hero") ||
    el.classList.contains("finalcta") ||
    el.classList.contains("experience") ||
    el.tagName !== "SECTION";

  sections.forEach((el) => {
    if (skip(el)) return;

    if (prefersReducedMotion()) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    // FADE IN — a soft fade + gentle rise as the section enters view.
    gsap.set(el, { opacity: 0, y: 40 });
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });
  });
}

/** [data-parallax] — gentle vertical parallax tied to scroll. */
function initParallax() {
  if (prefersReducedMotion()) return;
  const targets = gsap.utils.toArray<HTMLElement>("[data-parallax]");

  targets.forEach((el) => {
    const strength = parseFloat(el.dataset.parallax ?? "0.15");
    gsap.to(el, {
      yPercent: -strength * 100,
      ease: "none",
      scrollTrigger: {
        trigger: el.closest("[data-parallax-scope]") ?? el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });
}

/**
 * [data-pin-fade] — reschio-style pinned section: the media stays fixed while
 * layered captions crossfade. Add data-pin-fade to the section, and
 * data-pin-layer to each stacked layer inside it.
 */
function initPinFades() {
  if (prefersReducedMotion()) return;
  const sections = gsap.utils.toArray<HTMLElement>("[data-pin-fade]");

  sections.forEach((section) => {
    const layers = gsap.utils.toArray<HTMLElement>(
      "[data-pin-layer]",
      section,
    );
    if (layers.length < 2) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${layers.length * 100}%`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    layers.forEach((layer, i) => {
      if (i === 0) return;
      tl.to(layers[i - 1], { autoAlpha: 0, duration: 0.5 }, i - 0.5).fromTo(
        layer,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.5 },
        i - 0.5,
      );
    });
  });
}

/**
 * When the user prefers reduced motion, background videos should not autoplay.
 * Pause them and rely on the poster image instead.
 */
function respectReducedMotionVideos() {
  if (!prefersReducedMotion()) return;
  document.querySelectorAll<HTMLVideoElement>("video[autoplay]").forEach((v) => {
    v.removeAttribute("autoplay");
    v.pause();
  });
}

/**
 * Smooth-scroll in-page anchor links (e.g. Experiences #day-trips), offsetting
 * for the fixed nav so headings aren't hidden underneath it.
 */
function initAnchorLinks() {
  const NAV_OFFSET = -90;
  document
    .querySelectorAll<HTMLAnchorElement>('a[href^="#"], a[href*="#"]')
    .forEach((link) => {
      const url = new URL(link.href, window.location.href);
      // Only same-page anchors.
      if (url.pathname !== window.location.pathname || !url.hash) return;
      link.addEventListener("click", (e) => {
        const target = document.querySelector(url.hash);
        if (!target) return;
        e.preventDefault();
        scrollTo(target as HTMLElement, NAV_OFFSET);
        history.replaceState(null, "", url.hash);
      });
    });
}

/** Tear down the previous page's scroll state (for View Transition navigations). */
function destroyScroll() {
  ScrollTrigger.getAll().forEach((st) => st.kill());
  if (rafCallback) {
    gsap.ticker.remove(rafCallback);
    rafCallback = null;
  }
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
  document.documentElement.classList.remove("lenis");
}

/** Public entry — call on first load AND after every View Transition. */
export function initScroll() {
  destroyScroll();
  document.documentElement.classList.remove("no-js");
  document.body.classList.add("is-ready");

  respectReducedMotionVideos();
  initSmoothScroll();
  // Pin-fades first so they claim their scroll space before section reveals
  // measure their trigger positions (otherwise reveals after a pinned section
  // can miscalculate and stay hidden).
  initPinFades();
  initReveals();
  initParallax();
  initSectionReveals();
  initAnchorLinks();

  // Recalculate once fonts/images settle so triggers line up.
  window.addEventListener("load", () => ScrollTrigger.refresh());
}

/** Programmatic scroll (used by nav anchors / "scroll to discover"). */
export function scrollTo(target: string | HTMLElement, offset = 0) {
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.2 });
  } else {
    const el =
      typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: "smooth" });
  }
}
