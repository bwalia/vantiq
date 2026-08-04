import { z } from "zod";

/**
 * The enquiry funnel schema.
 *
 * Deliberately shared by the client wizard and the route handler so the server
 * re-validates exactly what the client claimed to validate. The client copy is
 * a convenience, never the authority.
 */

export const ROLES = [
  "Owner",
  "Registered manager",
  "Home manager",
  "Operations / group role",
  "Marketing",
  "Other",
] as const;

export const OCCUPANCY_BANDS = [
  "Below 80%",
  "80 – 89%",
  "90 – 94%",
  "95 – 99%",
  "Full — waiting list wanted",
  "Not sure",
] as const;

export const GOALS = [
  "Families and private enquiries",
  "Local authority & NHS commissioners",
  "Landlords and operators looking to expand",
  "Staff, when recruitment is the tighter constraint",
] as const;

export const BUDGETS = [
  "£500 – £1,000 (recommended)",
  "Less than £500",
  "More than £1,000",
  "Want to talk it through",
] as const;

export const enquirySchema = z.object({
  homeName: z
    .string({ error: "Please enter the name of the home." })
    .trim()
    .min(2, "Please enter the name of the home.")
    .max(120, "That name is longer than we can store."),
  location: z
    .string({ error: "Please enter a town or postcode so we know the area." })
    .trim()
    .min(2, "Please enter a town or postcode so we know the area.")
    .max(120, "Please shorten this to a town or postcode."),
  beds: z
    .number({ error: "Please enter the number of beds." })
    .int("Please enter a whole number.")
    .min(1, "That must be at least 1.")
    .max(2000, "Please enter a realistic number of beds."),
  role: z.enum(ROLES, { error: "Please choose the option closest to your role." }),
  occupancy: z.enum(OCCUPANCY_BANDS, { error: "Please choose an occupancy band." }),
  goals: z
    .array(z.enum(GOALS), {
      error: "Please choose at least one thing you want the ads to bring in.",
    })
    .min(1, "Please choose at least one thing you want the ads to bring in."),
  budget: z.enum(BUDGETS, { error: "Please choose a budget range." }),
  preferredDates: z
    .string({ error: "Please give us two or three dates that could work." })
    .trim()
    .min(3, "Please give us two or three dates that could work.")
    .max(400, "Please keep this under 400 characters."),
  contactName: z
    .string({ error: "Please tell us who we should speak to." })
    .trim()
    .min(2, "Please tell us who we should speak to.")
    .max(120, "Please shorten this name."),
  email: z.email("Please enter an email address we can reply to.").max(200),
  phone: z
    .string()
    .trim()
    .max(40, "Please shorten this number.")
    .optional()
    .or(z.literal("")),
  notes: z.string().trim().max(1200, "Please keep this under 1200 characters.").optional(),
  /** Honeypot. Real people leave it empty; bots fill it in. */
  website: z.string().max(0).optional(),
});

export type Enquiry = z.infer<typeof enquirySchema>;
export type EnquiryField = keyof Enquiry;

/**
 * Which fields belong to which step. The wizard validates only the current
 * step's fields before advancing, so a user is never shown an error for a
 * question they have not reached yet.
 */
export const STEPS = [
  {
    id: "home",
    eyebrow: "Step 1 of 4",
    title: "About the home",
    description: "So we know where we'd be filming and who the ads should reach.",
    fields: ["homeName", "location", "beds"],
  },
  {
    id: "position",
    eyebrow: "Step 2 of 4",
    title: "Where you are right now",
    description: "Full occupancy is not a problem — it just changes what we point the ads at.",
    fields: ["role", "occupancy"],
  },
  {
    id: "goal",
    eyebrow: "Step 3 of 4",
    title: "What you want the ads to bring in",
    description: "Choose as many as apply. This shapes the targeting and the questions we ask.",
    fields: ["goals", "budget"],
  },
  {
    id: "contact",
    eyebrow: "Step 4 of 4",
    title: "Filming dates and how to reach you",
    description: "Two or three options are enough. We'll confirm one and get you live within the week.",
    fields: ["preferredDates", "contactName", "email", "phone", "notes"],
  },
] as const satisfies ReadonlyArray<{
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  fields: ReadonlyArray<EnquiryField>;
}>;

export type StepIndex = number;

/** Field-level errors keyed by field name, as produced by a failed parse. */
export type FieldErrors = Partial<Record<EnquiryField, string>>;

export function collectFieldErrors(error: z.ZodError<Enquiry>): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !(key in errors)) {
      errors[key as EnquiryField] = issue.message;
    }
  }
  return errors;
}
