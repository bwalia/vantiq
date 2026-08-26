"use client";

import type { ReactNode } from "react";
import { useId } from "react";

const controlClasses =
  "w-full rounded-[3px] border border-hairline bg-bg px-4 py-3 text-[0.95rem] text-ink transition-colors placeholder:text-muted/70 hover:border-accent-soft focus:border-accent focus:outline-none aria-[invalid=true]:border-accent-strong";

function FieldShell({
  label,
  hint,
  error,
  htmlFor,
  describedById,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  htmlFor?: string;
  describedById: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </label>
      {hint ? (
        <p id={`${describedById}-hint`} className="text-xs leading-relaxed text-muted">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p id={`${describedById}-error`} className="text-xs text-accent-strong">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function describedBy(id: string, hint?: string, error?: string) {
  const parts = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean);
  return parts.length > 0 ? parts.join(" ") : undefined;
}

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  error?: string;
  placeholder?: string;
  type?: "text" | "email" | "tel" | "number";
  inputMode?: "text" | "email" | "tel" | "numeric";
  autoComplete?: string;
  min?: number;
  max?: number;
};

export function TextField({
  label,
  value,
  onChange,
  hint,
  error,
  placeholder,
  type = "text",
  inputMode,
  autoComplete,
  min,
  max,
}: TextFieldProps) {
  const id = useId();

  return (
    <FieldShell
      label={label}
      hint={hint}
      error={error}
      htmlFor={id}
      describedById={id}
    >
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={controlClasses}
      />
    </FieldShell>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  hint,
  error,
  placeholder,
  rows = 4,
}: Omit<TextFieldProps, "type" | "inputMode" | "autoComplete" | "min" | "max"> & {
  rows?: number;
}) {
  const id = useId();

  return (
    <FieldShell label={label} hint={hint} error={error} htmlFor={id} describedById={id}>
      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={`${controlClasses} resize-y`}
      />
    </FieldShell>
  );
}

type ChoiceProps = {
  legend: string;
  hint?: string;
  error?: string;
  options: readonly string[];
};

export function RadioGroup({
  legend,
  hint,
  error,
  options,
  value,
  onChange,
}: ChoiceProps & { value: string; onChange: (value: string) => void }) {
  const id = useId();
  const name = `${id}-radio`;

  return (
    <fieldset
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy(id, hint, error)}
      className="flex flex-col gap-2"
    >
      <legend className="text-sm font-medium">{legend}</legend>
      {hint ? (
        <p id={`${id}-hint`} className="text-xs leading-relaxed text-muted">
          {hint}
        </p>
      ) : null}

      <div className="mt-1 grid gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const checked = value === option;
          return (
            <label
              key={option}
              className={[
                "flex cursor-pointer items-center gap-3 rounded-[3px] border px-4 py-3 text-[0.9rem] transition-colors",
                checked
                  ? "border-accent bg-accent-wash text-ink"
                  : "border-hairline hover:border-accent-soft",
              ].join(" ")}
            >
              <input
                type="radio"
                name={name}
                value={option}
                checked={checked}
                onChange={() => onChange(option)}
                className="size-4 shrink-0 accent-[var(--accent)]"
              />
              <span>{option}</span>
            </label>
          );
        })}
      </div>

      {error ? (
        <p id={`${id}-error`} className="text-xs text-accent-strong">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

export function CheckboxGroup({
  legend,
  hint,
  error,
  options,
  values,
  onToggle,
}: ChoiceProps & { values: readonly string[]; onToggle: (value: string) => void }) {
  const id = useId();

  return (
    <fieldset
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy(id, hint, error)}
      className="flex flex-col gap-2"
    >
      <legend className="text-sm font-medium">{legend}</legend>
      {hint ? (
        <p id={`${id}-hint`} className="text-xs leading-relaxed text-muted">
          {hint}
        </p>
      ) : null}

      <div className="mt-1 grid gap-2">
        {options.map((option) => {
          const checked = values.includes(option);
          return (
            <label
              key={option}
              className={[
                "flex cursor-pointer items-center gap-3 rounded-[3px] border px-4 py-3 text-[0.9rem] transition-colors",
                checked
                  ? "border-accent bg-accent-wash text-ink"
                  : "border-hairline hover:border-accent-soft",
              ].join(" ")}
            >
              <input
                type="checkbox"
                value={option}
                checked={checked}
                onChange={() => onToggle(option)}
                className="size-4 shrink-0 accent-[var(--accent)]"
              />
              <span>{option}</span>
            </label>
          );
        })}
      </div>

      {error ? (
        <p id={`${id}-error`} className="text-xs text-accent-strong">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
