import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import Analytics from "@/components/Analytics";

const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Online & In-person Yoga with Anusha Shetty`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "yoga",
    "online yoga classes",
    "personal yoga",
    "group yoga",
    "corporate yoga",
    "face yoga",
    "Anusha Shetty",
    "Just Begin Yoga",
  ],
  authors: [{ name: "Anusha Shetty — Just Begin Yoga" }],
  icons: {
    icon: "/assets/jb-logo.png",
    apple: "/assets/jb-logo.png",
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: SITE.url,
    images: [{ url: "/assets/river-pose.jpeg" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  // Google Search Console HTML-tag verification — inert until the token is set.
  ...(gscVerification ? { verification: { google: gscVerification } } : {}),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>{children}</body>
      <Analytics />
    </html>
  );
}
