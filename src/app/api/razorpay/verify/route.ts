import crypto from "node:crypto";
import { razorpayReady, razorpaySecret } from "@/lib/razorpay-server";

export const dynamic = "force-dynamic";

// POST /api/razorpay/verify
// { razorpay_order_id, razorpay_payment_id, razorpay_signature }
// Verifies the checkout signature server-side (HMAC-SHA256 with the secret).
export async function POST(request: Request) {
  if (!(await razorpayReady())) {
    return Response.json(
      { error: "Online payments are not enabled." },
      { status: 503 }
    );
  }

  let body: {
    razorpay_order_id?: string;
    razorpay_payment_id?: string;
    razorpay_signature?: string;
    enquiryId?: number;
  };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return Response.json({ error: "Missing payment fields." }, { status: 400 });
  }

  const expected = crypto
    .createHmac("sha256", await razorpaySecret())
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  // Constant-time comparison to avoid timing leaks.
  const valid =
    expected.length === razorpay_signature.length &&
    crypto.timingSafeEqual(
      Buffer.from(expected),
      Buffer.from(razorpay_signature)
    );

  if (!valid) {
    return Response.json({ verified: false }, { status: 400 });
  }

  // Payment is genuine — mark the related enrollment as paid.
  if (body.enquiryId) {
    try {
      const { prisma } = await import("@/lib/db");
      await prisma.groupEnquiry.update({
        where: { id: Number(body.enquiryId) },
        data: { status: "CONVERTED", adminNote: `PAID · ${razorpay_payment_id}` },
      });
    } catch (e) {
      console.error("could not mark enrollment paid", e);
    }
  }

  return Response.json({ verified: true, paymentId: razorpay_payment_id });
}
