"use client";
import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";

export default function Contact() {
  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      label: "اتصل بنا",
      value: "+(20) 1014308323",
      href: "tel:+201014308323",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: "البريد الإلكتروني",
      value: "info@himna.com",
      href: "mailto:info@himna.com",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      label: "واتساب",
      value: "تواصل سريع",
      href: "https://wa.me/201014308323",
    },
  ];

  return (
    <section id="contact" className="py-24 bg-bg-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-100 mb-4">
            لنبدأ رحلة النجاح معاً
          </h2>
          <p className="text-text-200 max-w-2xl mx-auto">
            نحن هنا للإجابة على استفساراتك ومساعدتك في اختيار الاستراتيجية الأنسب لنمو أعمالك.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* معلومات التواصل */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 bg-bg-200 rounded-3xl border border-primary-300/10 hover:shadow-soft transition-all group"
                >
                  <div className="text-primary-100 mb-4 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h4 className="text-text-200 text-sm mb-1">{item.label}</h4>
                  <p className="text-text-100 font-bold">{item.value}</p>
                </a>
              ))}
              
              <div className="p-6 bg-bg-200 rounded-3xl border border-primary-300/10">
                <MapPin className="w-6 h-6 text-primary-100 mb-4" />
                <h4 className="text-text-200 text-sm mb-1">الموقع</h4>
                <p className="text-text-100 font-bold">مدينة 6 أكتوبر، الجيزة</p>
              </div>
            </div>

            {/* رسالة تشجيعية */}
            <div className="p-8 bg-primary-100 rounded-3xl text-white">
              <h3 className="text-xl font-bold mb-2">هل أنت مستعد للهيمنة؟</h3>
              <p className="opacity-90">احصل على استشارة مجانية لتحليل حضورك الرقمي الآن.</p>
            </div>
          </div>

          {/* الخريطة */}
          <div className="h-[400px] rounded-3xl overflow-hidden shadow-soft border border-primary-300/10 relative">
             <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55251.37709964824!2d30.913980!3d29.9611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1458564f26df199d%3A0x24a64fdd2ede5678!2zNmthIG9mIE9jdG9iZXIgQ2l0eSwgR2l6YSBHb3Zlcm5vcmF0ZQ!5e0!3m2!1sen!2seg!4v1710000000000!5m2!1sen!2seg"
              className="absolute inset-0 w-full h-full grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}