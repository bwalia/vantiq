/**
 * Site-wide configuration.
 *
 * Values marked TODO are real-world facts that must be supplied before launch.
 * They are deliberately left visible rather than filled with plausible
 * placeholders, so nothing invented can ship by accident. See README.md.
 */

/** "/vantiq" on a GitHub project page; empty on a custom domain or a server deploy. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Where the enquiry funnel posts.
 *
 * Unset → the built-in Route Handler, which only exists on a server deploy.
 * On GitHub Pages there is no server, so this must point at an external form
 * service (Formspree, Basin, Web3Forms — anything that accepts a JSON POST).
 * Set it to the single character "-" to disable posting entirely, which makes
 * the form fall back to opening a pre-filled email so no enquiry is lost.
 */
const configuredEndpoint = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT?.trim();

export const enquiryEndpoint =
  configuredEndpoint === "-"
    ? null
    : configuredEndpoint && configuredEndpoint.length > 0
      ? configuredEndpoint
      : `${basePath}/api/enquiries`;

export const site = {
  name: "Vantiq",
  /** Used in <title> templates and the JSON-LD organisation record. */
  legalName: "Vantiq",
  tagline: "Meta advertising for care homes — no agency fee",
  description:
    "A 30-day Meta advertising trial for UK care homes. We film your home, build and run the campaign, and send qualified enquiries straight to your team. Our fee is £0 — you pay only for the ads, direct to Meta.",
  /**
   * Canonical origin, used by canonical URLs, Open Graph, sitemap and robots.
   * Set NEXT_PUBLIC_SITE_URL in the deploy environment.
   * TODO: replace the fallback with the production domain.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://vantiq.example.com",
  locale: "en_GB",

  contact: {
    /** TODO: replace with the real enquiries inbox. */
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "TODO@vantiq.example.com",
    /** TODO: replace with the real contact number, or set to null to hide it. */
    phone: "TODO — add phone number",
    /** TODO: replace or set to null to hide the registration line in the footer. */
    companyNumber: "TODO — company registration number",
  },

  founders: [
    { name: "Kian Heneghan", role: "Co-founder" },
    { name: "Harman Walia", role: "Co-founder" },
  ],
} as const;

export const nav = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#pricing", label: "What it costs" },
  { href: "#included", label: "What's included" },
  { href: "#founders", label: "Who you'll work with" },
] as const;
