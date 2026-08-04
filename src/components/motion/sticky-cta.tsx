"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useState } from "react";

/**
 * Mobile conversion bar. Appears once the hero has scrolled away and hides
 * again over the enquiry form, so it never sits on top of the thing it points
 * at. Desktop keeps the header CTA, which is always visible there.
 */
export function StickyCta() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();
  const reduced = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (value) => {
    const form = document.getElementById("enquiry");
    const pastHero = value > window.innerHeight * 0.8;
    const atForm = form ? form.getBoundingClientRect().top < window.innerHeight * 0.85 : false;
    setVisible(pastHero && !atForm);
  });

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={reduced ? false : { y: 88 }}
          animate={{ y: 0 }}
          exit={reduced ? { y: 88 } : { y: 88 }}
          transition={{ duration: reduced ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-bg/95 backdrop-blur-md md:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="flex items-center justify-between gap-4 px-5 py-3.5">
            <div className="min-w-0">
              <p className="text-sm font-medium">Our fee is £0</p>
              <p className="truncate text-xs text-muted">30-day trial · no contract</p>
            </div>
            <a
              href="#enquiry"
              className="shrink-0 cursor-pointer rounded-full bg-ink px-5 py-3 text-sm font-medium text-bg transition-transform duration-200 active:scale-[0.98]"
            >
              Book filming
            </a>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
