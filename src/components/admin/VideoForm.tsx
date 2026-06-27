"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { saveVideo, type VideoFormState } from "@/app/admin/(protected)/actions";

const initial: VideoFormState = { error: "" };

export type VideoFormValues = {
  id?: number;
  title: string;
  youtubeId: string;
  description: string;
  category: string;
  sortOrder: number;
  published: boolean;
};

const field =
  "w-full rounded-lg border border-[var(--color-line)] bg-white px-3.5 py-2.5 text-[14px] outline-none focus:border-green";
const lbl = "mb-1.5 block text-[13px] font-medium text-ink";
const hint = "mt-1 text-[12px] text-muted";

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="rounded-lg bg-green-deep px-6 py-2.5 text-[14px] font-semibold text-white transition hover:bg-green disabled:opacity-60">
      {pending ? "Saving…" : "Save video"}
    </button>
  );
}

export default function VideoForm({ values }: { values?: Partial<VideoFormValues> }) {
  const [state, formAction] = useActionState(saveVideo, initial);
  const v = values ?? {};

  return (
    <form action={formAction} className="grid max-w-[640px] gap-4">
      {values?.id ? <input type="hidden" name="id" value={values.id} /> : null}

      <div>
        <label className={lbl}>Title *</label>
        <input name="title" defaultValue={v.title} required placeholder="10-minute morning breath" className={field} />
      </div>
      <div>
        <label className={lbl}>YouTube URL or video id *</label>
        <input name="youtubeId" defaultValue={v.youtubeId} required placeholder="https://youtu.be/dQw4w9WgXcQ" className={field} />
        <p className={hint}>Paste any YouTube link (watch, youtu.be, shorts, embed) — we extract the id automatically.</p>
      </div>
      <div>
        <label className={lbl}>Description</label>
        <textarea name="description" defaultValue={v.description} rows={3} className={`${field} resize-y`} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={lbl}>Category</label>
          <input name="category" defaultValue={v.category ?? "Practice"} className={field} />
        </div>
        <div>
          <label className={lbl}>Sort order</label>
          <input name="sortOrder" type="number" defaultValue={v.sortOrder ?? 0} className={field} />
          <p className={hint}>Lower numbers appear first.</p>
        </div>
      </div>

      <label className="flex items-center gap-2.5">
        <input type="checkbox" name="published" defaultChecked={v.published ?? true} className="h-4 w-4 accent-[var(--color-green-deep)]" />
        <span className="text-[14px] font-medium text-ink">Published (visible on the site)</span>
      </label>

      <div className="mt-2 flex items-center gap-3">
        <SaveButton />
        <Link href="/admin/videos" className="text-[13px] text-muted no-underline hover:text-green-deep">Cancel</Link>
      </div>
      {state.error && <p className="text-[13px] text-red-600">{state.error}</p>}
    </form>
  );
}
