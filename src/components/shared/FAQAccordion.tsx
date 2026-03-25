"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="border border-gray-200 rounded-xl overflow-hidden hover:border-gold-500/30 transition-colors"
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
          >
            <span className="font-semibold text-navy-950 text-sm sm:text-base pr-4">
              {item.q}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-gold-500 shrink-0 transition-transform duration-200 ${
                openIndex === i ? "rotate-180" : ""
              }`}
            />
          </button>
          {openIndex === i && (
            <div className="px-6 pb-4 text-sm text-gray-600 leading-relaxed bg-gray-50">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
