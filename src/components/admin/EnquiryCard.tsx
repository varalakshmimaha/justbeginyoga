"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import {
  ENQUIRY_STATUSES,
  STATUS_LABEL,
  STATUS_COLOR,
  type EnquiryStatusValue,
} from "@/lib/site";

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
      className="rounded-lg bg-green-deep px-4 py-2 text-[13px] font-medium text-white transition hover:bg-green disabled:opacity-60"
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

  return (
    <div className="rounded-2xl border border-[var(--color-line)] bg-paper p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-serif text-[20px] font-semibold text-green-deep">{enquiry.name}</h3>
            <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${STATUS_COLOR[status]}`}>
              {STATUS_LABEL[status]}
            </span>
          </div>
          <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-muted">
            {enquiry.email && (
              <a href={`mailto:${enquiry.email}`} className="text-green-deep underline-offset-2 hover:underline">{enquiry.email}</a>
            )}
            {enquiry.phone && (
              <a href={`tel:${enquiry.phone}`} className="hover:text-green-deep">{enquiry.phone}</a>
            )}
            <span>{enquiry.createdAt}</span>
          </div>
        </div>
      </div>

      {enquiry.meta.filter((m) => m.value).length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {enquiry.meta.filter((m) => m.value).map((m) => (
            <span key={m.label} className="rounded-lg bg-white px-2.5 py-1 text-[12px] text-ink ring-1 ring-[var(--color-line)]">
              <span className="text-muted">{m.label}:</span> {m.value}
            </span>
          ))}
        </div>
      )}

      <p className="mt-3 whitespace-pre-wrap rounded-xl bg-white p-3.5 text-[14px] leading-[1.6] text-ink ring-1 ring-[var(--color-line)]">
        {enquiry.message}
      </p>

      <form action={updateAction} className="mt-4 flex flex-wrap items-end gap-3">
        <input type="hidden" name="id" value={enquiry.id} />
        <label className="block">
          <span className="mb-1 block text-[12px] text-muted">Status</span>
          <select name="status" defaultValue={enquiry.status} className="rounded-lg border border-[var(--color-line)] bg-white px-3 py-2 text-[13px] outline-none focus:border-green">
            {ENQUIRY_STATUSES.map((s) => (
              <option key={s} value={s}>{STATUS_LABEL[s]}</option>
            ))}
          </select>
        </label>
        <label className="block min-w-[200px] flex-1">
          <span className="mb-1 block text-[12px] text-muted">Internal note</span>
          <input name="adminNote" defaultValue={enquiry.adminNote ?? ""} placeholder="Add a note…" className="w-full rounded-lg border border-[var(--color-line)] bg-white px-3 py-2 text-[13px] outline-none focus:border-green" />
        </label>
        <SaveButton />
      </form>

      <DeleteForm id={enquiry.id} deleteAction={deleteAction} />
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
  return (
    <div className="mt-2 text-right">
      {confirming ? (
        <form action={deleteAction} className="inline-flex items-center gap-2">
          <input type="hidden" name="id" value={id} />
          <span className="text-[12px] text-muted">Delete permanently?</span>
          <button type="submit" className="rounded-lg bg-red-600 px-3 py-1.5 text-[12px] font-medium text-white hover:bg-red-700">Yes, delete</button>
          <button type="button" onClick={() => setConfirming(false)} className="rounded-lg border border-[var(--color-line)] px-3 py-1.5 text-[12px]">Cancel</button>
        </form>
      ) : (
        <button type="button" onClick={() => setConfirming(true)} className="text-[12px] text-muted hover:text-red-600">
          Delete
        </button>
      )}
    </div>
  );
}
