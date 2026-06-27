import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import { getPublishedGalleryImages } from "@/lib/gallery";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gallery — Moments from the Mat",
  description:
    "Photos from Just Begin Yoga classes, sessions and community moments with Anusha Shetty. A glimpse of the practice, in person and online.",
  keywords: [
    "yoga gallery",
    "yoga class photos",
    "Just Begin Yoga gallery",
    "Anusha Shetty yoga",
    "yoga studio photos",
  ],
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery — Moments from the Mat | Just Begin Yoga",
    description:
      "Photos from Just Begin Yoga classes, sessions and community moments.",
    url: "/gallery",
    type: "website",
  },
};

export default async function GalleryPage() {
  const images = await getPublishedGalleryImages();

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Moments from"
        accent="the mat."
        subtitle="A glimpse into our classes, sessions and the quiet joy of a steady practice."
      />

      <section className="bg-paper px-6 py-20 sm:px-12 lg:px-[86px]">
        <div className="mx-auto max-w-[1180px]">
          {images.length === 0 ? (
            <p className="text-center text-[16px] text-muted">
              Photos are on their way — follow along on{" "}
              <a href={SITE.social.instagram} target="_blank" rel="noopener" className="font-medium text-green-deep underline">Instagram</a>.
            </p>
          ) : (
            <GalleryGrid images={images} />
          )}
        </div>
      </section>
    </>
  );
}
