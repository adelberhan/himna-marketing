"use client";
import { motion } from "framer-motion";
import { Megaphone, Palette, Share2, Target } from "lucide-react";

const services = [
  {
    title: "إدارة التواصل الاجتماعي",
    description: "نبني حضورك الرقمي ونتفاعل مع جمهورك لزيادة الولاء للعلامة التجارية.",
    icon: <Share2 className="w-8 h-8" />,
  },
  {
    title: "صناعة المحتوى",
    description: "نكتب ونصميم محتوى إبداعي يحكي قصة نجاحك ويجذب العملاء.",
    icon: <Palette className="w-8 h-8" />,
  },
  {
    title: "الحملات الإعلانية",
    description: "نستهدف الجمهور المناسب بدقة لنضمن لك أعلى عائد على الاستثمار.",
    icon: <Target className="w-8 h-8" />,
  },
  {
    title: "الاستشارات التسويقية",
    description: "نضع لك خططاً استراتيجية مبنية على أرقام وحقائق لضمان نمو أعمالك.",
    icon: <Megaphone className="w-8 h-8" />,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-bg-200">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-text-100 mb-4">
            خدماتنا الإبداعية
          </h2>
          <p className="text-text-200 max-w-2xl mx-auto">
            نقدم حلولاً تسويقية متكاملة مصممة خصيصاً لتناسب احتياجات عملك وتطلعاتك.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-bg-100 p-8 rounded-3xl shadow-soft hover:shadow-xl transition-all border border-primary-300/20 group hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-primary-300/30 rounded-2xl flex items-center justify-center text-primary-100 mb-6 group-hover:bg-primary-100 group-hover:text-white transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-text-100 mb-3">
                {service.title}
              </h3>
              <p className="text-text-200 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}