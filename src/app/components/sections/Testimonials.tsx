"use client";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "عبدالله الشمري",
    role: "مدير شركة عقارات",
    content: "تجربتي مع هيمنة كانت استثنائية. استطاعوا فهم رؤيتنا وتحويلها إلى حملات إعلانية فاقت توقعاتنا من حيث الوصول والنتائج.",
  },
  {
    name: "سارة الأحمد",
    role: "مؤسسة براند عطور",
    content: "أكثر ما يميز فريق هيمنة هو الاحترافية والالتزام بالمواعيد. صناعة المحتوى لديهم لمسة إبداعية فريدة ميزت علامتنا التجارية.",
  },
  {
    name: "فهد بن سلطان",
    role: "رائد أعمال تقني",
    content: "شراكتنا مع هيمنة خففت عنا الكثير من الضغوط التسويقية، مما أتاح لنا التركيز كلياً على تطوير منتجنا التقني.",
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-bg-200">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-text-100 mb-4">
            قالوا عن هيمنة
          </h2>
          <p className="text-text-200 max-w-2xl mx-auto">
            نفخر بثقة شركائنا ونجاحنا الحقيقي يكمن في الأثر الإيجابي الذي نتركه في أعمالهم.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-bg-100 p-8 rounded-3xl shadow-soft border border-primary-300/10 relative"
            >
              {/* أيقونة اقتباس جمالية */}
              <Quote className="w-10 h-10 text-primary-300/30 absolute top-6 right-6" />
              
              <p className="text-text-200 leading-relaxed mb-8 relative z-10 italic">
                "{item.content}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-100/10 rounded-full flex items-center justify-center text-primary-100 font-bold">
                  {item.name[0]}
                </div>
                <div>
                  <h4 className="text-text-100 font-bold">{item.name}</h4>
                  <span className="text-sm text-text-200">{item.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}