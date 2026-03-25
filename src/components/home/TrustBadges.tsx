import { Shield, Leaf, Eye, Undo2 } from "lucide-react";

const badges = [
  {
    icon: Leaf,
    title: "100% Natural",
    desc: "Pure herbal ingredients, no chemicals",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Shield,
    title: "Lab Tested",
    desc: "Quality verified & certified safe",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Eye,
    title: "Discreet Shipping",
    desc: "Plain packaging, your privacy matters",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: Undo2,
    title: "Money Back",
    desc: "30-day full refund guarantee",
    color: "text-gold-500",
    bg: "bg-amber-50",
  },
];

export default function TrustBadges() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge) => (
            <div
              key={badge.title}
              className="flex flex-col items-center text-center p-6 rounded-2xl border border-gray-100 hover:border-gold-500/30 hover:shadow-lg hover:shadow-gold-500/5 transition-all group"
            >
              <div className={`${badge.bg} p-4 rounded-xl mb-4 group-hover:scale-110 transition-transform`}>
                <badge.icon className={`w-7 h-7 ${badge.color}`} />
              </div>
              <h3 className="font-bold text-navy-950 mb-1">{badge.title}</h3>
              <p className="text-xs text-gray-500">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
