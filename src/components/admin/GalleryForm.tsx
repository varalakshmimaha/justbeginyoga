"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { saveGalleryImage, type GalleryFormState } from "@/app/admin/(protected)/actions";

const initial: GalleryFormState = { error: "" };

export type GalleryFormValues = {
  id?: number;
  imageUrl: string;
  title: string;
  caption: string;
  category: string;
  sortOrder: number;
  published: boolean;
};

const field =
  "w-full rounded-lg border border-[var(--color-line)] bg-white px-3.5 py-2.5 text-[14px] outline-none transition focus:border-green focus:shadow-[0_0_0_3px_rgba(60,128,73,0.12)]";
const lbl = "mb-1.5 block text-[13px] font-medium text-ink";
const hint = "mt-1 text-[12px] text-muted";

function SaveButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending || disabled} className="rounded-lg bg-green-deep px-6 py-2.5 text-[14px] font-semibold text-white transition hover:bg-green disabled:opacity-60">
      {pending ? "Saving…" : "Save image"}
    </button>
  );
}

export default function GalleryForm({ values }: { values?: Partial<GalleryFormValues> }) {
  const [state, formAction] = useActionState(saveGalleryImage, initial);
  const v = values ?? {};

  const [imageUrl, setImageUrl] = useState(v.imageUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploadError("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setImageUrl(data.url);
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <form action={formAction} className="grid max-w-[640px] gap-4">
      {values?.id ? <input type="hidden" name="id" value={values.id} /> : null}

      {/* Upload from device */}
      <div>
        <label className={lbl}>Image</label>
        <div
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const f = e.dataTransfer.files?.[0];
            if (f) handleFile(f);
          }}
          className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[var(--color-line)] bg-paper px-6 py-8 text-center transition hover:border-olive/50 hover:bg-[rgba(134,167,60,0.06)]"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-deep/10 text-green-deep">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 16V4M7 9l5-5 5 5M5 20h14" />
            </svg>
          </span>
          <span className="text-[14px] font-medium text-ink">
            {uploading ? "Uploading…" : "Click to select an image from your device"}
          </span>
          <span className="text-[12px] text-muted">or drag &amp; drop · JPG, PNG, WebP · up to 5 MB</span>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
        {uploadError && <p className="mt-1 text-[12px] text-red-600">{uploadError}</p>}
      </div>

      {/* Preview */}
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt="" className="max-h-60 w-auto rounded-xl border border-[var(--color-line)] object-cover" />
      ) : null}

      {/* Optional URL */}
      <div>
        <label className={lbl}>Image URL <span className="font-normal text-muted">(optional)</span></label>
        <input
          name="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
          placeholder="/assets/river-pose.jpeg"
          className={field}
        />
        <p className={hint}>Auto-filled when you upload above. Or paste a path in /public, or a full https:// URL.</p>
      </div>

      <div>
        <label className={lbl}>Title</label>
        <input name="title" defaultValue={v.title} placeholder="Morning flow session" className={field} />
      </div>
      <div>
        <label className={lbl}>Caption</label>
        <textarea name="caption" defaultValue={v.caption} rows={2} className={`${field} resize-y`} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={lbl}>Category</label>
          <input name="category" defaultValue={v.category ?? "Classes"} className={field} />
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
        <SaveButton disabled={uploading} />
        <Link href="/admin/gallery" className="text-[13px] text-muted no-underline hover:text-green-deep">Cancel</Link>
      </div>
      {state.error && <p className="text-[13px] text-red-600">{state.error}</p>}
    </form>
  );
}
