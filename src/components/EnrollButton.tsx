"use client";

import { useState, useEffect } from "react";
import { SITE } from "@/lib/site";

const BATCHES = [
  { value: "Morning Batch — 6:00 AM to 7:00 AM", icon: "🌅", label: "Morning Batch — 6:00 AM to 7:00 AM" },
  { value: "Evening Batch — 6:00 PM to 7:00 PM", icon: "🌆", label: "Evening Batch — 6:00 PM to 7:00 PM" },
];
const HEALTH = ["Back pain", "Knee pain", "BP / Sugar", "Thyroid", "PCOS", "None"];
const GOALS = ["Weight loss", "Stress relief", "Flexibility", "General fitness", "Medical recovery"];

export type Plan = { name: string; price: string };

type RazorpayCtor = new (options: Record<string, unknown>) => { open: () => void; on: (e: string, cb: (r: unknown) => void) => void };
declare global {
  interface Window { Razorpay?: RazorpayCtor }
}
function loadCheckout(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const sc = document.createElement("script");
    sc.src = "https://checkout.razorpay.com/v1/checkout.js";
    sc.onload = () => resolve(true);
    sc.onerror = () => resolve(false);
    document.body.appendChild(sc);
  });
}

const field =
  "w-full rounded-xl border border-[var(--color-line)] bg-paper px-4 py-3.5 text-[15px] text-ink outline-none transition focus:border-green focus:shadow-[0_0_0_3px_rgba(60,128,73,0.14)]";
const optBase = "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-[15px] transition";

