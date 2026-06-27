import Link from "next/link";
import { prisma } from "@/lib/db";
import { youTubeWatchUrl } from "@/lib/videos";
import ConfirmDelete from "@/components/admin/ConfirmDelete";
import { toggleVideoPublished, deleteVideo } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminVideoList() {
  const videos = await prisma.video.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-[30px] font-semibold text-green-deep">Videos</h1>
          <p className="mt-1 text-[14px] text-muted">Manage the YouTube videos shown on the public videos page.</p>
        </div>
        <Link href="/admin/videos/new" className="rounded-lg bg-green-deep px-4 py-2.5 text-[14px] font-semibold text-white no-underline transition hover:bg-green">
          + Add video
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--color-line)] bg-paper">
        {videos.length === 0 ? (
          <p className="p-8 text-center text-[14px] text-muted">No videos yet. Add your first one.</p>
        ) : (
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--color-line)] text-[12px] uppercase tracking-[0.08em] text-muted">
                <th className="px-4 py-3 font-medium">Video</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Order</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((v) => (
                <tr key={v.id} className="border-b border-[var(--color-line)] align-middle last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`https://i.ytimg.com/vi/${v.youtubeId}/default.jpg`} alt="" className="h-9 w-16 rounded object-cover" />
                      <Link href={`/admin/videos/${v.id}`} className="font-medium text-ink no-underline hover:text-green-deep">{v.title}</Link>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[13px] text-muted">{v.category}</td>
                  <td className="px-4 py-3">
                    <form action={toggleVideoPublished}>
                      <input type="hidden" name="id" value={v.id} />
                      <button type="submit" className={`rounded-full border px-2.5 py-0.5 text-[11.5px] font-medium ${v.published ? "border-green-200 bg-green-100 text-green-800" : "border-gray-200 bg-gray-100 text-gray-600"}`}>
                        {v.published ? "Published" : "Hidden"}
                      </button>
                    </form>
                  </td>
                  <td className="px-4 py-3 text-[13px] text-muted">{v.sortOrder}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      <a href={youTubeWatchUrl(v.youtubeId)} target="_blank" rel="noopener" className="text-[13px] text-muted no-underline hover:text-green-deep">View ↗</a>
                      <Link href={`/admin/videos/${v.id}`} className="text-[13px] text-green-deep no-underline hover:underline">Edit</Link>
                      <ConfirmDelete id={v.id} action={deleteVideo} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
