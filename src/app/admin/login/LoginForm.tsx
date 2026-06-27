"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login, type LoginState } from "../actions";

const initial: LoginState = { error: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 w-full rounded-lg bg-green-deep py-3 text-[14px] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-green disabled:opacity-60"
    >
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useActionState(login, initial);
  return (
    <form action={formAction} className="space-y-4">
      <label className="block">
        <span className="mb-1.5 block text-[13px] font-medium text-ink">Email</span>
        <input name="email" type="email" required autoFocus className="w-full rounded-lg border border-[var(--color-line)] bg-white px-3.5 py-2.5 text-[15px] outline-none focus:border-green" />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-[13px] font-medium text-ink">Password</span>
        <input name="password" type="password" required className="w-full rounded-lg border border-[var(--color-line)] bg-white px-3.5 py-2.5 text-[15px] outline-none focus:border-green" />
      </label>
      {state.error && <p className="text-[13px] text-red-600">{state.error}</p>}
      <SubmitButton />
    </form>
  );
}
