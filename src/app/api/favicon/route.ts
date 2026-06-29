import { readFile } from "node:fs/promises";
import path from "node:path";
import { getSettings } from "@/lib/settings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TYPES: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
  svg: "image/svg+xml",
  ico: "image/x-icon",
  avif: "image/avif",
};

// Serves /favicon.ico (via rewrite) from the current Settings favicon.
export async function GET(req: Request) {
  const { faviconUrl } = await getSettings();

  // External URL → redirect to it.
  if (/^https?:\/\//i.test(faviconUrl)) {
    return Response.redirect(faviconUrl, 307);
  }

  // Resolve a local /uploads/... or /assets/... path to a file on disk.
  let file: string;
  if (faviconUrl.startsWith("/uploads/")) {
    file = path.join(process.cwd(), "uploads", faviconUrl.slice("/uploads/".length));
  } else {
    file = path.join(process.cwd(), "public", faviconUrl.replace(/^\//, ""));
  }

  try {
    const data = await readFile(file);
    const ext = (faviconUrl.split(".").pop() || "").toLowerCase();
    return new Response(new Uint8Array(data), {
      headers: {
        "Content-Type": TYPES[ext] || "image/png",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    // Fall back to redirecting (lets the static asset/route handle it).
    return Response.redirect(new URL(faviconUrl, req.url), 307);
  }
}
