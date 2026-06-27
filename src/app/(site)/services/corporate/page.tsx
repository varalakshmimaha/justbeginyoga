import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { IMG } from "@/lib/images";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Corporate Yoga & Workplace Wellness",
  description:
    "Corporate yoga programs — onsite and online — to reduce stress, improve focus and boost team wellbeing. Desk yoga, breathwork and custom team sessions.",
  alternates: { canonical: "/services/corporate" },
};

const OFFERINGS = [
  {
    title: "Onsite & online sessions",
    desc: "At your office or live over video for remote and hybrid teams — wherever your people are.",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M8 21h8M12 18v3" />
      </>
    ),
  },
  {
    title: "Desk & chair yoga",
    desc: "Short, accessible routines that release tension from long hours at a screen — no mat or change of clothes needed.",
    icon: (
      <>
        <path d="M6 21v-7M6 4v3M18 21v-4M18 4v7M6 10.5h0M18 14.5h0" />
        <circle cx="6" cy="9" r="2" />
        <circle cx="18" cy="13" r="2" />
      </>
    ),
  },
  {
    title: "Stress & breathwork",
    desc: "Guided pranayama and meditation to calm the nervous system, reset focus and prevent burnout.",
    icon: <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />,
  },
  {
    title: "Custom team programs",
    desc: "Designed around your team's needs, fitness levels and goals — from energising mornings to wind-down sessions.",
    icon: (
      <>
        <path d="M12 3v18M3 12h18" />
        <circle cx="12" cy="12" r="9" />
      </>
    ),
  },
  {
    title: "Around your schedule",
    desc: "Lunch breaks, mornings or end-of-day — sessions slot into the rhythm of your workplace.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
  {
    title: "Wellness workshops",
    desc: "One-off sessions for offsites, wellness weeks and team days — posture, breath and mindfulness.",
    icon: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </>
    ),
  },
];

const BENEFITS = [
  {
    strong: "Sharper focus & productivity",
    rest: " — movement and breath that clear the mind and lift energy through the day.",
  },
  {
    strong: "Less stress & burnout",
    rest: " — practical tools to manage pressure and protect mental wellbeing.",
  },
  {
    strong: "Fewer aches, better posture",
    rest: " — relief from the back, neck and shoulder strain of desk work.",
  },
  {
    strong: "A stronger team culture",
    rest: " — shared, positive moments that boost morale and connection.",
  },
];

const WHO_FOR = [
  "Startups & offices",
  "Remote & hybrid teams",
  "HR & wellness programs",
  "Team offsites & events",
  "Factories & on-floor staff",
];

