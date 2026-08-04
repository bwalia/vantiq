type MarkProps = {
  className?: string;
};

/**
 * The Vantiq mark: a fan of tapered chevrons radiating from a point.
 * Drawn in CSS-friendly SVG so it inherits colour and needs no image asset.
 */
export function VantiqMark({ className }: MarkProps) {
  const blades = [
    { angle: -68, opacity: 0.55 },
    { angle: -42, opacity: 0.7 },
    { angle: -16, opacity: 0.85 },
    { angle: 10, opacity: 1 },
    { angle: 36, opacity: 0.85 },
    { angle: 62, opacity: 0.7 },
    { angle: 88, opacity: 0.55 },
  ];

  return (
    <svg
      viewBox="0 0 32 32"
      role="presentation"
      focusable="false"
      aria-hidden="true"
      className={className}
    >
      <g fill="currentColor" transform="translate(11 16)">
        {blades.map(({ angle, opacity }) => (
          <path
            key={angle}
            d="M0 -4.1 L13.5 0 L0 4.1 L4.6 0 Z"
            opacity={opacity}
            transform={`rotate(${angle})`}
          />
        ))}
      </g>
    </svg>
  );
}

type WordmarkProps = {
  className?: string;
  /** Rendered inside links, where the accessible name comes from the link itself. */
  decorative?: boolean;
};

export function VantiqWordmark({ className, decorative = false }: WordmarkProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <VantiqMark className="size-8 shrink-0 text-accent-soft sm:size-9" />
      <span
        className="text-[1.7rem] font-semibold leading-none tracking-[-0.035em] text-ink sm:text-[1.9rem]"
        aria-hidden={decorative ? "true" : undefined}
      >
        vantiq
      </span>
    </span>
  );
}
