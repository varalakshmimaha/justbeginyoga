import Link from "next/link";
import Image from "next/image";
import { IMG } from "@/lib/images";
import { SITE } from "@/lib/site";
import EnrollButton from "@/components/EnrollButton";

const stats = [
  { value: "5", label: "Days / Week" },
  { value: "2", label: "Daily Batches" },
  { value: "8+", label: "Yoga Styles" },
];

const batches = [
  {
    when: "06:00 – 07:00 AM",
    name: "Morning Flow",
    desc: "Start your day with energizing Vinyasa and Hatha to awaken the body and sharpen focus.",
    tags: ["Vinyasa", "Hatha", "Energizing"],
    icon: "🌅",
  },
  {
    when: "06:00 – 07:00 PM",
    name: "Evening Calm",
    desc: "Unwind with restorative Yin and Pranayama to release tension and settle into stillness.",
    tags: ["Yin", "Pranayama", "Restorative"],
    icon: "🌆",
  },
];

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const styles: { id: keyof typeof IMG; title: string; tag: string }[] = [
  { id: "jb-style-vinyasa", title: "Vinyasa", tag: "Breath-linked flow" },
  { id: "jb-style-hatha", title: "Hatha", tag: "Foundational postures" },
  { id: "jb-style-power", title: "Power Yoga", tag: "Strength & stamina" },
  { id: "jb-style-alignment", title: "Alignment", tag: "Posture & form" },
  { id: "jb-style-prenatal", title: "Prenatal", tag: "Gentle & supportive" },
  { id: "jb-style-pranayama", title: "Pranayama", tag: "Breath & calm" },
  { id: "jb-style-yin", title: "Yin Yoga", tag: "Deep release" },
  { id: "jb-style-face", title: "Face Yoga", tag: "Tone & glow" },
];

const benefits = [
  { strong: "Stress relief & mental clarity", rest: " — calm your nervous system through mindful movement and meditation." },
  { strong: "Improved alignment & posture", rest: " — move with precision and reduce the risk of injury." },
  { strong: "Flexibility & mobility", rest: " — improve range of motion with gentle, consistent practice." },
  { strong: "Strength & weight management", rest: " — build lean muscle in a supportive, non-judgmental space." },
];

const plans = [
  {
    name: "Monthly",
    period: "1 Month",
    price: "₹999",
    per: "₹999 / month",
    popular: false,
    features: ["Weekly 5-day group classes", "Both morning & evening batches", "Online classes"],
  },
  {
    name: "Quarterly",
    period: "3 Months",
    price: "₹2499",
    per: "₹833 / month",
    popular: true,
    features: ["Weekly 5-day group classes", "Both morning & evening batches", "Online classes", "Save ₹166 / month"],
  },
  {
    name: "Half Yearly",
    period: "6 Months",
    price: "₹4499",
    per: "₹749 / month",
    popular: false,
    features: ["Weekly 5-day group classes", "Both morning & evening batches", "Online classes", "Best value · save ₹250 / month"],
  },
];

export const GROUP_FAQS = [
  {
    q: "How do online yoga classes work?",
    a: "Our online classes are conducted live via Zoom. Once you register, you'll receive a meeting link before each session. You can join from anywhere using your phone, tablet, or laptop. The instructor guides you in real-time and can see you to provide corrections.",
  },
  {
    q: "What do I need for online classes?",
    a: "Just a yoga mat, comfortable clothing, a bottle of water, and a device with a camera placed in a quiet space where you can move freely. That's all you need to join and practice along with the class.",
  },
  {
    q: "I'm a complete beginner. Can I join?",
    a: "Absolutely! Our classes are designed for all levels, from complete beginners to advanced practitioners. The instructor provides modifications for each pose, so you can practice at your own pace safely.",
  },
  {
    q: "What are the class timings?",
    a: "We offer two batches daily, 5 days a week (Monday to Friday): a Morning Batch from 6:00 – 7:00 AM and an Evening Batch from 6:00 – 7:00 PM. Choose the timing that fits your schedule.",
  },
  {
    q: "Can I switch between morning and evening batches?",
    a: "Yes! Your subscription gives you access to both batches. You can attend the morning session on some days and the evening session on others, based on your convenience.",
  },
  {
    q: "What if I miss a class?",
    a: "If you miss a live session, don't worry! We understand life gets busy. While live sessions offer the best experience with real-time guidance, you can always catch up in the next class. Consistency is key, so we encourage regular attendance.",
  },
  {
    q: "How do I book a free trial class?",
    a: "Simply click the “Book a free trial” button on this page or contact us via WhatsApp. We'll schedule you for the next available batch so you can experience our classes before committing.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept UPI, bank transfers, and all major payment methods. Once you choose your package, we'll share the payment details. You'll receive a confirmation and class links immediately after payment.",
  },
];