export default function EnrollButton({
  plan,
  label,
  className,
}: {
  plan?: Plan;
  label: string;
  className: string;
}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "busy" | "success">("idle");
  const [paid, setPaid] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [batch, setBatch] = useState("");
  const [health, setHealth] = useState<string[]>([]);
  const [healthOther, setHealthOther] = useState("");
  const [goal, setGoal] = useState("");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function close() { setOpen(false); }

  function toggleHealth(item: string) {
    setHealth((cur) => {
      if (item === "None") return cur.includes("None") ? [] : ["None"];
      const next = cur.filter((h) => h !== "None");
      return next.includes(item) ? next.filter((h) => h !== item) : [...next, item];
    });
  }

  function next() {
    setError("");
    if (step === 1) {
      if (name.trim().length < 2) return setError("Please enter your full name.");
      if (phone.replace(/\D/g, "").length < 7) return setError("Please enter a valid mobile number.");
      if (!age.trim()) return setError("Please enter your age.");
    }
    if (step === 2 && !batch) return setError("Please select a batch timing.");
    setStep((s) => Math.min(3, s + 1));
  }

  function back() {
    setError("");
    setStep((s) => Math.max(1, s - 1));
  }

  async function openRazorpay(pay: { orderId: string; amount: number; currency: string; keyId: string }, enquiryId: number) {
    const ready = await loadCheckout();
    if (!ready || !window.Razorpay) {
      setStatus("success");
      setSuccessMsg("You're enrolled — we'll share payment details on WhatsApp.");
      return;
    }
    const rzp = new window.Razorpay({
      key: pay.keyId,
      amount: pay.amount,
      currency: pay.currency,
      order_id: pay.orderId,
      name: SITE.name,
      description: plan ? `${plan.name} plan — group classes` : "Group classes",
      prefill: { name, contact: phone },
      theme: { color: "#2c6a39" },
      handler: async (resp: unknown) => {
        const r = resp as { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string };
        try {
          const v = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...r, enquiryId }),
          });
          setStatus("success");
          if (v.ok) {
            setPaid(true);
            setSuccessMsg("Payment received — you're enrolled! 🎉");
          } else {
            setSuccessMsg("Enrolled! We'll verify your payment and confirm on WhatsApp.");
          }
        } catch {
          setStatus("success");
          setSuccessMsg("Enrolled! We'll confirm your payment on WhatsApp.");
        }
      },
    });
    rzp.on("payment.failed", () => {
      setStatus("success");
      setSuccessMsg("You're enrolled — payment didn't go through. We'll share a link on WhatsApp.");
    });
    setStatus("idle");
    rzp.open();
  }

  async function handleSubmit() {
    setError("");
    if (health.length === 0 && !healthOther) return setError("Please select your health conditions (or None).");
    if (!goal) return setError("Please choose your goal.");

    setStatus("busy");
    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, phone, age, batch, goal, health, healthOther,
          planName: plan?.name ?? "", planPrice: plan?.price ?? "",
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Something went wrong."); setStatus("idle"); return; }

      if (data.pay) {
        await openRazorpay(data.pay, data.enquiryId);
      } else {
        setStatus("success");
        setSuccessMsg("You're enrolled! We'll confirm your batch on WhatsApp shortly.");
      }
    } catch {
      setError("Something went wrong. Please try WhatsApp instead.");
      setStatus("idle");
    }
  }

  const planLabel = plan ? `${plan.name} — ${plan.price}` : "Free trial";
  const willPay = Boolean(plan?.price);

  return (
    <>
      <button type="button" onClick={() => { setOpen(true); setStep(1); setError(""); setStatus("idle"); }} className={className}>
        {label}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Join group classes enrollment form"
          onClick={close}
          className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto bg-[rgba(16,32,20,0.55)] p-4 backdrop-blur-[6px] sm:p-[clamp(16px,4vw,52px)]"
        >
          <div onClick={(e) => e.stopPropagation()} className="my-auto w-full max-w-[640px] overflow-hidden rounded-[24px] bg-paper shadow-[0_50px_100px_-30px_rgba(0,0,0,0.6)]">
            {/* header */}
            <div className="relative bg-gradient-to-br from-[#245733] to-[#143019] px-[clamp(22px,4vw,40px)] py-7 text-cream">
              <button type="button" onClick={close} aria-label="Close" className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(241,239,226,0.12)] text-xl text-cream transition hover:bg-[rgba(241,239,226,0.22)]">×</button>
              <div className="text-[12px] font-semibold uppercase tracking-[0.24em] text-olive-soft">Join Group Classes</div>
              <div className="mt-1.5 flex flex-wrap items-center gap-3">
                <h2 className="m-0 font-serif text-[clamp(26px,3.4vw,34px)] font-semibold text-white">Enrollment Form</h2>
                <span className="rounded-full border border-[rgba(241,239,226,0.25)] bg-[rgba(241,239,226,0.08)] px-3.5 py-1.5 text-[13px] font-medium text-olive-soft">{planLabel}</span>
              </div>
              {status !== "success" && (
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex gap-1.5">
                    {[1, 2, 3].map((d) => (
                      <span key={d} className={`h-2 w-2 rounded-full transition ${d === step ? "scale-125 bg-olive-soft" : "bg-[rgba(241,239,226,0.4)]"}`} />
                    ))}
                  </div>
                  <span className="text-[13px] text-[rgba(241,239,226,0.8)]">Step {step} of 3</span>
                </div>
              )}
            </div>

            {/* body */}
            <div className="px-[clamp(22px,4vw,40px)] py-7">
              {status === "success" ? (
                <div className="py-8 text-center">
                  <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-[28px] ${paid ? "bg-[rgba(134,167,60,0.18)] text-green-deep" : "bg-[rgba(134,167,60,0.18)] text-green-deep"}`}>✓</div>
                  <h3 className="m-0 font-serif text-[24px] font-semibold text-green-deep">{paid ? "Payment successful!" : "You're enrolled!"}</h3>
                  <p className="mx-auto mt-2 max-w-[440px] text-[15px] text-muted">{successMsg}</p>
                  <div className="mt-6 flex justify-center gap-3">
                    <a href={SITE.whatsapp} target="_blank" rel="noopener" className="rounded-full bg-[#25d366] px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-white no-underline">WhatsApp us</a>
                    <button type="button" onClick={close} className="rounded-full border border-[var(--color-line)] px-6 py-3 text-[13px] font-medium text-ink">Close</button>
                  </div>
                </div>
              ) : (
                <>
                  {step === 1 && (
                    <div className="space-y-4">
                      <h3 className="m-0 font-serif text-[22px] font-semibold text-green-deep">Personal Details</h3>
                      <div>
                        <label className="mb-1.5 block text-[14px] font-medium text-ink">Full Name <span className="text-red-500">*</span></label>
                        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your answer" className={field} />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-[14px] font-medium text-ink">Mobile Number (WhatsApp preferred) <span className="text-red-500">*</span></label>
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" placeholder="Your answer" className={field} />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-[14px] font-medium text-ink">Age <span className="text-red-500">*</span></label>
                        <input value={age} onChange={(e) => setAge(e.target.value)} inputMode="numeric" placeholder="Your answer" className={field} />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <h3 className="m-0 font-serif text-[22px] font-semibold text-green-deep">Class Details</h3>
                      <div>
                        <label className="mb-2.5 block text-[14px] font-medium text-ink">Select Your Batch Timing <span className="text-red-500">*</span></label>
                        <div className="space-y-2.5">
                          {BATCHES.map((b) => (
                            <label key={b.value} className={`${optBase} ${batch === b.value ? "border-green-deep bg-[rgba(134,167,60,0.1)]" : "border-[var(--color-line)] hover:border-olive"}`}>
                              <input type="radio" checked={batch === b.value} onChange={() => setBatch(b.value)} className="h-[18px] w-[18px] accent-[var(--color-green-deep)]" />
                              <span className="text-[20px]">{b.icon}</span>
                              <span className="text-[#3a4733]">{b.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-5">
                      <h3 className="m-0 font-serif text-[22px] font-semibold text-green-deep">Health &amp; Goal</h3>
                      <div>
                        <label className="mb-2.5 block text-[14px] font-medium text-ink">Do you have any health conditions? <span className="text-red-500">*</span></label>
                        <div className="grid grid-cols-2 gap-2.5">
                          {HEALTH.map((h) => (
                            <label key={h} className={`${optBase} ${health.includes(h) ? "border-green-deep bg-[rgba(134,167,60,0.1)]" : "border-[var(--color-line)] hover:border-olive"}`}>
                              <input type="checkbox" checked={health.includes(h)} onChange={() => toggleHealth(h)} className="h-[18px] w-[18px] accent-[var(--color-green-deep)]" />
                              <span className="text-[#3a4733]">{h}</span>
                            </label>
                          ))}
                        </div>
                        <input value={healthOther} onChange={(e) => { setHealthOther(e.target.value); if (e.target.value) setHealth((c) => c.filter((x) => x !== "None")); }} placeholder="Other (please specify)" className={`${field} mt-2.5`} />
                      </div>
                      <div>
                        <label className="mb-2.5 block text-[14px] font-medium text-ink">Your Goal for Joining Yoga <span className="text-red-500">*</span></label>
                        <div className="grid grid-cols-2 gap-2.5">
                          {GOALS.map((g) => (
                            <label key={g} className={`${optBase} ${goal === g ? "border-green-deep bg-[rgba(134,167,60,0.1)]" : "border-[var(--color-line)] hover:border-olive"}`}>
                              <input type="radio" checked={goal === g} onChange={() => setGoal(g)} className="h-[18px] w-[18px] accent-[var(--color-green-deep)]" />
                              <span className="text-[#3a4733]">{g}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {error && <p className="mt-4 text-[13.5px] text-red-600">{error}</p>}

                  <div className="mt-7 flex items-center justify-between">
                    <button type="button" onClick={back} className={`rounded-full px-6 py-3 text-[13px] font-medium uppercase tracking-[0.08em] text-muted transition hover:text-green-deep ${step === 1 ? "invisible" : ""}`}>Back</button>
                    {step < 3 ? (
                      <button type="button" onClick={next} className="rounded-full bg-gradient-to-r from-olive to-green-deep px-9 py-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-white shadow-[0_14px_30px_-14px_rgba(44,106,57,0.7)] transition hover:-translate-y-0.5">Next</button>
                    ) : (
                      <button type="button" onClick={handleSubmit} disabled={status === "busy"} className="rounded-full bg-gradient-to-r from-olive to-green-deep px-9 py-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-white shadow-[0_14px_30px_-14px_rgba(44,106,57,0.7)] transition hover:-translate-y-0.5 disabled:opacity-60">
                        {status === "busy" ? "Please wait…" : willPay ? "Proceed to payment" : "Submit"}
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
