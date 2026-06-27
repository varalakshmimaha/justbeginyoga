"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

type Slide = {
  src: string;
  position: string;
  eyebrow: string;
  live?: boolean;
  titlePre: string;
  accent: string;
  titlePost?: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
};

// The three hero banners. Edit copy / photos / focal points here.
const slides: Slide[] = [
  {
    src: "/assets/river-pose.jpeg",
    position: "50% 86%",
    eyebrow: "Just Begin Yoga · Anusha Shetty",
    titlePre: "Where yoga ",
    accent: "begins.",
    subtitle:
      "Where every journey to a healthier, more balanced life starts. Anusha Shetty brings the practice to you — because the most important step is simply to begin.",
    ctaLabel: "Book your free trial class",
    ctaHref: "/contact",
  },
  {
    src: "/assets/apartment-class.jpeg",
    position: "50% 42%",
    eyebrow: "The Just Begin philosophy",
    titlePre: "The most important step is simply to ",
    accent: "begin.",
    subtitle:
      "Yoga meets you exactly where you are — no experience, no flexibility and no perfect mat required. Just a willingness to take the first breath.",
    ctaLabel: "Book your free trial class",
    ctaHref: "/contact",
  },
  {
    src: "/assets/slots/jb-group-class.webp",
    position: "50% 40%",
    eyebrow: "Now running · live online",
    live: true,
    titlePre: "Daily ",
    accent: "group classes",
    titlePost: " — join us on the mat",
    subtitle:
      "Live sessions five days a week with morning & evening batches. All levels welcome — find your daily rhythm with our community.",
    ctaLabel: "Join Group Classes",
    ctaHref: "/group-classes",
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  const go = useCallback(
    (dir: 1 | -1) => setIndex((p) => (p + dir + slides.length) % slides.length),
    []
  );

  useEffect(() => {
    const t = setInterval(() => setIndex((p) => (p + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, []);

  const slide = slides[index];

  return (
    <section className="relative flex min-h-[640px] items-center overflow-hidden bg-[#1d3a22] pt-[140px] sm:pt-[170px] lg:min-h-screen">
      {/* Background photos — cross-fade */}
      {slides.map((s, i) => (
        <Image
          key={s.src}
          src={s.src}
          alt=""
          aria-hidden
          fill
          priority={i === 0}
          sizes="100vw"
          style={{ objectPosition: s.position }}
          className={`object-cover transition-opacity duration-[1400ms] ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Scrims + vignette (legibility) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(18,38,22,0) 14%, rgba(18,38,22,.35) 46%, rgba(18,38,22,.72) 74%, rgba(18,38,22,.9) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(18,38,22,.5) 0%, rgba(18,38,22,0) 24%, rgba(18,38,22,0) 62%, rgba(18,38,22,.7) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 0 220px 40px rgba(8,18,10,.5)" }}
      />

      {/* Content */}
      <div className="relative z-[6] mx-auto w-full max-w-[1180px] px-6 pb-[70px] sm:px-12 lg:px-[86px]">
        <div key={index} className="jb-rise max-w-[640px]">
          <div className="mb-[18px] flex items-center gap-3">
            <span
              className={`h-[7px] w-[7px] rounded-full ${
                slide.live
                  ? "bg-[#e0533a] shadow-[0_0_12px_#e0533a]"
                  : "bg-olive shadow-[0_0_12px_#86a73c]"
              }`}
            />
            <span className="text-[12px] uppercase tracking-[0.32em] text-[rgba(244,241,230,0.88)]">
              {slide.eyebrow}
            </span>
          </div>

          <h1 className="m-0 font-serif text-[clamp(40px,8vw,68px)] font-medium leading-[1.04] tracking-[-0.01em] text-[#f4f1e6] [text-shadow:0_2px_30px_rgba(8,18,10,0.4)]">
            {slide.titlePre}
            <span className="italic text-[#bcd06a]">{slide.accent}</span>
            {slide.titlePost}
          </h1>

          <p className="m-0 mt-[24px] max-w-[470px] text-[clamp(16px,1.2vw,18px)] font-light leading-[1.66] text-[rgba(244,241,230,0.86)]">
            {slide.subtitle}
          </p>

          <div className="mt-[30px]">
            <Link
              href={slide.ctaHref}
              className="inline-block rounded-full bg-gradient-to-r from-olive to-green px-8 py-[17px] text-[13px] uppercase tracking-[0.12em] text-white no-underline shadow-[0_16px_38px_-14px_rgba(60,128,73,0.8)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_44px_-14px_rgba(60,128,73,0.9)]"
            >
              {slide.ctaLabel}
            </Link>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-[clamp(34px,5vw,56px)] flex items-center gap-5">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous slide"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(244,241,230,0.32)] text-[20px] text-[#f4f1e6] transition hover:border-[#bcd06a] hover:bg-[rgba(188,208,106,0.15)] hover:text-[#bcd06a]"
          >
            ‹
          </button>

          <div className="flex items-center gap-2.5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all ${
                  i === index
                    ? "w-6 bg-[#bcd06a]"
                    : "w-2 bg-[rgba(244,241,230,0.4)] hover:bg-[rgba(244,241,230,0.7)]"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next slide"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(244,241,230,0.32)] text-[20px] text-[#f4f1e6] transition hover:border-[#bcd06a] hover:bg-[rgba(188,208,106,0.15)] hover:text-[#bcd06a]"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
