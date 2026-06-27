"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { saveSettings, type SettingsFormState } from "@/app/admin/(protected)/actions";

const initial: SettingsFormState = { ok: false, error: "" };

export type SettingsValues = {
  phone?: string | null;
  email?: string | null;
  whatsapp?: string | null;
  address?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  logoUrl?: string | null;
  faviconUrl?: string | null;
  gaId?: string | null;
  gscVerification?: string | null;
  razorpayEnabled?: boolean;
  razorpayKeyId?: string | null;
  hasRazorpaySecret?: boolean;
};

const field =
  "w-full rounded-lg border border-[var(--color-line)] bg-white px-3.5 py-2.5 text-[14px] outline-none transition focus:border-green focus:shadow-[0_0_0_3px_rgba(60,128,73,0.12)]";
const lbl = "mb-1.5 block text-[13px] font-medium text-ink";
const hint = "mt-1 text-[12px] text-muted";
const cardCls = "rounded-2xl border border-[var(--color-line)] bg-paper p-6";
const sectionTitle = "font-serif text-[19px] font-semibold text-green-deep";

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="rounded-lg bg-green-deep px-7 py-2.5 text-[14px] font-semibold text-white transition hover:bg-green disabled:opacity-60">
      {pending ? "Saving…" : "Save settings"}
    </button>
  );
}

export default function SettingsForm({ values }: { values: SettingsValues }) {
  const [state, formAction] = useActionState(saveSettings, initial);
  const v = values;

  return (
    <form action={formAction} className="space-y-5">
      {/* Contact */}
      <div className={cardCls}>
        <h2 className={sectionTitle}>Contact information</h2>
        <p className="mb-5 mt-1 text-[13px] text-muted">Shown in the header, footer and contact buttons across the site.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={lbl}>Phone (display)</label>
            <input name="phone" defaultValue={v.phone ?? ""} placeholder="+91 84317 43227" className={field} />
          </div>
          <div>
            <label className={lbl}>WhatsApp link</label>
            <input name="whatsapp" defaultValue={v.whatsapp ?? ""} placeholder="https://wa.me/918431743227" className={field} />
          </div>
          <div>
            <label className={lbl}>Email</label>
            <input name="email" defaultValue={v.email ?? ""} placeholder="anushashettyyoga@gmail.com" className={field} />
          </div>
          <div>
            <label className={lbl}>Address</label>
            <input name="address" defaultValue={v.address ?? ""} placeholder="Bengaluru, India" className={field} />
          </div>
          <div>
            <label className={lbl}>Facebook URL</label>
            <input name="facebook" defaultValue={v.facebook ?? ""} placeholder="https://facebook.com/…" className={field} />
          </div>
          <div>
            <label className={lbl}>Instagram URL</label>
            <input name="instagram" defaultValue={v.instagram ?? ""} placeholder="https://instagram.com/…" className={field} />
          </div>
        </div>
      </div>

      {/* Branding */}
      <div className={cardCls}>
        <h2 className={sectionTitle}>Branding</h2>
        <p className="mb-5 mt-1 text-[13px] text-muted">Upload images to <code className="rounded bg-white px-1 ring-1 ring-[var(--color-line)]">/public/assets</code> then reference the path, or paste a full URL.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={lbl}>Logo</label>
            <input name="logoUrl" defaultValue={v.logoUrl ?? ""} placeholder="/assets/jb-logo.png" className={field} />
            <p className={hint}>Used in the header & footer.</p>
          </div>
          <div>
            <label className={lbl}>Favicon</label>
            <input name="faviconUrl" defaultValue={v.faviconUrl ?? ""} placeholder="/assets/jb-logo.png" className={field} />
            <p className={hint}>Browser-tab icon (PNG/ICO/SVG).</p>
          </div>
        </div>
      </div>

      {/* Analytics & SEO */}
      <div className={cardCls}>
        <h2 className={sectionTitle}>Analytics &amp; Search Console</h2>
        <p className="mb-5 mt-1 text-[13px] text-muted">Leave blank to keep these turned off.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={lbl}>Google Analytics ID (GA4)</label>
            <input name="gaId" defaultValue={v.gaId ?? ""} placeholder="G-XXXXXXXXXX" className={field} />
          </div>
          <div>
            <label className={lbl}>Search Console verification</label>
            <input name="gscVerification" defaultValue={v.gscVerification ?? ""} placeholder="google-site-verification token" className={field} />
          </div>
        </div>
      </div>

      {/* Razorpay */}
      <div className={cardCls}>
        <h2 className={sectionTitle}>Razorpay payments</h2>
        <p className="mb-5 mt-1 text-[13px] text-muted">Enter your keys and toggle it on to accept online payments.</p>
        <label className="mb-4 flex items-center gap-2.5">
          <input type="checkbox" name="razorpayEnabled" defaultChecked={v.razorpayEnabled} className="h-4 w-4 accent-[var(--color-green-deep)]" />
          <span className="text-[14px] font-medium text-ink">Enable Razorpay checkout</span>
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={lbl}>Key ID</label>
            <input name="razorpayKeyId" defaultValue={v.razorpayKeyId ?? ""} placeholder="rzp_live_xxxxxxxx" className={field} />
          </div>
          <div>
            <label className={lbl}>Key Secret</label>
            <input name="razorpayKeySecret" type="password" defaultValue="" placeholder={v.hasRazorpaySecret ? "•••••••• (saved — leave blank to keep)" : "Key secret"} className={field} />
            <p className={hint}>Stored securely server-side; never shown again.</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <SaveButton />
        {state.ok && <span className="text-[13px] font-medium text-green-deep">✓ Settings saved.</span>}
        {state.error && <span className="text-[13px] text-red-600">{state.error}</span>}
      </div>
    </form>
  );
}