export default function CorporateYogaPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[radial-gradient(120%_90%_at_80%_14%,#245733_0%,#1a3f24_46%,#122e1a_100%)] px-6 pb-16 pt-[130px] text-cream sm:px-12 sm:pt-[160px] lg:px-[86px] lg:pt-[180px]">
        <div
          className="pointer-events-none absolute right-[clamp(40px,12vw,190px)] top-[clamp(40px,9vw,110px)] h-[clamp(180px,26vw,340px)] w-[clamp(180px,26vw,340px)] rounded-full blur-[4px]"
          style={{
            background:
              "radial-gradient(circle at 38% 36%, rgba(233,183,116,.7), rgba(188,208,106,.3) 46%, rgba(36,87,51,0) 72%)",
            animation: "jbOrb 12s ease-in-out infinite",
          }}
          aria-hidden
        />
        <Image
          src="/assets/jb-logo.png"
          alt=""
          aria-hidden
          width={420}
          height={420}
          className="pointer-events-none absolute -bottom-[150px] -left-[150px] w-[420px] opacity-[0.05] brightness-0 invert"
          style={{ animation: "jbSpin 150s linear infinite" }}
        />
        <div className="relative z-[2] mx-auto grid max-w-[1200px] items-center gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-[clamp(40px,5vw,72px)]">
          <div className="jb-rise">
            <div className="mb-[26px] inline-flex items-center gap-2.5 rounded-full border border-[rgba(241,239,226,0.18)] bg-[rgba(241,239,226,0.08)] px-4 py-2">
              <span
                className="h-[7px] w-[7px] rounded-full bg-olive-soft shadow-[0_0_10px_var(--color-olive-soft)]"
                style={{ animation: "jbPulse 2.6s ease-in-out infinite" }}
              />
              <span className="text-[12px] uppercase tracking-[0.24em] text-[rgba(241,239,226,0.9)]">
                Corporate Yoga
              </span>
            </div>
            <h1 className="m-0 font-serif text-[clamp(44px,6vw,88px)] font-medium leading-[0.96] tracking-[-0.01em]">
              Yoga for teams
              <br />
              <span className="italic text-olive-soft">that thrive.</span>
            </h1>
            <p className="mt-6 max-w-[470px] text-[clamp(16px,1.3vw,18px)] font-light leading-[1.7] text-[rgba(241,239,226,0.86)]">
              Workplace wellness that lifts energy, focus and morale. Bring calm, healthy movement to your team — onsite or online, built around your work day.
            </p>
            <div className="mt-[34px] flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-gradient-to-r from-olive to-olive-soft px-[34px] py-[17px] text-[13px] font-semibold uppercase tracking-[0.1em] text-[#16321d] no-underline shadow-[0_18px_40px_-16px_rgba(188,208,106,0.6)]"
              >
                Request a program
              </Link>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 border-b border-[rgba(241,239,226,0.4)] pb-[5px] text-[13px] uppercase tracking-[0.08em] text-cream no-underline"
              >
                Talk to us ↗
              </a>
            </div>
            <div className="mt-[clamp(38px,4.6vw,50px)] flex flex-wrap gap-[clamp(26px,4vw,46px)]">
              <div>
                <div className="font-serif text-[clamp(30px,3.4vw,42px)] font-semibold leading-none text-olive-soft">
                  Onsite
                </div>
                <div className="mt-1.5 text-[11.5px] uppercase tracking-[0.16em] text-[rgba(241,239,226,0.72)]">
                  or online
                </div>
              </div>
              <div className="w-px bg-[rgba(241,239,226,0.16)]" />
              <div>
                <div className="font-serif text-[clamp(30px,3.4vw,42px)] font-semibold leading-none text-olive-soft">
                  Any
                </div>
                <div className="mt-1.5 text-[11.5px] uppercase tracking-[0.16em] text-[rgba(241,239,226,0.72)]">
                  team size
                </div>
              </div>
              <div className="w-px bg-[rgba(241,239,226,0.16)]" />
              <div>
                <div className="font-serif text-[clamp(30px,3.4vw,42px)] font-semibold leading-none text-olive-soft">
                  Custom
                </div>
                <div className="mt-1.5 text-[11.5px] uppercase tracking-[0.16em] text-[rgba(241,239,226,0.72)]">
                  programs
                </div>
              </div>
            </div>
          </div>
          <div className="jb-rise">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-[#16331d] shadow-[0_40px_80px_-34px_rgba(0,0,0,0.6)]">
              <Image
                src={IMG["jb-corp-hero"]}
                alt="Corporate yoga session for a team"
                fill
                className="object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0 z-[2]"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(44,106,57,.42) 0%, rgba(28,67,38,0) 38%, rgba(18,38,22,.3) 78%, rgba(18,38,22,.62) 100%)",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(18,38,22,.5), rgba(18,38,22,0) 42%)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="relative bg-paper px-6 py-[clamp(64px,8vw,116px)] sm:px-12 lg:px-[86px]">
        <div className="mx-auto mb-[clamp(40px,5vw,60px)] max-w-[720px] text-center">
          <div className="bg-gradient-to-r from-olive to-green-deep bg-clip-text text-[13px] font-semibold uppercase tracking-[0.3em] text-transparent">
            What we offer
          </div>
          <h2 className="mt-4 font-serif text-[clamp(32px,4.2vw,54px)] font-medium leading-[1.06] text-green-deep">
            Wellness, built for work
          </h2>
          <p className="mx-auto mt-[18px] max-w-[560px] text-[16.5px] font-light leading-[1.7] text-muted">
            Flexible programs that fit into the working day and meet your team where they are.
          </p>
        </div>
        <div className="mx-auto grid max-w-[1120px] gap-[clamp(18px,2.2vw,26px)] [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          {OFFERINGS.map((o) => (
            <div
              key={o.title}
              className="rounded-[20px] border border-[var(--color-line)] bg-white px-[30px] py-8 shadow-[0_20px_44px_-30px_rgba(20,40,20,0.4)]"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[14px] bg-gradient-to-br from-[rgba(134,167,60,0.18)] to-[rgba(44,106,57,0.1)] text-green-deep">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {o.icon}
                </svg>
              </div>
              <h3 className="m-0 font-serif text-[23px] font-semibold text-green-deep">
                {o.title}
              </h3>
              <p className="mt-[9px] text-[15px] font-light leading-[1.65] text-muted">
                {o.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFITS / IMPACT */}
      <section className="relative overflow-hidden bg-green-deep px-6 py-[clamp(64px,8vw,116px)] text-cream sm:px-12 lg:px-[86px]">
        <Image
          src="/assets/jb-logo.png"
          alt=""
          aria-hidden
          width={420}
          height={420}
          className="pointer-events-none absolute -bottom-[120px] -left-[140px] w-[420px] opacity-[0.05] brightness-0 invert"
          style={{ animation: "jbSpin 140s linear infinite" }}
        />
        <div className="relative mx-auto grid max-w-[1160px] items-center gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:gap-[clamp(38px,5vw,72px)]">
          <div>
            <div className="mb-3.5 text-[13px] uppercase tracking-[0.3em] text-olive-soft">
              Why it matters
            </div>
            <h2 className="mb-[26px] mt-0 font-serif text-[clamp(30px,3.8vw,52px)] font-medium leading-[1.06]">
              Healthier teams, better work
            </h2>
            <ul className="m-0 flex list-none flex-col gap-0 p-0">
              {BENEFITS.map((b, i) => (
                <li
                  key={b.strong}
                  className={`flex gap-4 border-t border-[rgba(241,239,226,0.16)] py-[18px] ${
                    i === BENEFITS.length - 1
                      ? "border-b border-b-[rgba(241,239,226,0.16)]"
                      : ""
                  }`}
                >
                  <span className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-full bg-[rgba(188,208,106,0.18)] text-[14px] text-olive-soft">
                    ✦
                  </span>
                  <span className="text-[15.5px] leading-[1.55] text-[rgba(241,239,226,0.92)]">
                    <strong className="font-semibold text-white">{b.strong}</strong>
                    {b.rest}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative order-first lg:order-none">
            <div
              className="absolute -inset-x-5 -bottom-[22px] -top-[18px] z-0 rounded-[30px]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(188,208,106,.5), rgba(134,167,60,.26) 55%, rgba(241,239,226,.4))",
              }}
            />
            <div className="relative z-[1] aspect-square overflow-hidden rounded-[22px] bg-[#16331d] shadow-[0_32px_60px_-30px_rgba(0,0,0,0.7)]">
              <Image
                src={IMG["jb-corp-photo"]}
                alt="Yoga practice that supports workplace wellbeing"
                fill
                className="object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0 z-[2]"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(134,167,60,.4) 0%, rgba(44,106,57,0) 42%, rgba(18,38,22,.3) 80%, rgba(18,38,22,.6) 100%)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="relative bg-bg px-6 py-[clamp(58px,7vw,100px)] text-center sm:px-12 lg:px-[86px]">
        <div className="mx-auto max-w-[900px]">
          <div className="bg-gradient-to-r from-olive to-green-deep bg-clip-text text-[13px] font-semibold uppercase tracking-[0.3em] text-transparent">
            Who it&apos;s for
          </div>
          <h2 className="mb-[clamp(28px,3.4vw,40px)] mt-3.5 font-serif text-[clamp(28px,3.6vw,46px)] font-medium text-green-deep">
            Made for every kind of workplace
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {WHO_FOR.map((w) => (
              <span
                key={w}
                className="rounded-full border border-[var(--color-line)] bg-white px-6 py-[13px] text-[15px] text-green-deep shadow-[0_12px_26px_-22px_rgba(20,40,20,0.4)]"
              >
                {w}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-deep to-green px-6 py-[clamp(60px,7vw,104px)] text-center text-cream sm:px-12 lg:px-[86px]">
        <Image
          src="/assets/jb-logo.png"
          alt=""
          aria-hidden
          width={440}
          height={440}
          className="pointer-events-none absolute left-1/2 top-1/2 w-[440px] -translate-x-1/2 -translate-y-1/2 opacity-[0.06] brightness-0 invert"
          style={{ animation: "jbSpin 120s linear infinite" }}
        />
        <div className="relative">
          <h2 className="m-0 font-serif text-[clamp(30px,3.8vw,52px)] font-medium leading-[1.08]">
            Invest in your team&apos;s wellbeing
          </h2>
          <p className="mx-auto mt-[18px] max-w-[520px] text-[16.5px] font-light leading-[1.7] text-[rgba(241,239,226,0.88)]">
            Tell us about your team and we&apos;ll design a program that fits — share a few details and we&apos;ll be in touch.
          </p>
          <div className="mt-[30px] flex flex-wrap justify-center gap-3.5">
            <Link
              href="/contact"
              className="rounded-full bg-cream px-9 py-[17px] text-[13px] font-medium uppercase tracking-[0.12em] text-green-deep no-underline shadow-[0_18px_40px_-16px_rgba(0,0,0,0.4)]"
            >
              Request a program
            </Link>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener"
              className="rounded-full border border-[rgba(241,239,226,0.5)] px-9 py-[17px] text-[13px] font-medium uppercase tracking-[0.12em] text-cream no-underline"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
