"use server";

import { prisma } from "@/lib/db";

export type FormState = {
  ok: boolean;
  message: string;
};

function str(data: FormData, key: string) {
  const v = data.get(key);
  return typeof v === "string" ? v.trim() : "";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContactEnquiry(
  _prev: FormState,
  data: FormData
): Promise<FormState> {
  // Honeypot — bots fill hidden fields
  if (str(data, "company")) return { ok: true, message: "Thank you — we'll be in touch soon!" };

  const name = str(data, "name");
  const email = str(data, "email");
  const phone = str(data, "phone");
  const service = str(data, "service");
  const message = str(data, "message");

  if (!name || name.length < 2) return { ok: false, message: "Please enter your name." };
  if (!EMAIL_RE.test(email)) return { ok: false, message: "Please enter a valid email address." };
  if (!message) return { ok: false, message: "Please tell us how we can help." };

  try {
    await prisma.contactEnquiry.create({
      data: { name, email, phone: phone || null, service: service || null, message },
    });
    return { ok: true, message: "Thank you — we'll be in touch soon!" };
  } catch (e) {
    console.error("contact enquiry failed", e);
    return { ok: false, message: "Something went wrong. Please try WhatsApp instead." };
  }
}

export async function submitGroupEnquiry(
  _prev: FormState,
  data: FormData
): Promise<FormState> {
  if (str(data, "company")) return { ok: true, message: "Thank you — we'll be in touch soon!" };

  const name = str(data, "name");
  const email = str(data, "email");
  const phone = str(data, "phone");
  const groupSize = str(data, "groupSize");
  const preferredTime = str(data, "preferredTime");
  const message = str(data, "message");

  if (!name || name.length < 2) return { ok: false, message: "Please enter your name." };
  if (!EMAIL_RE.test(email)) return { ok: false, message: "Please enter a valid email address." };
  if (!message) return { ok: false, message: "Please tell us a little about your group." };

  try {
    await prisma.groupEnquiry.create({
      data: {
        name,
        email,
        phone: phone || null,
        groupSize: groupSize || null,
        preferredTime: preferredTime || null,
        message,
      },
    });
    return { ok: true, message: "Thank you — we'll be in touch about your group soon!" };
  } catch (e) {
    console.error("group enquiry failed", e);
    return { ok: false, message: "Something went wrong. Please try WhatsApp instead." };
  }
}

// Multi-step "Join Group Classes" enrollment → saved as a GroupEnquiry.
export async function submitEnrollment(
  _prev: FormState,
  data: FormData
): Promise<FormState> {
  if (str(data, "company")) return { ok: true, message: "Thank you — we'll be in touch on WhatsApp!" };

  const name = str(data, "name");
  const phone = str(data, "phone");
  const age = str(data, "age");
  const batch = str(data, "batch");
  const goal = str(data, "goal");
  const health = data.getAll("health").map((h) => String(h).trim()).filter(Boolean);
  const healthOther = str(data, "healthOther");
  if (healthOther) health.push(healthOther);
  const planName = str(data, "planName");
  const planPrice = str(data, "planPrice");

  if (!name || name.length < 2) return { ok: false, message: "Please enter your name." };
  if (phone.replace(/\D/g, "").length < 7) return { ok: false, message: "Please enter a valid mobile number." };
  if (!age) return { ok: false, message: "Please enter your age." };
  if (!batch) return { ok: false, message: "Please choose a batch timing." };
  if (health.length === 0) return { ok: false, message: "Please select your health conditions (or None)." };
  if (!goal) return { ok: false, message: "Please choose your goal." };

  const plan = planName ? `${planName}${planPrice ? ` — ${planPrice}` : ""}` : "Free trial";
  const message = [
    `Group class enrollment — Plan: ${plan}`,
    `Age: ${age}`,
    `Health conditions: ${health.join(", ")}`,
    `Goal: ${goal}`,
  ].join("\n");

  try {
    await prisma.groupEnquiry.create({
      data: {
        name,
        email: null,
        phone: phone || null,
        groupSize: plan,
        preferredTime: batch,
        message,
      },
    });
    return { ok: true, message: "You're enrolled! We'll confirm your batch on WhatsApp shortly." };
  } catch (e) {
    console.error("enrollment failed", e);
    return { ok: false, message: "Something went wrong. Please try WhatsApp instead." };
  }
}
