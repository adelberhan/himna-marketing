"use client";
import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa"; // FontAwesome version

export default function Contact() {
  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      label: "اتصل بنا",
      value: "0570591088",
      href: "tel:+966570591088",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: "البريد الإلكتروني",
      value: "RH-2025@outlook.sa",
      href: "mailto:RH-2025@outlook.sa",
    },
    {
      icon: <FaWhatsapp className="w-6 h-6" />, // You can even make it green!
      label: "واتساب",
      value: "تواصل سريع",
      href: "https://wa.me/966570591088",
    },
  ];

  return (
    <section id="contact" className="py-24 bg-bg-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-text-100 mb-4">لنبدأ رحلة النجاح معاً</h2>
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
                  <div className="text-primary-100 mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h4 className="text-text-200 text-sm mb-1">{item.label}</h4>
                  <p className="text-text-100 font-bold">{item.value}</p>
                </a>
              ))}

              <div className="p-6 bg-bg-200 rounded-3xl border border-primary-300/10">
                <MapPin className="w-6 h-6 text-primary-100 mb-4" />
                <h4 className="text-text-200 text-sm mb-1">الموقع</h4>
                <p className="text-text-100 font-bold">
                  شارع جبور بن رشيد حي المربع, الرياض 12628, المملكة العربية السعودية
                </p>
              </div>
            </div>

            {/* رسالة تشجيعية */}
            <div className="p-8 bg-bg-200 rounded-3xl text-white">
              <h3 className="text-xl font-bold mb-2">هل أنت مستعد للهيمنة؟</h3>
              <p className="opacity-90">احصل على استشارة مجانية لتحليل حضورك الرقمي الآن.</p>
            </div>
          </div>

          {/* الخريطة */}
          <div className="h-[400px] rounded-3xl overflow-hidden shadow-soft border border-primary-300/10 relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58016.99146267533!2d46.66847753938204!3d24.65599530842636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f059cd9332245%3A0xccbaa623d3351e8a!2z2YfZitmF2YbYqSDZhNmE2K7Yr9mF2KfYqiDYp9mE2KrYs9mI2YrZgtmK2Kk!5e0!3m2!1sen!2seg!4v1773204732028!5m2!1sen!2seg"
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
