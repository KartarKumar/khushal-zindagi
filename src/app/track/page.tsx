"use client";

import { useState } from "react";
import { Search, Package, Truck, CheckCircle2, Clock } from "lucide-react";

export default function TrackPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderNumber.trim()) {
      setSearched(true);
    }
  };

  return (
    <>
      <section className="py-16 sm:py-20 bg-gradient-to-br from-navy-950 to-navy-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Track Your Order
          </h1>
          <p className="text-lg text-gray-300">
            Enter your order number to see delivery status.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSearch} className="flex gap-3 mb-8">
            <input
              type="text"
              value={orderNumber}
              onChange={(e) => { setOrderNumber(e.target.value); setSearched(false); }}
              placeholder="e.g. KZ-20260325-001"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-gold-500 to-gold-400 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-gold-500/20 transition-all flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Track
            </button>
          </form>

          {searched && (
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-gray-500">Order Number</p>
                  <p className="font-bold text-navy-950">{orderNumber}</p>
                </div>
                <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full">
                  In Transit
                </span>
              </div>

              {/* Timeline */}
              <div className="space-y-6">
                {[
                  { icon: CheckCircle2, label: "Order Placed", time: "Mar 24, 2026 - 2:30 PM", done: true },
                  { icon: Package, label: "Order Packed", time: "Mar 24, 2026 - 5:00 PM", done: true },
                  { icon: Truck, label: "Shipped via TCS", time: "Mar 25, 2026 - 10:00 AM", done: true },
                  { icon: Clock, label: "Out for Delivery", time: "Expected Mar 27", done: false },
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      step.done ? "bg-green-100" : "bg-gray-100"
                    }`}>
                      <step.icon className={`w-5 h-5 ${step.done ? "text-green-600" : "text-gray-400"}`} />
                    </div>
                    <div>
                      <p className={`font-semibold text-sm ${step.done ? "text-navy-950" : "text-gray-400"}`}>
                        {step.label}
                      </p>
                      <p className="text-xs text-gray-500">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!searched && (
            <div className="text-center text-gray-400 py-8">
              <Package className="w-16 h-16 mx-auto mb-4 text-gray-200" />
              <p className="text-sm">Enter your order number above to track delivery status.</p>
              <p className="text-xs mt-2">
                Check your SMS or WhatsApp for the order number.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
