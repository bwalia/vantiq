"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { CheckboxGroup, RadioGroup, TextArea, TextField } from "@/components/enquiry/fields";
import {
  BUDGETS,
  GOALS,
  OCCUPANCY_BANDS,
  ROLES,
  STEPS,
  collectFieldErrors,
  enquirySchema,
  type Enquiry,
  type EnquiryField,
  type FieldErrors,
} from "@/lib/enquiry";
import { enquiryEndpoint, site } from "@/lib/site";

/** The form holds raw strings; parsing to the schema shape happens on submit. */
type Draft = {
  homeName: string;
  location: string;
  beds: string;
  role: string;
  occupancy: string;
  goals: string[];
  budget: string;
  preferredDates: string;
  contactName: string;
  email: string;
  phone: string;
  notes: string;
  website: string;
};

const EMPTY_DRAFT: Draft = {
  homeName: "",
  location: "",
  beds: "",
  role: "",
  occupancy: "",
  goals: [],
  budget: "",
  preferredDates: "",
  contactName: "",
  email: "",
  phone: "",
  notes: "",
  website: "",
};

function toPayload(draft: Draft) {
  const beds = draft.beds.trim() === "" ? undefined : Number(draft.beds);
  return { ...draft, beds };
}

type Status = "editing" | "submitting" | "sent" | "failed" | "handedOff";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/**
 * Fallback for deploys with no endpoint (a static host and no form service):
 * open the visitor's mail client with every answer already written out, so a
 * completed funnel is never thrown away.
 */
