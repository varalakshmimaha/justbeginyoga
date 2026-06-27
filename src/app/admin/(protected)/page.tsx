import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/blog";
import { STATUS_LABEL, STATUS_COLOR, type EnquiryStatusValue } from "@/lib/site";

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
    { label: "Contact enquiries", value: contactTotal, badge: `${contactNew} new`, href: "/admin/contact-enquiries" },
    { label: "Group enquiries", value: groupTotal, badge: `${groupNew} new`, href: "/admin/group-enquiries" },
    { label: "Blog posts", value: postTotal, badge: `${postPublished} live`, href: "/admin/blog" },
    { label: "Gallery images", value: galleryTotal, badge: `${galleryPublished} live`, href: "/admin/gallery" },
    { label: "Videos", value: videoTotal, badge: `${videoPublished} live`, href: "/admin/videos" },
  ];

  return (
    <div>
      <h1 className="font-serif text-[30px] font-semibold text-green-deep">Dashboard</h1>
      <p className="mt-1 text-[14px] text-muted">An overview of enquiries and content.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="rounded-2xl border border-[var(--color-line)] bg-paper p-5 no-underline transition hover:shadow-[0_16px_36px_-28px_rgba(20,40,20,0.4)]">
            <div className="flex items-start justify-between">
              <span className="text-[13px] text-muted">{c.label}</span>
              <span className="rounded-full bg-[rgba(134,167,60,0.16)] px-2.5 py-0.5 text-[11px] font-medium text-green-deep">{c.badge}</span>
            </div>
            <div className="mt-2 font-serif text-[36px] font-semibold text-ink">{c.value}</div>
          </Link>
        ))}
      </div>

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
        <Link href={href} className="text-[13px] text-muted no-underline hover:text-green-deep">View all →</Link>
      </div>
      {rows.length === 0 ? (
        <p className="py-6 text-center text-[13px] text-muted">No enquiries yet.</p>
      ) : (
        <ul className="divide-y divide-[var(--color-line)]">
          {rows.map((r) => (
            <li key={r.id} className="flex items-center justify-between gap-3 py-2.5">
              <div className="min-w-0">
                <div className="truncate text-[14px] font-medium text-ink">{r.name}</div>
                <div className="truncate text-[12px] text-muted">{r.email}</div>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <span className={`rounded-full border px-2 py-0.5 text-[10.5px] font-medium ${STATUS_COLOR[r.status as EnquiryStatusValue]}`}>
                  {STATUS_LABEL[r.status as EnquiryStatusValue]}
                </span>
                <span className="text-[11px] text-muted">{formatDate(r.createdAt)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
