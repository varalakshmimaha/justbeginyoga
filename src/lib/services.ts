export const SERVICES = [
  {
    slug: "personal",
    icon: "/assets/svc-personal.svg",
    title: "Online Personal Classes",
    short: "One-to-one sessions shaped entirely around you, your body and your goals.",
    body: "Private, focused attention over video — your schedule, your pace, your goals. Perfect for beginners who want guidance, or experienced practitioners refining alignment and depth.",
  },
  {
    slug: "group",
    icon: "/assets/svc-group.svg",
    title: "Online Group Classes",
    short: "Practice with a small, friendly group from the comfort of your home.",
    body: "Small online groups bring the energy of a shared practice into your living room. Affordable, motivating and welcoming for every level.",
  },
  {
    slug: "apartment",
    icon: "/assets/svc-apartment.svg",
    title: "Apartment Classes",
    short: "In-person community yoga right inside your apartment complex.",
    body: "We bring yoga to your doorstep — regular in-person sessions hosted within your apartment community. A wonderful way to stay consistent with neighbours.",
  },
  {
    slug: "corporate",
    icon: "/assets/svc-corporate.svg",
    title: "Corporate Yoga",
    short: "Calmer, healthier and more focused teams — sessions designed for the workplace.",
    body: "Reduce stress and boost focus across your team with sessions designed for the workplace — on-site or online, tailored to your company's rhythm.",
  },
] as const;

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

import type { Benefit } from "@/components/WhatYouGet";

type WhatYouGetBlock = {
  heading: string;
  subtitle: string;
  benefits: Benefit[];
};

// Per-service "What you get" sections (rendered on /services/[slug]).
export const SERVICE_BENEFITS: Record<string, WhatYouGetBlock> = {
  personal: {
    heading: "A practice shaped to you",
    subtitle:
      "Every session is designed around where you are today — and where you want to go.",
    benefits: [
      { icon: "star", title: "A plan made for you", desc: "A custom sequence built around your body type, fitness level and personal goals — not a one-size-fits-all class." },
      { icon: "user", title: "Undivided attention", desc: "Real-time corrections on alignment and breath, so every pose is safe, precise and effective." },
      { icon: "heart", title: "Safe for your body", desc: "Sequences thoughtfully adapted for injuries, back or knee pain, BP, thyroid, PCOS, prenatal and recovery needs." },
      { icon: "clock", title: "On your schedule", desc: "Sessions arranged around your life and time zone — practise from home, while travelling, anywhere." },
      { icon: "trend", title: "Faster progress", desc: "With focus entirely on you, improvements in flexibility, strength and calm come noticeably sooner." },
      { icon: "care", title: "Privacy & comfort", desc: "No crowd, no comparison — a calm, judgment-free space to begin at your own comfort level." },
    ],
  },
};

export function getServiceBenefits(slug: string) {
  return SERVICE_BENEFITS[slug];
}
