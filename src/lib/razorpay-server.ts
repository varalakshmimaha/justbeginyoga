import "server-only";
import { getSettings } from "./settings";

export const RAZORPAY_CURRENCY = "INR";

/** Server readiness: enabled in settings AND both keys present. */
export async function razorpayReady(): Promise<boolean> {
  const s = await getSettings();
  return s.razorpayEnabled && Boolean(s.razorpayKeyId) && Boolean(s.razorpayKeySecret);
}

export async function razorpayKeyId(): Promise<string> {
  return (await getSettings()).razorpayKeyId;
}

export async function razorpaySecret(): Promise<string> {
  return (await getSettings()).razorpayKeySecret;
}

export type RazorpayOrder = {
  id: string;
  amount: number;
  currency: string;
  status: string;
};

/** Create an order using the keys stored in site settings. */
export async function createRazorpayOrder(
  amountInPaise: number,
  receipt?: string
): Promise<RazorpayOrder> {
  const s = await getSettings();
  const auth = "Basic " + Buffer.from(`${s.razorpayKeyId}:${s.razorpayKeySecret}`).toString("base64");

  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: auth },
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
