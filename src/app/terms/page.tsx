import { BRAND } from "@/lib/constants";

export default function TermsPage() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-navy-950 mb-8">Terms of Service</h1>
        <div className="prose prose-gray max-w-none space-y-6 text-gray-600 leading-relaxed">
          <p>
            By using the {BRAND.name} website and purchasing our products, you agree to these terms.
          </p>

          <h2 className="text-xl font-bold text-navy-950">Products</h2>
          <p>Khushal Zindagi Performance Oil is a topical herbal wellness product. Results may vary between individuals. This product is not intended to diagnose, treat, cure, or prevent any disease.</p>

          <h2 className="text-xl font-bold text-navy-950">Orders & Payments</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>We accept Cash on Delivery (COD), JazzCash, and Easypaisa</li>
            <li>All prices are listed in Pakistani Rupees (PKR)</li>
            <li>Orders are typically delivered within 3-5 business days</li>
            <li>Free shipping is available on the 3-bottle Premium Pack</li>
          </ul>

          <h2 className="text-xl font-bold text-navy-950">Refund Policy</h2>
          <p>We offer a 30-day money-back guarantee. If you are not satisfied with the product, contact us within 30 days of delivery for a full refund. The product must be returned in its original packaging.</p>

          <h2 className="text-xl font-bold text-navy-950">Shipping</h2>
          <p>We deliver across Pakistan via TCS, Leopards, and PostEx. Delivery times are estimated and may vary by location. All packages are shipped in discreet, plain packaging.</p>

          <h2 className="text-xl font-bold text-navy-950">Contact</h2>
          <p>For any questions about these terms, contact us at {BRAND.email} or {BRAND.phone}.</p>

          <p className="text-sm text-gray-400">Last updated: March 2026</p>
        </div>
      </div>
    </section>
  );
}
