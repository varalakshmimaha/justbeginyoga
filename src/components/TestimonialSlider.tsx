"use client";

import { useState, useEffect, useCallback } from "react";

export type Testimonial = { quote: string; name: string; role: string };

export default function TestimonialSlider({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);

  const go = useCallback(
    (dir: 1 | -1) => setIndex((p) => (p + dir + items.length) % items.length),
    [items.length]
  );

  // Auto-advance; pauses are unnecessary for short testimonial sets.
  useEffect(() => {
    if (items.length < 2) return;
    const t = setInterval(() => setIndex((p) => (p + 1) % items.length), 8000);
    return () => clearInterval(t);
  }, [items.length]);

  const t = items[index];

  return (
    <div className="mx-auto mt-[clamp(24px,3.4vw,44px)] w-full max-w-[920px]">
      {/* Slide — re-keyed so it re-runs the rise animation on change */}
      <div key={index} className="jb-rise flex flex-col items-center px-[clamp(6px,3vw,34px)] text-center">
        <div className="font-serif text-[58px] leading-[0.55] text-[#bcd06a]">&ldquo;</div>
        <p className="m-0 mt-[18px] max-w-[760px] font-serif text-[clamp(18px,1.7vw,25px)] italic leading-[1.5] text-[rgba(244,241,230,0.94)]">
          {t.quote}
        </p>
        <div className="my-4 mt-[30px] h-px w-[46px] bg-[rgba(188,208,106,0.5)]" />
        <div className="text-[15px] font-semibold tracking-[0.04em]">{t.name}</div>
        <div className="mt-[5px] text-[12px] uppercase tracking-[0.18em] text-[#bcd06a]">{t.role}</div>
      </div>

      {/* Controls */}
      {items.length > 1 && (
        <div className="mt-[clamp(28px,3vw,40px)] flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(241,239,226,0.32)] text-[20px] text-cream transition hover:border-[#bcd06a] hover:bg-[rgba(188,208,106,0.15)] hover:text-[#bcd06a]"
          >
            ‹
          </button>

          <div className="flex items-center gap-2.5">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-[#bcd06a]" : "w-2 bg-[rgba(241,239,226,0.35)] hover:bg-[rgba(241,239,226,0.6)]"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(241,239,226,0.32)] text-[20px] text-cream transition hover:border-[#bcd06a] hover:bg-[rgba(188,208,106,0.15)] hover:text-[#bcd06a]"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
