import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import WhatYouGet, { type Benefit } from "@/components/WhatYouGet";
import { IMG } from "@/lib/images";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Online Personal Yoga Classes (1-on-1)",
  description:
    "Private one-on-one yoga classes built entirely around your body, goals and health. Personalised plans, flexible scheduling and undivided attention. Book a free trial.",
  alternates: { canonical: "/services/personal" },
};

const BENEFITS: Benefit[] = [
  {
    icon: "star",
    title: "A plan made for you",
    desc: "A custom sequence built around your body type, fitness level and personal goals — not a one-size-fits-all class.",
  },
  {
    icon: "user",
    title: "Undivided attention",
    desc: "Real-time corrections on alignment and breath, so every pose is safe, precise and effective.",
  },
  {
    icon: "heart",
    title: "Safe for your body",
    desc: "Sequences thoughtfully adapted for injuries, back or knee pain, BP, thyroid, PCOS, prenatal and recovery needs.",
  },
  {
    icon: "clock",
    title: "On your schedule",
    desc: "Sessions arranged around your life and time zone — practise from home, while travelling, anywhere.",
  },
  {
    icon: "trend",
    title: "Faster progress",
    desc: "With focus entirely on you, improvements in flexibility, strength and calm come noticeably sooner.",
  },
  {
    icon: "care",
    title: "Privacy & comfort",
    desc: "No crowd, no comparison — a calm, judgment-free space to begin at your own comfort level.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Free consultation",
    desc: "We talk through your goals, health and experience to understand exactly what you need.",
  },
  {
    n: "02",
    title: "Your custom plan",
    desc: "Anusha designs a personal program — the right styles, pace and focus for you.",
  },
  {
    n: "03",
    title: "Private sessions",
    desc: "Live one-on-one classes with hands-on guidance, at times that suit you.",
  },
  {
    n: "04",
    title: "Grow & evolve",
    desc: "Your plan adapts as you progress, keeping every session challenging and rewarding.",
  },
];

const WHO_FOR = [
  "Feel shy or unsure starting in a group",
  "Have a specific health condition or injury to work around",
  "Want a goal-focused plan — weight, posture, strength or calm",
  "Have a busy or irregular schedule",
  "Prefer the privacy and depth of one-on-one teaching",
];

