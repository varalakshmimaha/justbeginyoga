import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IMG } from "@/lib/images";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Yoga Services",
  description:
    "Explore our yoga services: online personal classes, group classes, apartment community sessions and corporate wellness programs. Find the format that fits you.",
  alternates: { canonical: "/services" },
};

type ServiceCard = {
  num: string;
  img: keyof typeof IMG;
  title: string;
  desc: string;
  tags: string[];
  href: string;
};

const CARDS: ServiceCard[] = [
  {
    num: "1",
    img: "svc-personal",
    title: "Online Personal Classes",
    desc: "A customized plan and one-on-one coaching from anywhere — tailored to your body, goals and pace.",
    tags: ["1-on-1 attention", "Custom plan", "Flexible timing"],
    href: "/services/personal",
  },
  {
    num: "2",
    img: "svc-group",
    title: "Online Group Classes",
    desc: "Practice with our supportive community from the comfort of home, guided every step of the way.",
    tags: ["Community", "Live guidance", "From home"],
    href: "/group-classes",
  },
  {
    num: "3",
    img: "svc-apartment",
    title: "Apartment Classes",
    desc: "Bring the benefits of yoga to your residential community — energetic, friendly sessions right at your doorstep.",
    tags: ["At your society", "Group energy", "In person"],
    href: "/services/apartment",
  },
  {
    num: "4",
    img: "svc-corporate",
    title: "Corporate Classes",
    desc: "Boost your team's productivity and well-being with corporate yoga programs designed for the workplace.",
    tags: ["For teams", "Stress relief", "At your office"],
    href: "/services/corporate",
  },
];

const STYLES = [
  "Vinyasa",
  "Hatha Yoga",
  "Power Yoga",
  "Prenatal Yoga",
  "Pranayama & Meditation",
  "Yin Yoga",
  "Face Yoga",
  "Body Alignment",
];

