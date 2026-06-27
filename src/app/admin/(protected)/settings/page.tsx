import SettingsForm from "@/components/admin/SettingsForm";
import { getRawSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const s = await getRawSettings();

  return (
    <div>
      <h1 className="font-serif text-[32px] font-semibold text-green-deep">Settings</h1>
      <p className="mb-6 mt-1 text-[14px] text-muted">
        Manage contact details, branding, analytics and payment integrations. Changes apply across the site immediately.
      </p>
      <SettingsForm
        values={{
          phone: s?.phone,
          email: s?.email,
          whatsapp: s?.whatsapp,
          address: s?.address,
          facebook: s?.facebook,
          instagram: s?.instagram,
          logoUrl: s?.logoUrl,
          faviconUrl: s?.faviconUrl,
          gaId: s?.gaId,
          gscVerification: s?.gscVerification,
          razorpayEnabled: s?.razorpayEnabled ?? false,
          razorpayKeyId: s?.razorpayKeyId,
          hasRazorpaySecret: Boolean(s?.razorpayKeySecret),
        }}
      />
    </div>
  );
}