export const groupFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: GROUP_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function GroupClassSections() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#245733] to-[#122e1a] px-6 pb-16 pt-[130px] text-cream sm:px-12 sm:pt-[160px] lg:px-[86px] lg:pt-[180px]">
        <Image
          src="/assets/jb-logo.png"
          alt=""
          aria-hidden
          width={420}
          height={420}
          className="pointer-events-none absolute -bottom-[150px] -left-[150px] w-[420px] opacity-[0.05] brightness-0 invert"
          style={{ animation: "jbSpin 150s linear infinite" }}
        />
        <div className="relative z-[2] mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-[clamp(40px,5vw,72px)]">
          {/* copy */}
          <div className="jb-rise">
            <div className="mb-[26px] inline-flex items-center gap-2.5 rounded-full border border-[rgba(241,239,226,0.18)] bg-[rgba(241,239,226,0.08)] px-4 py-2">
              <span className="h-[7px] w-[7px] rounded-full bg-[#e0533a] shadow-[0_0_10px_#e0533a]" style={{ animation: "jbPulse 2.6s ease-in-out infinite" }} />
              <span className="text-[12px] uppercase tracking-[0.24em] text-[rgba(241,239,226,0.9)]">Live online group classes</span>
            </div>
            <h1 className="m-0 font-serif text-[clamp(44px,6vw,84px)] font-medium leading-[0.98] tracking-[-0.01em]">
              Yoga Group <span className="italic text-olive-soft">Class.</span>
            </h1>
            <p className="mt-6 max-w-[480px] text-[clamp(16px,1.3vw,18px)] font-light leading-[1.7] text-[rgba(241,239,226,0.86)]">
              Find your daily rhythm. Two live sessions a day, five days a week — a steady, supportive practice that moves with your morning and your evening.
            </p>
            <div className="mt-[34px] flex flex-wrap gap-4">
              <Link href="#pricing" className="rounded-full bg-gradient-to-r from-olive to-olive-soft px-[34px] py-[17px] text-[13px] font-semibold uppercase tracking-[0.1em] text-[#16321d] no-underline shadow-[0_18px_40px_-16px_rgba(188,208,106,0.6)]">
                See plans &amp; pricing
              </Link>
              <EnrollButton
                label="Book a free trial ↗"
                className="inline-flex items-center gap-2 border-b border-[rgba(241,239,226,0.4)] pb-[5px] text-[13px] uppercase tracking-[0.08em] text-cream"
              />
            </div>
            <div className="mt-[clamp(38px,4.6vw,50px)] flex flex-wrap gap-[clamp(26px,4vw,46px)]">
              {stats.map((s, i) => (
                <div key={s.label} className="flex items-center gap-[clamp(26px,4vw,46px)]">
                  {i > 0 && <span className="h-9 w-px bg-[rgba(241,239,226,0.16)]" />}
                  <div>
                    <div className="font-serif text-[clamp(30px,3.4vw,42px)] font-semibold leading-none text-olive-soft">{s.value}</div>
                    <div className="mt-1.5 text-[11.5px] uppercase tracking-[0.16em] text-[rgba(241,239,226,0.72)]">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* today's sessions card */}
          <div className="jb-rise">
            <div className="rounded-[24px] border border-[rgba(241,239,226,0.14)] bg-[rgba(241,239,226,0.06)] p-6 shadow-[0_40px_80px_-34px_rgba(0,0,0,0.6)] backdrop-blur-sm sm:p-7">
              <div className="flex items-center justify-between">
                <span className="font-serif text-[19px] font-semibold text-white">Today&apos;s sessions</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(224,83,58,0.16)] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-[#f0a594]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#e0533a]" style={{ animation: "jbPulse 2.6s ease-in-out infinite" }} /> Live
                </span>
              </div>
              <div className="mt-5 space-y-3.5">
                {batches.map((b) => (
                  <div key={b.name} className="rounded-[16px] border border-[rgba(241,239,226,0.12)] bg-[rgba(16,40,22,0.5)] p-4">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2.5 font-serif text-[17px] font-semibold text-white">
                        <span className="text-[18px]">{b.icon}</span> {b.name}
                      </span>
                      <span className="text-[12.5px] font-medium text-olive-soft">{b.when.replace(" AM", "").replace(" PM", "")}</span>
                    </div>
                    <p className="mt-1.5 text-[13px] font-light text-[rgba(241,239,226,0.74)]">
                      {b.tags.slice(0, 2).join(" · ")} — {b.name === "Morning Flow" ? "energize & focus" : "unwind & release"}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center text-[12px] uppercase tracking-[0.14em] text-[rgba(241,239,226,0.6)]">
                5 days a week · Monday to Friday
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SCHEDULE ===== */}
      <section className="bg-paper px-6 py-[clamp(56px,7vw,100px)] sm:px-12 lg:px-[86px]">
        <div className="mx-auto max-w-[760px] text-center">
          <div className="bg-gradient-to-r from-olive to-green-deep bg-clip-text text-[14px] font-semibold uppercase tracking-[0.3em] text-transparent">A day in practice</div>
          <h2 className="m-0 mt-4 font-serif text-[clamp(30px,4vw,52px)] font-medium leading-[1.06] text-ink">From sunrise to stillness</h2>
          <p className="mx-auto mt-5 max-w-[560px] text-[clamp(15px,1.2vw,18px)] font-light leading-[1.7] text-muted">
            Two batches frame the day — choose one, or flow with both.
          </p>
        </div>

        <div className="mx-auto mt-[clamp(32px,4vw,52px)] grid max-w-[980px] gap-6 md:grid-cols-2">
          {batches.map((b) => {
            const dark = b.name === "Evening Calm";
            return (
              <div
                key={b.name}
                className={`rounded-[22px] border p-7 shadow-[0_22px_50px_-32px_rgba(20,40,20,0.45)] ${
                  dark ? "border-transparent bg-green-deep text-cream" : "border-[var(--color-line)] bg-[#f4efdf] text-ink"
                }`}
              >
                <div className={`text-[13px] font-medium uppercase tracking-[0.12em] ${dark ? "text-olive-soft" : "text-olive"}`}>{b.when}</div>
                <h3 className={`mt-2 font-serif text-[26px] font-semibold ${dark ? "text-white" : "text-green-deep"}`}>{b.name}</h3>
                <p className={`mt-2.5 text-[15px] font-light leading-[1.65] ${dark ? "text-[rgba(241,239,226,0.82)]" : "text-muted"}`}>{b.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {b.tags.map((t) => (
                    <span key={t} className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-medium ${dark ? "bg-[rgba(241,239,226,0.12)] text-cream" : "bg-white text-green-deep"}`}>{t}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-8 flex max-w-[980px] flex-wrap justify-center gap-2.5">
          {weekdays.map((d) => (
            <span key={d} className="rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-[13px] font-medium text-muted">{d}</span>
          ))}
        </div>
      </section>

      {/* ===== STYLES ===== */}
      <section className="bg-white px-6 py-[clamp(56px,7vw,100px)] sm:px-12 lg:px-[86px]">
        <div className="mx-auto max-w-[760px] text-center">
          <div className="bg-gradient-to-r from-olive to-green-deep bg-clip-text text-[14px] font-semibold uppercase tracking-[0.3em] text-transparent">Our Expertise</div>
          <h2 className="m-0 mt-4 font-serif text-[clamp(30px,4vw,52px)] font-medium leading-[1.06] text-ink">Eight styles, one practice</h2>
          <p className="mx-auto mt-5 max-w-[600px] text-[clamp(15px,1.2vw,18px)] font-light leading-[1.7] text-muted">
            Anusha blends these traditions into every batch — safe and effective for all levels.
          </p>
        </div>

        <div className="mx-auto mt-[clamp(28px,3.4vw,44px)] grid max-w-[1140px] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {styles.map((s) => (
            <div key={s.id} className="group overflow-hidden rounded-[16px] border border-[var(--color-line)] bg-paper shadow-[0_16px_36px_-28px_rgba(20,40,20,0.4)] transition hover:-translate-y-1">
              <div className="relative h-[120px] w-full overflow-hidden">
                <Image src={IMG[s.id]} alt={s.title} fill sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw" className="object-cover transition group-hover:scale-105" />
              </div>
              <div className="p-4">
                <div className="font-serif text-[18px] font-semibold text-green-deep">{s.title}</div>
                <div className="mt-0.5 text-[12.5px] text-muted">{s.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== BENEFITS ===== */}
      <section className="relative overflow-hidden bg-green-deep px-6 py-[clamp(56px,7vw,100px)] text-cream sm:px-12 lg:px-[86px]">
        <Image
          src="/assets/jb-logo.png"
          alt=""
          aria-hidden
          width={420}
          height={420}
          className="pointer-events-none absolute -top-[120px] -left-[140px] w-[420px] opacity-[0.05] brightness-0 invert"
          style={{ animation: "jbSpin 140s linear infinite" }}
        />
        <div className="relative mx-auto grid max-w-[1140px] items-center gap-[clamp(36px,5vw,72px)] lg:grid-cols-2">
          <div>
            <div className="text-[14px] font-semibold uppercase tracking-[0.3em] text-olive-soft">Why practice daily?</div>
            <h2 className="m-0 mb-6 mt-4 font-serif text-[clamp(30px,4vw,52px)] font-medium leading-[1.06]">Small steps, every day</h2>
            <ul className="m-0 flex list-none flex-col p-0">
              {benefits.map((b, i) => (
                <li key={b.strong} className={`flex gap-4 border-t border-[rgba(241,239,226,0.16)] py-[14px] ${i === benefits.length - 1 ? "border-b" : ""}`}>
                  <span className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-full bg-[rgba(188,208,106,0.18)] text-[14px] text-olive-soft">✦</span>
                  <span className="text-[16.5px] leading-[1.55] text-[rgba(241,239,226,0.92)]">
                    <strong className="font-semibold text-white">{b.strong}</strong>{b.rest}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-[22px] shadow-[0_30px_60px_-28px_rgba(0,0,0,0.55)]">
              <Image src={IMG["jb-group-laptop"]} alt="Live online group yoga class on a laptop" width={620} height={460} className="h-full w-full object-cover" />
            </div>
            <div className="mt-4 text-center text-[12.5px] uppercase tracking-[0.16em] text-[rgba(241,239,226,0.7)]">
              Live on Zoom · join from anywhere
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section id="pricing" className="bg-paper px-6 py-[clamp(56px,7vw,100px)] sm:px-12 lg:px-[86px]">
        <div className="mx-auto max-w-[760px] text-center">
          <div className="bg-gradient-to-r from-olive to-green-deep bg-clip-text text-[14px] font-semibold uppercase tracking-[0.3em] text-transparent">Simple Pricing</div>
          <h2 className="m-0 mt-4 font-serif text-[clamp(30px,4vw,52px)] font-medium leading-[1.06] text-ink">Invest in your wellness</h2>
          <p className="mx-auto mt-5 max-w-[580px] text-[clamp(15px,1.2vw,18px)] font-light leading-[1.7] text-muted">
            Choose the plan that works best for your journey. Every plan includes access to all classes.
          </p>
        </div>

        <div className="mx-auto mt-[clamp(32px,4vw,52px)] grid max-w-[1080px] items-start gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-[22px] p-7 ${
                p.popular
                  ? "border-2 border-green-deep bg-green-deep text-cream shadow-[0_30px_60px_-28px_rgba(20,40,20,0.6)] md:-mt-3"
                  : "border border-[var(--color-line)] bg-white text-ink shadow-[0_18px_44px_-30px_rgba(20,40,20,0.4)]"
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-olive to-olive-soft px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#16321d]">
                  Most popular
                </span>
              )}
              <div className={`font-serif text-[24px] font-semibold ${p.popular ? "text-white" : "text-green-deep"}`}>{p.name}</div>
              <div className={`text-[13px] ${p.popular ? "text-[rgba(241,239,226,0.7)]" : "text-muted"}`}>{p.period}</div>
              <div className="mt-4 flex items-end gap-1.5">
                <span className={`font-serif text-[44px] font-semibold leading-none ${p.popular ? "text-olive-soft" : "text-green-deep"}`}>{p.price}</span>
                <span className={`pb-1 text-[13px] ${p.popular ? "text-[rgba(241,239,226,0.7)]" : "text-muted"}`}>/ {p.period.split(" ")[0].toLowerCase()}</span>
              </div>
              <div className={`mt-1 text-[12.5px] ${p.popular ? "text-[rgba(241,239,226,0.7)]" : "text-muted"}`}>{p.per}</div>

              <ul className="my-6 flex list-none flex-col gap-2.5 p-0">
                {p.features.map((f) => (
                  <li key={f} className={`flex items-start gap-2.5 text-[14.5px] ${p.popular ? "text-[rgba(241,239,226,0.9)]" : "text-[#3a4733]"}`}>
                    <span className={`mt-0.5 text-[13px] ${p.popular ? "text-olive-soft" : "text-green-deep"}`}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <EnrollButton
                plan={{ name: p.name, price: p.price }}
                label="Get started"
                className={`block w-full rounded-full px-6 py-3.5 text-center text-[13px] font-semibold uppercase tracking-[0.1em] transition ${
                  p.popular
                    ? "bg-cream text-green-deep hover:-translate-y-0.5"
                    : "border border-green-deep text-green-deep hover:bg-green-deep hover:text-white"
                }`}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-white px-6 py-[clamp(56px,7vw,100px)] sm:px-12 lg:px-[86px]">
        <div className="mx-auto max-w-[760px] text-center">
          <div className="bg-gradient-to-r from-olive to-green-deep bg-clip-text text-[14px] font-semibold uppercase tracking-[0.3em] text-transparent">Have questions?</div>
          <h2 className="m-0 mt-4 font-serif text-[clamp(30px,4vw,52px)] font-medium leading-[1.06] text-ink">Frequently asked questions</h2>
          <p className="mx-auto mt-5 max-w-[560px] text-[clamp(15px,1.2vw,18px)] font-light leading-[1.7] text-muted">
            Everything you need to know about our online group yoga classes.
          </p>
        </div>

        <div className="mx-auto mt-[clamp(28px,3.4vw,44px)] max-w-[820px] space-y-3">
          {GROUP_FAQS.map((f) => (
            <details key={f.q} className="group rounded-[16px] border border-[var(--color-line)] bg-paper px-6 py-1 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-serif text-[18px] font-semibold text-green-deep">
                {f.q}
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[rgba(134,167,60,0.16)] text-[18px] text-green-deep transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="m-0 pb-5 pr-10 text-[15px] font-light leading-[1.7] text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
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
          <h2 className="m-0 font-serif text-[clamp(30px,3.8vw,52px)] font-medium leading-[1.08]">Begin tomorrow morning</h2>
          <p className="mx-auto mt-[18px] max-w-[540px] text-[16.5px] font-light leading-[1.7] text-[rgba(241,239,226,0.88)]">
            Book a free trial and find your rhythm with our community — morning or evening.
          </p>
          <div className="mt-[30px] flex flex-wrap justify-center gap-3.5">
            <EnrollButton
              label="Book a free trial"
              className="rounded-full bg-cream px-9 py-[17px] text-[13px] font-medium uppercase tracking-[0.12em] text-green-deep shadow-[0_18px_40px_-16px_rgba(0,0,0,0.4)]"
            />
            <a href={SITE.whatsapp} target="_blank" rel="noopener" className="rounded-full border border-[rgba(241,239,226,0.5)] px-9 py-[17px] text-[13px] font-medium uppercase tracking-[0.12em] text-cream no-underline">
              WhatsApp us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
