import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { getPublishedPosts, formatDate } from "@/lib/blog";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Yoga Journal — Notes from the Mat",
  description:
    "Reflections on breath, movement and building a steady yoga practice. Tips and inspiration from Just Begin Yoga and Anusha Shetty.",
  keywords: [
    "yoga blog",
    "yoga tips",
    "yoga journal",
    "beginner yoga advice",
    "face yoga",
    "body alignment",
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Yoga Journal — Notes from the Mat | Just Begin Yoga",
    description:
      "Reflections on breath, movement and building a steady yoga practice.",
    url: "/blog",
    type: "website",
  },
};

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Notes from"
        accent="the mat."
        subtitle="Reflections on breath, movement and the little steps that build a steady practice."
      />

      <section className="bg-paper px-6 py-20 sm:px-12 lg:px-[86px]">
        <div className="mx-auto max-w-[1180px]">
          {posts.length === 0 ? (
            <p className="text-center text-[16px] text-muted">
              New journal entries are coming soon — follow along on{" "}
              <a href={SITE.social.instagram} target="_blank" rel="noopener" className="font-medium text-green-deep underline">Instagram</a>.
            </p>
          ) : (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <article key={p.id} className="flex flex-col overflow-hidden rounded-[22px] border border-[var(--color-line)] bg-white shadow-[0_20px_44px_-28px_rgba(20,40,20,0.4)] transition hover:-translate-y-1 hover:shadow-[0_28px_54px_-28px_rgba(20,40,20,0.5)]">
                  <Link href={`/blog/${p.slug}`} className="group flex flex-1 flex-col no-underline">
                    <div className="p-3 pb-0">
                      <div className="relative h-[210px] w-full overflow-hidden rounded-[16px] bg-[#e8e4d4]">
                        {p.coverImage && <Image src={p.coverImage} alt={p.title} fill className="object-cover transition duration-500 group-hover:scale-105" />}
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="mb-2.5 flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-olive">
                        <span className="h-px w-5 bg-olive" />
                        {p.category}
                      </div>
                      <h2 className="m-0 font-serif text-[23px] font-semibold leading-[1.18] text-green-deep">{p.title}</h2>
                      <p className="mt-2.5 line-clamp-4 flex-1 text-[14.5px] font-light leading-[1.6] text-muted">{p.excerpt}</p>
                      <div className="mt-5 flex items-center justify-between border-t border-[var(--color-line)] pt-4">
                        <span className="text-[12.5px] text-muted">{formatDate(p.publishedAt)}</span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(134,167,60,0.14)] px-4 py-2 text-[13px] font-semibold text-green-deep transition group-hover:bg-green-deep group-hover:text-white">
                          Read <span className="transition group-hover:translate-x-0.5">→</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
