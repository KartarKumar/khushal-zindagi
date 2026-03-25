import { BRAND } from "@/lib/constants";

export default function PrivacyPage() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-navy-950 mb-8">Privacy Policy</h1>
        <div className="prose prose-gray max-w-none space-y-6 text-gray-600 leading-relaxed">
          <p>
            At {BRAND.name}, your privacy is our top priority. This policy explains how we collect,
            use, and protect your personal information.
          </p>

          <h2 className="text-xl font-bold text-navy-950">Information We Collect</h2>
          <p>When you place an order, we collect your name, phone number, delivery address, and optionally your email. This information is used solely to process and deliver your order.</p>

          <h2 className="text-xl font-bold text-navy-950">How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>To process and deliver your orders</li>
            <li>To send order confirmations and tracking updates via SMS/WhatsApp</li>
            <li>To respond to your inquiries and provide customer support</li>
            <li>To improve our products and services</li>
          </ul>

          <h2 className="text-xl font-bold text-navy-950">Data Protection</h2>
          <p>We use industry-standard encryption to protect your data. We never sell, share, or disclose your personal information to third parties except as needed for order delivery (courier services).</p>

          <h2 className="text-xl font-bold text-navy-950">Discreet Packaging</h2>
          <p>All orders are shipped in plain, unmarked packaging. No product name or description is visible on the outside. Your privacy is guaranteed throughout the delivery process.</p>

          <h2 className="text-xl font-bold text-navy-950">Contact</h2>
          <p>If you have questions about our privacy practices, contact us at {BRAND.email} or call {BRAND.phone}.</p>

          <p className="text-sm text-gray-400">Last updated: March 2026</p>
        </div>
      </div>
    </section>
  );
}
