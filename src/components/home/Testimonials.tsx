"use client";

import { useState } from "react";
import { TESTIMONIALS } from "@/lib/constants";
import { Star, ChevronLeft, ChevronRight, BadgeCheck } from "lucide-react";

export default function Testimonials() {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(TESTIMONIALS.length / perPage);
  const visible = TESTIMONIALS.slice(page * perPage, page * perPage + perPage);

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-gold-500 text-sm font-semibold uppercase tracking-wider mb-2">
            Real Results
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Thousands of satisfied customers across Pakistan. Here are some of their stories.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {visible.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold-500/20 hover:shadow-lg transition-all"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-gold-400 text-gold-400" />
                ))}
                {Array.from({ length: 5 - t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-gray-200" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">
                &ldquo;{t.textEn}&rdquo;
              </p>
              <p className="text-xs text-gold-500 mb-4" dir="rtl">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-navy-950 to-navy-700 flex items-center justify-center">
                    <span className="text-gold-400 font-bold text-sm">
                      {t.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-navy-950 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.city}</p>
                  </div>
                </div>
                {t.verified && (
                  <div className="flex items-center gap-1 text-green-600">
                    <BadgeCheck className="w-4 h-4" />
                    <span className="text-xs font-medium">Verified</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="p-2 rounded-full border border-gray-200 hover:border-gold-500 disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === page ? "bg-gold-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="p-2 rounded-full border border-gray-200 hover:border-gold-500 disabled:opacity-30 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
