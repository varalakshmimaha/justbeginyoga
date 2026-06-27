import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import VideoForm from "@/components/admin/VideoForm";

export const dynamic = "force-dynamic";

export default async function EditVideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const videoId = Number(id);
  if (Number.isNaN(videoId)) notFound();

  const video = await prisma.video.findUnique({ where: { id: videoId } });
  if (!video) notFound();

  return (
    <div>
      <Link href="/admin/videos" className="text-[13px] text-muted no-underline hover:text-green-deep">← Back to videos</Link>
      <h1 className="mt-2 font-serif text-[30px] font-semibold text-green-deep">Edit video</h1>
      <p className="mb-6 mt-1 text-[14px] text-muted">{video.title}</p>
      <VideoForm
        values={{
          id: video.id,
          title: video.title,
          youtubeId: video.youtubeId,
          description: video.description ?? "",
          category: video.category,
          sortOrder: video.sortOrder,
          published: video.published,
        }}
      />
    </div>
  );
}
