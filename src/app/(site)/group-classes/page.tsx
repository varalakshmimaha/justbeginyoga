import type { Metadata } from "next";
import GroupClassSections, { groupFaqSchema } from "@/components/GroupClassSections";

export const metadata: Metadata = {
  title: "Group Yoga Classes — Practise Together Daily",
  description:
    "Live online group yoga classes, five days a week with morning & evening batches. Vinyasa, Hatha, Yin, Pranayama and more — for every level. Plans from ₹999/month. Book a free trial.",
  keywords: ["group yoga classes", "online group yoga", "community yoga", "daily yoga classes", "yoga for beginners"],
  alternates: { canonical: "/group-classes" },
  openGraph: {
    title: "Group Yoga Classes | Just Begin Yoga",
    description:
      "Two live sessions a day, five days a week — a steady, supportive group practice on Zoom. Plans from ₹999/month.",
    url: "/group-classes",
    type: "website",
  },
};

export default function GroupClassesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(groupFaqSchema) }}
      />
      <GroupClassSections />
    </>
  );
}
