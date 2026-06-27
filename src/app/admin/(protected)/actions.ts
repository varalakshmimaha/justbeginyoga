"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { ENQUIRY_STATUSES } from "@/lib/site";
import { parseYouTubeId } from "@/lib/videos";
import type { EnquiryStatus } from "@prisma/client";

async function requireAdmin() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
}

function toStatus(value: string): EnquiryStatus {
  return (ENQUIRY_STATUSES.includes(value as never)
    ? value
    : "NEW") as EnquiryStatus;
}

// ---------- Enquiry status management ----------
export async function updateContactEnquiry(data: FormData) {
  await requireAdmin();
  const id = Number(data.get("id"));
  const status = toStatus(String(data.get("status")));
  const adminNote = String(data.get("adminNote") || "").trim() || null;
  await prisma.contactEnquiry.update({ where: { id }, data: { status, adminNote } });
  revalidatePath("/admin/contact-enquiries");
  revalidatePath("/admin");
}

export async function updateGroupEnquiry(data: FormData) {
  await requireAdmin();
  const id = Number(data.get("id"));
  const status = toStatus(String(data.get("status")));
  const adminNote = String(data.get("adminNote") || "").trim() || null;
  await prisma.groupEnquiry.update({ where: { id }, data: { status, adminNote } });
  revalidatePath("/admin/group-enquiries");
  revalidatePath("/admin");
}

export async function deleteContactEnquiry(data: FormData) {
  await requireAdmin();
  await prisma.contactEnquiry.delete({ where: { id: Number(data.get("id")) } });
  revalidatePath("/admin/contact-enquiries");
  revalidatePath("/admin");
}

export async function deleteGroupEnquiry(data: FormData) {
  await requireAdmin();
  await prisma.groupEnquiry.delete({ where: { id: Number(data.get("id")) } });
  revalidatePath("/admin/group-enquiries");
  revalidatePath("/admin");
}

// ---------- Blog CRUD ----------
function makeSlug(input: string) {
  return slugify(input, { lower: true, strict: true, trim: true });
}

export type BlogFormState = { error: string };

