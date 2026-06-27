import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import AdminShell from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const initial = (session.email?.[0] ?? "A").toUpperCase();

  return (
    <AdminShell email={session.email} initial={initial}>
      {children}
    </AdminShell>
  );
}
