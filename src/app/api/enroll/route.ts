import { prisma } from "@/lib/db";
import { razorpayReady, razorpayKeyId, createRazorpayOrder } from "@/lib/razorpay-server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function amountFromPrice(price: string): number {
  const n = Number(String(price).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? Math.round(n) : 0;
}

// POST /api/enroll — public. Saves the enrollment as a GroupEnquiry and, when
// Razorpay is enabled and the plan has a price, also creates an order so the
// client can open checkout.
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const s = (k: string) => String(body[k] ?? "").trim();
  const name = s("name");
  const phone = s("phone");
  const age = s("age");
  const batch = s("batch");
  const goal = s("goal");
  const health = Array.isArray(body.health) ? body.health.map(String).map((h) => h.trim()).filter(Boolean) : [];
  const healthOther = s("healthOther");
  if (healthOther) health.push(healthOther);
  const planName = s("planName");
  const planPrice = s("planPrice");

  if (!name || name.length < 2) return Response.json({ error: "Please enter your name." }, { status: 400 });
  if (phone.replace(/\D/g, "").length < 7) return Response.json({ error: "Please enter a valid mobile number." }, { status: 400 });
  if (!age) return Response.json({ error: "Please enter your age." }, { status: 400 });
  if (!batch) return Response.json({ error: "Please choose a batch timing." }, { status: 400 });
  if (health.length === 0) return Response.json({ error: "Please select your health conditions (or None)." }, { status: 400 });
  if (!goal) return Response.json({ error: "Please choose your goal." }, { status: 400 });

  const plan = planName ? `${planName}${planPrice ? ` — ${planPrice}` : ""}` : "Free trial";
  const message = [
    `Group class enrollment — Plan: ${plan}`,
    `Age: ${age}`,
    `Health conditions: ${health.join(", ")}`,
    `Goal: ${goal}`,
  ].join("\n");

  let enquiry;
  try {
    enquiry = await prisma.groupEnquiry.create({
      data: { name, email: null, phone: phone || null, groupSize: plan, preferredTime: batch, message },
    });
  } catch (e) {
    console.error("enroll save failed", e);
    return Response.json({ error: "Something went wrong. Please try WhatsApp instead." }, { status: 500 });
  }

  const amount = amountFromPrice(planPrice);
  if (amount > 0 && (await razorpayReady())) {
    try {
      const order = await createRazorpayOrder(amount * 100, `enroll_${enquiry.id}`);
      return Response.json({
        ok: true,
        enquiryId: enquiry.id,
        pay: { orderId: order.id, amount: order.amount, currency: order.currency, keyId: await razorpayKeyId() },
      });
    } catch (e) {
      console.error("enroll order failed", e);
      // Lead is saved; payment couldn't be started.
      return Response.json({ ok: true, enquiryId: enquiry.id, pay: null });
    }
  }

  return Response.json({ ok: true, enquiryId: enquiry.id, pay: null });
}
