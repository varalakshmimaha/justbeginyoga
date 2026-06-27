"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AdminSidebar from "./AdminSidebar";
import { logout } from "@/app/admin/actions";
import { ExternalIcon, LogoutIcon } from "./icons";

export default function AdminShell({
  email,
  initial,
  children,
}: {
  email: string;
  initial: string;
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4f5f7] font-sans text-ink">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform overflow-y-auto border-r border-[var(--color-line)] bg-white transition-transform duration-200 md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link href="/admin" className="flex items-center gap-2.5 border-b border-[var(--color-line)] px-5 py-[15px] no-underline">
          <Image src="/assets/jb-logo.png" alt="" width={34} height={34} className="h-8 w-auto" />
          <span className="flex flex-col leading-none">
            <span className="font-serif text-[17px] font-semibold text-green-deep">JBY Admin</span>
            <span className="mt-0.5 text-[9.5px] uppercase tracking-[0.16em] text-gray-400">Just Begin Yoga</span>
          </span>
        </Link>
        <AdminSidebar onNavigate={() => setMobileOpen(false)} />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)} className="fixed inset-0 z-30 bg-black/30 md:hidden" />
      )}

      {/* Main column */}
      <div className="md:pl-64">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[var(--color-line)] bg-white px-4 py-2.5 sm:px-6">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 md:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
          <div className="hidden md:block" />

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              aria-label="View site"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-green-deep"
            >
              <ExternalIcon className="h-[18px] w-[18px]" />
            </Link>

            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2.5 transition hover:bg-gray-100"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-olive to-green-deep text-[13px] font-semibold text-white">
                  {initial}
                </span>
                <span className="hidden text-[13.5px] font-medium text-ink sm:inline">Admin User</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="text-gray-400"><path d="M6 9l6 6 6-6" /></svg>
              </button>

              {menuOpen && (
                <>
                  <div onClick={() => setMenuOpen(false)} className="fixed inset-0 z-10" />
                  <div className="absolute right-0 top-[calc(100%+8px)] z-20 w-56 overflow-hidden rounded-xl border border-[var(--color-line)] bg-white shadow-[0_20px_44px_-20px_rgba(20,40,20,0.4)]">
                    <div className="border-b border-[var(--color-line)] px-4 py-3">
                      <div className="text-[13px] font-medium text-ink">Admin User</div>
                      <div className="truncate text-[12px] text-gray-500">{email}</div>
                    </div>
                    <Link href="/" target="_blank" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] text-gray-600 no-underline transition hover:bg-gray-50">
                      <ExternalIcon className="h-4 w-4" /> View site
                    </Link>
                    <form action={logout}>
                      <button className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-[13.5px] text-red-600 transition hover:bg-red-50">
                        <LogoutIcon className="h-4 w-4" /> Sign out
                      </button>
                    </form>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