function composeMailto(enquiry: Enquiry): string {
  const lines = [
    `Home: ${enquiry.homeName}`,
    `Location: ${enquiry.location}`,
    `Beds: ${enquiry.beds}`,
    `Role: ${enquiry.role}`,
    `Occupancy: ${enquiry.occupancy}`,
    `Wants the ads to bring in: ${enquiry.goals.join(", ")}`,
    `Ad spend in mind: ${enquiry.budget}`,
    `Possible filming dates: ${enquiry.preferredDates}`,
    "",
    `Name: ${enquiry.contactName}`,
    `Email: ${enquiry.email}`,
    enquiry.phone ? `Phone: ${enquiry.phone}` : null,
    enquiry.notes ? `\nNotes: ${enquiry.notes}` : null,
  ].filter(Boolean);

  const subject = `Filming enquiry — ${enquiry.homeName}`;
  return `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

export function EnquiryForm() {
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);
  const [stepIndex, setStepIndex] = useState(0);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("editing");
  /** +1 moving forward, -1 moving back — drives the direction of the transition. */
  const [direction, setDirection] = useState(1);
  const headingRef = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();

  const step = STEPS[stepIndex];
  const isLastStep = stepIndex === STEPS.length - 1;

  function update<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!(key in current)) return current;
      const next = { ...current };
      delete next[key as EnquiryField];
      return next;
    });
  }

  function toggleGoal(goal: string) {
    setDraft((current) => ({
      ...current,
      goals: current.goals.includes(goal)
        ? current.goals.filter((value) => value !== goal)
        : [...current.goals, goal],
    }));
    setErrors((current) => {
      if (!("goals" in current)) return current;
      const next = { ...current };
      delete next.goals;
      return next;
    });
  }

  /** Validates the whole draft, then narrows the errors to the current step. */
  function errorsForStep(fields: readonly EnquiryField[]): FieldErrors {
    const result = enquirySchema.safeParse(toPayload(draft));
    if (result.success) return {};

    const all = collectFieldErrors(result.error);
    const scoped: FieldErrors = {};
    for (const field of fields) {
      const message = all[field];
      if (message) scoped[field] = message;
    }
    return scoped;
  }

  function goToStep(next: number) {
    setDirection(next >= stepIndex ? 1 : -1);
    setStepIndex(next);
    // Move focus to the step heading so screen-reader users land on the new
    // question set rather than staying on a button that has moved.
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  function handleNext() {
    const scoped = errorsForStep(step.fields);
    if (Object.keys(scoped).length > 0) {
      setErrors(scoped);
      return;
    }
    setErrors({});
    goToStep(Math.min(stepIndex + 1, STEPS.length - 1));
  }

  function handleBack() {
    setErrors({});
    goToStep(Math.max(stepIndex - 1, 0));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsed = enquirySchema.safeParse(toPayload(draft));
    if (!parsed.success) {
      const all = collectFieldErrors(parsed.error);
      setErrors(all);
      // Jump to the earliest step that still has a problem.
      const firstBad = STEPS.findIndex((candidate) =>
        candidate.fields.some((field) => all[field]),
      );
      if (firstBad >= 0) goToStep(firstBad);
      return;
    }

    // No endpoint configured — a purely static deploy with no form service.
    // Hand the answers to the visitor's email client rather than dropping them.
    if (!enquiryEndpoint) {
      window.location.href = composeMailto(parsed.data);
      setStatus("handedOff");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch(enquiryEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!response.ok) {
        setStatus("failed");
        return;
      }
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  }

  if (status === "sent" || status === "handedOff") {
    const handedOff = status === "handedOff";
    return (
      <motion.div
        data-reveal=""
        className="border border-hairline bg-bg p-8 sm:p-12"
        role="status"
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE_OUT }}
      >
        <span
          aria-hidden="true"
          className="inline-flex size-11 items-center justify-center rounded-full bg-accent-wash text-accent"
        >
          <svg viewBox="0 0 20 20" className="size-5">
            <path
              d="M4 10.6l4 4L16 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <p className="eyebrow mt-6">{handedOff ? "One last step" : "Enquiry received"}</p>
        <h3 className="mt-4 text-2xl md:text-3xl">
          {handedOff
            ? "Your email is ready to send."
            : "Thank you — we'll be in touch shortly."}
        </h3>
        <p className="mt-5 max-w-[56ch] text-[0.975rem] leading-relaxed text-muted">
          {handedOff ? (
            <>
              We&apos;ve opened your email app with your answers filled in — press send and it
              reaches us. If nothing opened, write to{" "}
              <a
                href={`mailto:${site.contact.email}`}
                className="text-accent-text underline decoration-accent-faint underline-offset-4"
              >
                {site.contact.email}
              </a>
              .
            </>
          ) : (
            <>
              We&apos;ll confirm one of your filming dates by email, and we can be live within the
              week of the shoot. Nothing is committed until you say so — there is no contract and
              no auto-renewal.
            </>
          )}
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="border border-hairline bg-bg p-6 sm:p-9 lg:p-11"
    >
      {/* Progress: the same narrowing-bar device used in the funnel section. */}
      <div className="flex items-center gap-2" aria-hidden="true">
        {STEPS.map((candidate, index) => (
          <span key={candidate.id} className="relative h-1 flex-1 bg-accent-faint">
            <motion.span
              className="absolute inset-y-0 left-0 w-full origin-left bg-accent-soft"
              initial={false}
              animate={{ scaleX: index <= stepIndex ? 1 : 0 }}
              transition={{ duration: reduced ? 0 : 0.4, ease: EASE_OUT }}
            />
          </span>
        ))}
      </div>

      <p ref={headingRef} tabIndex={-1} className="eyebrow mt-7 outline-none" aria-live="polite">
        {step.eyebrow}
      </p>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step.id}
          data-reveal=""
          initial={reduced ? false : { opacity: 0, x: direction * 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, x: direction * -14 }}
          transition={{ duration: reduced ? 0 : 0.28, ease: EASE_OUT }}
        >
          <h3 className="mt-3 text-2xl md:text-[1.75rem]">{step.title}</h3>
          <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-muted">
            {step.description}
          </p>

          <div className="mt-8 flex flex-col gap-6">
            {step.id === "home" ? (
          <>
            <TextField
              label="Name of the home"
              value={draft.homeName}
              onChange={(value) => update("homeName", value)}
              error={errors.homeName}
              autoComplete="organization"
              placeholder="e.g. Oakfield House"
            />
            <TextField
              label="Town or postcode"
              hint="We use this to set the radius the ads run in."
              value={draft.location}
              onChange={(value) => update("location", value)}
              error={errors.location}
              autoComplete="postal-code"
            />
            <TextField
              label="Number of beds"
              type="number"
              inputMode="numeric"
              min={1}
              max={2000}
              value={draft.beds}
              onChange={(value) => update("beds", value)}
              error={errors.beds}
            />
          </>
        ) : null}

        {step.id === "position" ? (
          <>
            <RadioGroup
              legend="Your role"
              options={ROLES}
              value={draft.role}
              onChange={(value) => update("role", value)}
              error={errors.role}
            />
            <RadioGroup
              legend="Current occupancy"
              hint="If you're full, we'd build a waiting list or point the ads elsewhere instead."
              options={OCCUPANCY_BANDS}
              value={draft.occupancy}
              onChange={(value) => update("occupancy", value)}
              error={errors.occupancy}
            />
          </>
        ) : null}

        {step.id === "goal" ? (
          <>
            <CheckboxGroup
              legend="What should the ads bring in?"
              options={GOALS}
              values={draft.goals}
              onToggle={toggleGoal}
              error={errors.goals}
            />
            <RadioGroup
              legend="Ad spend you have in mind"
              hint="Paid direct to Meta on your own card. Our fee is £0 either way."
              options={BUDGETS}
              value={draft.budget}
              onChange={(value) => update("budget", value)}
              error={errors.budget}
            />
          </>
        ) : null}

        {step.id === "contact" ? (
          <>
            <TextArea
              label="Two or three dates that could work for filming"
              hint="Half a day is enough. Mornings usually suit homes best."
              value={draft.preferredDates}
              onChange={(value) => update("preferredDates", value)}
              error={errors.preferredDates}
              placeholder="e.g. Tue 12th am, Thu 14th am, or the following Monday"
            />
            <div className="grid gap-6 sm:grid-cols-2">
              <TextField
                label="Your name"
                value={draft.contactName}
                onChange={(value) => update("contactName", value)}
                error={errors.contactName}
                autoComplete="name"
              />
              <TextField
                label="Email"
                type="email"
                inputMode="email"
                value={draft.email}
                onChange={(value) => update("email", value)}
                error={errors.email}
                autoComplete="email"
              />
            </div>
            <TextField
              label="Phone (optional)"
              type="tel"
              inputMode="tel"
              value={draft.phone}
              onChange={(value) => update("phone", value)}
              error={errors.phone}
              autoComplete="tel"
            />
            <TextArea
              label="Anything else we should know? (optional)"
              rows={3}
              value={draft.notes}
              onChange={(value) => update("notes", value)}
              error={errors.notes}
            />
          </>
        ) : null}

        {/* Honeypot — visually and semantically hidden from real users. */}
        <div aria-hidden="true" className="hidden">
          <label htmlFor="website-field">Leave this field empty</label>
          <input
            id="website-field"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={draft.website}
            onChange={(event) => update("website", event.target.value)}
          />
        </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {status === "failed" ? (
        <p role="alert" className="mt-6 text-sm text-accent-strong">
          We couldn&apos;t send that just now. Please try again, or email us directly and we&apos;ll
          pick it up from there.
        </p>
      ) : null}

      <div className="mt-9 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={handleBack}
          disabled={stepIndex === 0}
          className="inline-flex cursor-pointer items-center justify-center rounded-full border border-hairline px-7 py-3.5 text-sm font-medium transition-[color,border-color,transform] duration-200 hover:border-accent-soft hover:text-accent-text active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40"
        >
          Back
        </button>

        {isLastStep ? (
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex cursor-pointer items-center justify-center rounded-full bg-ink px-8 py-3.5 text-sm font-medium text-bg transition-[background-color,transform] duration-200 hover:bg-accent-text active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
          >
            {status === "submitting" ? "Sending…" : "Send enquiry"}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="group inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full bg-ink px-8 py-3.5 text-sm font-medium text-bg transition-[background-color,transform] duration-200 hover:bg-accent-text active:scale-[0.98]"
          >
            Continue
          </button>
        )}
      </div>
    </form>
  );
}
