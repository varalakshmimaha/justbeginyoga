import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about Just Begin Yoga — online and in-person classes, equipment, free trials, pricing, and teaching philosophy with Anusha Shetty.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Frequently Asked Questions | Just Begin Yoga",
    description:
      "Everything you need to know about our online classes, in-person sessions and teaching philosophy.",
    url: "/faq",
    type: "website",
  },
};

const groups = [
  {
    title: "General Questions",
    items: [
      {
        q: "Do I need to be flexible to do yoga?",
        a: "Absolutely not! It's a common misconception that you need to be flexible to start. We believe in the philosophy of “Just Begin” — yoga is a practice that meets you exactly where you are. Over time, you'll naturally gain strength and flexibility.",
      },
      {
        q: "What yoga style is right for me?",
        a: "The best way to find out is to try a few! We offer a variety of classes, including dynamic Vinyasa, foundational Hatha, and restorative Yin. If you're unsure, our Beginner Classes are the perfect place to start. Anusha can also provide guidance on the right style to fit your goals.",
      },
      {
        q: "Do you offer a free trial class?",
        a: "Yes, we offer a free trial for first-time students. This is a great way to experience our teaching style and see how a class with Anusha can benefit you.",
      },
    ],
  },
  {
    title: "Online Classes",
    items: [
      {
        q: "What equipment do I need for an online class?",
        a: "All you really need is a yoga mat and a device with a camera (like a phone, laptop, or tablet) so Anusha can see you and provide alignment cues. You might also want a quiet space and a bottle of water.",
      },
      {
        q: "How do I join an online group class?",
        a: "After you book your class, you'll receive a confirmation WhatsApp message with a link to the Zoom session. Just click the link a few minutes before class starts to join.",
      },
      {
        q: "How is online personal training different?",
        a: "In an online personal class, Anusha designs the entire session around your specific needs and goals. This is a one-on-one session that allows for deep, personalized instruction and feedback.",
      },
    ],
  },
  {
    title: "Corporate & Apartment Classes",
    items: [
      {
        q: "What kind of space do we need for an in-person class?",
        a: "The class can be held in a conference room, a common area, a rooftop, or any space large enough for participants to roll out their mats. We'll work with you to make the most of the available space.",
      },
      {
        q: "What if employees or residents have different fitness levels?",
        a: "Anusha specializes in providing modifications for all levels. Whether someone is a total beginner or an experienced yogi, she offers variations to ensure every participant feels comfortable and challenged.",
      },
      {
        q: "How does pricing work for corporate and apartment classes?",
        a: "Pricing is typically based on the number of sessions, duration, and class size. Please contact us to discuss your specific needs and get a custom quote.",
      },
    ],
  },
  {
    title: "About Anusha Shetty",
    items: [
      {
        q: "What are Anusha's qualifications?",
        a: "Anusha is a certified and highly experienced Yoga Instructor with over 9 years of teaching and 16+ years of personal practice. She holds a Post Graduate Diploma in Yoga Therapy and is certified in various styles, including Hatha, Vinyasa, Power Yoga, Prenatal/Postnatal yoga and Face Yoga.",
      },
      {
        q: "Has Anusha taught internationally?",
        a: "Yes, Anusha has significant international teaching experience, having taught yoga in Shanghai, China, for several years. This diverse background allows her to provide a unique and well-rounded perspective on her teaching.",
      },
      {
        q: "How is Anusha's teaching style different?",
        a: "Anusha's philosophy is rooted in accessibility and personalized guidance. She focuses on proper body alignment and clear, non-intimidating instruction, creating a supportive environment where you feel comfortable and confident in your practice.",
      },
    ],
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: groups.flatMap((g) =>
    g.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    }))
  ),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHero
        eyebrow="FAQ's"
        title="Frequently asked"
        accent="questions"
        subtitle="Answers to common questions about our online classes, in-person sessions and teaching philosophy. If you don't see your question answered here, feel free to reach out."
      />

      <section className="bg-paper px-6 py-[clamp(56px,7vw,100px)] sm:px-12 lg:px-[86px]">
        <div className="mx-auto max-w-[840px]">
          {groups.map((g) => (
            <div key={g.title} className="mb-[clamp(40px,5vw,64px)] last:mb-0">
              <h2 className="mb-7 text-center font-serif text-[clamp(26px,3.2vw,38px)] font-medium text-green-deep">
                {g.title}
              </h2>
              <div className="space-y-3.5">
                {g.items.map((f) => (
                  <details
                    key={f.q}
                    className="group rounded-[16px] border border-[var(--color-line)] bg-white px-6 py-1 shadow-[0_18px_44px_-34px_rgba(20,40,20,0.4)] [&_summary::-webkit-details-marker]:hidden"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-[18px] font-serif text-[19px] font-semibold text-green-deep">
                      {f.q}
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[rgba(134,167,60,0.16)] text-[18px] text-green-deep transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="m-0 pb-5 pr-10 text-[15px] font-light leading-[1.75] text-muted">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}

          {/* Still have a question */}
          <div className="mt-[clamp(36px,4vw,56px)] text-center">
            <p className="text-[15px] text-muted">Still have a question?</p>
            <Link
              href="/contact"
              className="mt-4 inline-block rounded-full bg-gradient-to-r from-olive to-green-deep px-9 py-[15px] text-[13px] font-semibold uppercase tracking-[0.1em] text-white no-underline shadow-[0_18px_40px_-16px_rgba(44,106,57,0.6)] transition hover:-translate-y-0.5"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
