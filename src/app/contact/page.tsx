"use client";

import { useState } from "react";
import { BRAND } from "@/lib/constants";
import { Phone, Mail, MapPin, MessageCircle, CheckCircle2, Send } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className="py-16 sm:py-20 bg-gradient-to-br from-navy-950 to-navy-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-300">
            We are here to help. Reach out through any of these channels.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-navy-950 mb-6">Get in Touch</h2>
              <div className="space-y-6">
                {[
                  { icon: Phone, label: "Phone", value: BRAND.phone, href: `tel:${BRAND.phone}` },
                  { icon: Mail, label: "Email", value: BRAND.email, href: `mailto:${BRAND.email}` },
                  { icon: MapPin, label: "Location", value: BRAND.address, href: null },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="bg-gold-500/10 p-3 rounded-xl shrink-0">
                      <c.icon className="w-6 h-6 text-gold-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-navy-950">{c.label}</p>
                      {c.href ? (
                        <a href={c.href} className="text-gray-600 hover:text-gold-500 transition-colors">
                          {c.value}
                        </a>
                      ) : (
                        <p className="text-gray-600">{c.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-green-50 rounded-2xl p-6 border border-green-200">
                <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" /> WhatsApp Support
                </h3>
                <p className="text-sm text-green-700 mb-4">
                  Get instant replies on WhatsApp. Available 9 AM - 11 PM daily.
                </p>
                <a
                  href="https://wa.me/923001234567?text=Hi%20I%20need%20help%20with%20Khushal%20Zindagi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-green-700 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Start Chat
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              {submitted ? (
                <div className="bg-green-50 rounded-2xl p-8 text-center border border-green-200">
                  <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-700">
                    Thank you for reaching out. We will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-200">
                  <h2 className="text-xl font-bold text-navy-950 mb-6">Send a Message</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone / Email</label>
                      <input
                        type="text"
                        required
                        placeholder="03XX-XXXXXXX or email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea
                        required
                        rows={5}
                        placeholder="How can we help you?"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-400 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-gold-500/20 transition-all"
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
