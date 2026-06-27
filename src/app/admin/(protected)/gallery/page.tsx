import Link from "next/link";
import { prisma } from "@/lib/db";
import ConfirmDelete from "@/components/admin/ConfirmDelete";
import { toggleGalleryPublished, deleteGalleryImage } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminGalleryList() {
  const images = await prisma.galleryImage.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-[30px] font-semibold text-green-deep">Gallery</h1>
          <p className="mt-1 text-[14px] text-muted">Manage the photos shown on the public gallery page.</p>
        </div>
        <Link href="/admin/gallery/new" className="rounded-lg bg-green-deep px-4 py-2.5 text-[14px] font-semibold text-white no-underline transition hover:bg-green">
          + Add image
        </Link>
      </div>

      {images.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-[var(--color-line)] bg-paper p-8 text-center text-[14px] text-muted">
          No images yet. Add your first one.
        </p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img) => (
            <div key={img.id} className="overflow-hidden rounded-2xl border border-[var(--color-line)] bg-paper">
              <div className="relative h-44 w-full bg-[#e8e4d4]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.imageUrl} alt={img.title ?? ""} className="h-full w-full object-cover" />
                <form action={toggleGalleryPublished} className="absolute right-2 top-2">
                  <input type="hidden" name="id" value={img.id} />
                  <button type="submit" className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium backdrop-blur ${img.published ? "border-green-200 bg-green-100/90 text-green-800" : "border-gray-200 bg-gray-100/90 text-gray-600"}`}>
                    {img.published ? "Published" : "Hidden"}
                  </button>
                </form>
              </div>
              <div className="p-4">
                <div className="truncate text-[14px] font-medium text-ink">{img.title || "Untitled"}</div>
                <div className="text-[12px] text-muted">{img.category} · order {img.sortOrder}</div>
                <div className="mt-3 flex items-center gap-3">
                  <Link href={`/admin/gallery/${img.id}`} className="text-[13px] text-green-deep no-underline hover:underline">Edit</Link>
                  <ConfirmDelete id={img.id} action={deleteGalleryImage} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
