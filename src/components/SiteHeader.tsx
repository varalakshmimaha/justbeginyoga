"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site";
import { ChevronDown, InstagramIcon } from "./icons";

const serviceLinks = [
  { href: "/services/personal", label: "Online Personal Classes" },
  { href: "/services/group", label: "Online Group Classes" },
  { href: "/services/apartment", label: "Apartment Classes" },
  { href: "/services/corporate", label: "Corporate Classes" },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services", dropdown: true },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
  { href: "/videos", label: "Videos" },
  { href: "/group-classes", label: "Group Classes" },
  { href: "/contact", label: "Contact Us" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="jb-fade-down fixed inset-x-0 top-0 z-[120] flex items-center justify-between gap-4 border-b border-[var(--color-line)] bg-[rgba(251,248,239,0.9)] px-5 py-3 shadow-[0_8px_30px_-18px_rgba(20,40,20,0.4)] backdrop-blur-md sm:px-8 lg:px-14">
        <Link href="/" className="flex items-center gap-3 text-inherit no-underline">
          <Image src="/assets/jb-logo.png" alt="Just Begin Yoga" width={54} height={54} className="h-[54px] w-auto max-[560px]:h-[42px]" priority />
          <span className="flex flex-col leading-none max-[560px]:hidden">
            <span className="font-serif text-[20px] font-bold tracking-[0.18em] text-green-deep">JUST BEGIN</span>
            <span className="mt-[3px] text-[8.5px] tracking-[0.34em] text-olive">WHERE YOGA BEGINS</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 text-[13px] tracking-[0.04em] lg:flex xl:gap-[30px]">
          {navLinks.map((l) =>
            l.dropdown ? (
              <span key={l.href} className="group relative inline-flex items-center">
                <Link
                  href={l.href}
                  className={`inline-flex items-center gap-1.5 no-underline transition-colors hover:text-green ${isActive(l.href) ? "font-medium text-green-deep" : "text-ink"}`}
                >
                  Services <ChevronDown className="h-[11px] w-[11px]" />
                </Link>
                <div className="invisible absolute left-1/2 top-full z-[130] min-w-[236px] -translate-x-1/2 translate-y-[10px] rounded-[14px] border border-[rgba(34,48,29,0.1)] bg-white p-2 pt-3.5 opacity-0 shadow-[0_24px_48px_-18px_rgba(20,40,20,0.45)] transition-all group-hover:visible group-hover:translate-y-0.5 group-hover:opacity-100">
                  {serviceLinks.map((s) => (
                    <Link key={s.href} href={s.href} className="block rounded-[9px] px-3.5 py-2.5 text-[13.5px] text-ink no-underline transition-colors hover:bg-[rgba(134,167,60,0.12)] hover:text-green-deep">
                      {s.label}
                    </Link>
                  ))}
                  <div className="mx-2.5 my-1.5 h-px bg-[rgba(34,48,29,0.1)]" />
                  <Link href="/services" className="block rounded-[9px] px-3.5 py-2.5 text-[13.5px] font-semibold text-green-deep no-underline hover:bg-[rgba(134,167,60,0.12)]">
                    All Services
                  </Link>
                </div>
              </span>
            ) : (
              <Link key={l.href} href={l.href} className={`no-underline transition-colors hover:text-green ${isActive(l.href) ? "font-medium text-green-deep" : "text-ink"}`}>
                {l.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2.5 lg:flex">
            <a href={SITE.social.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[rgba(34,48,29,0.2)] font-serif text-[17px] font-bold text-green-deep no-underline transition-colors hover:border-green-deep hover:bg-green-deep hover:text-white">f</a>
            <a href={SITE.social.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[rgba(34,48,29,0.2)] text-green-deep no-underline transition-colors hover:border-green-deep hover:bg-green-deep hover:text-white">
              <InstagramIcon className="h-[15px] w-[15px]" />
            </a>
          </div>
          <Link href="/contact" className="shrink-0 rounded-full bg-gradient-to-r from-olive to-green-deep px-[22px] py-3 text-[12px] uppercase tracking-[0.08em] text-white no-underline shadow-[0_12px_26px_-12px_rgba(44,106,57,0.7)] transition hover:-translate-y-0.5">
            Free Trial
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
            className="flex h-[42px] w-[42px] items-center justify-center rounded-xl border border-[rgba(34,48,29,0.18)] bg-white/50 text-green-deep lg:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-x-0 top-0 z-[115] flex flex-col gap-0.5 border-b border-[rgba(34,48,29,0.1)] bg-[rgba(251,248,239,0.98)] px-5 pb-7 pt-20 shadow-[0_22px_44px_-18px_rgba(20,40,20,0.45)] backdrop-blur-lg lg:hidden">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="border-b border-[rgba(34,48,29,0.08)] py-3.5 text-[18px] text-ink no-underline">
              {l.label}
            </Link>
          ))}
          <div className="mt-4 flex gap-3">
            <a href={SITE.social.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[rgba(34,48,29,0.2)] font-serif text-[19px] font-bold text-green-deep no-underline">f</a>
            <a href={SITE.social.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[rgba(34,48,29,0.2)] text-green-deep no-underline">
              <InstagramIcon className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
