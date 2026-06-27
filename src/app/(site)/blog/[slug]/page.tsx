import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPostBySlug, getRelatedPosts, formatDate } from "@/lib/blog";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || !post.published) return { title: "Article not found" };

  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt;
  const ogImage = post.ogImage || post.coverImage || "/assets/river-pose.jpeg";

  return {
    title,
    description,
    keywords: post.keywords ? post.keywords.split(",").map((k) => k.trim()) : undefined,
    authors: [{ name: post.author }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/blog/${post.slug}`,
      images: [{ url: ogImage }],
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || !post.published) notFound();

  const related = await getRelatedPosts(slug, 2);
  const ogImage = post.ogImage || post.coverImage || "/assets/river-pose.jpeg";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    image: new URL(ogImage, SITE.url).toString(),
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: new URL("/assets/jb-logo.png", SITE.url).toString() },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": new URL(`/blog/${post.slug}`, SITE.url).toString() },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Article header */}
      <header className="bg-paper px-6 pb-10 pt-[116px] sm:px-12 sm:pt-[148px] lg:px-[86px]">
        <div className="mx-auto max-w-[760px] text-center">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-[13px] text-muted no-underline transition hover:text-green-deep">
            ← Back to journal
          </Link>
          <div className="mt-5">
            <span className="inline-block rounded-full bg-[rgba(134,167,60,0.16)] px-4 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-green-deep">
              {post.category}
            </span>
          </div>
          <h1 className="mx-auto mt-5 max-w-[720px] font-serif text-[clamp(30px,4.4vw,52px)] font-semibold leading-[1.12] text-ink">
            {post.title}
          </h1>
          <p className="mx-auto mt-5 max-w-[600px] text-[clamp(15px,1.4vw,18px)] font-light leading-[1.7] text-muted">
            {post.excerpt}
          </p>
          <div className="mt-7 flex items-center justify-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-olive to-green-deep text-[16px] font-semibold text-white">
              {(post.author?.[0] ?? "A").toUpperCase()}
            </span>
            <div className="text-left">
              <div className="text-[14px] font-medium text-ink">{post.author}</div>
              <div className="text-[12.5px] text-muted">{formatDate(post.publishedAt)} · {post.readMinutes} min read</div>
            </div>
          </div>
        </div>
      </header>

      {/* Cover */}
      {post.coverImage && (
        <div className="bg-paper px-6 sm:px-12 lg:px-[86px]">
          <div className="mx-auto max-w-[940px] overflow-hidden rounded-[22px] shadow-[0_34px_70px_-34px_rgba(20,40,20,0.5)]">
            <Image src={post.coverImage} alt={post.title} width={940} height={528} className="aspect-[16/9] w-full object-cover" priority />
          </div>
        </div>
      )}

      {/* Body */}
      <article className="bg-paper px-6 pb-20 pt-12 sm:px-12 lg:px-[86px]">
        <div className="mx-auto max-w-[720px]">
          <div className="jb-prose" dangerouslySetInnerHTML={{ __html: post.body }} />

          <div className="mt-14 overflow-hidden rounded-[20px] border border-[var(--color-line)] bg-gradient-to-br from-green-deep to-[#1c4326] p-8 text-center text-cream shadow-[0_24px_50px_-30px_rgba(20,40,20,0.6)]">
            <h3 className="m-0 font-serif text-[25px] font-semibold text-white">Want guidance on your practice?</h3>
            <p className="mx-auto mt-3 max-w-[480px] text-[15px] font-light leading-[1.7] text-[rgba(241,239,226,0.88)]">
              Book a free trial class with Anusha and put these ideas into practice with personal guidance.
            </p>
            <Link href="/contact" className="mt-5 inline-block rounded-full bg-cream px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-green-deep no-underline shadow-[0_14px_30px_-14px_rgba(0,0,0,0.4)] transition hover:-translate-y-0.5">
              Book a Free Trial
            </Link>
          </div>
        </div>
      </article>

      {/* Related / back-linking */}
      {related.length > 0 && (
        <section className="bg-bg px-6 py-16 sm:px-12 lg:px-[86px]">
          <div className="mx-auto max-w-[1080px]">
            <h2 className="mb-8 text-center font-serif text-[clamp(26px,3vw,38px)] font-medium text-green-deep">Keep reading</h2>
            <div className="grid gap-7 sm:grid-cols-2">
              {related.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="group overflow-hidden rounded-[20px] border border-[var(--color-line)] bg-white no-underline shadow-[0_20px_44px_-28px_rgba(20,40,20,0.4)] transition hover:-translate-y-1">
                  <div className="relative h-[180px] w-full overflow-hidden bg-[#e8e4d4]">
                    {p.coverImage && <Image src={p.coverImage} alt={p.title} fill className="object-cover transition group-hover:scale-105" />}
                  </div>
                  <div className="p-6">
                    <div className="mb-2 text-[12px] uppercase tracking-[0.16em] text-olive">{p.category}</div>
                    <h3 className="m-0 font-serif text-[21px] font-semibold leading-[1.15] text-green-deep">{p.title}</h3>
                    <p className="mt-2.5 line-clamp-2 text-[14px] font-light leading-[1.6] text-muted">{p.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
