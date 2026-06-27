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

export default function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <nav className="flex flex-col gap-6 px-3 py-5">
      {sections.map((section) => (
        <div key={section.title}>
          <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.13em] text-gray-400">
            {section.title}
          </div>
          <div className="flex flex-col gap-0.5">
            {section.items.map(({ href, label, exact, Icon }) => {
              const active = isActive(href, exact);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={onNavigate}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] no-underline transition ${
                    active
                      ? "bg-green-deep/10 font-semibold text-green-deep"
                      : "text-gray-600 hover:bg-gray-100 hover:text-ink"
                  }`}
                >
                  <Icon className={`h-[18px] w-[18px] ${active ? "text-green-deep" : "text-gray-400"}`} />
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
