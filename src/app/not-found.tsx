'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, Variants } from 'framer-motion';

export default function NotFound() {
  const router = useRouter();

  // تعريف الحركات (Variants) مع تحديد الأنواع بدقة لتجنب أخطاء TypeScript
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const floatingVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <div
      className="min-h-screen bg-bg-200 flex items-center justify-center px-4 py-8 rtl"
      dir="rtl"
    >
      <motion.div
        className="max-w-lg w-full text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* رمز 404 المتحرك */}
        <motion.div
          className="mb-8"
          variants={floatingVariants}
          initial="hidden"
          animate={['visible', 'float']}
        >
          <div className="relative inline-block">
            {/* دوائر زخرفية خلف النص */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full blur-3xl opacity-20" />
            <div className="relative">
              <div className="text-9xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
                404
              </div>
            </div>
          </div>
        </motion.div>

        {/* العنوان */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
          variants={itemVariants}
        >
          الصفحة غير موجودة
        </motion.h1>

        {/* الوصف */}
        <motion.p
          className="text-lg text-slate-600 dark:text-slate-400 mb-3"
          variants={itemVariants}
        >
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </motion.p>

        {/* تلميح */}
        <motion.p
          className="text-sm text-slate-500 dark:text-slate-500 mb-12"
          variants={itemVariants}
        >
          قد تكون قد حذفت أو ربما أخطأت في كتابة رابط URL.
        </motion.p>

        {/* الأزرار */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={itemVariants}
        >
          {/* زر الرئيسية */}
          <Link href="/">
            <motion.button
              className="px-8 py-3 rounded-lg bg-gradient-to-r hover:cursor-pointer from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              العودة إلى الرئيسية
            </motion.button>
          </Link>

          {/* زر العودة للخلف */}
          <motion.button
            onClick={() => router.back()}
            className="px-8 py-3 rounded-lg border-2 border-slate-300 hover:cursor-pointer dark:border-slate-600 text-slate-Nav dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 w-full sm:w-auto"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            العودة للخلف
          </motion.button>
        </motion.div>

        {/* رسالة الدعم */}
        <motion.div
          className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-700"
          variants={itemVariants}
        >
          <p className="text-xs text-slate-500 dark:text-slate-400">
            إذا استمرت المشكلة، يرجى التواصل مع الدعم الفني
          </p>
        </motion.div>
      </motion.div>

      {/* عناصر خلفية جمالية ثابتة */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
      </div>
    </div>
  );
}