import { ShoppingCart, Truck, Heart } from "lucide-react";

const steps = [
  {
    icon: ShoppingCart,
    step: "01",
    title: "Place Your Order",
    desc: "Choose your pack and place order online or via WhatsApp. Cash on Delivery available.",
  },
  {
    icon: Truck,
    step: "02",
    title: "Discreet Delivery",
    desc: "Delivered in 3-5 days in plain, unmarked packaging to your doorstep.",
  },
  {
    icon: Heart,
    step: "03",
    title: "Enjoy the Results",
    desc: "Apply daily for 2 weeks and experience the difference in confidence and vitality.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-gold-500 text-sm font-semibold uppercase tracking-wider mb-2">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Getting started with Khushal Zindagi is easy. Just 3 simple steps
            to a better, more confident you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div
              key={s.step}
              className="relative bg-white rounded-2xl p-8 text-center border border-gray-100 hover:border-gold-500/30 hover:shadow-xl transition-all group"
            >
              {/* Step Number */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold-500 text-navy-950 font-extrabold text-sm w-8 h-8 rounded-full flex items-center justify-center">
                {s.step}
              </div>

              {/* Connector Line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 -right-4 w-8 border-t-2 border-dashed border-gold-500/30" />
              )}

              <div className="bg-gradient-to-br from-navy-950 to-navy-800 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <s.icon className="w-7 h-7 text-gold-400" />
              </div>

              <h3 className="text-xl font-bold text-navy-950 mb-3">{s.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
