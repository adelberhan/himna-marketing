"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SERVICES_DATA } from "./services";
import ServiceCard from "./ServiceCard";

type RelatedServicesProps = {
  currentSlug: string;
};

export default function RelatedServices({ currentSlug }: RelatedServicesProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const services = SERVICES_DATA.filter((service) => service.slug !== currentSlug);

  const scrollByCards = (direction: "prev" | "next") => {
    const container = scrollerRef.current;
    if (!container) return;

    const firstCard = container.querySelector<HTMLElement>("[data-related-card]");
    if (!firstCard) return;

    const gap = 24;
    const delta = firstCard.offsetWidth * (window.innerWidth >= 1024 ? 4 : 1) + gap * (window.innerWidth >= 1024 ? 3 : 0);

    container.scrollBy({
      left: direction === "next" ? delta : -delta,
      behavior: "smooth",
    });
  };

  if (services.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-primary-300/10 pt-16" aria-labelledby="related-services-heading">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h2 id="related-services-heading" className="text-3xl md:text-4xl font-bold text-text-100 mb-3">
            خدمات ذات صلة
          </h2>
          <p className="text-text-200 max-w-2xl">
            اكتشف خدمات أخرى من نفس القائمة تساعدك على توسيع حضورك الرقمي.
          </p>
        </div>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => scrollByCards("prev")}
            className="w-12 h-12 rounded-full border border-primary-300/20 bg-bg-100 text-text-100 hover:bg-primary-100 hover:text-primary-200 transition-colors flex items-center justify-center"
            aria-label="الخدمة السابقة"
          >
            <ChevronRight size={20} />
          </button>
          <button
            type="button"
            onClick={() => scrollByCards("next")}
            className="w-12 h-12 rounded-full border border-primary-300/20 bg-bg-100 text-text-100 hover:bg-primary-100 hover:text-primary-200 transition-colors flex items-center justify-center"
            aria-label="الخدمة التالية"
          >
            <ChevronLeft size={20} />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {services.map((service) => (
          <div
            key={service.slug}
            data-related-card
            className="min-w-0 shrink-0 basis-full md:basis-[calc(50%-12px)] xl:basis-[calc(25%-18px)] snap-start"
          >
            <ServiceCard service={service} compact />
          </div>
        ))}
      </div>
    </section>
  );
}
