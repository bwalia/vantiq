"use client";

import { Fragment, useEffect, useRef } from "react";
import { Shell } from "@/components/primitives";

/**
 * The tagline moment: the argument in one sentence, set large, with each word
 * lifting from muted to full ink as it crosses a trigger line set at 55% of the
 * viewport. Words light in reading order and stay lit.
 *
 * Built on IntersectionObserver rather than a scroll-linked motion value: the
 * observer fires only when a word crosses the line, so there is no per-frame
 * work and no scroll listener. (Motion's `useScroll` with a `target` was tried
 * first and reported a constant progress here, which left the whole sentence
 * either lit or muted with nothing in between.)
 *
 * The muted state is applied by this component on mount, not in the server
 * markup, so with JavaScript unavailable the sentence renders at full contrast
 * instead of being stuck at 26% opacity.
 */
export function TaglineReveal({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = Array.from(el.querySelectorAll<HTMLElement>("[data-word]"));

    // Reduced motion, or no observer support: show the finished state.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      words.forEach((word) => word.classList.add("is-lit"));
      return;
    }

    // Arm the muted state only once we know we can animate out of it.
    el.dataset.armed = "true";

    /*
     * Light everything already above the trigger line, rather than waiting for
     * the observer to tell us. If the sentence is on screen at mount it should
     * be readable at once, and this also covers a load that starts mid-page.
     */
    const lightPassed = () => {
      const line = window.innerHeight * 0.55;
      for (const word of words) {
        if (word.getBoundingClientRect().top < line) word.classList.add("is-lit");
      }
    };
    lightPassed();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-lit");
          observer.unobserve(entry.target);
        }
      },
      // A trigger line at 55% down the viewport: the bottom margin pulls the
      // root's lower edge up to meet it.
      { rootMargin: "0px 0px -45% 0px", threshold: 0 },
    );

    words.forEach((word) => observer.observe(word));

    /*
     * Fail safe. Muted text that never lights is unreadable, so if the observer
     * has not reported anything by the time the sentence is on screen, drop the
     * muted state altogether and show the sentence plainly. Costs one timeout
     * and removes the only way this effect can leave the page worse.
     */
    const guard = window.setTimeout(() => {
      const anyLit = words.some((word) => word.classList.contains("is-lit"));
      const onScreen = el.getBoundingClientRect().top < window.innerHeight;
      if (onScreen && !anyLit) delete el.dataset.armed;
    }, 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(guard);
    };
  }, []);

  const words = text.split(" ");

  return (
    <section className="py-24 md:py-32 lg:py-40">
      <Shell>
        <p
          ref={ref}
          className="tagline display mx-auto max-w-[42.5rem] text-[clamp(1.75rem,4.4vw,3.4rem)] leading-[1.15]"
        >
          {/*
           * The separating space sits between the spans, never inside one.
           * Each word is an inline-block so it has a single box for the
           * observer to watch, and an inline-block collapses trailing
           * whitespace inside itself — put the space in there and every word
           * runs into the next.
           */}
          {words.map((word, index) => (
            <Fragment key={`${word}-${index}`}>
              <span data-word className="tagline-word">
                {word}
              </span>
              {index < words.length - 1 ? " " : null}
            </Fragment>
          ))}
        </p>
      </Shell>
    </section>
  );
}
