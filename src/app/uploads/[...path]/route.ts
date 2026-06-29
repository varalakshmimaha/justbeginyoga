import { readFile } from "node:fs/promises";
import path from "node:path";

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

// GET /uploads/<file> — serves a runtime-uploaded file from <project>/uploads.
// (Next.js doesn't serve files added to /public after build, so uploads live
// outside public and are streamed through this handler.)
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: segments } = await params;
  const rel = (segments || []).join("/");

  // Block path traversal.
  if (!rel || rel.includes("..") || rel.includes("\0")) {
    return new Response("Not found", { status: 404 });
  }

  const file = path.join(process.cwd(), "uploads", rel);
  try {
    const data = await readFile(file);
    const ext = (rel.split(".").pop() || "").toLowerCase();
    return new Response(new Uint8Array(data), {
      headers: {
        "Content-Type": TYPES[ext] || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
