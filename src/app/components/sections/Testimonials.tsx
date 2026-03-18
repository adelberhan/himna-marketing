"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Quote, UserCircle } from "lucide-react";
import { fetchTestimonials } from "@/services/supabase/testimonials";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        setLoading(true);
        const data = await fetchTestimonials();
        if (data) {
          setTestimonials(data);
        } else {
          setTestimonials([]);
        }
      } catch (err) {
        console.error("Error loading testimonials:", err);
        setError("تعذر تحميل آراء العملاء حالياً.");
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  if (loading) {
    return (
      <section id="testimonials" className="py-24 bg-bg-200">
        <div className="container mx-auto px-6 text-center text-text-200">
          جاري التحميل...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="testimonials" className="py-24 bg-bg-200">
        <div className="container mx-auto px-6 text-center text-red-500">
          {error}
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null; // أو عرض رسالة لا توجد آراء
  }

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
              key={item.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-bg-100 p-8 rounded-3xl shadow-soft border border-primary-300/10 relative flex flex-col"
            >
              {/* أيقونة اقتباس جمالية */}
              <Quote className="w-10 h-10 text-primary-300/30 absolute top-6 right-6" />
              
              <p className="text-text-200 leading-relaxed mb-8 relative z-10 italic flex-grow">
                "{item.content}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-12 h-12 rounded-full object-cover border border-primary-300/20"
                  />
                ) : (
                  <div className="w-12 h-12 bg-primary-100/10 rounded-full flex items-center justify-center text-primary-100 font-bold text-xl border border-primary-300/10">
                    {item.name ? item.name[0].toUpperCase() : <UserCircle className="w-6 h-6 text-gray-400" />}
                  </div>
                )}
                <div>
                  <h4 className="text-text-100 font-bold">{item.name}</h4>
                  {/* استخدام position بدلاً من role القادم من قاعدة البيانات */}
                  <span className="text-sm text-text-200">{item.position}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}