import Link from "next/link";

type Service = {
  slug: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

type ServiceCardProps = {
  service: Service;
  compact?: boolean;
};

export default function ServiceCard({ service, compact = false }: ServiceCardProps) {
  return (
    <Link href={`/services/${service.slug}`} className="block h-full group">
      <div
        className={[
          "bg-bg-100 rounded-3xl shadow-soft border border-primary-300/20 transition-all duration-300 h-full cursor-pointer group-hover:shadow-xl group-hover:-translate-y-2 relative overflow-hidden",
          compact ? "p-6 min-h-[280px]" : "p-8",
        ].join(" ")}
      >
        <div
          className={[
            "bg-primary-300/30 rounded-2xl flex items-center justify-center text-primary-100 mb-6 group-hover:bg-primary-100 group-hover:text-primary-200 transition-colors duration-300",
            compact ? "w-14 h-14 [&_svg]:w-7 [&_svg]:h-7" : "w-16 h-16",
          ].join(" ")}
        >
          {service.icon}
        </div>

        <h3
          className={[
            "font-bold text-text-100 mb-3 group-hover:text-primary-100 transition-colors",
            compact ? "text-lg" : "text-xl",
          ].join(" ")}
        >
          {service.title}
        </h3>

        <p className={["text-text-200 leading-relaxed", compact ? "text-sm line-clamp-4" : "text-sm"].join(" ")}>
          {service.description}
        </p>

        <div className="mt-6 flex items-center gap-2 text-primary-100 font-bold text-sm opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
          <span>عرض التفاصيل</span>
          <span>←</span>
        </div>
      </div>
    </Link>
  );
}
