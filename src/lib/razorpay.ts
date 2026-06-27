// Razorpay configuration + feature flag.
//
// Razorpay is OFF by default. It only turns on when:
//   NEXT_PUBLIC_RAZORPAY_ENABLED="true"
//   NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_live_xxx"   (public — used by checkout.js)
//   RAZORPAY_KEY_SECRET="xxx"                     (server-only — never exposed)
//
// We talk to Razorpay over its REST API with fetch + Basic auth, so there is
// no extra npm dependency and nothing ships to the client beyond the key id.

export const RAZORPAY_CURRENCY = "INR";

/** Public key id — safe to expose to the browser (checkout.js needs it). */
export const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "";

/** Client-visible flag: is the integration switched on at all? */
export const RAZORPAY_ENABLED =
  process.env.NEXT_PUBLIC_RAZORPAY_ENABLED === "true" && Boolean(RAZORPAY_KEY_ID);

/**
 * Server-side readiness: the flag is on AND both keys are present.
 * Use this in API routes before creating/verifying anything.
 */
export function razorpayServerReady(): boolean {
  return (
    process.env.NEXT_PUBLIC_RAZORPAY_ENABLED === "true" &&
    Boolean(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) &&
    Boolean(process.env.RAZORPAY_KEY_SECRET)
  );
}

function authHeader(): string {
  const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "";
  const secret = process.env.RAZORPAY_KEY_SECRET || "";
  return "Basic " + Buffer.from(`${key}:${secret}`).toString("base64");
}

export type RazorpayOrder = {
  id: string;
  amount: number;
  currency: string;
  status: string;
};

/** Create an order. `amountInPaise` is the smallest currency unit (₹1 = 100). */
export async function createRazorpayOrder(
  amountInPaise: number,
  receipt?: string
): Promise<RazorpayOrder> {
  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader(),
    },
    body: JSON.stringify({
      amount: amountInPaise,
      currency: RAZORPAY_CURRENCY,
      receipt: receipt || `rcpt_${amountInPaise}`,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Razorpay order failed (${res.status}): ${detail}`);
  }
  return res.json();
}
