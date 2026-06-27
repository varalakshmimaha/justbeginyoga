import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { IMG } from "@/lib/images";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Apartment & Community Yoga Classes",
  description:
    "Bring yoga to your residential society. Energetic community classes at your doorstep for all ages — zero commute, group motivation, indoor or open-air.",
  alternates: { canonical: "/services/apartment" },
};

type Offer = {
  title: string;
  desc: string;
  icon: React.ReactNode;
};

const OFFERS: Offer[] = [
  {
    title: "Classes in your society",
    desc: "Held right where you live — clubhouse, terrace, garden or community hall. No travel, no excuses.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21V9l9-6 9 6v12" />
        <path d="M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    title: "Practise with neighbours",
    desc: "The shared energy and gentle accountability of a group keeps everyone showing up and motivated.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="9" r="3" />
        <circle cx="17" cy="11" r="2.5" />
        <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5M15.5 19c0-2 1.6-3.4 4-3.4" />
      </svg>
    ),
  },
  {
    title: "All ages, all levels",
    desc: "From kids to seniors — sessions with modifications so every resident can join in comfortably.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18M5 8c0 4 7 4 7 0M19 8c0 4-7 4-7 0" />
      </svg>
    ),
  },
  {
    title: "Indoor or open-air",
    desc: "Fresh-air rooftop and garden sessions, or indoors when the weather turns — whatever your space allows.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="13" r="4" />
        <path d="M12 4v2M5 13H3M21 13h-2M6 7l1.4 1.4M18 7l-1.4 1.4M3 21h18" />
      </svg>
    ),
  },
  {
    title: "Set up with your committee",
    desc: "We coordinate days, timing and group size with your RWA or resident group — simple and organised.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Affordable together",
    desc: "Shared community sessions make a regular, expert-led practice easy and accessible for everyone.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
      </svg>
    ),
  },
];

const STEPS = [
  {
    n: "01",
    title: "Reach out",
    desc: "Get in touch with your society or resident group and tell us where you live.",
  },
  {
    n: "02",
    title: "Pick a space & time",
    desc: "We agree on the clubhouse, terrace or garden and a schedule that works for everyone.",
  },
  {
    n: "03",
    title: "Gather your group",
    desc: "Invite neighbours to join — the more the merrier, and the more affordable for all.",
  },
  {
    n: "04",
    title: "Practise together",
    desc: "Anusha leads regular sessions right at home — and your community grows healthier together.",
  },
];

const COMMUNITIES = [
  "Apartment societies",
  "Gated communities",
  "RWAs & resident groups",
  "Villa & layout communities",
  "Senior living",
];

