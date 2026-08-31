"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { bookHref, nav } from "@/lib/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-9 items-center justify-center rounded-[3px] border border-hairline text-muted transition-colors hover:border-accent-soft hover:bg-accent-wash hover:text-accent-text"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
          {open ? (
            <path
              d="M6 6l12 12M18 6L6 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M4 8h16M4 16h16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-hairline bg-bg px-5 pb-6 pt-2 shadow-soft"
      >
        <ul className="flex flex-col">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block border-b border-hairline py-4 text-[1.0625rem] text-ink transition-colors hover:text-accent-text"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={bookHref}
              onClick={() => setOpen(false)}
              className="mt-5 inline-flex w-full items-center justify-center rounded-[3px] bg-ink px-6 py-3.5 text-[0.975rem] font-medium text-bg transition-colors hover:bg-accent-text"
            >
              Book a filming date
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
