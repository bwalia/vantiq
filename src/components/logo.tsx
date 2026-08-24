import Image from "next/image";
import markSrc from "./vantiq-mark.png";

type MarkProps = {
  className?: string;
};

/**
 * The Vantiq mark: a stacked zigzag ribbon in the brand gradient.
 *
 * Supplied as artwork rather than drawn in code, so it cannot inherit `currentColor`
 * the way the previous mark did — the gradient is baked in and reads on both themes.
 * The file is tight-cropped to the glyph (no transparent padding), because any margin
 * inside the image becomes invisible space in the lockup below.
 */
export function VantiqMark({ className }: MarkProps) {
  return (
    <Image
      src={markSrc}
      alt=""
      aria-hidden="true"
      priority
      className={className}
    />
  );
}

type WordmarkProps = {
  className?: string;
  /** Rendered inside links, where the accessible name comes from the link itself. */
  decorative?: boolean;
};

/**
 * Mark + wordmark lockup. The proportions come from the supplied logo artwork:
 * the mark stands ~1.16x the type size, set a hair under 0.15em away from it.
 */
export function VantiqWordmark({ className, decorative = false }: WordmarkProps) {
  return (
    <span className={`inline-flex items-center gap-1 ${className ?? ""}`}>
      <VantiqMark className="h-8 w-auto shrink-0 sm:h-9" />
      <span
        className="text-[1.7rem] font-semibold leading-none tracking-[-0.035em] text-ink sm:text-[1.9rem]"
        aria-hidden={decorative ? "true" : undefined}
      >
        vantiq
      </span>
    </span>
  );
}
