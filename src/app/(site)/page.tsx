import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { IMG } from "@/lib/images";
import HeroCarousel from "@/components/HeroCarousel";
import TestimonialSlider from "@/components/TestimonialSlider";

export const metadata: Metadata = {
  title: "Online & In-Person Yoga Classes with Anusha Shetty",
  description:
    "Just Begin Yoga offers personal, group, apartment and corporate yoga classes — online and in person — with certified instructor Anusha Shetty. Improve flexibility, strength and calm. Book a free trial.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Online & In-Person Yoga Classes with Anusha Shetty",
    description:
      "Just Begin Yoga offers personal, group, apartment and corporate yoga classes — online and in person — with certified instructor Anusha Shetty. Improve flexibility, strength and calm. Book a free trial.",
  },
};

type Style = { id: keyof typeof IMG; title: string; desc: string };

const styles: Style[] = [
  {
    id: "jb-style-vinyasa",
    title: "Vinyasa",
    desc: '"Flow yoga" links breath to movement in a seamless sequence — building heat and strength while calming the mind.',
  },
  {
    id: "jb-style-hatha",
    title: "Hatha Yoga",
    desc: "A foundational practice mastering classic postures and breathing techniques — perfect for beginners building a strong base.",
  },
  {
    id: "jb-style-power",
    title: "Power Yoga",
    desc: "A vigorous, fitness-focused approach with a fast-paced flow designed to build strength and stamina.",
  },
  {
    id: "jb-style-prenatal",
    title: "Prenatal Yoga",
    desc: "Gentle, supportive sessions for expectant and new mothers — preparing the body for childbirth and postpartum recovery.",
  },
  {
    id: "jb-style-pranayama",
    title: "Pranayama & Meditation",
    desc: "Breath regulation and mindfulness at the core of every class — calming the nervous system and improving mental clarity.",
  },
  {
    id: "jb-style-yin",
    title: "Yin Yoga",
    desc: "A slower, meditative style holding poses longer to target deep connective tissue — deep release and relaxation.",
  },
  {
    id: "jb-style-face",
    title: "Face Yoga",
    desc: "Exercises and massage targeting facial muscles — reducing tension, improving circulation and toning for a natural glow.",
  },
  {
    id: "jb-style-alignment",
    title: "Body Alignment",
    desc: "Proper form in every pose to improve posture, prevent injury and maximize the benefits of your practice.",
  },
];

const benefits: { strong: string; rest: string }[] = [
  {
    strong: "Stress relief & mental clarity",
    rest: " — calm your nervous system and quiet your mind through mindful movement and meditation.",
  },
  {
    strong: "Improved alignment & posture",
    rest: " — move with precision, improving posture and reducing the risk of injury.",
  },
  {
    strong: "Increased flexibility & mobility",
    rest: " — improve your range of motion and reduce stiffness with gentle, consistent practice.",
  },
  {
    strong: "Weight management & strength",
    rest: " — build lean muscle and boost metabolism in a supportive, non-judgmental space.",
  },
  {
    strong: "Holistic health & well-being",
    rest: " — connect with your body on a deeper level and cultivate a sense of inner peace.",
  },
];

