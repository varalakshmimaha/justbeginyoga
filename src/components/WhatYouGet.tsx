import type { SVGProps } from "react";

export type Benefit = { icon: BenefitIcon; title: string; desc: string };
export type BenefitIcon = "star" | "user" | "heart" | "clock" | "trend" | "care";

const ICONS: Record<BenefitIcon, (p: SVGProps<SVGSVGElement>) => React.ReactElement> = {
  star: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 2l2.4 5.8L20 9l-4.5 4 1.3 6L12 16l-4.8 3 1.3-6L4 9l5.6-1.2z" />
    </svg>
  ),
  user: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  ),
  heart: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 20s-7-4.6-7-9.5A3.5 3.5 0 0 1 12 7a3.5 3.5 0 0 1 7 3.5C19 15.4 12 20 12 20z" />
    </svg>
  ),
  clock: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  trend: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 17l5-5 4 4 8-8M16 4h5v5" />
    </svg>
  ),
  care: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
    </svg>
  ),
};

export default function WhatYouGet({
  eyebrow = "What you get",
  heading,
  subtitle,
  benefits,
}: {
  eyebrow?: string;
  heading: string;
  subtitle?: string;
  benefits: Benefit[];
}) {
  return (
    <section className="bg-paper px-6 py-20 sm:px-12 lg:px-[86px]">
      <div className="mx-auto mb-12 max-w-[720px] text-center">
        <div className="bg-gradient-to-r from-olive to-green-deep bg-clip-text text-[13px] font-semibold uppercase tracking-[0.3em] text-transparent">
          {eyebrow}
        </div>
        <h2 className="mt-4 font-serif text-[clamp(32px,4.2vw,54px)] font-medium leading-[1.06] text-green-deep">
          {heading}
        </h2>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-[560px] text-[16.5px] font-light leading-[1.7] text-muted">
            {subtitle}
          </p>
        )}
      </div>

      <div className="mx-auto grid max-w-[1120px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((b) => {
          const Icon = ICONS[b.icon];
          return (
            <div key={b.title} className="rounded-[20px] border border-[var(--color-line)] bg-white p-8 shadow-[0_20px_44px_-30px_rgba(20,40,20,0.4)]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[14px] bg-gradient-to-br from-[rgba(134,167,60,0.18)] to-[rgba(44,106,57,0.1)] text-green-deep">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="m-0 font-serif text-[23px] font-semibold text-green-deep">{b.title}</h3>
              <p className="mt-2.5 text-[15px] font-light leading-[1.65] text-muted">{b.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
