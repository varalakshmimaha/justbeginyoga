import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { SERVICES } from "@/lib/services";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url.replace(/\/$/, "");

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/services",
    "/faq",
    "/blog",
    "/gallery",
    "/videos",
    "/group-classes",
    "/contact",
    ...SERVICES.map((s) => `/services/${s.slug}`),
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  let postRoutes: MetadataRoute.Sitemap = [];
  try {
    // Import lazily so a missing DB at build time doesn't break the whole build.
    const { getPublishedPosts } = await import("@/lib/blog");
    const posts = await getPublishedPosts();
    postRoutes = posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    }));
  } catch {
    // DB unavailable — ship the static routes only.
  }

  return [...staticRoutes, ...postRoutes];
}
