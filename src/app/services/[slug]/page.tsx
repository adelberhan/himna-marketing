// src/app/services/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SERVICES_DATA } from "../services"; // تأكد من صحة مسار ملف البيانات
import { FaWhatsapp } from "react-icons/fa";
import RelatedServices from "../RelatedServices";

// في Next.js 15، يجب تعريف params كـ Promise
type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ServiceDetailPage({ params }: Props) {
  // فك تشفير الـ params (Unwrap) باستخدام await
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // البحث عن الخدمة في مصفوفة البيانات
  const service = SERVICES_DATA.find((s) => s.slug === slug);

  // إذا لم يتم العثور على الخدمة، أظهر صفحة 404
  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-bg-200 text-text-100 pt-32 pb-20" dir="rtl">
      <div className="container mx-auto px-6">
        {/* زر العودة بتصميم أنيق */}
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-text-200 hover:text-primary-100 mb-12 transition-all group"
        >
          <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          <span className="font-bold">العودة لجميع الخدمات</span>
        </Link>

        {/* القسم الرئيسي: صورة يمين | محتوى يسار */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* الجانب الأيمن: الصورة المعبرة عن الخدمة */}
          <div className="relative aspect-square md:aspect-video lg:aspect-square rounded-[3rem] overflow-hidden border border-primary-300/20 shadow-2xl order-1 lg:order-2 group">
            <img
              src={
                service.image ||
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop"
              }
              loading="lazy"
              alt={service.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* طبقة تجميلية متدرجة فوق الصورة */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg-200/50 to-transparent opacity-60" />
          </div>

          {/* الجانب الأيسر: تفاصيل الخدمة */}
          <div className="order-2 lg:order-1 flex flex-col">
            {/* أيقونة الخدمة */}
            <div className="p-4 bg-primary-300/20 w-fit rounded-[1.5rem] text-primary-100 mb-8 border border-primary-300/10 shadow-soft">
              {service.icon}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-text-100 leading-tight tracking-tight">
              {service.title}
            </h1>

            <p className="text-xl text-text-200 leading-relaxed mb-8 font-medium">{service.description}</p>

            {/* صندوق التفاصيل التفصيلية */}
            <div className="p-8 rounded-[2rem] bg-bg-100 border border-primary-300/10 mb-10 shadow-soft relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-1 h-full bg-primary-100 opacity-30 group-hover:opacity-100 transition-opacity" />
              <h2 className="text-2xl font-bold mb-4 text-text-100 flex items-center gap-2">حول هذه الخدمة</h2>
              <p className="text-text-200 leading-relaxed text-lg">
                {service.content ||
                  "نحن نقدم هذه الخدمة بأعلى معايير الجودة العالمية، مع التركيز التام على تحقيق أهدافك التجارية وزيادة نمو علامتك الرقمية."}
              </p>
            </div>

            {/* مميزات سريعة (Bullets) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
              {[
                "تنفيذ احترافي عالي الجودة",
                "فريق متخصص لكل قسم",
                "تقارير دورية ونتائج ملموسة",
                "دعم فني واستشارات مجانية",
              ].map((point, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-text-200 font-bold bg-white/5 p-3 rounded-xl border border-white/5"
                >
                  <CheckCircle2 className="text-primary-100 shrink-0" size={20} />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {/* أزرار اتخاذ إجراء (CTA) */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="https://wa.me/966570591088"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none group relative px-12 py-5 bg-primary-100 text-primary-200 rounded-2xl font-black text-xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary-300/20 flex items-center justify-center gap-3"
              >
                <span className="relative z-10 flex items-center gap-3">
                  اطلب الخدمة الآن
                  <FaWhatsapp className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                </span>

                {/* تأثير اللمعان المتحرك (Shine Effect) */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
              </Link>
              {/* <button className="flex items-center justify-center gap-2 px-8 py-5 border border-white/10 text-white rounded-2xl font-bold hover:bg-white/5 transition-all">
                <MessageCircle size={22} />
                تحدث مع مستشار
              </button> */}
            </div>
          </div>
        </div>

        {/* قسم إحصائيات أو ثقة العملاء أسفل الصفحة */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-primary-300/10 pt-20 text-center">
          {[
            { label: "مشروع ناجح", val: "+500" },
            { label: "عميل سعيد", val: "+200" },
            { label: "سنة خبرة", val: "+5" },
            { label: "عائد استثمار", val: "300%" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="text-3xl font-black text-primary-100">{stat.val}</span>
              <span className="text-sm text-text-200 font-bold">{stat.label}</span>
            </div>
          ))}
        </div> */}

        <RelatedServices currentSlug={service.slug} />
      </div>
    </main>
  );
}
