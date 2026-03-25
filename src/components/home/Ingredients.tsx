import { INGREDIENTS } from "@/lib/constants";
import { Droplets, Flame, Zap, Leaf, HeartPulse, Sparkles } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  droplets: Droplets,
  flame: Flame,
  zap: Zap,
  leaf: Leaf,
  "heart-pulse": HeartPulse,
  sparkles: Sparkles,
};

export default function Ingredients() {
  return (
    <section id="ingredients" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-gold-500 text-sm font-semibold uppercase tracking-wider mb-2">
            Pure & Natural
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 mb-4">
            Powerful Herbal Ingredients
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Every drop of Khushal Zindagi oil is crafted from time-tested herbal ingredients
            used in Unani and Ayurvedic medicine for centuries.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {INGREDIENTS.map((ing) => {
            const Icon = iconMap[ing.icon] || Leaf;
            return (
              <div
                key={ing.name}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:border-gold-500/30 hover:shadow-lg transition-all group"
              >
                <div className="bg-gold-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gold-500/20 transition-colors">
                  <Icon className="w-6 h-6 text-gold-500" />
                </div>
                <h3 className="font-bold text-navy-950 mb-1">{ing.name}</h3>
                <p className="text-xs text-gold-500 font-medium mb-2" dir="rtl">
                  {ing.nameUr}
                </p>
                <p className="text-sm text-gray-600">{ing.benefit}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
