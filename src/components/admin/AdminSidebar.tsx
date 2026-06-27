"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DashboardIcon,
  BlogIcon,
  GalleryIcon,
  VideoIcon,
  MailIcon,
  UsersIcon,
  SettingsIcon,
} from "./icons";

type Item = { href: string; label: string; exact?: boolean; Icon: typeof DashboardIcon };

const sections: { title: string; items: Item[] }[] = [
  {
    title: "Overview",
    items: [{ href: "/admin", label: "Dashboard", exact: true, Icon: DashboardIcon }],
  },
  {
    title: "Content",
    items: [
      { href: "/admin/blog", label: "Blog posts", Icon: BlogIcon },
      { href: "/admin/gallery", label: "Gallery", Icon: GalleryIcon },
      { href: "/admin/videos", label: "Videos", Icon: VideoIcon },
    ],
  },
  {
    title: "Enquiries",
    items: [
      { href: "/admin/contact-enquiries", label: "Contact enquiries", Icon: MailIcon },
      { href: "/admin/group-enquiries", label: "Group enquiries", Icon: UsersIcon },
    ],
  },
  {
    title: "Configure",
    items: [{ href: "/admin/settings", label: "Settings", Icon: SettingsIcon }],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <nav className="flex flex-col gap-5 rounded-2xl border border-[var(--color-line)] bg-paper p-3.5">
      {sections.map((section) => (
        <div key={section.title}>
          <div className="px-2.5 pb-2 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted/70">
            {section.title}
          </div>
          <div className="flex flex-col gap-1">
            {section.items.map(({ href, label, exact, Icon }) => {
              const active = isActive(href, exact);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`group flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-[14px] no-underline transition ${
                    active
                      ? "bg-green-deep font-medium text-white shadow-[0_10px_24px_-14px_rgba(44,106,57,0.8)]"
                      : "text-ink hover:bg-[rgba(134,167,60,0.12)]"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition ${
                      active
                        ? "bg-white/15 text-white"
                        : "bg-white text-green-deep ring-1 ring-[var(--color-line)] group-hover:ring-olive/40"
                    }`}
                  >
                    <Icon className="h-[17px] w-[17px]" />
                  </span>
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
