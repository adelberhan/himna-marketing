"use client";
import { motion } from "framer-motion";
import { SERVICES_DATA } from "./services"; // تأكد من وجود الـ slug داخل هذا الملف
import ServiceCard from "./ServiceCard";

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
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
