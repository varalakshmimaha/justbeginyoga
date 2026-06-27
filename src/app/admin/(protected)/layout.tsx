import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { logout } from "../actions";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-bg font-sans text-ink">
      {/* Topbar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[var(--color-line)] bg-paper px-5 py-3">
        <Link href="/admin" className="flex items-center gap-2.5 no-underline">
          <Image src="/assets/jb-logo.png" alt="" width={36} height={36} className="h-9 w-auto" />
          <span className="font-serif text-[18px] font-semibold text-green-deep">JBY Admin</span>
        </Link>
        <div className="flex items-center gap-4 text-[13px]">
          <Link href="/" target="_blank" className="text-muted no-underline hover:text-green-deep">View site ↗</Link>
          <span className="hidden text-muted sm:inline">{session.email}</span>
          <form action={logout}>
            <button className="rounded-lg border border-[var(--color-line)] px-3 py-1.5 text-ink transition hover:bg-white">
              Sign out
            </button>
          </form>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1200px] gap-6 px-5 py-6">
        <aside className="hidden w-[210px] shrink-0 md:block">
          <div className="sticky top-[72px]">
            <AdminSidebar />
          </div>
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