export default function PersonalClassPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#245733] to-[#122e1a] px-6 pb-16 pt-[130px] text-cream sm:px-12 sm:pt-[160px] lg:px-[86px] lg:pt-[180px]">
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
                Online Personal Classes
              </span>
            </div>
            <h1 className="m-0 font-serif text-[clamp(44px,6vw,88px)] font-medium leading-[0.96] tracking-[-0.01em]">
              Private yoga,
              <br />
              <span className="italic text-olive-soft">personally yours.</span>
            </h1>
            <p className="mt-6 max-w-[460px] text-[clamp(16px,1.3vw,18px)] font-light leading-[1.7] text-[rgba(241,239,226,0.86)]">
              One-on-one sessions built entirely around your body, your goals and your pace — with the undivided attention of a certified, internationally experienced teacher.
            </p>
            <div className="mt-[34px] flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-gradient-to-r from-olive to-olive-soft px-[34px] py-[17px] text-[13px] font-semibold uppercase tracking-[0.1em] text-[#16321d] no-underline shadow-[0_18px_40px_-16px_rgba(188,208,106,0.6)]"
              >
                Book a free trial
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
                  1-on-1
                </div>
                <div className="mt-1.5 text-[11.5px] uppercase tracking-[0.16em] text-[rgba(241,239,226,0.72)]">
                  Full attention
                </div>
              </div>
              <div className="w-px bg-[rgba(241,239,226,0.16)]" />
              <div>
                <div className="font-serif text-[clamp(30px,3.4vw,42px)] font-semibold leading-none text-olive-soft">
                  100%
                </div>
                <div className="mt-1.5 text-[11.5px] uppercase tracking-[0.16em] text-[rgba(241,239,226,0.72)]">
                  Personalised
                </div>
              </div>
              <div className="w-px bg-[rgba(241,239,226,0.16)]" />
              <div>
                <div className="font-serif text-[clamp(30px,3.4vw,42px)] font-semibold leading-none text-olive-soft">
                  Any
                </div>
                <div className="mt-1.5 text-[11.5px] uppercase tracking-[0.16em] text-[rgba(241,239,226,0.72)]">
                  Time &amp; place
                </div>
              </div>
            </div>
          </div>
          <div className="jb-rise">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-[#16331d] shadow-[0_40px_80px_-34px_rgba(0,0,0,0.6)]">
              <Image
                src={IMG["jb-personal-hero"]}
                alt="Private one-on-one yoga session"
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

      {/* WHAT YOU GET */}
      <WhatYouGet
        heading="A practice shaped to you"
        subtitle="Every session is designed around where you are today — and where you want to go."
        benefits={BENEFITS}
      />

      {/* HOW IT WORKS */}
      <section className="relative overflow-hidden bg-green-deep px-6 py-20 text-cream sm:px-12 lg:px-[86px]">
        <Image
          src="/assets/jb-logo.png"
          alt=""
          aria-hidden
          width={420}
          height={420}
          className="pointer-events-none absolute -top-[120px] -right-[140px] w-[420px] opacity-[0.05] brightness-0 invert"
          style={{ animation: "jbSpin 140s linear infinite" }}
        />
        <div className="relative mx-auto mb-12 max-w-[680px] text-center">
          <div className="text-[13px] uppercase tracking-[0.3em] text-olive-soft">
            How it works
          </div>
          <h2 className="mt-3.5 font-serif text-[clamp(30px,3.8vw,50px)] font-medium">
            Your journey, step by step
          </h2>
        </div>
        <div className="mx-auto grid max-w-[1080px] gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="rounded-[18px] border border-[rgba(241,239,226,0.14)] bg-[rgba(241,239,226,0.06)] px-[26px] py-7"
            >
              <div className="font-serif text-[34px] font-bold leading-none text-olive-soft">
                {s.n}
              </div>
              <h3 className="mb-1.5 mt-3 font-serif text-[21px] text-white">
                {s.title}
              </h3>
              <p className="m-0 text-[14.5px] font-light leading-[1.6] text-[rgba(241,239,226,0.82)]">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="relative bg-bg px-6 py-20 sm:px-12 lg:px-[86px]">
        <div className="mx-auto grid max-w-[1140px] items-center gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-[clamp(36px,5vw,72px)]">
          <div className="relative order-first">
            <div
              className="absolute -inset-x-5 -bottom-[22px] -top-[18px] z-0 rounded-[30px]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(134,167,60,.5), rgba(44,106,57,.26) 55%, rgba(188,208,106,.45))",
              }}
            />
            <div className="relative z-[1] aspect-[4/5] overflow-hidden rounded-[22px] bg-[#16331d] shadow-[0_28px_56px_-28px_rgba(20,40,20,0.55)]">
              <Image
                src={IMG["jb-personal-who"]}
                alt="Personalised yoga practice"
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
          <div>
            <div className="bg-gradient-to-r from-olive to-green-deep bg-clip-text text-[13px] font-semibold uppercase tracking-[0.3em] text-transparent">
              Who it&apos;s for
            </div>
            <h2 className="mb-[22px] mt-3.5 font-serif text-[clamp(28px,3.6vw,46px)] font-medium leading-[1.08] text-green-deep">
              Personal classes are perfect if you…
            </h2>
            <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
              {WHO_FOR.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3.5 text-[16px] text-[#3a4733]"
                >
                  <span className="flex h-[26px] w-[26px] flex-shrink-0 items-center justify-center rounded-full bg-[rgba(134,167,60,0.16)] text-[13px] text-green-deep">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-deep to-green px-6 py-20 text-center text-cream sm:px-12 lg:px-[86px]">
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
            Start your personal practice
          </h2>
          <p className="mx-auto mt-[18px] max-w-[520px] text-[16.5px] font-light leading-[1.7] text-[rgba(241,239,226,0.88)]">
            Book a free trial session and experience a class built entirely around you.
          </p>
          <div className="mt-[30px] flex flex-wrap justify-center gap-3.5">
            <Link
              href="/contact"
              className="rounded-full bg-cream px-9 py-[17px] text-[13px] font-medium uppercase tracking-[0.12em] text-green-deep no-underline shadow-[0_18px_40px_-16px_rgba(0,0,0,0.4)]"
            >
              Book a free trial
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
