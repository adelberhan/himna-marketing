"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { SERVICES_DATA } from "./services"; // تأكد من وجود الـ slug داخل هذا الملف

export default function ServicesPage() {
  return (
    <section id="services" className="py-24 bg-bg-200 min-h-screen" dir="rtl">
      <div className="container mx-auto px-6">
        {/* العناوين بنفس الستايل الأول */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-text-100 mb-4"
          >
            خدماتنا الإبداعية
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-text-200 max-w-2xl mx-auto"
          >
            نقدم حلولاً تسويقية متكاملة مصممة خصيصاً لتناسب احتياجات عملك وتطلعاتك.
          </motion.p>
        </div>

        {/* الشبكة بنفس ستايل البطاقات الأول */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/services/${service.slug}`} className="block h-full group">
                <div className="bg-bg-100 p-8 rounded-3xl shadow-soft border border-primary-300/20 transition-all duration-300 h-full cursor-pointer group-hover:shadow-xl group-hover:-translate-y-2 relative overflow-hidden">
                  
                  {/* حاوية الأيقونة بنفس الستايل المطلوب */}
                  <div className="w-16 h-16 bg-primary-300/30 rounded-2xl flex items-center justify-center text-primary-100 mb-6 group-hover:bg-primary-100 group-hover:text-primary-200 transition-colors duration-300">
                    {/* تأكد أن الأيقونة هنا تأتي من ملف services.tsx بنفس الحجم w-8 h-8 */}
                    {service.icon}
                  </div>

                  <h3 className="text-xl font-bold text-text-100 mb-3 group-hover:text-primary-100 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-text-200 leading-relaxed text-sm">
                    {service.description}
                  </p>

                  {/* إضافة لمسة السهم الجمالية من الكود الثاني ولكن بأسلوب يتناسب مع الستايل الأول */}
                  <div className="mt-6 flex items-center gap-2 text-primary-100 font-bold text-sm opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                    <span>عرض التفاصيل</span>
                    <span>←</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}