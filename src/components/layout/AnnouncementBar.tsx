"use client";

export default function AnnouncementBar() {
  return (
    <div className="bg-navy-950 text-gold-300 py-2 overflow-hidden">
      <div className="animate-ticker flex whitespace-nowrap">
        {[...Array(2)].map((_, i) => (
          <span key={i} className="flex items-center gap-8 px-4 text-sm font-medium">
            <span>FREE Delivery on 3-Bottle Pack</span>
            <span className="text-gold-500">|</span>
            <span>100% Herbal & Natural</span>
            <span className="text-gold-500">|</span>
            <span>Discreet Packaging Guaranteed</span>
            <span className="text-gold-500">|</span>
            <span>30-Day Money Back Guarantee</span>
            <span className="text-gold-500">|</span>
            <span>Cash on Delivery Available</span>
            <span className="text-gold-500">|</span>
            <span>50,000+ Satisfied Customers</span>
            <span className="text-gold-500 mr-8">|</span>
          </span>
        ))}
      </div>
    </div>
  );
}
