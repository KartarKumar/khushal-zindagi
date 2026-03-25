import { FAQ_ITEMS } from "@/lib/constants";
import FAQAccordion from "@/components/shared/FAQAccordion";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function FAQPage() {
  return (
    <>
      <section className="py-16 sm:py-20 bg-gradient-to-br from-navy-950 to-navy-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-300">
            Find answers to common questions about Khushal Zindagi Oil.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={FAQ_ITEMS} />

          <div className="mt-12 bg-gray-50 rounded-2xl p-8 text-center border border-gray-200">
            <h3 className="text-xl font-bold text-navy-950 mb-2">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-4">
              Our team is here to help. Reach out via WhatsApp for instant support.
            </p>
            <a
              href="https://wa.me/923001234567?text=Hi%20I%20have%20a%20question%20about%20Khushal%20Zindagi%20Oil"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
