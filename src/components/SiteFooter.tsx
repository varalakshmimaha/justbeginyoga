import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";
import { PhoneIcon, MailIcon, InstagramIcon, WhatsAppIcon } from "./icons";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
  { href: "/videos", label: "Videos" },
  { href: "/contact", label: "Contact Us" },
  { href: "/faq", label: "FAQ" },
];

export default function SiteFooter() {
  return (
    <>
      <footer className="relative bg-dark px-6 pb-9 pt-16 text-[#d8dcc9] sm:px-12 lg:px-[86px]">
        <div className="mx-auto grid max-w-[1180px] gap-10 md:grid-cols-[1.6fr_1fr_1.2fr] lg:gap-[70px]">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <Image src="/assets/jb-logo.png" alt="Just Begin Yoga" width={64} height={64} className="h-16 w-auto opacity-90 brightness-0 invert" />
              <span className="flex flex-col leading-none">
                <span className="font-serif text-[22px] font-bold tracking-[0.18em] text-white">JUST BEGIN</span>
                <span className="mt-[3px] text-[9px] tracking-[0.34em] text-[#9fb56b]">WHERE YOGA BEGINS</span>
              </span>
            </div>
            <p className="mb-5 max-w-[380px] text-[15.5px] font-light leading-[1.7] text-[rgba(216,220,201,0.75)]">
              The name &ldquo;Just Begin&rdquo; is more than a name — it&apos;s our philosophy. We believe the most significant journey begins with a single, simple step.
            </p>
            <div className="flex gap-3">
              <a href={SITE.social.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[rgba(216,220,201,0.25)] font-serif text-[18px] font-bold text-[#d8dcc9] no-underline transition-colors hover:border-olive hover:bg-olive">f</a>
              <a href={SITE.social.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[rgba(216,220,201,0.25)] text-[#d8dcc9] no-underline transition-colors hover:border-olive hover:bg-olive">
                <InstagramIcon className="h-[17px] w-[17px]" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-5 font-serif text-[22px] font-semibold text-white">Quick Links</h3>
            <ul className="flex list-none flex-col gap-3 p-0 text-[15.5px]">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[rgba(216,220,201,0.8)] no-underline transition-colors hover:text-white">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 font-serif text-[22px] font-semibold text-white">Contact Info</h3>
            <ul className="flex list-none flex-col gap-4 p-0 text-[15.5px]">
              <li className="flex items-center gap-3">
                <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[rgba(159,181,107,0.16)] text-[#9fb56b]"><PhoneIcon className="h-4 w-4" /></span>
                <a href={SITE.whatsapp} target="_blank" rel="noopener" className="text-[rgba(216,220,201,0.85)] no-underline transition-colors hover:text-white">{SITE.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-[rgba(159,181,107,0.16)] text-[#9fb56b]"><MailIcon className="h-4 w-4" /></span>
                <a href={`mailto:${SITE.email}`} className="break-all text-[rgba(216,220,201,0.85)] no-underline transition-colors hover:text-white">{SITE.email}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-[1180px] border-t border-[rgba(216,220,201,0.14)] pt-6 text-center text-[12.5px] tracking-[0.04em] text-[rgba(216,220,201,0.6)]">
          Copyright © {SITE.name} 2025. All rights reserved.
        </div>
      </footer>

      {/* Floating call + WhatsApp (desktop/tablet) */}
      <div className="fixed bottom-[22px] right-5 z-[140] hidden flex-col gap-3 sm:flex">
        <a href={SITE.whatsapp} target="_blank" rel="noopener" aria-label="Chat on WhatsApp" className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_16px_32px_-12px_rgba(37,211,102,0.7)] transition hover:scale-110">
          <WhatsAppIcon className="h-[30px] w-[30px]" />
        </a>
        <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} aria-label="Call us" className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-olive to-green-deep text-white shadow-[0_16px_32px_-12px_rgba(44,106,57,0.7)] transition hover:scale-110">
          <PhoneIcon className="h-[26px] w-[26px]" />
        </a>
      </div>

      {/* Sticky call + WhatsApp bar (mobile) */}
      <div className="fixed inset-x-0 bottom-0 z-[140] flex shadow-[0_-6px_22px_-8px_rgba(0,0,0,0.35)] sm:hidden">
        <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="flex flex-1 items-center justify-center gap-2 bg-green-deep py-4 text-[14px] font-medium tracking-[0.06em] text-white no-underline">
          <PhoneIcon className="h-[19px] w-[19px]" /> Call
        </a>
        <a href={SITE.whatsapp} target="_blank" rel="noopener" className="flex flex-1 items-center justify-center gap-2 bg-[#25d366] py-4 text-[14px] font-medium tracking-[0.06em] text-white no-underline">
          <WhatsAppIcon className="h-[19px] w-[19px]" /> WhatsApp
        </a>
      </div>
    </>
  );
}
