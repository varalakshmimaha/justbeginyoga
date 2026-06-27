import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Anusha Shetty",
  description:
    "Meet Anusha Shetty, founder of Just Begin Yoga — a certified instructor with 9+ years teaching and 16+ years of practice, including teaching positions in Shanghai, China. Holistic, beginner-friendly yoga for every body.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Anusha Shetty | Just Begin Yoga",
    description:
      "Holistic yoga with Anusha Shetty — beginner-friendly, mindful and personal. We make the practice accessible to every body, at every stage of life.",
    url: "/about",
    type: "website",
  },
};

const stats = [
  { value: "9+", label: "Years teaching" },
  { value: "16+", label: "Years practice" },
  { value: "Global", label: "Shanghai, China" },
];

const certifications = [
  "PG Diploma in Yoga Therapy",
  "Prenatal & Postnatal Yoga TTC",
  "Hatha",
  "Vinyasa",
  "Power Yoga",
  "Ashtanga Vinyasa",
  "Face Yoga",
];

const iconAttrs = {
  width: 26,
  height: 26,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
} as const;

const reasons = [
  {
    title: "Unique Teaching Style",
    text: "Anusha's approach is warm, encouraging, and highly personalized — making even the most challenging poses feel achievable.",
    icon: (
      <svg {...iconAttrs}>
        <path d="M12 3l2.2 4.8L19 9.5l-3.6 3.4.9 5.1L12 15.8 7.7 18l.9-5.1L5 9.5l4.8-1.7z" />
      </svg>
    ),
  },
  {
    title: "International Expertise",
    text: "Benefit from a rich, diverse teaching background that includes experience with international clients and a wide range of yoga styles.",
    icon: (
      <svg {...iconAttrs}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
      </svg>
    ),
  },
  {
    title: "Personalized Guidance",
    text: "We keep our class sizes small to ensure you receive the personalized guidance and attention you deserve.",
    icon: (
      <svg {...iconAttrs}>
        <circle cx="12" cy="8" r="3.6" />
        <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" />
        <path d="M15.5 11.5l1.6 1.6 3-3" />
      </svg>
    ),
  },
  {
    title: "Positive Community",
    text: "We're a supportive community dedicated to helping each other grow, both on and off the mat.",
    icon: (
      <svg {...iconAttrs}>
        <circle cx="8" cy="9" r="2.6" />
        <circle cx="16" cy="9" r="2.6" />
        <path d="M3.5 19c0-2.6 2-4.4 4.5-4.4s4.5 1.8 4.5 4.4M12.5 18.6c.2-2.3 2-3.9 4.3-3.9 2.4 0 4.2 1.7 4.2 4.3" />
      </svg>
    ),
  },
  {
    title: "Holistic Growth",
    text: "Our classes don't just focus on the physical — we encourage mindful breathing and meditation to support your mental and emotional well-being.",
    icon: (
      <svg {...iconAttrs}>
        <path d="M12 21c0-5 0-9 0-9M12 12c-3.5 0-6-2.2-6-5.5C9.5 6.5 12 8.5 12 12zM12 12c0-3.8 2.4-6.2 6-6.2C18 9.2 15.5 12 12 12z" />
      </svg>
    ),
  },
  {
    title: "Flexible Learning Options",
    text: "Whether you prefer in-person sessions, online classes, or a blend of both, we offer flexible formats to fit your lifestyle and schedule.",
    icon: (
      <svg {...iconAttrs}>
        <path d="M12 4l8 4-8 4-8-4zM4 12l8 4 8-4M4 16l8 4 8-4" />
      </svg>
    ),
  },
];

