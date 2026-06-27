import Image from "next/image";

export default function PageHero({
  eyebrow,
  title,
  accent,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-deep to-[#1c4326] px-6 pb-16 pt-[130px] text-center text-cream sm:px-12 sm:pt-[160px] lg:px-[86px] lg:pt-[180px]">
      <Image
        src="/assets/jb-logo.png"
        alt=""
        aria-hidden
        width={380}
        height={380}
        className="pointer-events-none absolute -bottom-24 -right-28 w-[380px] opacity-[0.06] brightness-0 invert"
        style={{ animation: "jbSpin 130s linear infinite" }}
      />
      <div className="jb-rise relative">
        <div className="mb-3.5 text-[13px] uppercase tracking-[0.32em] text-olive-soft">{eyebrow}</div>
        <h1 className="m-0 font-serif text-[clamp(40px,5.4vw,76px)] font-medium leading-[1.02]">
          {title} {accent && <span className="italic text-olive-soft">{accent}</span>}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-5 max-w-[600px] text-[17px] font-light leading-[1.7] text-[rgba(241,239,226,0.88)]">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
