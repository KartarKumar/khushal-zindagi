"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import { PRODUCT, CITIES } from "@/lib/constants";
import {
  ShieldCheck, Truck, Lock, CheckCircle2, ArrowLeft,
  CreditCard, Banknote, Smartphone,
} from "lucide-react";

export default function CheckoutPage() {
  const item = useCartStore((s) => s.item);
  const [payment, setPayment] = useState("cod");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", city: "", address: "", email: "",
  });

  const bundle = item
    ? PRODUCT.bundles.find((b) => b.id === item.bundleId)
    : PRODUCT.bundles.find((b) => b.id === "popular");

  const shipping = bundle?.id === "premium" ? 0 : 200;
  const total = (bundle?.price || 0) + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="py-16 sm:py-24">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-navy-950 mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 mb-2">
            Thank you, <span className="font-semibold">{form.name}</span>! Your order has been confirmed.
          </p>
          <p className="text-gray-600 mb-6">
            You will receive an SMS and WhatsApp message at <span className="font-semibold">{form.phone}</span> with
            your order details and tracking information.
          </p>

          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-8 text-left">
            <h3 className="font-bold text-navy-950 mb-3">Order Summary</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Product:</span>
                <span className="font-medium text-navy-950">{bundle?.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Amount:</span>
                <span className="font-bold text-navy-950">Rs. {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment:</span>
                <span className="font-medium text-navy-950">
                  {payment === "cod" ? "Cash on Delivery" : payment === "jazzcash" ? "JazzCash" : "Easypaisa"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span className="font-medium text-navy-950">3-5 business days</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-navy-950 text-white px-6 py-3 rounded-xl font-semibold hover:bg-navy-800 transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/track"
              className="inline-flex items-center justify-center gap-2 border-2 border-navy-950 text-navy-950 px-6 py-3 rounded-xl font-semibold hover:bg-navy-950 hover:text-white transition-colors"
            >
              Track Your Order
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/product"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-navy-950 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Product
        </Link>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {["Cart", "Information", "Confirm"].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                i <= 1 ? "bg-gold-500 text-white" : "bg-gray-200 text-gray-500"
              }`}>
                {i + 1}
              </div>
              <span className={`text-sm font-medium ${i <= 1 ? "text-navy-950" : "text-gray-400"}`}>
                {step}
              </span>
              {i < 2 && <div className="w-8 h-0.5 bg-gray-200 mx-1" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Info */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h2 className="text-lg font-bold text-navy-950 mb-4">Contact Information</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Ahmed Khan"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="03XX-XXXXXXX"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-colors"
                    >
                      <option value="">Select City</option>
                      {CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-gray-400">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-colors"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    rows={3}
                    placeholder="Complete address with house/flat number, street, area..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h2 className="text-lg font-bold text-navy-950 mb-4">Payment Method</h2>
                <div className="space-y-3">
                  {[
                    { id: "cod", label: "Cash on Delivery", desc: "Pay when you receive", icon: Banknote, tag: "Most Popular" },
                    { id: "jazzcash", label: "JazzCash", desc: "Pay via JazzCash mobile wallet", icon: Smartphone, tag: null },
                    { id: "easypaisa", label: "Easypaisa", desc: "Pay via Easypaisa mobile wallet", icon: CreditCard, tag: null },
                  ].map((pm) => (
                    <button
                      type="button"
                      key={pm.id}
                      onClick={() => setPayment(pm.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                        payment === pm.id
                          ? "border-gold-500 bg-gold-500/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        payment === pm.id ? "border-gold-500" : "border-gray-300"
                      }`}>
                        {payment === pm.id && <div className="w-3 h-3 rounded-full bg-gold-500" />}
                      </div>
                      <pm.icon className="w-5 h-5 text-gray-600 shrink-0" />
                      <div className="flex-1">
                        <span className="font-semibold text-navy-950 text-sm">{pm.label}</span>
                        <p className="text-xs text-gray-500">{pm.desc}</p>
                      </div>
                      {pm.tag && (
                        <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {pm.tag}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-400 text-white py-4 rounded-xl text-lg font-bold hover:shadow-xl hover:shadow-gold-500/30 transition-all"
              >
                <Lock className="w-5 h-5" />
                Place Order - Rs. {total.toLocaleString()}
              </button>

              <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Secure Checkout
                </div>
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Privacy Protected
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 sticky top-24">
              <h3 className="font-bold text-navy-950 mb-4">Order Summary</h3>

              <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                <div className="w-16 h-16 rounded-xl overflow-hidden relative shrink-0">
                  <Image
                    src="/images/product/bottle.png"
                    alt="Khushal Zindagi Oil"
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div>
                  <p className="font-semibold text-navy-950 text-sm">{bundle?.name}</p>
                  <p className="text-xs text-gray-500">{bundle?.bottles}</p>
                </div>
              </div>

              <div className="py-4 space-y-2 text-sm border-b border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Rs. {bundle?.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-green-600 font-semibold" : ""}>
                    {shipping === 0 ? "FREE" : `Rs. ${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>You Save</span>
                  <span className="font-semibold">Rs. {bundle?.savings.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between py-4 text-lg font-extrabold text-navy-950">
                <span>Total</span>
                <span>Rs. {total.toLocaleString()}</span>
              </div>

              {/* Trust */}
              <div className="space-y-3 pt-4 border-t border-gray-100">
                {[
                  { icon: Truck, text: "Delivery in 3-5 business days" },
                  { icon: ShieldCheck, text: "Discreet, plain packaging" },
                  { icon: Lock, text: "30-day money back guarantee" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-xs text-gray-600">
                    <Icon className="w-4 h-4 text-gold-500 shrink-0" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
