"use client";

import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Truck, Clock, Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 text-gold-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4 fill-gold-400 text-gold-400" />
              Pakistan&apos;s #1 Men&apos;s Wellness Oil
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Rediscover Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-300">
                Confidence
              </span>{" "}
              & Vitality
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 mb-4 max-w-xl mx-auto lg:mx-0">
              100% Natural Herbal Formula for Enhanced Performance, Stamina & Intimacy.
              Trusted by 50,000+ Couples Across Pakistan.
            </p>

            {/* Urdu Tagline */}
            <p className="text-gold-400 text-lg font-medium mb-8" dir="rtl">
              مردانہ طاقت کا بھروسہ - خوشحال زندگی
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Link
                href="/product"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-400 text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-xl hover:shadow-gold-500/30 hover:scale-105 transition-all animate-pulse-gold"
              >
                Order Now - Starting Rs. 2,500
              </Link>
              <Link
                href="/product#ingredients"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/5 transition-all"
              >
                View Ingredients
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-navy-900 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-xs font-bold text-navy-900"
                  >
                    {["AK", "FS", "BM", "HR", "UA"][i - 1]}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                  ))}
                  <span className="text-white font-bold ml-1">4.9</span>
                </div>
                <p className="text-sm text-gray-400">From 2,300+ verified reviews</p>
              </div>
            </div>
          </div>

          {/* Right - Product Visual */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-gold-500/20 to-transparent rounded-3xl blur-2xl" />

              {/* Product Card */}
              <div className="relative bg-gradient-to-br from-navy-800 to-navy-700 rounded-3xl p-8 border border-gold-500/20">
                {/* Real Product Image */}
                <div className="w-64 h-80 sm:w-72 sm:h-96 mx-auto rounded-2xl overflow-hidden mb-6 relative">
                  <Image
                    src="/images/product/bottle.png"
                    alt="Khushal Zindagi Performance Oil - Premium 30ml Herbal Bottle"
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 640px) 256px, 288px"
                  />
                </div>

                {/* Price Tag */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-4 py-1 rounded-full mb-2">
                    <span className="text-red-400 text-sm font-semibold">SAVE Rs. 1,000</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-gray-500 line-through text-lg">Rs. 3,500</span>
                    <span className="text-white font-extrabold text-3xl">Rs. 2,500</span>
                  </div>
                </div>
              </div>

              {/* Floating Badges */}
              <div className="absolute -left-4 top-12 bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                100% Natural
              </div>
              <div className="absolute -right-4 top-32 bg-gold-500 text-navy-950 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                Best Seller
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Trust Bar */}
      <div className="bg-navy-900/50 border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: ShieldCheck, text: "100% Herbal" },
              { icon: Truck, text: "All Pakistan Delivery" },
              { icon: Clock, text: "30-Day Guarantee" },
              { icon: Star, text: "4.9/5 Rating" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center justify-center gap-2 text-sm text-gray-300">
                <Icon className="w-4 h-4 text-gold-400" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