function ServiceCardItem({ card }: { card: ServiceCard }) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-[var(--color-line)] bg-white shadow-[0_22px_50px_-32px_rgba(20,40,20,0.5)]">
      <div className="relative h-[244px] bg-gradient-to-br from-[#eef2e2] to-[#dfe7d0]">
        <Image
          src={IMG[card.img]}
          alt={card.title}
          fill
          className="absolute inset-0 h-full w-full object-contain"
        />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(44,106,57,0.34),rgba(28,67,38,0)_60%)]"></div>
        <span className="absolute left-5 top-[18px] flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[rgba(251,248,239,0.95)] font-serif text-[22px] font-bold text-green-deep">
          {card.num}
        </span>
      </div>
      <div className="px-[30px] pb-8 pt-7">
        <h3 className="m-0 font-serif text-[27px] font-semibold text-green-deep">{card.title}</h3>
        <p className="mb-[18px] mt-3 text-[15.5px] font-light leading-[1.65] text-muted">{card.desc}</p>
        <div className="flex flex-wrap gap-2">
          {card.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[rgba(134,167,60,0.12)] px-[14px] py-[7px] text-[12.5px] text-green-deep"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={card.href}
          className="mt-[18px] inline-flex items-center gap-[7px] text-[13px] font-semibold uppercase tracking-[0.08em] text-green-deep no-underline transition-all hover:gap-[11px]"
        >
          Learn more <span className="text-[15px]">→</span>
        </Link>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-[linear-gradient(150deg,#2c6a39_0%,#1c4326_70%,#16321d_100%)] px-6 pb-[60px] pt-[130px] text-center text-cream sm:px-12 sm:pt-[160px] lg:px-[86px] lg:pt-[180px]">
        <Image
          src="/assets/jb-logo.png"
          alt=""
          aria-hidden
          width={400}
          height={400}
          className="pointer-events-none absolute -bottom-28 -left-[120px] w-[400px] opacity-[0.06] brightness-0 invert"
          style={{ animation: "jbSpin 130s linear infinite" }}
        />
        <Image
          src="/assets/jb-logo.png"
          alt=""
          aria-hidden
          width={320}
          height={320}
          className="pointer-events-none absolute -right-[130px] -top-[100px] w-[320px] opacity-[0.05] brightness-0 invert"
          style={{ animation: "jbSpin 150s linear infinite reverse" }}
        />
        <div className="jb-rise relative">
          <div className="mb-[18px] inline-flex items-center gap-[11px]">
            <span className="h-px w-7 bg-olive-soft"></span>
            <span className="text-[13px] uppercase tracking-[0.32em] text-olive-soft">Our Services</span>
            <span className="h-px w-7 bg-olive-soft"></span>
          </div>
          <h1 className="m-0 font-serif text-[clamp(42px,5.6vw,80px)] font-medium leading-none">
            Find your flow,
            <br />
            <span className="italic text-olive-soft">wherever you are.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[640px] text-[17.5px] font-light leading-[1.7] text-[rgba(241,239,226,0.9)]">
            A variety of classes designed to meet you exactly where you are on your yoga journey — one-on-one, in groups, at your apartment, or at work.
          </p>
        </div>
      </section>

      {/* ===== SERVICE CARDS ===== */}
      <section className="relative bg-paper px-6 py-[clamp(64px,8vw,118px)] sm:px-12 lg:px-[86px]">
        <div className="mx-auto mb-[clamp(40px,5vw,60px)] max-w-[720px] text-center">
          <div className="bg-gradient-to-r from-olive to-green-deep bg-clip-text text-[13px] font-semibold uppercase tracking-[0.3em] text-transparent">
            What we offer
          </div>
          <h2 className="mt-4 font-serif text-[clamp(32px,4.2vw,54px)] font-medium leading-[1.06] text-green-deep">
            Four ways to practice
          </h2>
        </div>

        <div className="mx-auto mb-[clamp(28px,3.4vw,42px)] flex max-w-[1160px] justify-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-[var(--color-line)] bg-white py-[7px] pl-[22px] pr-2 shadow-[0_16px_36px_-28px_rgba(20,40,20,0.4)]">
            <span className="whitespace-nowrap text-[13px] tracking-[0.04em] text-muted">Explore a service</span>
            <span className="rounded-full bg-gradient-to-r from-olive to-green-deep px-[18px] py-[11px] text-[13px] font-semibold tracking-[0.04em] text-white">
              Choose a class…
            </span>
          </div>
        </div>

        <div className="mx-auto grid max-w-[1160px] grid-cols-1 gap-[clamp(20px,2.4vw,30px)] md:grid-cols-2">
          {CARDS.map((card) => (
            <ServiceCardItem key={card.num} card={card} />
          ))}
        </div>
      </section>

      {/* ===== FEATURE / NOT SURE WHERE TO START ===== */}
      <section className="relative overflow-hidden bg-green-deep px-6 py-[clamp(64px,8vw,118px)] text-cream sm:px-12 lg:px-[86px]">
        <div className="mx-auto grid max-w-[1160px] grid-cols-1 items-center gap-[clamp(38px,5vw,76px)] md:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-[14px] text-[13px] uppercase tracking-[0.3em] text-olive-soft">Not sure where to start?</div>
            <h2 className="m-0 font-serif text-[clamp(30px,3.8vw,52px)] font-medium leading-[1.08]">
              Begin with a free trial class
            </h2>
            <p className="mt-5 text-[16.5px] font-light leading-[1.75] text-[rgba(241,239,226,0.88)]">
              First-time students get a free trial — a relaxed way to experience the teaching style and find the format and pace that suits you. No experience or flexibility required. Just come as you are.
            </p>
            <ul className="mt-[26px] flex list-none flex-col gap-[14px] p-0">
              {[
                "Personal guidance to choose the right style",
                "Small classes, individual attention",
                "Online or in person — your choice",
              ].map((item) => (
                <li key={item} className="flex items-start gap-[13px] text-[15.5px] text-[rgba(241,239,226,0.9)]">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[rgba(188,208,106,0.2)] text-[13px] text-olive-soft">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-[30px] inline-block rounded-full bg-cream px-[34px] py-4 text-[13px] font-medium uppercase tracking-[0.12em] text-green-deep no-underline shadow-[0_16px_36px_-16px_rgba(0,0,0,0.4)]"
            >
              Book a free trial
            </Link>
          </div>
          <div className="relative order-first md:order-none">
            <div className="absolute -inset-x-5 -bottom-[22px] -top-[18px] rounded-[30px] bg-[linear-gradient(135deg,rgba(188,208,106,0.55),rgba(134,167,60,0.28)_55%,rgba(241,239,226,0.4))]"></div>
            <div className="relative z-[1] aspect-[1402/1122] rounded-[22px] bg-[#16331d] shadow-[0_32px_60px_-30px_rgba(0,0,0,0.7)]">
              <Image
                src={IMG["svc-feature"]}
                alt="Just Begin Yoga class"
                fill
                className="absolute inset-0 h-full w-full overflow-hidden rounded-[22px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== STYLES ===== */}
      <section className="relative bg-paper px-6 py-[clamp(64px,8vw,118px)] sm:px-12 lg:px-[86px]">
        <div className="mx-auto max-w-[1080px] text-center">
          <div className="bg-gradient-to-r from-olive to-green-deep bg-clip-text text-[13px] font-semibold uppercase tracking-[0.3em] text-transparent">
            Styles we teach
          </div>
          <h2 className="mb-[6px] mt-4 font-serif text-[clamp(30px,3.8vw,50px)] font-medium text-green-deep">
            A practice for every intention
          </h2>
          <p className="mx-auto mt-[18px] max-w-[600px] text-[16px] font-light leading-[1.7] text-muted">
            Anusha blends many traditions into a practice that is safe and effective for students of every level.
          </p>
          <div className="mt-[clamp(30px,4vw,44px)] flex flex-wrap justify-center gap-[11px]">
            {STYLES.map((style) => (
              <span
                key={style}
                className="rounded-full border border-[var(--color-line)] bg-white px-6 py-[13px] text-[15px] text-green-deep shadow-[0_12px_26px_-22px_rgba(20,40,20,0.4)]"
              >
                {style}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
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
          <h2 className="m-0 font-serif text-[clamp(30px,3.8vw,52px)] font-medium leading-[1.08]">Your mat is waiting.</h2>
          <p className="mx-auto mt-[18px] max-w-[520px] text-[16.5px] font-light leading-[1.7] text-[rgba(241,239,226,0.88)]">
            Reach out to book a class or ask which format suits you best.
          </p>
          <div className="mt-[30px] flex flex-wrap justify-center gap-[14px]">
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
