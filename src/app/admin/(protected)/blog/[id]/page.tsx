import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import BlogForm from "@/components/admin/BlogForm";

export const dynamic = "force-dynamic";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postId = Number(id);
  if (Number.isNaN(postId)) notFound();

  const post = await prisma.blogPost.findUnique({ where: { id: postId } });
  if (!post) notFound();

  return (
    <div>
      <Link href="/admin/blog" className="text-[13px] text-muted no-underline hover:text-green-deep">← Back to posts</Link>
      <h1 className="mt-2 font-serif text-[30px] font-semibold text-green-deep">Edit post</h1>
      <p className="mb-6 mt-1 text-[14px] text-muted">{post.title}</p>
      <BlogForm
        values={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          category: post.category,
          excerpt: post.excerpt,
          body: post.body,
          coverImage: post.coverImage ?? "",
          author: post.author,
          readMinutes: post.readMinutes,
          metaTitle: post.metaTitle ?? "",
          metaDescription: post.metaDescription ?? "",
          keywords: post.keywords ?? "",
          ogImage: post.ogImage ?? "",
          published: post.published,
        }}
      />
    </div>
  );
}