export default function ApartmentClassPage() {
  return (
    <>
      {/* HERO */}
      <section
        className="relative overflow-hidden px-6 pb-16 pt-[130px] text-cream sm:px-12 sm:pt-[160px] lg:px-[86px] lg:pt-[180px]"
        style={{
          background:
            "radial-gradient(120% 90% at 80% 14%, #245733 0%, #1a3f24 46%, #122e1a 100%)",
        }}
      >
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
                Apartment Classes
              </span>
            </div>
            <h1 className="m-0 font-serif text-[clamp(44px,6vw,88px)] font-medium leading-[0.96] tracking-[-0.01em]">
              Yoga at
              <br />
              <span className="italic text-olive-soft">your doorstep.</span>
            </h1>
            <p className="mt-6 max-w-[470px] text-[clamp(16px,1.3vw,18px)] font-light leading-[1.7] text-[rgba(241,239,226,0.86)]">
              Bring a warm, energetic yoga community right into your residential society — practise with your neighbours, with zero commute and all the motivation of a group.
            </p>
            <div className="mt-[34px] flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-gradient-to-r from-olive to-olive-soft px-[34px] py-[17px] text-[13px] font-semibold uppercase tracking-[0.1em] text-[#16321d] no-underline shadow-[0_18px_40px_-16px_rgba(188,208,106,0.6)]"
              >
                Bring it to your society
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
                  Zero
                </div>
                <div className="mt-1.5 text-[11.5px] uppercase tracking-[0.16em] text-[rgba(241,239,226,0.72)]">
                  Commute
                </div>
              </div>
              <div className="w-px bg-[rgba(241,239,226,0.16)]" />
              <div>
                <div className="font-serif text-[clamp(30px,3.4vw,42px)] font-semibold leading-none text-olive-soft">
                  All
                </div>
                <div className="mt-1.5 text-[11.5px] uppercase tracking-[0.16em] text-[rgba(241,239,226,0.72)]">
                  Ages &amp; levels
                </div>
              </div>
              <div className="w-px bg-[rgba(241,239,226,0.16)]" />
              <div>
                <div className="font-serif text-[clamp(30px,3.4vw,42px)] font-semibold leading-none text-olive-soft">
                  Your
                </div>
                <div className="mt-1.5 text-[11.5px] uppercase tracking-[0.16em] text-[rgba(241,239,226,0.72)]">
                  Space &amp; time
                </div>
              </div>
            </div>
          </div>
          <div className="jb-rise">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-[#16331d] shadow-[0_40px_80px_-34px_rgba(0,0,0,0.6)]">
              <Image
                src={IMG["jb-apt-hero"]}
                alt="Community yoga class in a residential society"
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
            Community yoga, made easy
          </h2>
          <p className="mx-auto mt-[18px] max-w-[560px] text-[16.5px] font-light leading-[1.7] text-muted">
            Everything organised around your community — you just roll out your mat.
          </p>
        </div>
        <div className="mx-auto grid max-w-[1120px] gap-[clamp(18px,2.2vw,26px)] [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          {OFFERS.map((o) => (
            <div
              key={o.title}
              className="rounded-[20px] border border-[var(--color-line)] bg-white px-[30px] py-8 shadow-[0_20px_44px_-30px_rgba(20,40,20,0.4)]"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[14px] bg-gradient-to-br from-[rgba(134,167,60,0.18)] to-[rgba(44,106,57,0.1)] text-green-deep">
                {o.icon}
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

      {/* HOW IT WORKS */}
      <section className="relative overflow-hidden bg-green-deep px-6 py-[clamp(64px,8vw,116px)] text-cream sm:px-12 lg:px-[86px]">
        <Image
          src="/assets/jb-logo.png"
          alt=""
          aria-hidden
          width={420}
          height={420}
          className="pointer-events-none absolute -top-[120px] -right-[140px] w-[420px] opacity-[0.05] brightness-0 invert"
          style={{ animation: "jbSpin 140s linear infinite" }}
        />
        <div className="relative mx-auto mb-[clamp(40px,5vw,58px)] max-w-[680px] text-center">
          <div className="text-[13px] uppercase tracking-[0.3em] text-olive-soft">
            How it works
          </div>
          <h2 className="mt-3.5 font-serif text-[clamp(30px,3.8vw,50px)] font-medium">
            Up and running in four steps
          </h2>
        </div>
        <div className="mx-auto grid max-w-[1080px] gap-[clamp(16px,2vw,24px)] [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
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
      <section className="relative bg-bg px-6 py-[clamp(58px,7vw,100px)] text-center sm:px-12 lg:px-[86px]">
        <div className="mx-auto max-w-[900px]">
          <div className="bg-gradient-to-r from-olive to-green-deep bg-clip-text text-[13px] font-semibold uppercase tracking-[0.3em] text-transparent">
            Who it&apos;s for
          </div>
          <h2 className="mb-[clamp(28px,3.4vw,40px)] mt-3.5 font-serif text-[clamp(28px,3.6vw,46px)] font-medium text-green-deep">
            Perfect for any community
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {COMMUNITIES.map((c) => (
              <span
                key={c}
                className="rounded-full border border-[var(--color-line)] bg-white px-6 py-[13px] text-[15px] text-green-deep shadow-[0_12px_26px_-22px_rgba(20,40,20,0.4)]"
              >
                {c}
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
            Bring yoga home
          </h2>
          <p className="mx-auto mt-[18px] max-w-[520px] text-[16.5px] font-light leading-[1.7] text-[rgba(241,239,226,0.88)]">
            Let&apos;s start a yoga community in your society. Share a few details and we&apos;ll set it up.
          </p>
          <div className="mt-[30px] flex flex-wrap justify-center gap-3.5">
            <Link
              href="/contact"
              className="rounded-full bg-cream px-9 py-[17px] text-[13px] font-medium uppercase tracking-[0.12em] text-green-deep no-underline shadow-[0_18px_40px_-16px_rgba(0,0,0,0.4)]"
            >
              Bring it to your society
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
