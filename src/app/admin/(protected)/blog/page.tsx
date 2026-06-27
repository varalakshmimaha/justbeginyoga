import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/blog";
import ConfirmDelete from "@/components/admin/ConfirmDelete";
import { toggleBlogPublished, deleteBlogPost } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminBlogList() {
  const posts = await prisma.blogPost.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-[30px] font-semibold text-green-deep">Blog posts</h1>
          <p className="mt-1 text-[14px] text-muted">Create, edit and publish journal articles.</p>
        </div>
        <Link href="/admin/blog/new" className="rounded-lg bg-green-deep px-4 py-2.5 text-[14px] font-semibold text-white no-underline transition hover:bg-green">
          + New post
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--color-line)] bg-paper">
        {posts.length === 0 ? (
          <p className="p-8 text-center text-[14px] text-muted">No posts yet. Create your first one.</p>
        ) : (
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--color-line)] text-[12px] uppercase tracking-[0.08em] text-muted">
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Updated</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id} className="border-b border-[var(--color-line)] last:border-0 align-middle">
                  <td className="px-4 py-3">
                    <Link href={`/admin/blog/${p.id}`} className="font-medium text-ink no-underline hover:text-green-deep">{p.title}</Link>
                    <div className="text-[12px] text-muted">/blog/{p.slug}</div>
                  </td>
                  <td className="px-4 py-3 text-[13px] text-muted">{p.category}</td>
                  <td className="px-4 py-3">
                    <form action={toggleBlogPublished}>
                      <input type="hidden" name="id" value={p.id} />
                      <button type="submit" className={`rounded-full border px-2.5 py-0.5 text-[11.5px] font-medium ${p.published ? "border-green-200 bg-green-100 text-green-800" : "border-gray-200 bg-gray-100 text-gray-600"}`}>
                        {p.published ? "Published" : "Draft"}
                      </button>
                    </form>
                  </td>
                  <td className="px-4 py-3 text-[13px] text-muted">{formatDate(p.updatedAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      {p.published && (
                        <Link href={`/blog/${p.slug}`} target="_blank" className="text-[13px] text-muted no-underline hover:text-green-deep">View ↗</Link>
                      )}
                      <Link href={`/admin/blog/${p.id}`} className="text-[13px] text-green-deep no-underline hover:underline">Edit</Link>
                      <ConfirmDelete id={p.id} action={deleteBlogPost} />
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
