import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Sign in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session) redirect("/admin");

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-6 font-sans">
      <div className="w-full max-w-[400px] rounded-2xl border border-[var(--color-line)] bg-paper p-8 shadow-[0_30px_60px_-30px_rgba(20,40,20,0.4)]">
        <div className="mb-6 flex flex-col items-center text-center">
          <Image src="/assets/jb-logo.png" alt="Just Begin Yoga" width={56} height={56} className="h-14 w-auto" />
          <h1 className="mt-3 font-serif text-[26px] font-semibold text-green-deep">Admin Panel</h1>
          <p className="mt-1 text-[13px] text-muted">Just Begin Yoga</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
