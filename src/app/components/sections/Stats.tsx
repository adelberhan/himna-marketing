"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// مكون فرعي للعداد الرقمي
const Counter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2; // مدة الحركة بالثواني
      let timer = setInterval(() => {
        start += Math.ceil(end / 60);
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const stats = [
  { label: "عميل يثق بنا", value: 50, suffix: "+" },
  { label: "مشروع مكتمل", value: 120, suffix: "+" },
  { label: "حملة إعلانية ناجحة", value: 300, suffix: "+" }, // العنصر الثالث المقترح
];

export default function Stats() {
  return (
    <section className="py-20 bg-bg-200">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <h2 className="text-5xl md:text-6xl font-extrabold text-primary-100 mb-2">
                <Counter value={stat.value} suffix={stat.suffix} />
              </h2>
              <p className="text-text-200 text-lg font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
}