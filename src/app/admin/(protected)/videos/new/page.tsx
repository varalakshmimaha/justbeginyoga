import Link from "next/link";
import VideoForm from "@/components/admin/VideoForm";

export const dynamic = "force-dynamic";

export default function NewVideoPage() {
  return (
    <div>
      <Link href="/admin/videos" className="text-[13px] text-muted no-underline hover:text-green-deep">← Back to videos</Link>
      <h1 className="mt-2 font-serif text-[30px] font-semibold text-green-deep">Add video</h1>
      <p className="mb-6 mt-1 text-[14px] text-muted">Paste a YouTube link and it will appear on the public videos page.</p>
      <VideoForm />
    </div>
  );
}
