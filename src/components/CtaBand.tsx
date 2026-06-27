import Link from "next/link";

export default function CtaBand({
  title = "Ready to begin?",
  text = "Your first class is on us. Reach out and take that first simple step today.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-green-deep px-6 py-20 text-center text-cream sm:px-12">
      <div className="mx-auto max-w-[680px]">
        <h2 className="m-0 font-serif text-[clamp(30px,4vw,46px)] font-medium">{title}</h2>
        <p className="mx-auto mt-4 max-w-[520px] text-[17px] font-light leading-[1.7] text-[rgba(241,239,226,0.88)]">{text}</p>
        <Link href="/contact" className="mt-8 inline-block rounded-full bg-gradient-to-r from-olive to-[#bcd06a] px-9 py-4 text-[13px] font-semibold uppercase tracking-[0.1em] text-green-deep no-underline shadow-[0_18px_40px_-16px_rgba(188,208,106,0.7)] transition hover:-translate-y-0.5">
          Book your Free Trial
        </Link>
      </div>
    </section>
  );
}
