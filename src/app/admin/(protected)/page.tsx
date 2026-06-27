import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/blog";
import { STATUS_LABEL, STATUS_COLOR, type EnquiryStatusValue } from "@/lib/site";
import {
  MailIcon,
  UsersIcon,
  BlogIcon,
  GalleryIcon,
  VideoIcon,
} from "@/components/admin/icons";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [
    contactTotal,
    contactNew,
    groupTotal,
    groupNew,
    postTotal,
    postPublished,
    galleryTotal,
    galleryPublished,
    videoTotal,
    videoPublished,
    recentContact,
    recentGroup,
  ] = await Promise.all([
    prisma.contactEnquiry.count(),
    prisma.contactEnquiry.count({ where: { status: "NEW" } }),
    prisma.groupEnquiry.count(),
    prisma.groupEnquiry.count({ where: { status: "NEW" } }),
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { published: true } }),
    prisma.galleryImage.count(),
    prisma.galleryImage.count({ where: { published: true } }),
    prisma.video.count(),
    prisma.video.count({ where: { published: true } }),
    prisma.contactEnquiry.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.groupEnquiry.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  const cards = [
    { label: "Blog posts", value: postTotal, badge: `${postPublished} live`, badgeTone: "green", href: "/admin/blog", Icon: BlogIcon, tile: "bg-sky-50 text-sky-600" },
    { label: "Gallery items", value: galleryTotal, badge: `${galleryPublished} live`, badgeTone: "green", href: "/admin/gallery", Icon: GalleryIcon, tile: "bg-emerald-50 text-emerald-600" },
    { label: "Videos", value: videoTotal, badge: `${videoPublished} live`, badgeTone: "green", href: "/admin/videos", Icon: VideoIcon, tile: "bg-rose-50 text-rose-600" },
    { label: "Contact enquiries", value: contactTotal, badge: contactNew ? `${contactNew} new` : "", badgeTone: "amber", href: "/admin/contact-enquiries", Icon: MailIcon, tile: "bg-violet-50 text-violet-600" },
    { label: "Group enquiries", value: groupTotal, badge: groupNew ? `${groupNew} new` : "", badgeTone: "amber", href: "/admin/group-enquiries", Icon: UsersIcon, tile: "bg-amber-50 text-amber-600" },
  ] as const;

  const badgeClass: Record<string, string> = {
    green: "bg-green-100 text-green-700",
    amber: "bg-amber-100 text-amber-700",
  };

  return (
    <div>
      {/* header */}
      <h1 className="text-[28px] font-bold text-ink">Dashboard</h1>
      <p className="mt-1 text-[14px] text-gray-500">Welcome back, Admin User!</p>

      {/* stat cards */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-[var(--color-line)] bg-white p-5 shadow-[0_1px_2px_rgba(20,40,20,0.04)] transition hover:shadow-[0_14px_30px_-20px_rgba(20,40,20,0.35)]">
            <div className="flex items-start gap-3.5">
              <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${c.tile}`}>
                <c.Icon className="h-[22px] w-[22px]" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[13px] text-gray-500">{c.label}</span>
                  {c.badge && <span className={`rounded-full px-2 py-0.5 text-[10.5px] font-medium ${badgeClass[c.badgeTone]}`}>{c.badge}</span>}
                </div>
                <div className="mt-0.5 text-[26px] font-bold leading-tight text-ink">{c.value}</div>
              </div>
            </div>
            <div className="mt-4 border-t border-[var(--color-line)] pt-3">
              <Link href={c.href} className="text-[13px] font-medium text-green-deep no-underline hover:underline">View All →</Link>
            </div>
          </div>
        ))}
      </div>

      {/* recent lists */}
      <div className="mt-7 grid gap-5 lg:grid-cols-2">
        <RecentList title="Recent contact enquiries" href="/admin/contact-enquiries" rows={recentContact} />
        <RecentList title="Recent group enquiries" href="/admin/group-enquiries" rows={recentGroup} />
      </div>
    </div>
  );
}

function RecentList({
  title,
  href,
  rows,
}: {
  title: string;
  href: string;
  rows: { id: number; name: string; email: string | null; status: string; createdAt: Date }[];
}) {
  return (
    <div className="rounded-2xl border border-[var(--color-line)] bg-white shadow-[0_1px_2px_rgba(20,40,20,0.04)]">
      <div className="flex items-center justify-between border-b border-[var(--color-line)] px-5 py-3.5">
        <h2 className="text-[15px] font-semibold text-ink">{title}</h2>
        <Link href={href} className="text-[12.5px] font-medium text-green-deep no-underline hover:underline">View All →</Link>
      </div>
      {rows.length === 0 ? (
        <p className="px-5 py-10 text-center text-[13px] text-gray-400">No enquiries yet.</p>
      ) : (
        <ul className="divide-y divide-[var(--color-line)]">
          {rows.map((r) => (
            <li key={r.id} className="flex items-center justify-between gap-3 px-5 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-olive/80 to-green-deep text-[13px] font-semibold text-white">
                  {(r.name?.[0] ?? "?").toUpperCase()}
                </span>
                <div className="min-w-0">
                  <div className="truncate text-[14px] font-medium text-ink">{r.name}</div>
                  <div className="truncate text-[12px] text-gray-500">{r.email ?? "No email"}</div>
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <span className={`rounded-full border px-2 py-0.5 text-[10.5px] font-medium ${STATUS_COLOR[r.status as EnquiryStatusValue]}`}>
                  {STATUS_LABEL[r.status as EnquiryStatusValue]}
                </span>
                <span className="text-[11px] text-gray-400">{formatDate(r.createdAt)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
