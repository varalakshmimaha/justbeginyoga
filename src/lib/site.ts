// Central site configuration. Edit business details here.
export const SITE = {
  name: "Just Begin Yoga",
  tagline: "Where Yoga Begins",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://justbeginyoga.in",
  description:
    "Online and in-person yoga classes with certified instructor Anusha Shetty — personal, group, apartment and corporate yoga for every level.",
  founder: "Anusha Shetty",
  email: "anushashettyyoga@gmail.com",
  phone: "+91 84317 43227",
  phoneRaw: "918431743227",
  whatsapp: "https://wa.me/918431743227",
  social: {
    facebook: "https://www.facebook.com/justbeginyogastudio",
    instagram: "https://www.instagram.com/justb_begin_yoga",
  },
} as const;

export const ENQUIRY_STATUSES = [
  "NEW",
  "IN_PROGRESS",
  "CONTACTED",
  "CONVERTED",
  "CLOSED",
] as const;

export type EnquiryStatusValue = (typeof ENQUIRY_STATUSES)[number];

export const STATUS_LABEL: Record<EnquiryStatusValue, string> = {
  NEW: "New",
  IN_PROGRESS: "In progress",
  CONTACTED: "Contacted",
  CONVERTED: "Converted",
  CLOSED: "Closed",
};

export const STATUS_COLOR: Record<EnquiryStatusValue, string> = {
  NEW: "bg-amber-100 text-amber-800 border-amber-200",
  IN_PROGRESS: "bg-blue-100 text-blue-800 border-blue-200",
  CONTACTED: "bg-violet-100 text-violet-800 border-violet-200",
  CONVERTED: "bg-green-100 text-green-800 border-green-200",
  CLOSED: "bg-gray-100 text-gray-700 border-gray-200",
};
