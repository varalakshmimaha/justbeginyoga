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
  ClockIcon,
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

  const newLeads = contactNew + groupNew;

  const cards = [
    { label: "Contact enquiries", value: contactTotal, badge: `${contactNew} new`, tone: contactNew ? "amber" : "muted", href: "/admin/contact-enquiries", Icon: MailIcon },
    { label: "Group enquiries", value: groupTotal, badge: `${groupNew} new`, tone: groupNew ? "amber" : "muted", href: "/admin/group-enquiries", Icon: UsersIcon },
    { label: "Blog posts", value: postTotal, badge: `${postPublished} live`, tone: "green", href: "/admin/blog", Icon: BlogIcon },
    { label: "Gallery images", value: galleryTotal, badge: `${galleryPublished} live`, tone: "green", href: "/admin/gallery", Icon: GalleryIcon },
    { label: "Videos", value: videoTotal, badge: `${videoPublished} live`, tone: "green", href: "/admin/videos", Icon: VideoIcon },
  ] as const;

  const toneClass: Record<string, string> = {
    amber: "bg-amber-100 text-amber-800 border-amber-200",
    green: "bg-green-100 text-green-800 border-green-200",
    muted: "bg-gray-100 text-gray-600 border-gray-200",
  };

  return (
    <div>
      {/* header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-[32px] font-semibold text-green-deep">Dashboard</h1>
          <p className="mt-1 text-[14px] text-muted">An overview of your enquiries and content.</p>
        </div>
        <div className="rounded-2xl border border-[var(--color-line)] bg-paper px-5 py-3">
          <div className="text-[11px] uppercase tracking-[0.14em] text-muted">New leads</div>
          <div className="mt-0.5 flex items-baseline gap-2">
            <span className="font-serif text-[26px] font-semibold text-green-deep">{newLeads}</span>
            <span className="text-[12px] text-muted">awaiting reply</span>
          </div>
        </div>
      </div>

      {/* stat cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="group rounded-2xl border border-[var(--color-line)] bg-paper p-5 no-underline transition hover:-translate-y-1 hover:border-olive/30 hover:shadow-[0_20px_40px_-26px_rgba(20,40,20,0.45)]"
          >
            <div className="flex items-start justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-deep/10 text-green-deep transition group-hover:bg-green-deep group-hover:text-white">
                <c.Icon className="h-[21px] w-[21px]" />
              </span>
              <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${toneClass[c.tone]}`}>{c.badge}</span>
            </div>
            <div className="mt-4 font-serif text-[34px] font-semibold leading-none text-ink">{c.value}</div>
            <div className="mt-1.5 text-[13px] text-muted">{c.label}</div>
          </Link>
        ))}
      </div>

      {/* recent lists */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <RecentList title="Latest contact enquiries" href="/admin/contact-enquiries" rows={recentContact} />
        <RecentList title="Latest group enquiries" href="/admin/group-enquiries" rows={recentGroup} />
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
    <div className="rounded-2xl border border-[var(--color-line)] bg-paper p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-serif text-[19px] font-semibold text-green-deep">{title}</h2>
        <Link href={href} className="text-[13px] text-muted no-underline transition hover:text-green-deep">View all →</Link>
      </div>
      {rows.length === 0 ? (
        <p className="py-8 text-center text-[13px] text-muted">No enquiries yet.</p>
      ) : (
        <ul className="flex flex-col">
          {rows.map((r) => (
            <li key={r.id} className="flex items-center justify-between gap-3 border-t border-[var(--color-line)] py-3 first:border-t-0">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-olive/80 to-green-deep text-[13px] font-semibold text-white">
                  {(r.name?.[0] ?? "?").toUpperCase()}
                </span>
                <div className="min-w-0">
                  <div className="truncate text-[14px] font-medium text-ink">{r.name}</div>
                  <div className="truncate text-[12px] text-muted">{r.email ?? "No email"}</div>
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <span className={`rounded-full border px-2 py-0.5 text-[10.5px] font-medium ${STATUS_COLOR[r.status as EnquiryStatusValue]}`}>
                  {STATUS_LABEL[r.status as EnquiryStatusValue]}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-muted">
                  <ClockIcon className="h-3 w-3" /> {formatDate(r.createdAt)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
