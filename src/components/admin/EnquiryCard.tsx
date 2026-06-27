"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import {
  ENQUIRY_STATUSES,
  STATUS_LABEL,
  STATUS_COLOR,
  type EnquiryStatusValue,
} from "@/lib/site";
import { MailIcon, PhoneIcon, ClockIcon } from "./icons";

type Meta = { label: string; value: string | null };

export type EnquiryData = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  message: string;
  status: string;
  adminNote: string | null;
  createdAt: string;
  meta: Meta[];
};

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-green-deep px-5 py-2 text-[13px] font-medium text-white transition hover:bg-green disabled:opacity-60"
    >
      {pending ? "Saving…" : "Save"}
    </button>
  );
}

export default function EnquiryCard({
  enquiry,
  updateAction,
  deleteAction,
}: {
  enquiry: EnquiryData;
  updateAction: (data: FormData) => void;
  deleteAction: (data: FormData) => void;
}) {
  const status = enquiry.status as EnquiryStatusValue;
  const metas = enquiry.meta.filter((m) => m.value);

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--color-line)] bg-paper shadow-[0_18px_44px_-34px_rgba(20,40,20,0.4)]">
      {/* header */}
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[var(--color-line)] px-5 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-olive/80 to-green-deep text-[16px] font-semibold text-white">
            {(enquiry.name?.[0] ?? "?").toUpperCase()}
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-serif text-[20px] font-semibold text-green-deep">{enquiry.name}</h3>
              <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${STATUS_COLOR[status]}`}>
                {STATUS_LABEL[status]}
              </span>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] text-muted">
              {enquiry.email && (
                <a href={`mailto:${enquiry.email}`} className="inline-flex items-center gap-1.5 text-green-deep underline-offset-2 hover:underline">
                  <MailIcon className="h-3.5 w-3.5" /> {enquiry.email}
                </a>
              )}
              {enquiry.phone && (
                <a href={`tel:${enquiry.phone}`} className="inline-flex items-center gap-1.5 transition hover:text-green-deep">
                  <PhoneIcon className="h-3.5 w-3.5" /> {enquiry.phone}
                </a>
              )}
              <span className="inline-flex items-center gap-1.5">
                <ClockIcon className="h-3.5 w-3.5" /> {enquiry.createdAt}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-4">
        {metas.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {metas.map((m) => (
              <span key={m.label} className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-[12px] text-ink ring-1 ring-[var(--color-line)]">
                <span className="text-[10.5px] font-medium uppercase tracking-[0.08em] text-olive">{m.label}</span>
                <span className="text-muted">·</span>
                {m.value}
              </span>
            ))}
          </div>
        )}

        <p className="whitespace-pre-wrap rounded-xl bg-white p-4 text-[14px] leading-[1.65] text-ink ring-1 ring-[var(--color-line)]">
          {enquiry.message}
        </p>

        {/* controls */}
        <form action={updateAction} className="mt-4 flex flex-wrap items-end gap-3">
          <input type="hidden" name="id" value={enquiry.id} />
          <label className="block">
            <span className="mb-1 block text-[11.5px] font-medium uppercase tracking-[0.06em] text-muted">Status</span>
            <select name="status" defaultValue={enquiry.status} className="rounded-lg border border-[var(--color-line)] bg-white px-3 py-2 text-[13px] outline-none transition focus:border-green focus:shadow-[0_0_0_3px_rgba(60,128,73,0.12)]">
              {ENQUIRY_STATUSES.map((s) => (
                <option key={s} value={s}>{STATUS_LABEL[s]}</option>
              ))}
            </select>
          </label>
          <label className="block min-w-[200px] flex-1">
            <span className="mb-1 block text-[11.5px] font-medium uppercase tracking-[0.06em] text-muted">Internal note</span>
            <input name="adminNote" defaultValue={enquiry.adminNote ?? ""} placeholder="Add a note…" className="w-full rounded-lg border border-[var(--color-line)] bg-white px-3 py-2 text-[13px] outline-none transition focus:border-green focus:shadow-[0_0_0_3px_rgba(60,128,73,0.12)]" />
          </label>
          <SaveButton />
          <DeleteForm id={enquiry.id} deleteAction={deleteAction} />
        </form>
      </div>
    </div>
  );
}

function DeleteForm({
  id,
  deleteAction,
}: {
  id: number;
  deleteAction: (data: FormData) => void;
}) {
  const [confirming, setConfirming] = useState(false);
  if (confirming) {
    return (
      <form action={deleteAction} className="inline-flex items-center gap-2">
        <input type="hidden" name="id" value={id} />
        <button type="submit" className="rounded-lg bg-red-600 px-3 py-2 text-[12px] font-medium text-white hover:bg-red-700">Confirm delete</button>
        <button type="button" onClick={() => setConfirming(false)} className="rounded-lg border border-[var(--color-line)] px-3 py-2 text-[12px]">Cancel</button>
      </form>
    );
  }
  return (
    <button type="button" onClick={() => setConfirming(true)} className="rounded-lg px-3 py-2 text-[12.5px] text-muted transition hover:bg-[rgba(220,38,38,0.08)] hover:text-red-600">
      Delete
    </button>
  );
}
