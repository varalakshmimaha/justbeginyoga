import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import WhatYouGet from "@/components/WhatYouGet";
import { SERVICES, getService, getServiceBenefits } from "@/lib/services";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.short,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const benefits = getServiceBenefits(slug);

  return (
    <>
      <PageHero eyebrow="Service" title={service.title} />
      <section className="bg-paper px-6 pb-12 pt-20 sm:px-12 lg:px-[86px]">
        <div className="mx-auto max-w-[760px] text-center">
          <Image src={service.icon} alt="" width={72} height={72} className="mx-auto mb-6 h-[72px] w-[72px]" />
          <p className="text-[18px] font-light leading-[1.8] text-muted">{service.body}</p>
        </div>
      </section>
      {benefits && (
        <WhatYouGet heading={benefits.heading} subtitle={benefits.subtitle} benefits={benefits.benefits} />
      )}
      <CtaBand title="Want to try this class?" text="Book a free trial and experience it for yourself — no commitment, just a first step." />
    </>
  );
}
