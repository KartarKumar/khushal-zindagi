"use client";

import { useEffect, useRef, useState } from "react";
import { Users, Star, Truck, ThumbsUp } from "lucide-react";

const stats = [
  { icon: Users, value: 50000, suffix: "+", label: "Happy Customers" },
  { icon: Star, value: 4.9, suffix: "/5", label: "Average Rating", decimal: true },
  { icon: Truck, value: 120, suffix: "+", label: "Cities Served" },
  { icon: ThumbsUp, value: 98, suffix: "%", label: "Satisfaction Rate" },
];

function AnimatedNumber({ target, decimal, suffix }: { target: number; decimal?: boolean; suffix: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 2000;
          const start = performance.now();

          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(decimal ? +(eased * target).toFixed(1) : Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, decimal]);

  return (
    <div ref={ref} className="text-3xl sm:text-4xl font-extrabold text-white">
      {decimal ? value.toFixed(1) : value.toLocaleString()}
      {suffix}
    </div>
  );
}

export default function StatsCounter() {
  return (
    <section className="py-16 bg-gradient-to-r from-navy-950 to-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="group">
              <stat.icon className="w-8 h-8 text-gold-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <AnimatedNumber target={stat.value} decimal={stat.decimal} suffix={stat.suffix} />
              <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
