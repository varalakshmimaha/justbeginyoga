import Link from "next/link";
import BlogForm from "@/components/admin/BlogForm";

export const dynamic = "force-dynamic";

export default function NewBlogPostPage() {
  return (
    <div>
      <Link href="/admin/blog" className="text-[13px] text-muted no-underline hover:text-green-deep">← Back to posts</Link>
      <h1 className="mt-2 font-serif text-[30px] font-semibold text-green-deep">New blog post</h1>
      <p className="mb-6 mt-1 text-[14px] text-muted">Write a new journal article. Tip: link to other posts for SEO back-linking.</p>
      <BlogForm />
    </div>
  );
}
