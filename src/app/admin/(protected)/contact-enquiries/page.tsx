import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/blog";
import { ENQUIRY_STATUSES, STATUS_LABEL, type EnquiryStatusValue } from "@/lib/site";
import type { EnquiryStatus, Prisma } from "@prisma/client";
import EnquiryCard from "@/components/admin/EnquiryCard";
import { updateContactEnquiry, deleteContactEnquiry } from "../actions";

export const dynamic = "force-dynamic";

export default async function ContactEnquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const active = ENQUIRY_STATUSES.includes(status as never)
    ? (status as EnquiryStatusValue)
    : undefined;

  const where: Prisma.ContactEnquiryWhereInput = active
    ? { status: active as EnquiryStatus }
    : {};
  const enquiries = await prisma.contactEnquiry.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-serif text-[30px] font-semibold text-green-deep">Contact enquiries</h1>
      <p className="mt-1 text-[14px] text-muted">Messages from the contact form.</p>

      <FilterBar base="/admin/contact-enquiries" active={active} />

      <div className="mt-5 space-y-4">
        {enquiries.length === 0 ? (
          <p className="rounded-2xl border border-[var(--color-line)] bg-paper p-8 text-center text-[14px] text-muted">
            No enquiries{active ? ` with status "${STATUS_LABEL[active]}"` : ""} yet.
          </p>
        ) : (
          enquiries.map((e) => (
            <EnquiryCard
              key={e.id}
              updateAction={updateContactEnquiry}
              deleteAction={deleteContactEnquiry}
              enquiry={{
                id: e.id,
                name: e.name,
                email: e.email,
                phone: e.phone,
                message: e.message,
                status: e.status,
                adminNote: e.adminNote,
                createdAt: formatDate(e.createdAt),
                meta: [{ label: "Service", value: e.service }],
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

function FilterBar({
  base,
  active,
}: {
  base: string;
  active?: EnquiryStatusValue;
}) {
  const chip = (label: string, href: string, on: boolean) => (
    <Link
      href={href}
      className={`rounded-full border px-3.5 py-1.5 text-[12.5px] no-underline transition ${
        on ? "border-green-deep bg-green-deep text-white" : "border-[var(--color-line)] text-ink hover:bg-paper"
      }`}
    >
      {label}
    </Link>
  );
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {chip("All", base, !active)}
      {ENQUIRY_STATUSES.map((s) =>
        chip(STATUS_LABEL[s], `${base}?status=${s}`, active === s)
      )}
    </div>
  );
}
