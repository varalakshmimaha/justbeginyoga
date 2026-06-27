import {
  RAZORPAY_KEY_ID,
  createRazorpayOrder,
  razorpayServerReady,
} from "@/lib/razorpay";

export const dynamic = "force-dynamic";

// POST /api/razorpay/order  { amount: <rupees>, receipt?: string }
// Creates a Razorpay order and returns the bits checkout.js needs.
export async function POST(request: Request) {
  if (!razorpayServerReady()) {
    return Response.json(
      { error: "Online payments are not enabled." },
      { status: 503 }
    );
  }

  let body: { amount?: unknown; receipt?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const rupees = Number(body.amount);
  // Guardrail: only accept sane amounts (₹1 – ₹5,00,000).
  if (!Number.isFinite(rupees) || rupees < 1 || rupees > 500_000) {
    return Response.json({ error: "Invalid amount." }, { status: 400 });
  }

  const receipt =
    typeof body.receipt === "string" ? body.receipt.slice(0, 40) : undefined;

  try {
    const order = await createRazorpayOrder(Math.round(rupees * 100), receipt);
    return Response.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: RAZORPAY_KEY_ID,
    });
  } catch (e) {
    console.error("razorpay order route failed", e);
    return Response.json(
      { error: "Could not start the payment. Please try again." },
      { status: 502 }
    );
  }
}
