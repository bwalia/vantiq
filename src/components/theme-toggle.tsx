"use client";

import { useSyncExternalStore } from "react";

export const THEME_STORAGE_KEY = "vantiq-theme";

type Theme = "light" | "dark";

/**
 * Runs before paint so a stored preference never flashes the wrong theme.
 * Kept in sync with the class names in globals.css.
 */
export const themeInitScript = `
(function(){try{
var s=localStorage.getItem("${THEME_STORAGE_KEY}");
if(s==="light"||s==="dark"){document.documentElement.classList.add("theme-"+s);}
}catch(e){}})();
`;

function resolveTheme(): Theme {
  const root = document.documentElement;
  if (root.classList.contains("theme-dark")) return "dark";
  if (root.classList.contains("theme-light")) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/**
 * The theme lives on <html> and in the system preference — both external to
 * React — so it is read through a store subscription rather than mirrored
 * into component state.
 */
function subscribe(onChange: () => void) {
  const query = window.matchMedia("(prefers-color-scheme: dark)");
  query.addEventListener("change", onChange);

  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  return () => {
    query.removeEventListener("change", onChange);
    observer.disconnect();
  };
}

export function ThemeToggle() {
  const theme = useSyncExternalStore<Theme | null>(subscribe, resolveTheme, () => null);

  function toggle() {
    const next: Theme = resolveTheme() === "dark" ? "light" : "dark";
    const root = document.documentElement;
    root.classList.remove("theme-light", "theme-dark");
    root.classList.add(`theme-${next}`);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable in private modes; the toggle still works
      // for this page view.
    }
  }

  // Until mounted, the label stays generic so server and client markup agree.
  const label =
    theme === null
      ? "Switch theme"
      : theme === "dark"
        ? "Switch to light theme"
        : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="inline-flex size-9 items-center justify-center rounded-[3px] border border-hairline text-muted transition-colors hover:border-accent-soft hover:bg-accent-wash hover:text-accent-text"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
        {theme === "dark" ? (
          <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4L17 7M7 17l-1.6 1.6" />
          </g>
        ) : (
          <path
            fill="currentColor"
            d="M20.3 14.2A8.4 8.4 0 0 1 9.8 3.7a.7.7 0 0 0-.93-.82 9.8 9.8 0 1 0 12.25 12.25.7.7 0 0 0-.82-.93Z"
          />
        )}
      </svg>
    </button>
  );
}
