"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/blog", label: "Blog posts" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/videos", label: "Videos" },
  { href: "/admin/contact-enquiries", label: "Contact enquiries" },
  { href: "/admin/group-enquiries", label: "Group enquiries" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <nav className="flex flex-col gap-1">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className={`rounded-lg px-3.5 py-2.5 text-[14px] no-underline transition ${
            isActive(l.href, l.exact)
              ? "bg-green-deep font-medium text-white"
              : "text-ink hover:bg-[rgba(134,167,60,0.12)]"
          }`}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
