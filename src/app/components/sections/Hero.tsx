"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

      {/* Background glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-brand-primary/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-primary-200/20 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-primary-100" />
            <span className="text-xs md:text-sm font-medium text-brand-gray tracking-wide">
              شريكك الإبداعي للهيمنة على السوق
            </span>
          </div>

          {/* H1 SEO optimized */}
          <h1 className="max-w-4xl mx-auto text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1] tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary-100 to-primary-200">
              هيمنة
            </span>
            <br />
            للتسويق الرقمي في السعودية
          </h1>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-brand-gray text-lg md:text-xl mb-12 leading-relaxed">
            هيمنة وكالة تسويق رقمي متخصصة في إدارة السوشيال ميديا وصناعة المحتوى
            والحملات الإعلانية لمساعدة الشركات على النمو وتحقيق حضور قوي في السوق السعودي.
          </p>

          {/* CTA */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-5">

            <Link
              href="https://wa.me/966570591088?text=مرحباً، أود الاستفسار عن خدمات التسويق لديكم"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 text-white bg-primary-200 hover:bg-bg-200 rounded-2xl font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(0,119,194,0.3)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                ابدأ رحلة النجاح
                <FaWhatsapp className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              </span>

              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Link>

          </div>

        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-bg-200 to-transparent" />
    </section>
  );
}
