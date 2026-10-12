"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, LoaderCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import {
  submissionSchema,
  challenges,
  interests,
  type Submission,
} from "@/lib/validation";
export default function LeadForm({
  kind = "interest",
}: {
  kind?: "interest" | "contact";
}) {
  const [requestId, setRequestId] = useState<string | null>(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Submission>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      requestId: "00000000-0000-4000-8000-000000000000",
      kind,
      name: "",
      email: "",
      jobTitle: "",
      company: "",
      country: "",
      website: "",
      brands: "",
      rooftops: "",
      challenge: "",
      interests: [],
      comments: "",
      marketingConsent: false,
      honeypot: "",
      source: kind === "interest" ? "/register-interest" : "/contact",
    },
  });
  async function submit(values: Submission) {
    setError("");
    const id = requestId ?? crypto.randomUUID();
    setRequestId(id);
    values.requestId = id;
    setValue("requestId", id);
    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const body = await response.json();
      if (!response.ok) {
        setError(
          body.error ||
            "Your submission could not be confirmed. Please try again.",
        );
        return;
      }
      setSuccess(body.message);
    } catch {
      setError(
        "We could not confirm your submission. Please retry; the same request will not be saved twice.",
      );
    }
  }
  if (success)
    return (
      <div role="status" className="form-success">
        <CheckCircle2 size={42} />
        <h2>Thank you for reaching out.</h2>
        <p>{success}</p>
        <Link className="button secondary" href="/platform">
          Explore the platform <ArrowUpRight size={17} />
        </Link>
      </div>
    );
  const field = (
    name: keyof Submission,
    label: string,
    required = false,
    type = "text",
    placeholder = "",
  ) => (
    <div className="field">
      <label htmlFor={name}>
        {label}
        {required && <span> *</span>}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        autoComplete={
          name === "name"
            ? "name"
            : name === "email"
              ? "email"
              : name === "company"
                ? "organization"
                : name === "jobTitle"
                  ? "organization-title"
                  : undefined
        }
        {...register(name)}
        aria-required={required}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
      />
      {errors[name] && (
        <span className="field-error" id={`${name}-error`}>
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="lead-form">
      <p className="form-required">* Required fields</p>
      <div className="form-grid">
        {field("name", "Full name", true)}
        {field("email", "Work email", true, "email")}
        {kind === "interest" && field("jobTitle", "Job title", true)}
        {field("company", "Dealership / company name", true)}
        {field("country", "Country", true, "text", "e.g. South Africa")}
        {kind === "interest" && (
          <>
            {field("website", "Company website", false, "url", "https://")}
            {field("brands", "Automotive brands represented")}
            {field(
              "rooftops",
              "Number of dealership locations",
              false,
              "number",
            )}
          </>
        )}
      </div>
      {kind === "interest" && (
        <>
          <div className="field">
            <label htmlFor="challenge">
              Primary operational challenge <span>*</span>
            </label>
            <select
              id="challenge"
              {...register("challenge")}
              aria-required
              aria-invalid={!!errors.challenge}
              aria-describedby={
                errors.challenge ? "challenge-error" : undefined
              }
            >
              <option value="">
                Select the area that needs the most attention
              </option>
              {challenges.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
            {errors.challenge && (
              <span id="challenge-error" className="field-error">
                {errors.challenge.message}
              </span>
            )}
          </div>
          <fieldset className="interest-options">
            <legend>How would you like to participate?</legend>
            {interests.map((x) => (
              <label className="checkbox-label" key={x}>
                <input type="checkbox" value={x} {...register("interests")} />
                <span>{x}</span>
              </label>
            ))}
            <p className="form-hint">
              Future demonstrations and early access are subject to validation
              and product readiness.
            </p>
          </fieldset>
        </>
      )}
      <div className="field">
        <label htmlFor="comments">
          {kind === "contact" ? "Your message *" : "Additional comments"}
        </label>
        <textarea
          id="comments"
          rows={4}
          {...register("comments")}
          aria-required={kind === "contact"}
          aria-invalid={!!errors.comments}
          aria-describedby={errors.comments ? "comments-error" : undefined}
          placeholder="Tell us about your operation and what you’d like to discuss."
        />
        {errors.comments && (
          <span id="comments-error" className="field-error">
            {errors.comments.message}
          </span>
        )}
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="company-fax">Leave this field empty</label>
        <input
          id="company-fax"
          tabIndex={-1}
          autoComplete="off"
          {...register("honeypot")}
        />
      </div>
      <div className="consent-box">
        <label className="checkbox-label">
          <input
            type="checkbox"
            {...register("privacyAcknowledged")}
            aria-invalid={!!errors.privacyAcknowledged}
            aria-describedby="privacy-error"
          />
          <span>
            I have read the{" "}
            <Link href="/privacy" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </Link>{" "}
            and understand how my enquiry will be processed. *
          </span>
        </label>
        {errors.privacyAcknowledged && (
          <span id="privacy-error" className="field-error">
            {errors.privacyAcknowledged.message}
          </span>
        )}
        <label className="checkbox-label">
          <input
            type="checkbox"
            {...register("marketingConsent")}
            aria-invalid={!!errors.marketingConsent}
            aria-describedby="marketing-error"
          />
          <span>
            I agree to receive AOP product and development updates by email. I
            can withdraw this consent at any time. (Optional)
          </span>
        </label>
        {errors.marketingConsent && (
          <span id="marketing-error" className="field-error">
            {errors.marketingConsent.message}
          </span>
        )}
      </div>
      {error && (
        <div className="form-error" role="alert">
          {error}
        </div>
      )}
      <button className="button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <LoaderCircle className="spinner" size={18} /> Saving your enquiry…
          </>
        ) : (
          <>
            {kind === "interest"
              ? "Register Your Interest"
              : "Send Your Enquiry"}
            <ArrowUpRight size={18} />
          </>
        )}
      </button>
      <p className="form-hint">
        No subscription. No implementation commitment. Your preferences stay in
        your control.
      </p>
    </form>
  );
}
