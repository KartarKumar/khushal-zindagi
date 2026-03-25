import { BRAND } from "@/lib/constants";
import { Heart, Leaf, ShieldCheck, Users, Award, Target } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-navy-950 to-navy-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-300">
              {BRAND.name}
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Our mission is simple: help Pakistani men and couples live a healthier,
            more confident, and fulfilling life -- naturally.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-gold-500 text-sm font-semibold uppercase tracking-wider">Our Story</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 mt-2 mb-4">
                Born from a Need, Built with Trust
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Khushal Zindagi was founded with a clear vision: to provide Pakistani men with a
                  safe, natural, and effective wellness solution that they can trust.
                </p>
                <p>
                  In a market flooded with unregulated products making impossible claims,
                  we set out to create something different -- a premium herbal oil backed by
                  traditional Unani and Ayurvedic wisdom, formulated with transparency,
                  and delivered with absolute discretion.
                </p>
                <p>
                  Today, we are proud to serve over 50,000 satisfied customers across 120+ cities
                  in Pakistan, with a 98% satisfaction rate and growing.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
              <div className="grid grid-cols-2 gap-6 text-center">
                {[
                  { value: "50K+", label: "Customers" },
                  { value: "120+", label: "Cities" },
                  { value: "4.9/5", label: "Rating" },
                  { value: "98%", label: "Satisfaction" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-extrabold text-navy-950">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950">Our Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { icon: Leaf, title: "100% Natural", desc: "Only pure herbal ingredients, zero chemicals." },
              { icon: ShieldCheck, title: "Privacy First", desc: "Discreet packaging and confidential service." },
              { icon: Heart, title: "Customer Care", desc: "Dedicated support via WhatsApp and phone." },
              { icon: Users, title: "For Couples", desc: "Designed to enhance intimacy for both partners." },
              { icon: Award, title: "Quality Assured", desc: "Lab tested and quality verified." },
              { icon: Target, title: "Real Results", desc: "Backed by thousands of verified reviews." },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold-500/30 hover:shadow-lg transition-all">
                <v.icon className="w-8 h-8 text-gold-500 mb-4" />
                <h3 className="font-bold text-navy-950 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
