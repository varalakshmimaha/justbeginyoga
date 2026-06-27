import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { logout } from "../actions";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { ExternalIcon, LogoutIcon } from "@/components/admin/icons";

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const initial = (session.email?.[0] ?? "A").toUpperCase();

  return (
    <div className="min-h-screen bg-[var(--color-bg)] font-sans text-ink">
      {/* Topbar */}
      <header className="sticky top-0 z-30 border-b border-[var(--color-line)] bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-3">
          <Link href="/admin" className="flex items-center gap-2.5 no-underline">
            <Image src="/assets/jb-logo.png" alt="" width={36} height={36} className="h-9 w-auto" />
            <span className="flex flex-col leading-none">
              <span className="font-serif text-[18px] font-semibold text-green-deep">JBY Admin</span>
              <span className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-muted">Just Begin Yoga</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden items-center gap-1.5 rounded-full border border-[var(--color-line)] bg-white px-3.5 py-2 text-[12.5px] text-muted no-underline transition hover:border-olive/40 hover:text-green-deep sm:inline-flex"
            >
              View site <ExternalIcon className="h-3.5 w-3.5" />
            </Link>

            <div className="flex items-center gap-2.5 rounded-full border border-[var(--color-line)] bg-white py-1 pl-1 pr-1.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-olive to-green-deep text-[13px] font-semibold text-white">
                {initial}
              </span>
              <span className="hidden max-w-[160px] truncate text-[12.5px] text-muted md:inline">{session.email}</span>
              <form action={logout}>
                <button
                  aria-label="Sign out"
                  className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[12.5px] text-muted transition hover:bg-[rgba(220,38,38,0.08)] hover:text-red-600"
                >
                  <LogoutIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Sign out</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1280px] gap-6 px-5 py-7">
        <aside className="hidden w-[232px] shrink-0 md:block">
          <div className="sticky top-[84px]">
            <AdminSidebar />
          </div>
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
