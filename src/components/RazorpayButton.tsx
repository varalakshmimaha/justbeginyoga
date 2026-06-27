"use client";

import { useState } from "react";
import { RAZORPAY_ENABLED } from "@/lib/razorpay";
import { SITE } from "@/lib/site";

type RazorpayConstructor = new (options: Record<string, unknown>) => {
  open: () => void;
  on: (event: string, cb: (resp: unknown) => void) => void;
};

declare global {
  interface Window {
    Razorpay?: RazorpayConstructor;
  }
}

const CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

function loadCheckout(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = CHECKOUT_SRC;
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

export default function RazorpayButton({
  amount,
  label = "Pay now",
  description = "Just Begin Yoga",
  prefill,
  className,
}: {
  amount: number; // in rupees
  label?: string;
  description?: string;
  prefill?: { name?: string; email?: string; contact?: string };
  className?: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  // Inert when the integration is switched off — render nothing at all.
  if (!RAZORPAY_ENABLED) return null;

  async function pay() {
    setStatus("loading");
    setMessage("");
    try {
      const ready = await loadCheckout();
      if (!ready || !window.Razorpay) throw new Error("checkout-unavailable");

      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      if (!orderRes.ok) throw new Error("order-failed");
      const order = await orderRes.json();

      const rzp = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: SITE.name,
        description,
        order_id: order.orderId,
        prefill,
        theme: { color: "#2c6a39" },
        handler: async (resp: unknown) => {
          const r = resp as {
            razorpay_order_id: string;
            razorpay_payment_id: string;
            razorpay_signature: string;
          };
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(r),
          });
          if (verifyRes.ok) {
            setStatus("ok");
            setMessage("Payment received — thank you!");
          } else {
            setStatus("error");
            setMessage("We couldn't verify the payment. Please contact us.");
          }
        },
      });
      rzp.on("payment.failed", () => {
        setStatus("error");
        setMessage("Payment failed or was cancelled.");
      });
      rzp.open();
      setStatus("idle");
    } catch {
      setStatus("error");
      setMessage("Could not start the payment. Please try again.");
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={pay}
        disabled={status === "loading"}
        className={
          className ??
          "rounded-full bg-gradient-to-r from-olive to-green-deep px-7 py-3.5 text-[13px] uppercase tracking-[0.08em] text-white shadow-[0_12px_26px_-12px_rgba(44,106,57,0.7)] transition hover:-translate-y-0.5 disabled:opacity-60"
        }
      >
        {status === "loading" ? "Starting…" : label}
      </button>
      {message && (
        <p className={`text-[13px] ${status === "ok" ? "text-green-deep" : "text-red-600"}`}>{message}</p>
      )}
    </div>
  );
}
