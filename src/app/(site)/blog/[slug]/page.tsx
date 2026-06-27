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

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-deep to-[#1c4326] px-6 pb-16 pt-[130px] text-cream sm:px-12 sm:pt-[160px] lg:px-[86px]">
        <div className="jb-rise relative mx-auto max-w-[820px] text-center">
          <div className="mb-4 flex items-center justify-center gap-3 text-[12px] uppercase tracking-[0.2em] text-olive-soft">
            <Link href="/blog" className="text-olive-soft no-underline hover:text-white">Journal</Link>
            <span>/</span>
            <span>{post.category}</span>
          </div>
          <h1 className="m-0 font-serif text-[clamp(32px,4.6vw,60px)] font-medium leading-[1.05]">{post.title}</h1>
          <div className="mt-5 text-[14px] text-[rgba(241,239,226,0.85)]">
            By {post.author} · {formatDate(post.publishedAt)} · {post.readMinutes} min read
          </div>
        </div>
      </section>

      {/* Cover */}
      {post.coverImage && (
        <div className="bg-paper px-6 sm:px-12 lg:px-[86px]">
          <div className="mx-auto -mt-10 max-w-[900px] overflow-hidden rounded-[24px] shadow-[0_30px_70px_-30px_rgba(20,40,20,0.5)]">
            <Image src={post.coverImage} alt={post.title} width={900} height={480} className="h-auto w-full object-cover" priority />
          </div>
        </div>
      )}

      {/* Body */}
      <article className="bg-paper px-6 pb-16 pt-14 sm:px-12 lg:px-[86px]">
        <div className="mx-auto max-w-[760px]">
          <div className="jb-prose" dangerouslySetInnerHTML={{ __html: post.body }} />

          <div className="mt-12 rounded-[18px] border border-[var(--color-line)] bg-white p-7 text-center shadow-[0_16px_36px_-28px_rgba(20,40,20,0.4)]">
            <h3 className="m-0 font-serif text-[24px] font-semibold text-green-deep">Want guidance on your practice?</h3>
            <p className="mx-auto mt-3 max-w-[480px] text-[15px] font-light leading-[1.7] text-muted">
              Book a free trial class with Anusha and put these ideas into practice with personal guidance.
            </p>
            <Link href="/contact" className="mt-5 inline-block rounded-full bg-gradient-to-r from-olive to-green-deep px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-white no-underline shadow-[0_14px_30px_-14px_rgba(44,106,57,0.7)] transition hover:-translate-y-0.5">
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
