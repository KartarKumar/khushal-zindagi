"use client";

import Link from "next/link";
import { ShoppingCart, MessageCircle } from "lucide-react";
import { BRAND } from "@/lib/constants";

export default function MobileBottomBar() {
  const whatsappUrl = `https://wa.me/${BRAND.whatsapp.replace("+", "")}?text=Hi%20I%20am%20interested%20in%20Khushal%20Zindagi%20Oil`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-2 p-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
        <Link
          href="/product"
          className="flex-[2] flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-400 text-white py-3 rounded-xl text-sm font-bold animate-pulse-gold"
        >
          <ShoppingCart className="w-4 h-4" />
          Order Now - Rs. 2,500
        </Link>
      </div>
    </div>
  );
}
