"use client";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function About() {
  const highlights = [
    "حلول تسويقية متكاملة ومبتكرة",
    "فريق متخصص في تحليل البيانات والنمو",
    "تركيز تام على تحقيق نتائج ملموسة",
    "دعم فني واستشاري متواصل",
  ];

  return (
    <section id="about" className="py-15 bg-bg-200 overflow-hidden">
      <div className="text-center mb-16">
        {/* العنوان الرئيسي بنفس نمط "خدماتنا الإبداعية" */}
        <h2 className="text-3xl md:text-5xl font-bold text-text-100 mb-4">شريكك في النجاح الرقمي</h2>
        {/* الوصف المختصر والمركز */}
        <p className="text-text-200 max-w-3xl mx-auto text-lg leading-relaxed">
          نحن وكالة تسويق إبداعية متخصصة في تحويل الأفكار إلى نتائج ملموسة. في "هيمنة"، نتولى عنك كافة المهام التسويقية
          بكل احترافية، لنمنحك المساحة الكاملة للتركيز على ما تبدع فيه: تطوير أعمالك وقيادة رؤيتك نحو المستقبل.
        </p>
      </div>
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* الجانب البصري - صورة أو عنصر تصميمي */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-bg-200">
              {/* يمكنك وضع صورة تعبيرية لفريق العمل أو مكتب الشركة هنا */}
              <div className="aspect-square bg-primary-300/20 flex items-center justify-center">
                <img src="2.png" alt="Team" className="w-full h-full object-cover" />
              </div>
            </div>
            {/* زخرفة خلفية ناعمة */}
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-accent-100/10 rounded-full blur-3xl -z-10"></div>
          </motion.div>

          {/* الجانب النصي */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-100 mb-6">
              نحن شريكك في <span className="text-primary-100">النمو الرقمي</span>
            </h2>

            <p className="text-lg text-text-200 mb-8 leading-relaxed">
              في "هيمنة"، نؤمن أن التسويق ليس مجرد إعلانات، بل هو فن صناعة التأثير وبناء علاقات مستدامة. نحن نتولى عنك
              كافة المهام التسويقية المعقدة، لنمنحك الوقت والمساحة للتركيز على ما تجيده حقاً: تطوير رؤيتك وتوسيع أعمالك.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-100 flex-shrink-0" />
                  <span className="text-text-100 font-medium">{item}</span>
                </div>
              ))}
            </div>

        
          </motion.div>
        </div>
      </div>
    </section>
  );
}
