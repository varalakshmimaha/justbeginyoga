"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { createSession, destroySession, verifyPassword } from "@/lib/auth";

export type LoginState = { error: string };

export async function login(
  _prev: LoginState,
  data: FormData
): Promise<LoginState> {
  const email = String(data.get("email") || "").trim().toLowerCase();
  const password = String(data.get("password") || "");

  if (!email || !password) return { error: "Enter your email and password." };

  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin || !(await verifyPassword(password, admin.passwordHash))) {
    return { error: "Invalid email or password." };
  }

  await createSession({
    sub: String(admin.id),
    email: admin.email,
    name: admin.name ?? undefined,
  });

  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}
