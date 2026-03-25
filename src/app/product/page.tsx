"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PRODUCT, INGREDIENTS, TESTIMONIALS, FAQ_ITEMS } from "@/lib/constants";
import { useCartStore } from "@/store/cart";
import {
  Star, ShieldCheck, Truck, Clock, Eye, CheckCircle2, Users,
  Droplets, Flame, Zap, Leaf, HeartPulse, Sparkles, BadgeCheck,
} from "lucide-react";
import FAQAccordion from "@/components/shared/FAQAccordion";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  droplets: Droplets, flame: Flame, zap: Zap,
  leaf: Leaf, "heart-pulse": HeartPulse, sparkles: Sparkles,
};

const PRODUCT_IMAGES = [
  { src: "/images/product/bottle.png", alt: "Khushal Zindagi Bottle" },
  { src: "/images/product/box.png", alt: "Khushal Zindagi Box Packaging" },
  { src: "/images/product/hero-product.png", alt: "Khushal Zindagi with Ingredients" },
  { src: "/images/product/label-sticker.png", alt: "Khushal Zindagi Label Design" },
];

export default function ProductPage() {
  const [selectedBundle, setSelectedBundle] = useState("popular");
  const [selectedImage, setSelectedImage] = useState(PRODUCT_IMAGES[0].src);
  const [tab, setTab] = useState<"desc" | "ingredients" | "reviews">("desc");
  const setItem = useCartStore((s) => s.setItem);

  const bundle = PRODUCT.bundles.find((b) => b.id === selectedBundle)!;
  const discount = Math.round(((bundle.originalPrice - bundle.price) / bundle.originalPrice) * 100);

  const handleOrder = () => {
    setItem({
      bundleId: bundle.id,
      name: bundle.name,
      quantity: bundle.quantity,
      price: bundle.price,
      originalPrice: bundle.originalPrice,
    });
  };

  return (
    <>
      {/* Product Hero */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left - Product Image */}
            <div className="sticky top-24">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 sm:p-12 border border-gray-200">
                {/* Social Proof Bar */}
                <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
                  <Eye className="w-4 h-4 text-red-500" />
                  <span className="font-medium">
                    <span className="text-red-500 font-bold">47 people</span> are viewing this right now
                  </span>
                </div>

                {/* Product Visual */}
                <div className="w-full aspect-square max-w-sm mx-auto rounded-2xl overflow-hidden relative">
                  <Image
                    src={selectedImage}
                    alt="Khushal Zindagi Performance Oil"
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 640px) 100vw, 384px"
                  />

                  {/* Sale Badge */}
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10">
                    SAVE {discount}%
                  </div>
                </div>

                {/* Product Image Thumbnails */}
                <div className="flex justify-center gap-3 mt-6">
                  {PRODUCT_IMAGES.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(img.src)}
                      className={`w-16 h-16 rounded-lg border-2 overflow-hidden relative ${
                        selectedImage === img.src ? "border-gold-500" : "border-gray-200"
                      }`}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Product Info */}
            <div>
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                  100% Natural
                </span>
                <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                  Lab Tested
                </span>
                <span className="bg-gold-200/50 text-gold-500 text-xs font-semibold px-3 py-1 rounded-full">
                  Best Seller
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 mb-2">
                Khushal Zindagi Performance Oil
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-navy-950">4.9</span>
                <span className="text-sm text-gray-500">(2,300+ reviews)</span>
                <span className="text-sm text-green-600 font-medium">| In Stock</span>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Premium herbal performance oil crafted from Black Seed, Cinnamon, Clove,
                Ashwagandha & Saffron. Enhances stamina, confidence, and intimacy naturally.
                Trusted by 50,000+ men across Pakistan.
              </p>

              {/* Bundle Selector */}
              <div className="mb-6">
                <h3 className="font-bold text-navy-950 mb-3">Choose Your Pack:</h3>
                <div className="space-y-3">
                  {PRODUCT.bundles.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setSelectedBundle(b.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left ${
                        selectedBundle === b.id
                          ? "border-gold-500 bg-gold-500/5 shadow-lg shadow-gold-500/10"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedBundle === b.id ? "border-gold-500" : "border-gray-300"
                          }`}
                        >
                          {selectedBundle === b.id && (
                            <div className="w-3 h-3 rounded-full bg-gold-500" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-navy-950">{b.name}</span>
                            {b.popular && (
                              <span className="bg-gold-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                MOST POPULAR
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {b.bottles} | {b.delivery}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-extrabold text-navy-950">Rs. {b.price.toLocaleString()}</p>
                        <p className="text-xs text-gray-400 line-through">Rs. {b.originalPrice.toLocaleString()}</p>
                        <p className="text-xs text-green-600 font-semibold">Save Rs. {b.savings.toLocaleString()}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="space-y-3 mb-6">
                <Link
                  href="/checkout"
                  onClick={handleOrder}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-400 text-white py-4 rounded-xl text-lg font-bold hover:shadow-xl hover:shadow-gold-500/30 transition-all animate-pulse-gold"
                >
                  Order Now - Rs. {bundle.price.toLocaleString()}
                </Link>
                <p className="text-center text-xs text-gray-500">
                  Cash on Delivery available | Free shipping on 3-bottle pack
                </p>
              </div>

              {/* Trust Points */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: ShieldCheck, text: "100% Herbal & Safe" },
                  { icon: Truck, text: "All Pakistan Delivery" },
                  { icon: Clock, text: "30-Day Money Back" },
                  { icon: Eye, text: "Discreet Packaging" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-sm text-gray-600">
                    <Icon className="w-4 h-4 text-gold-500 shrink-0" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Tabs */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Headers */}
          <div className="flex gap-1 bg-white rounded-xl p-1 border border-gray-200 mb-8 max-w-md mx-auto">
            {([["desc", "Description"], ["ingredients", "Ingredients"], ["reviews", "Reviews"]] as const).map(
              ([key, label]) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    tab === key
                      ? "bg-navy-950 text-white"
                      : "text-gray-600 hover:text-navy-950"
                  }`}
                >
                  {label}
                </button>
              )
            )}
          </div>

          {/* Tab Content */}
          {tab === "desc" && (
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-navy-950 mb-4">
                  Why Khushal Zindagi?
                </h3>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Khushal Zindagi Performance Oil is Pakistan&apos;s premium herbal solution for
                    men who want to naturally enhance their confidence, stamina, and intimate performance.
                  </p>
                  <p>
                    Our proprietary blend combines centuries-old Unani and Ayurvedic ingredients
                    with modern formulation techniques to deliver real, noticeable results
                    within 7-14 days of regular use.
                  </p>

                  <h4 className="font-bold text-navy-950 pt-2">Key Benefits:</h4>
                  <ul className="space-y-2">
                    {[
                      "Enhanced blood circulation for better performance",
                      "Increased stamina and lasting power",
                      "Natural ingredients with no side effects",
                      "Improved confidence and intimate satisfaction",
                      "Easy to use - just massage for 5-10 minutes daily",
                      "Results within 7-14 days of consistent use",
                    ].map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <h4 className="font-bold text-navy-950 pt-2">How to Use:</h4>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Take a small amount of oil on your palm</li>
                    <li>Apply to the target area</li>
                    <li>Massage gently in circular motions for 5-10 minutes</li>
                    <li>Use once daily, preferably before bedtime</li>
                    <li>For best results, use consistently for 30 days</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {tab === "ingredients" && (
            <div className="max-w-3xl mx-auto">
              <div className="grid sm:grid-cols-2 gap-4">
                {INGREDIENTS.map((ing) => {
                  const Icon = iconMap[ing.icon] || Leaf;
                  return (
                    <div
                      key={ing.name}
                      className="bg-white rounded-xl p-5 border border-gray-200 flex items-start gap-4"
                    >
                      <div className="bg-gold-500/10 p-3 rounded-lg shrink-0">
                        <Icon className="w-6 h-6 text-gold-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-navy-950">{ing.name}</h4>
                        <p className="text-xs text-gold-500 mb-1" dir="rtl">{ing.nameUr}</p>
                        <p className="text-sm text-gray-600">{ing.benefit}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {tab === "reviews" && (
            <div className="max-w-3xl mx-auto space-y-4">
              {/* Rating Summary */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 flex flex-col sm:flex-row items-center gap-6 mb-6">
                <div className="text-center">
                  <p className="text-5xl font-extrabold text-navy-950">4.9</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-5 h-5 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">2,300+ reviews</p>
                </div>
                <div className="flex-1 w-full space-y-2">
                  {[
                    { stars: 5, pct: 87 },
                    { stars: 4, pct: 9 },
                    { stars: 3, pct: 3 },
                    { stars: 2, pct: 1 },
                    { stars: 1, pct: 0 },
                  ].map((r) => (
                    <div key={r.stars} className="flex items-center gap-2">
                      <span className="text-xs text-gray-600 w-4">{r.stars}</span>
                      <Star className="w-3 h-3 fill-gold-400 text-gold-400" />
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gold-500 rounded-full"
                          style={{ width: `${r.pct}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 w-8">{r.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews List */}
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="bg-white rounded-xl p-5 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-navy-950 flex items-center justify-center">
                        <span className="text-gold-400 font-bold text-sm">{t.name[0]}</span>
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
                  <div className="flex gap-1 mb-2">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700">&ldquo;{t.textEn}&rdquo;</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-navy-950 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <FAQAccordion items={FAQ_ITEMS} />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 bg-gradient-to-r from-navy-950 to-navy-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Still thinking? 50,000+ customers already trust us.
          </h2>
          <p className="text-gray-300 mb-6">
            Order today and experience the Khushal Zindagi difference.
          </p>
          <Link
            href="/checkout"
            onClick={handleOrder}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-400 text-white px-10 py-4 rounded-full text-lg font-bold hover:shadow-xl hover:shadow-gold-500/30 transition-all"
          >
            Order Now - Rs. {bundle.price.toLocaleString()}
          </Link>
        </div>
      </section>
    </>
  );
}
