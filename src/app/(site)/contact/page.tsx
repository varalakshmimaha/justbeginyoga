import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { PhoneIcon, MailIcon, InstagramIcon } from "@/components/icons";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us — Book a Free Trial Class",
  description:
    "Get in touch with Just Begin Yoga. Book a free trial class, ask about personal, group, apartment or corporate yoga, or message us on WhatsApp.",
  keywords: ["contact Just Begin Yoga", "book yoga class", "free trial yoga", "yoga enquiry"],
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Let's begin"
        accent="together."
        subtitle="Ready for your free trial class? Reach out — we'd love to help you take that first simple step."
      />

      <section className="bg-paper px-6 py-20 sm:px-12 lg:px-[86px]">
        <div className="mx-auto grid max-w-[1140px] gap-12 md:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <h2 className="m-0 font-serif text-[clamp(28px,3.4vw,42px)] font-medium text-green-deep">Get in touch</h2>
            <p className="mb-8 mt-4 text-[16px] font-light leading-[1.7] text-muted">
              Message us on WhatsApp for the quickest reply, or send the form — Anusha will get back to you personally.
            </p>

            <a href={SITE.whatsapp} target="_blank" rel="noopener" className="mb-3.5 flex items-center gap-4 rounded-2xl border border-[var(--color-line)] bg-white px-6 py-5 no-underline shadow-[0_16px_36px_-26px_rgba(20,40,20,0.4)]">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[rgba(134,167,60,0.16)] text-green-deep"><PhoneIcon className="h-[22px] w-[22px]" /></span>
              <span>
                <span className="block text-[12px] uppercase tracking-[0.16em] text-muted">WhatsApp / Call</span>
                <span className="mt-1 block text-[18px] font-medium text-green-deep">{SITE.phone}</span>
              </span>
            </a>

            <a href={`mailto:${SITE.email}`} className="mb-3.5 flex items-center gap-4 rounded-2xl border border-[var(--color-line)] bg-white px-6 py-5 no-underline shadow-[0_16px_36px_-26px_rgba(20,40,20,0.4)]">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[rgba(134,167,60,0.16)] text-green-deep"><MailIcon className="h-[22px] w-[22px]" /></span>
              <span>
                <span className="block text-[12px] uppercase tracking-[0.16em] text-muted">Email</span>
                <span className="mt-1 block break-all text-[16px] font-medium text-green-deep">{SITE.email}</span>
              </span>
            </a>

            <div className="flex items-start gap-4 rounded-2xl border border-[var(--color-line)] bg-white px-6 py-5 shadow-[0_16px_36px_-26px_rgba(20,40,20,0.4)]">
              <span className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[rgba(134,167,60,0.16)] text-green-deep">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-6-5.3-6-10a6 6 0 0 1 12 0c0 4.7-6 10-6 10z" /><circle cx="12" cy="11" r="2.2" /></svg>
              </span>
              <span>
                <span className="block text-[12px] uppercase tracking-[0.16em] text-muted">Visit us</span>
                <span className="mt-1 block text-[15px] font-medium leading-[1.6] text-green-deep">{SITE.address}</span>
              </span>
            </div>

            <div className="mt-6 flex gap-3">
              <a href={SITE.social.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line)] font-serif text-[19px] font-bold text-green-deep no-underline">f</a>
              <a href={SITE.social.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line)] text-green-deep no-underline"><InstagramIcon className="h-[18px] w-[18px]" /></a>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
