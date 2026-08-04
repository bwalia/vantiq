/**
 * Site-wide configuration.
 *
 * Values marked TODO are real-world facts that must be supplied before launch.
 * They are deliberately left visible rather than filled with plausible
 * placeholders, so nothing invented can ship by accident. See README.md.
 */

export const site = {
  name: "Vantiq",
  /** Used in <title> templates and the JSON-LD organisation record. */
  legalName: "Vantiq",
  tagline: "Meta advertising for care homes — no agency fee",
  description:
    "A 30-day Meta advertising trial for UK care homes. We film your home, build and run the campaign, and send qualified enquiries straight to your team. Our fee is £0 — you pay only for the ads, direct to Meta.",
  /** TODO: replace with the production domain before deploying. */
  url: "https://vantiq.example.com",
  locale: "en_GB",

  contact: {
    /** TODO: replace with the real enquiries inbox. */
    email: "TODO@vantiq.example.com",
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