const businessSchema = {
  "@context": "https://schema.org",
  "@type": ["HealthClub", "LocalBusiness"],
  "@id": `${SITE.url}/#business`,
  name: SITE.name,
  alternateName: `${SITE.name} — ${SITE.founder}`,
  description: SITE.description,
  url: SITE.url,
  telephone: SITE.phone,
  email: SITE.email,
  image: `${SITE.url}/assets/river-pose.jpeg`,
  logo: `${SITE.url}/assets/jb-logo.png`,
  priceRange: "₹₹",
  founder: {
    "@type": "Person",
    name: SITE.founder,
    jobTitle: "Certified Yoga Instructor",
  },
  areaServed: { "@type": "Country", name: "India" },
  sameAs: [SITE.social.facebook, SITE.social.instagram],
  knowsAbout: [
    "Yoga",
    "Vinyasa",
    "Hatha Yoga",
    "Power Yoga",
    "Yin Yoga",
    "Pranayama",
    "Meditation",
    "Prenatal Yoga",
    "Face Yoga",
    "Corporate Wellness",
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />

      <PageHero
        eyebrow="About Us"
        title="Where every journey"
        accent="simply begins."
        subtitle="Holistic yoga with Anusha Shetty — beginner-friendly, mindful and personal. We make the practice accessible to every body, at every stage of life."
      />

      {/* ===== PHILOSOPHY ===== */}
      <section className="bg-paper px-6 py-[clamp(64px,8vw,110px)] sm:px-12 lg:px-[86px]">
        <div className="mx-auto max-w-[820px] text-center">
          <div className="bg-gradient-to-r from-olive to-green-deep bg-clip-text text-[14px] font-semibold uppercase tracking-[0.3em] text-transparent">
            Our Philosophy
          </div>
          <h2 className="m-0 mt-4 font-serif text-[clamp(30px,4vw,52px)] font-medium leading-[1.08] text-ink">
            More than a name — it&apos;s a belief.
          </h2>
          <p className="mx-auto mt-6 max-w-[680px] text-[clamp(16px,1.2vw,18px)] font-light leading-[1.8] text-muted">
            The name &ldquo;Just Begin&rdquo; is more than a name — it&apos;s our philosophy. We believe that the
            most significant journey begins with a single, simple step.
          </p>
          <p className="mx-auto mt-4 max-w-[680px] text-[clamp(16px,1.2vw,18px)] font-light leading-[1.8] text-muted">
            Our mission is to make yoga accessible to everyone, helping them experience its transformative power
            regardless of their age, size, or fitness level. We are committed to promoting holistic health and
            mindful living for all.
          </p>
          <div className="mt-9 flex items-center justify-center gap-2.5" aria-hidden>
            <span className="h-1.5 w-1.5 rounded-full bg-olive" />
            <span className="h-1.5 w-1.5 rounded-full bg-olive/60" />
            <span className="h-1.5 w-1.5 rounded-full bg-olive/30" />
          </div>
        </div>
      </section>

      {/* ===== THE FOUNDER (+ certifications) ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#357a41] to-green-deep px-6 py-[clamp(64px,8vw,110px)] text-cream sm:px-12 lg:px-[86px]">
        <Image
          src="/assets/jb-logo.png"
          alt=""
          aria-hidden
          width={420}
          height={420}
          className="pointer-events-none absolute -bottom-[130px] -right-[140px] w-[420px] opacity-[0.06] brightness-0 invert"
          style={{ animation: "jbSpin 140s linear infinite" }}
        />
        <div className="relative mx-auto grid max-w-[1140px] items-center gap-[clamp(36px,5vw,76px)] md:grid-cols-[0.86fr_1.14fr]">
          {/* photo */}
          <div className="relative">
            <div
              className="absolute -inset-x-4 -bottom-5 -top-4 z-0 rounded-[30px]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(188,208,106,.5), rgba(241,239,226,.18) 55%, rgba(188,208,106,.4))",
              }}
            />
            <div className="relative z-[1] overflow-hidden rounded-[24px] shadow-[0_36px_70px_-30px_rgba(0,0,0,0.6)]">
              <Image
                src="/assets/anusha-founder.jpeg"
                alt={`${SITE.founder}, founder of ${SITE.name}`}
                width={560}
                height={680}
                className="h-full w-full object-cover"
              />
            </div>
            {/* badge — top left */}
            <div className="absolute -left-3 top-5 z-[2] rounded-2xl border border-[var(--color-line)] bg-paper px-5 py-3.5 text-center shadow-[0_18px_40px_-16px_rgba(0,0,0,0.5)]">
              <div className="font-serif text-[30px] font-semibold leading-none text-green-deep">16+</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted">Years of practice</div>
            </div>
          </div>

          {/* text */}
          <div>
            <div className="text-[14px] font-semibold uppercase tracking-[0.3em] text-olive-soft">The Founder</div>
            <h2 className="m-0 mt-4 font-serif text-[clamp(32px,3.8vw,50px)] font-medium leading-[1.04] text-white">
              {SITE.founder}
            </h2>
            <p className="mt-5 text-[16.5px] font-light leading-[1.78] text-[rgba(241,239,226,0.9)]">
              A certified and highly experienced yoga instructor with over{" "}
              <strong className="font-medium text-white">9 years of teaching</strong> and{" "}
              <strong className="font-medium text-white">16+ years of personal practice</strong>. Her passion for
              yoga has taken her on a global journey, including teaching positions in{" "}
              <strong className="font-medium text-white">Shanghai, China</strong>.
            </p>
            <p className="mt-4 text-[16.5px] font-light leading-[1.78] text-[rgba(241,239,226,0.9)]">
              Her approach is a unique blend of traditional techniques and modern wellness, focusing on proper body
              alignment and mindful movement. She is dedicated to helping each student progress and achieve their
              personal wellness goals.
            </p>

            {/* stats */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-[rgba(241,239,226,0.18)] bg-[rgba(241,239,226,0.06)] px-3 py-4 text-center"
                >
                  <div className="font-serif text-[clamp(20px,2.4vw,30px)] font-semibold leading-none text-olive-soft">
                    {s.value}
                  </div>
                  <div className="mt-1.5 text-[11px] uppercase tracking-[0.12em] text-[rgba(241,239,226,0.75)]">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* certifications */}
            <div className="mt-9">
              <div className="text-[13px] font-semibold uppercase tracking-[0.3em] text-olive-soft">
                Certifications &amp; Expertise
              </div>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {certifications.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-[rgba(241,239,226,0.22)] bg-[rgba(241,239,226,0.06)] px-4 py-2 text-[13.5px] font-medium text-cream"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="bg-paper px-6 py-[clamp(64px,8vw,110px)] sm:px-12 lg:px-[86px]">
        <div className="mx-auto max-w-[760px] text-center">
          <div className="bg-gradient-to-r from-olive to-green-deep bg-clip-text text-[14px] font-semibold uppercase tracking-[0.3em] text-transparent">
            Why Choose Us
          </div>
          <h2 className="m-0 mt-4 font-serif text-[clamp(30px,4.2vw,54px)] font-medium leading-[1.06] text-ink">
            A practice built around you
          </h2>
          <p className="mx-auto mt-5 max-w-[620px] text-[clamp(15px,1.2vw,18px)] font-light leading-[1.7] text-muted">
            Six reasons students stay with {SITE.name} — from how we teach to how we care, on and off the mat.
          </p>
        </div>

        <div className="mx-auto mt-[clamp(32px,4vw,52px)] grid max-w-[1120px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="rounded-[20px] border border-[var(--color-line)] bg-white p-7 shadow-[0_20px_46px_-32px_rgba(20,40,20,0.45)] transition hover:-translate-y-1 hover:shadow-[0_28px_54px_-30px_rgba(20,40,20,0.5)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-deep text-olive-soft">
                {r.icon}
              </div>
              <h3 className="mt-5 font-serif text-[22px] font-semibold text-green-deep">{r.title}</h3>
              <p className="mt-2.5 text-[15px] font-light leading-[1.65] text-muted">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        title="Ready to take the first step?"
        text="Your free trial class is waiting. Come exactly as you are."
      />
    </>
  );
}