export async function saveBlogPost(
  _prev: BlogFormState,
  data: FormData
): Promise<BlogFormState> {
  await requireAdmin();

  const idRaw = data.get("id");
  const id = idRaw ? Number(idRaw) : null;

  const title = String(data.get("title") || "").trim();
  const body = String(data.get("body") || "").trim();
  if (!title) return { error: "Title is required." };
  if (!body) return { error: "Body content is required." };

  let slug = String(data.get("slug") || "").trim();
  slug = slug ? makeSlug(slug) : makeSlug(title);

  const fields = {
    title,
    slug,
    category: String(data.get("category") || "Wellbeing").trim() || "Wellbeing",
    excerpt: String(data.get("excerpt") || "").trim(),
    body,
    coverImage: String(data.get("coverImage") || "").trim() || null,
    author: String(data.get("author") || "Anusha Shetty").trim() || "Anusha Shetty",
    readMinutes: Math.max(1, Number(data.get("readMinutes")) || 5),
    metaTitle: String(data.get("metaTitle") || "").trim() || null,
    metaDescription: String(data.get("metaDescription") || "").trim() || null,
    keywords: String(data.get("keywords") || "").trim() || null,
    ogImage: String(data.get("ogImage") || "").trim() || null,
    published: data.get("published") === "on",
  };

  // Uniqueness guard for slug
  const clash = await prisma.blogPost.findFirst({
    where: { slug: fields.slug, ...(id ? { id: { not: id } } : {}) },
    select: { id: true },
  });
  if (clash) return { error: `The slug "${fields.slug}" is already in use.` };

  try {
    if (id) {
      const existing = await prisma.blogPost.findUnique({ where: { id }, select: { publishedAt: true, published: true } });
      await prisma.blogPost.update({
        where: { id },
        data: {
          ...fields,
          publishedAt:
            fields.published && !existing?.publishedAt ? new Date() : existing?.publishedAt,
        },
      });
    } else {
      await prisma.blogPost.create({
        data: { ...fields, publishedAt: fields.published ? new Date() : null },
      });
    }
  } catch (e) {
    console.error("saveBlogPost failed", e);
    return { error: "Could not save the post. Please try again." };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${fields.slug}`);
  redirect("/admin/blog");
}

export async function deleteBlogPost(data: FormData) {
  await requireAdmin();
  await prisma.blogPost.delete({ where: { id: Number(data.get("id")) } });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

export async function toggleBlogPublished(data: FormData) {
  await requireAdmin();
  const id = Number(data.get("id"));
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) return;
  await prisma.blogPost.update({
    where: { id },
    data: {
      published: !post.published,
      publishedAt: !post.published && !post.publishedAt ? new Date() : post.publishedAt,
    },
  });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
}

// ---------- Gallery CRUD ----------
export type GalleryFormState = { error: string };

export async function saveGalleryImage(
  _prev: GalleryFormState,
  data: FormData
): Promise<GalleryFormState> {
  await requireAdmin();

  const idRaw = data.get("id");
  const id = idRaw ? Number(idRaw) : null;

  const imageUrl = String(data.get("imageUrl") || "").trim();
  if (!imageUrl) return { error: "An image URL is required." };

  const fields = {
    imageUrl,
    title: String(data.get("title") || "").trim() || null,
    caption: String(data.get("caption") || "").trim() || null,
    category: String(data.get("category") || "Classes").trim() || "Classes",
    sortOrder: Number(data.get("sortOrder")) || 0,
    published: data.get("published") === "on",
  };

  try {
    if (id) {
      await prisma.galleryImage.update({ where: { id }, data: fields });
    } else {
      await prisma.galleryImage.create({ data: fields });
    }
  } catch (e) {
    console.error("saveGalleryImage failed", e);
    return { error: "Could not save the image. Please try again." };
  }

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  redirect("/admin/gallery");
}

export async function deleteGalleryImage(data: FormData) {
  await requireAdmin();
  await prisma.galleryImage.delete({ where: { id: Number(data.get("id")) } });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function toggleGalleryPublished(data: FormData) {
  await requireAdmin();
  const id = Number(data.get("id"));
  const img = await prisma.galleryImage.findUnique({ where: { id } });
  if (!img) return;
  await prisma.galleryImage.update({
    where: { id },
    data: { published: !img.published },
  });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

// ---------- Video CRUD ----------
export type VideoFormState = { error: string };

export async function saveVideo(
  _prev: VideoFormState,
  data: FormData
): Promise<VideoFormState> {
  await requireAdmin();

  const idRaw = data.get("id");
  const id = idRaw ? Number(idRaw) : null;

  const title = String(data.get("title") || "").trim();
  if (!title) return { error: "Title is required." };

  const youtubeId = parseYouTubeId(String(data.get("youtubeId") || ""));
  if (!youtubeId) {
    return { error: "Enter a valid YouTube URL or 11-character video id." };
  }

  const fields = {
    title,
    youtubeId,
    description: String(data.get("description") || "").trim() || null,
    category: String(data.get("category") || "Practice").trim() || "Practice",
    sortOrder: Number(data.get("sortOrder")) || 0,
    published: data.get("published") === "on",
  };

  try {
    if (id) {
      await prisma.video.update({ where: { id }, data: fields });
    } else {
      await prisma.video.create({ data: fields });
    }
  } catch (e) {
    console.error("saveVideo failed", e);
    return { error: "Could not save the video. Please try again." };
  }

  revalidatePath("/admin/videos");
  revalidatePath("/videos");
  redirect("/admin/videos");
}

export async function deleteVideo(data: FormData) {
  await requireAdmin();
  await prisma.video.delete({ where: { id: Number(data.get("id")) } });
  revalidatePath("/admin/videos");
  revalidatePath("/videos");
}

export async function toggleVideoPublished(data: FormData) {
  await requireAdmin();
  const id = Number(data.get("id"));
  const video = await prisma.video.findUnique({ where: { id } });
  if (!video) return;
  await prisma.video.update({
    where: { id },
    data: { published: !video.published },
  });
  revalidatePath("/admin/videos");
  revalidatePath("/videos");
}
