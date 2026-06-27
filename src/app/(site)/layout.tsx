import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getSettings } from "@/lib/settings";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const s = await getSettings();
  return (
    <div className="relative w-full overflow-x-clip bg-bg font-sans text-ink">
      <SiteHeader logoUrl={s.logoUrl} facebook={s.facebook} instagram={s.instagram} />
      <main className="min-h-screen">{children}</main>
      <SiteFooter />
    </div>
  );
}
