"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* 1. خلفية إبداعية مع تأثير التوهج (Ambient Background) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-brand-primary/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-primary-200/20 rounded-full blur-[120px] -z-10"></div>{" "}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* 2. شارة علوية (Badge) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 text-primary-100" />
          <span className="text-xs md:text-sm font-medium text-brand-gray tracking-wide">
            شريكك الإبداعي للهيمنة على السوق
          </span>
        </motion.div>

        {/* 3. العنوان الرئيسي (Main Heading) */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1] tracking-tighter"
        >
          نصنع{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary-100 to-primary-200">
            التأثير
          </span>
          <br /> ونحقق الهيمنة
        </motion.h1>

        {/* 4. الوصف (Sub-heading) */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-2xl mx-auto text-brand-gray text-lg md:text-xl mb-12 leading-relaxed"
        >
          في "هيمنة"، نخفف عنك ضغوط أعمالك ونتولى مهامك التسويقية بكل احترافية، لننقل علامتك التجارية إلى آفاق جديدة من
          النمو والإبداع.
        </motion.p>

        {/* 5. أزرار التحكم (CTA Buttons) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center gap-5"
        >
          {/* زر "ابدأ رحلة النجاح" - Primary Button */}
          <Link
            href="https://wa.me/966570591088"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 text-white hover:text-white  hover:bg-bg-200 bg-primary-200 rounded-2xl font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(0,119,194,0.3)]"
          >
            <span className="relative hover:text-white  z-10 flex items-center gap-2">
              ابدأ رحلة النجاح <FaWhatsapp className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </span>
            {/* تأثير اللمعان المتحرك */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </Link>

          {/* زر "شاهد أعمالنا" - Secondary Button */}
          {/* <Link
            href="/portfolio"
            className="px-8 py-4 hover:scale-105 bg-bg-200 hover:bg-primary-200 hover:text-white text-primary-100 border border-primary-100/10 rounded-2xl font-bold text-lg transition-all"
          >
            شاهد أعمالنا
          </Link> */}
        </motion.div>
      </div>

      {/* 6. تأثير إضاءة سفلية (Bottom Gradient) يتلاشى مع الخلفية البيضاء */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-bg-200 to-transparent"></div>
    </section>
  );
}
