import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import VideoGallery from "@/components/VideoGallery";
import { getPublishedVideos } from "@/lib/videos";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Videos — Practice Along",
  description:
    "Follow-along yoga videos and tutorials from Just Begin Yoga with Anusha Shetty — breath, alignment, flows and gentle practice you can do at home.",
  keywords: [
    "yoga videos",
    "follow along yoga",
    "yoga tutorials",
    "Just Begin Yoga videos",
    "yoga at home",
    "Anusha Shetty yoga",
  ],
  alternates: { canonical: "/videos" },
  openGraph: {
    title: "Videos — Practice Along | Just Begin Yoga",
    description:
      "Follow-along yoga videos and tutorials you can practise at home.",
    url: "/videos",
    type: "website",
  },
};

export default async function VideosPage() {
  const videos = await getPublishedVideos();

  return (
    <>
      <PageHero
        eyebrow="Videos"
        title="Practice"
        accent="along."
        subtitle="Short follow-along sessions and tutorials to keep your practice steady between classes."
      />

      <section className="bg-paper px-6 py-20 sm:px-12 lg:px-[86px]">
        <div className="mx-auto max-w-[1180px]">
          {videos.length === 0 ? (
            <p className="text-center text-[16px] text-muted">
              New videos are coming soon — subscribe and follow along on{" "}
              <a href={SITE.social.instagram} target="_blank" rel="noopener" className="font-medium text-green-deep underline">Instagram</a>.
            </p>
          ) : (
            <VideoGallery videos={videos} />
          )}
        </div>
      </section>
    </>
  );
}
