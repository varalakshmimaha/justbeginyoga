import Link from "next/link";
import GalleryForm from "@/components/admin/GalleryForm";

export const dynamic = "force-dynamic";

export default function NewGalleryImagePage() {
  return (
    <div>
      <Link href="/admin/gallery" className="text-[13px] text-muted no-underline hover:text-green-deep">← Back to gallery</Link>
      <h1 className="mt-2 font-serif text-[30px] font-semibold text-green-deep">Add gallery image</h1>
      <p className="mb-6 mt-1 text-[14px] text-muted">Upload the file to /public/assets first, then reference its path here.</p>
      <GalleryForm />
    </div>
  );
}