const testimonials: { quote: string; name: string; role: string }[] = [
  {
    quote:
      "Thank you for conducting classes in our apartment. The sessions were always energetic and full of life. I really appreciate the way you personally corrected each of our postures — it was highly commendable. Rotating the asanas every day gave us great exposure to different poses and kept the sessions interesting. I would highly recommend your classes to everyone!",
    name: "Asha",
    role: "Apartment classes",
  },
  {
    quote:
      "My first time attending yoga was a completely new experience, and over the months it has helped me tremendously, both physically and mentally. Anusha takes the time to teach from the basics, ensuring every student feels comfortable and confident. Her calm, encouraging approach made it easy to stay committed. I've noticed real improvements in my flexibility, strength and overall well-being. Thank you, Anusha, for introducing me to yoga!",
    name: "Dev",
    role: "New to yoga",
  },
  {
    quote:
      "I have been practicing yoga with Anusha for over five years, and it has been a truly enriching journey. She builds overall strength and flexibility, but also thoughtfully adapts the sequences to suit individual health needs. What makes her stand out is her kindness, compassion and genuine care. I honestly don't think I could have found a better yoga teacher — Anusha is truly the best!",
    name: "Devoted student",
    role: "Practising 5+ years",
  },
  {
    quote:
      "It was very effective to join classes with Anusha Shetty after a long break. It not only helped with my pain and injuries but also improved overall flexibility. She is patient, supportive and makes yoga enjoyable, capable of providing individual attention and clear instructions. Thank you & best wishes.",
    name: "Amrita Vishwas",
    role: "After a long break",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ===== HERO CAROUSEL (3 banner slides) ===== */}
      <HeroCarousel />

      {/* ===== YOGA STYLES ===== */}
      <section
        id="styles"
        className="relative flex min-h-screen flex-col justify-center bg-paper px-[clamp(24px,6vw,86px)] pb-[clamp(40px,5vw,58px)] pt-24"
      >
        <div className="mx-auto max-w-[760px] text-center">
          <div className="bg-gradient-to-r from-olive to-green-deep bg-clip-text text-[14px] font-semibold uppercase tracking-[0.3em] text-transparent">
            Our Expertise
          </div>
          <h2 className="m-0 mt-4 font-serif text-[clamp(38px,4.6vw,64px)] font-medium leading-[1.04] text-ink">
            The yoga styles we teach
          </h2>
          <p className="mx-auto mt-[22px] max-w-[620px] text-[18px] font-light leading-[1.7] text-muted">
            A certified instructor across many traditions, Anusha blends these styles into a practice that is safe
            and effective for students of every level.
          </p>
        </div>

        <div className="mx-auto mt-[clamp(26px,3.4vw,44px)] w-full max-w-[1280px]">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {styles.map((s) => (
              <div key={s.id}>
                <div className="group relative overflow-hidden rounded-[18px] shadow-[0_18px_40px_-24px_rgba(20,40,20,0.5)] transition hover:-translate-y-1.5 hover:shadow-[0_28px_50px_-24px_rgba(20,40,20,0.6)]">
                  <Image
                    src={IMG[s.id]}
                    alt={s.title}
                    width={290}
                    height={186}
                    className="h-[186px] w-full object-cover"
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 px-4 pb-3.5 pt-[34px] font-serif text-[23px] font-semibold text-white"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(26,64,32,.95) 0%, rgba(26,64,32,.5) 42%, rgba(26,64,32,0) 78%)",
                    }}
                  >
                    {s.title}
                  </div>
                </div>
                <p className="mx-1 mt-3.5 min-h-[96px] text-[15px] font-light leading-[1.6] text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY YOGA ===== */}
      <section
        id="about"
        className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-green-deep px-[clamp(24px,6vw,86px)] pb-[clamp(40px,5vw,58px)] pt-24 text-cream"
      >
        <Image
          src="/assets/jb-logo.png"
          alt=""
          aria-hidden
          width={460}
          height={460}
          className="pointer-events-none absolute -left-[150px] -top-[100px] w-[460px] opacity-[0.06] brightness-0 invert"
          style={{ animation: "jbSpin 120s linear infinite" }}
        />
        <div className="mx-auto grid max-w-[1180px] items-center gap-[clamp(36px,5vw,76px)] lg:grid-cols-2">
          <div className="relative">
            <div
              className="absolute -inset-x-[22px] -bottom-[26px] -top-5 z-0 rounded-[32px]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(134,167,60,.6), rgba(44,106,57,.32) 52%, rgba(188,208,106,.45))",
              }}
            />
            <div className="relative z-[1] overflow-hidden rounded-[22px] shadow-[0_30px_60px_-28px_rgba(0,0,0,0.6)]">
              <Image
                src={IMG["jb-whyyoga"]}
                alt="Practice photo"
                width={620}
                height={520}
                className="h-full min-h-[320px] w-full object-cover"
              />
            </div>
          </div>
          <div>
            <div className="mb-[18px] flex items-center gap-3">
              <span className="h-px w-[30px] bg-[#bcd06a]" />
              <span className="text-[12px] uppercase tracking-[0.32em] text-[#bcd06a]">Why yoga?</span>
            </div>
            <h2 className="m-0 mb-5 font-serif text-[clamp(36px,4.2vw,56px)] font-medium leading-[1.05]">
              Discover the benefits with Just Begin Yoga
            </h2>
            <ul className="m-0 flex list-none flex-col p-0">
              {benefits.map((b, i) => (
                <li
                  key={b.strong}
                  className={`flex gap-4 border-t border-[rgba(241,239,226,0.16)] py-[13px] ${
                    i === benefits.length - 1 ? "border-b" : ""
                  }`}
                >
                  <span className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-full bg-[rgba(188,208,106,0.18)] text-[14px] text-[#bcd06a]">
                    ✦
                  </span>
                  <span className="text-[17.5px] leading-[1.55] text-[rgba(241,239,226,0.92)]">
                    <strong className="font-semibold text-white">{b.strong}</strong>
                    {b.rest}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/services"
              className="mt-8 inline-block rounded-full bg-cream px-8 py-4 text-[13px] font-medium uppercase tracking-[0.1em] text-green-deep no-underline transition hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-12px_rgba(0,0,0,0.4)]"
            >
              Get started
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FEATURED SERVICES ===== */}
      <section
        id="services"
        className="relative flex min-h-screen flex-col justify-center bg-paper px-[clamp(24px,6vw,86px)] pb-[clamp(40px,5vw,58px)] pt-24"
      >
        <div className="mx-auto max-w-[740px] text-center">
          <div className="bg-gradient-to-r from-olive to-green-deep bg-clip-text text-[14px] font-semibold uppercase tracking-[0.3em] text-transparent">
            Featured Services
          </div>
          <h2 className="m-0 mt-4 font-serif text-[clamp(38px,4.6vw,60px)] font-medium leading-[1.04] text-ink">
            Find your flow
          </h2>
          <p className="mx-auto mt-[22px] max-w-[600px] text-[18px] font-light leading-[1.7] text-muted">
            We offer a variety of classes designed to meet you wherever you are on your yoga journey.
          </p>
        </div>

        <div className="mx-auto mt-[clamp(32px,4vw,50px)] grid max-w-[1180px] grid-cols-1 items-center gap-[clamp(20px,3vw,46px)] lg:grid-cols-[1fr_auto_1fr]">
          <div className="flex flex-col gap-[22px]">
            <div className="rounded-[18px] border border-[var(--color-line)] bg-white px-7 py-[26px] text-right shadow-[0_18px_40px_-28px_rgba(20,40,20,0.4)] transition hover:-translate-y-1 hover:shadow-[0_26px_48px_-26px_rgba(20,40,20,0.5)]">
              <div className="font-serif text-[26px] font-semibold text-green-deep">Online Personal Classes</div>
              <p className="mt-2.5 text-[16px] font-light leading-[1.6] text-muted">
                A customized plan and one-on-one coaching from anywhere.
              </p>
            </div>
            <div className="rounded-[18px] border border-[var(--color-line)] bg-white px-7 py-[26px] text-right shadow-[0_18px_40px_-28px_rgba(20,40,20,0.4)] transition hover:-translate-y-1 hover:shadow-[0_26px_48px_-26px_rgba(20,40,20,0.5)]">
              <div className="font-serif text-[26px] font-semibold text-green-deep">Online Group Classes</div>
              <p className="mt-2.5 text-[16px] font-light leading-[1.6] text-muted">
                Practice with our supportive community from the comfort of home.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-[18px]">
            <div className="relative h-[clamp(220px,24vw,310px)] w-[clamp(220px,24vw,310px)]">
              <div
                className="absolute -inset-[26px] z-0 rounded-full blur-[10px]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(134,167,60,.7), rgba(44,106,57,.4) 55%, rgba(188,208,106,.6))",
                }}
              />
              <span className="absolute -inset-[14px] z-[1] rounded-full border border-dashed border-[rgba(134,167,60,0.55)]" />
              <div className="relative z-[1] h-full w-full overflow-hidden rounded-full">
                <Image
                  src={IMG["jb-services-center"]}
                  alt="Yoga practice"
                  fill
                  sizes="310px"
                  className="object-cover"
                />
              </div>
            </div>
            <Link
              href="/contact"
              className="rounded-full bg-gradient-to-r from-olive to-green-deep px-7 py-3.5 text-[12px] uppercase tracking-[0.1em] text-white no-underline shadow-[0_14px_30px_-14px_rgba(44,106,57,0.7)] transition hover:-translate-y-0.5"
            >
              View all services
            </Link>
          </div>

          <div className="flex flex-col gap-[22px]">
            <div className="rounded-[18px] border border-[var(--color-line)] bg-white px-7 py-[26px] text-left shadow-[0_18px_40px_-28px_rgba(20,40,20,0.4)] transition hover:-translate-y-1 hover:shadow-[0_26px_48px_-26px_rgba(20,40,20,0.5)]">
              <div className="font-serif text-[26px] font-semibold text-green-deep">Apartment Classes</div>
              <p className="mt-2.5 text-[16px] font-light leading-[1.6] text-muted">
                Bring yoga to your residential community or shared space.
              </p>
            </div>
            <div className="rounded-[18px] border border-[var(--color-line)] bg-white px-7 py-[26px] text-left shadow-[0_18px_40px_-28px_rgba(20,40,20,0.4)] transition hover:-translate-y-1 hover:shadow-[0_26px_48px_-26px_rgba(20,40,20,0.5)]">
              <div className="font-serif text-[26px] font-semibold text-green-deep">Corporate Classes</div>
              <p className="mt-2.5 text-[16px] font-light leading-[1.6] text-muted">
                Boost your team&apos;s productivity and well-being at work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section
        id="testimonials"
        className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-green-deep px-[clamp(24px,6vw,86px)] pb-[clamp(40px,5vw,58px)] pt-24 text-cream"
      >
        <Image
          src="/assets/jb-logo.png"
          alt=""
          aria-hidden
          width={420}
          height={420}
          className="pointer-events-none absolute -right-[130px] -top-[110px] w-[420px] opacity-[0.05] brightness-0 invert"
          style={{ animation: "jbSpin 130s linear infinite" }}
        />
        <div className="mx-auto max-w-[760px] text-center">
          <div className="text-[14px] font-semibold uppercase tracking-[0.3em] text-[#bcd06a]">
            In their own words
          </div>
          <h2 className="m-0 mt-3.5 font-serif text-[clamp(34px,4.4vw,58px)] font-medium leading-[1.05]">
            The impact of yoga, in their words
          </h2>
        </div>

        <TestimonialSlider items={testimonials} />
      </section>
    </>
  );
}
