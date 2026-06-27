import "server-only";
import { cache } from "react";
import { prisma } from "./db";
import { SITE } from "./site";

export type ResolvedSettings = {
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  facebook: string;
  instagram: string;
  logoUrl: string;
  faviconUrl: string;
  gaId: string;
  gscVerification: string;
  razorpayEnabled: boolean;
  razorpayKeyId: string;
  razorpayKeySecret: string;
};

const DEFAULT_LOGO = "/assets/jb-logo.png";

// Cached per request. Falls back to SITE/env defaults so the site keeps
// working even before any settings row exists (or if the DB is unreachable).
export const getSettings = cache(async (): Promise<ResolvedSettings> => {
  let row: Awaited<ReturnType<typeof prisma.siteSettings.findUnique>> = null;
  try {
    row = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  } catch {
    row = null;
  }
  return {
    phone: row?.phone || SITE.phone,
    email: row?.email || SITE.email,
    whatsapp: row?.whatsapp || SITE.whatsapp,
    address: row?.address || "",
    facebook: row?.facebook || SITE.social.facebook,
    instagram: row?.instagram || SITE.social.instagram,
    logoUrl: row?.logoUrl || DEFAULT_LOGO,
    faviconUrl: row?.faviconUrl || DEFAULT_LOGO,
    gaId: row?.gaId || process.env.NEXT_PUBLIC_GA_ID || "",
    gscVerification: row?.gscVerification || process.env.NEXT_PUBLIC_GSC_VERIFICATION || "",
    razorpayEnabled:
      row?.razorpayEnabled ?? (process.env.NEXT_PUBLIC_RAZORPAY_ENABLED === "true"),
    razorpayKeyId: row?.razorpayKeyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
    razorpayKeySecret: row?.razorpayKeySecret || process.env.RAZORPAY_KEY_SECRET || "",
  };
});

// Raw form of the current settings row (admin editing — no default merging).
export async function getRawSettings() {
  try {
    return await prisma.siteSettings.findUnique({ where: { id: 1 } });
  } catch {
    return null;
  }
}

export function telHref(phone: string) {
  return `tel:${phone.replace(/\s/g, "")}`;
}
