"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContactEnquiry, type FormState } from "@/app/actions/enquiries";

const initial: FormState = { ok: false, message: "" };

const inputCls =
  "w-full rounded-xl border border-[var(--color-line)] bg-bg px-4 py-3.5 font-sans text-[15px] text-ink outline-none focus:border-green";
const labelCls =
  "mb-2 block text-[12px] uppercase tracking-[0.12em] text-muted";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-5 w-full rounded-full bg-gradient-to-r from-olive to-green-deep py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-white shadow-[0_16px_36px_-16px_rgba(44,106,57,0.7)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Sending…" : "Send message"}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContactEnquiry, initial);

  return (
    <form
      action={formAction}
      className="rounded-[22px] border border-[var(--color-line)] bg-white p-7 shadow-[0_26px_56px_-32px_rgba(20,40,20,0.5)] sm:p-10"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>Name</span>
          <input name="name" type="text" required className={inputCls} />
        </label>
        <label className="block">
          <span className={labelCls}>Phone</span>
          <input name="phone" type="tel" className={inputCls} />
        </label>
      </div>
      <label className="mt-4 block">
        <span className={labelCls}>Email</span>
        <input name="email" type="email" required className={inputCls} />
      </label>
      <label className="mt-4 block">
        <span className={labelCls}>Interested in</span>
        <select name="service" defaultValue="" className={`${inputCls} cursor-pointer`}>
          <option value="" disabled>Select a service</option>
          <option>Online Personal Classes</option>
          <option>Online Group Classes</option>
          <option>Apartment Classes</option>
          <option>Corporate Classes</option>
          <option>Other</option>
        </select>
      </label>
      <label className="mt-4 block">
        <span className={labelCls}>How can we help?</span>
        <textarea name="message" rows={4} required className={`${inputCls} resize-y`} />
      </label>

      {/* Honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <SubmitButton />

      {state.message && (
        <p className={`mt-3.5 text-center text-[14px] ${state.ok ? "text-green" : "text-red-600"}`}>
          {state.message}
        </p>
      )}
    </form>
  );
}
