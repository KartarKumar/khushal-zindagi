import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 text-gold-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <ShieldCheck className="w-4 h-4" />
          Limited Time Offer
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
          Ready for a{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-300">
            Khushal Zindagi
          </span>
          ?
        </h2>

        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          Join 50,000+ satisfied customers who have transformed their confidence and intimacy.
          Order now and experience the difference.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            href="/product"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-400 text-white px-10 py-4 rounded-full text-lg font-bold hover:shadow-xl hover:shadow-gold-500/30 hover:scale-105 transition-all"
          >
            Order Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Trust Points */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
          {[
            "Cash on Delivery",
            "Discreet Packaging",
            "30-Day Guarantee",
            "All Pakistan Delivery",
          ].map((point) => (
            <div key={point} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
              {point}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
