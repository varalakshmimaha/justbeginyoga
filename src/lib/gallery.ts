import "server-only";
import { prisma } from "./db";

export function getPublishedGalleryImages() {
  return prisma.galleryImage.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
}
