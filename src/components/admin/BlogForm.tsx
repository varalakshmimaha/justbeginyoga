"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { saveBlogPost, type BlogFormState } from "@/app/admin/(protected)/actions";

const initial: BlogFormState = { error: "" };

export type BlogFormValues = {
  id?: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  body: string;
  coverImage: string;
  author: string;
  readMinutes: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
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
      {pending ? "Saving…" : "Save post"}
    </button>
  );
}

export default function BlogForm({ values }: { values?: Partial<BlogFormValues> }) {
  const [state, formAction] = useActionState(saveBlogPost, initial);
  const v = values ?? {};

  return (
    <form action={formAction} className="grid gap-6 lg:grid-cols-[1fr_320px]">
      {values?.id ? <input type="hidden" name="id" value={values.id} /> : null}

      {/* Main column */}
      <div className="space-y-4">
        <div>
          <label className={lbl}>Title *</label>
          <input name="title" defaultValue={v.title} required className={field} />
        </div>
        <div>
          <label className={lbl}>Excerpt</label>
          <textarea name="excerpt" defaultValue={v.excerpt} rows={2} className={`${field} resize-y`} />
          <p className={hint}>Short summary shown on cards and used as a meta description fallback.</p>
        </div>
        <div>
          <label className={lbl}>Body (HTML) *</label>
          <textarea name="body" defaultValue={v.body} rows={20} required className={`${field} resize-y font-mono text-[13px] leading-[1.6]`} />
          <p className={hint}>
            Accepts HTML: &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;/&lt;li&gt;, &lt;blockquote&gt;, &lt;strong&gt;, and links e.g.
            {" "}&lt;a href=&quot;/blog/other-post&quot;&gt;…&lt;/a&gt; for internal back-linking.
          </p>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-4">
        <div className="rounded-2xl border border-[var(--color-line)] bg-paper p-4">
          <label className="flex items-center gap-2.5">
            <input type="checkbox" name="published" defaultChecked={v.published} className="h-4 w-4 accent-[var(--color-green-deep)]" />
            <span className="text-[14px] font-medium text-ink">Published (visible on the site)</span>
          </label>
          <div className="mt-4 flex items-center gap-3">
            <SaveButton />
            <Link href="/admin/blog" className="text-[13px] text-muted no-underline hover:text-green-deep">Cancel</Link>
          </div>
          {state.error && <p className="mt-3 text-[13px] text-red-600">{state.error}</p>}
        </div>

        <div className="space-y-4 rounded-2xl border border-[var(--color-line)] bg-paper p-4">
          <div>
            <label className={lbl}>Slug</label>
            <input name="slug" defaultValue={v.slug} placeholder="auto from title" className={field} />
            <p className={hint}>URL: /blog/&lt;slug&gt;. Leave blank to auto-generate.</p>
          </div>
          <div>
            <label className={lbl}>Category</label>
            <input name="category" defaultValue={v.category ?? "Wellbeing"} className={field} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={lbl}>Author</label>
              <input name="author" defaultValue={v.author ?? "Anusha Shetty"} className={field} />
            </div>
            <div>
              <label className={lbl}>Read (min)</label>
              <input name="readMinutes" type="number" min={1} defaultValue={v.readMinutes ?? 5} className={field} />
            </div>
          </div>
          <div>
            <label className={lbl}>Cover image URL</label>
            <input name="coverImage" defaultValue={v.coverImage} placeholder="/assets/river-pose.jpeg" className={field} />
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-[var(--color-line)] bg-paper p-4">
          <h3 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-olive">SEO</h3>
          <div>
            <label className={lbl}>Meta title</label>
            <input name="metaTitle" defaultValue={v.metaTitle} className={field} />
          </div>
          <div>
            <label className={lbl}>Meta description</label>
            <textarea name="metaDescription" defaultValue={v.metaDescription} rows={2} className={`${field} resize-y`} />
          </div>
          <div>
            <label className={lbl}>Keywords</label>
            <input name="keywords" defaultValue={v.keywords} placeholder="comma, separated, keywords" className={field} />
          </div>
          <div>
            <label className={lbl}>OG image URL</label>
            <input name="ogImage" defaultValue={v.ogImage} className={field} />
          </div>
        </div>
      </div>
    </form>
  );
}
