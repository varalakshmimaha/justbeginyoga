import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import GalleryForm from "@/components/admin/GalleryForm";

export const dynamic = "force-dynamic";

export default async function EditGalleryImagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const imageId = Number(id);
  if (Number.isNaN(imageId)) notFound();

  const img = await prisma.galleryImage.findUnique({ where: { id: imageId } });
  if (!img) notFound();

  return (
    <div>
      <Link href="/admin/gallery" className="text-[13px] text-muted no-underline hover:text-green-deep">← Back to gallery</Link>
      <h1 className="mt-2 font-serif text-[30px] font-semibold text-green-deep">Edit image</h1>
      <p className="mb-6 mt-1 text-[14px] text-muted">{img.title || img.imageUrl}</p>
      <GalleryForm
        values={{
          id: img.id,
          imageUrl: img.imageUrl,
          title: img.title ?? "",
          caption: img.caption ?? "",
          category: img.category,
          sortOrder: img.sortOrder,
          published: img.published,
        }}
      />
    </div>
  );
}
