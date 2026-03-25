"use client";

import { MessageCircle } from "lucide-react";
import { BRAND } from "@/lib/constants";

export default function WhatsAppFloat() {
  const url = `https://wa.me/${BRAND.whatsapp.replace("+", "")}?text=Hi%20I%20am%20interested%20in%20Khushal%20Zindagi%20Oil`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden md:flex fixed bottom-6 right-6 z-50 items-center gap-2 bg-green-600 text-white pl-4 pr-5 py-3 rounded-full shadow-lg shadow-green-600/30 hover:bg-green-700 hover:scale-105 transition-all group"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="text-sm font-semibold">Chat on WhatsApp</span>
    </a>
  );
}
