"use client";

import { useState } from "react";
import { BRAND } from "@/lib/constants";
import { Save, CheckCircle2, Globe, Phone, Mail, MapPin, Lock, Bell, Truck } from "lucide-react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    storeName: BRAND.name,
    phone: BRAND.phone,
    email: BRAND.email,
    whatsapp: BRAND.whatsapp,
    address: BRAND.address,
    currency: "PKR",
    adminPassword: "",
    newPassword: "",
    smsEnabled: true,
    whatsappEnabled: true,
    emailEnabled: false,
    defaultCourier: "tcs",
    codEnabled: true,
    jazzcashEnabled: true,
    easypaisaEnabled: true,
    freeShippingThreshold: "6000",
    shippingRate: "200",
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl space-y-6">
      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 text-green-700">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-medium text-sm">Settings saved successfully!</span>
        </div>
      )}

      {/* Store Info */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="font-bold text-navy-950 mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-gold-500" /> Store Information
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
            <input
              type="text"
              value={settings.storeName}
              onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" /> Phone
            </label>
            <input
              type="text"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" /> Email
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
            <input
              type="text"
              value={settings.whatsapp}
              onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> Address
            </label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
            />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="font-bold text-navy-950 mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-gold-500" /> Notification Settings
        </h3>
        <div className="space-y-3">
          {[
            { key: "smsEnabled" as const, label: "SMS Notifications", desc: "Order confirmations and updates via SMS" },
            { key: "whatsappEnabled" as const, label: "WhatsApp Notifications", desc: "Automated WhatsApp messages for orders" },
            { key: "emailEnabled" as const, label: "Email Notifications", desc: "Send order emails to customers with email addresses" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
              <div>
                <p className="font-medium text-navy-950 text-sm">{item.label}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
              <button
                onClick={() => setSettings({ ...settings, [item.key]: !settings[item.key] })}
                className={`w-12 h-7 rounded-full relative transition-colors ${
                  settings[item.key] ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  settings[item.key] ? "translate-x-6" : "translate-x-1"
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping & Payments */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="font-bold text-navy-950 mb-4 flex items-center gap-2">
          <Truck className="w-5 h-5 text-gold-500" /> Shipping & Payments
        </h3>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Default Courier</label>
            <select
              value={settings.defaultCourier}
              onChange={(e) => setSettings({ ...settings, defaultCourier: e.target.value })}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
            >
              <option value="tcs">TCS</option>
              <option value="leopards">Leopards</option>
              <option value="postex">PostEx</option>
              <option value="trax">Trax</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Rate (Rs.)</label>
            <input
              type="number"
              value={settings.shippingRate}
              onChange={(e) => setSettings({ ...settings, shippingRate: e.target.value })}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Free Shipping Above (Rs.)</label>
            <input
              type="number"
              value={settings.freeShippingThreshold}
              onChange={(e) => setSettings({ ...settings, freeShippingThreshold: e.target.value })}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
            />
          </div>
        </div>
        <div className="space-y-3">
          {[
            { key: "codEnabled" as const, label: "Cash on Delivery" },
            { key: "jazzcashEnabled" as const, label: "JazzCash" },
            { key: "easypaisaEnabled" as const, label: "Easypaisa" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
              <span className="font-medium text-navy-950 text-sm">{item.label}</span>
              <button
                onClick={() => setSettings({ ...settings, [item.key]: !settings[item.key] })}
                className={`w-12 h-7 rounded-full relative transition-colors ${
                  settings[item.key] ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  settings[item.key] ? "translate-x-6" : "translate-x-1"
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="font-bold text-navy-950 mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5 text-gold-500" /> Security
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input
              type="password"
              value={settings.adminPassword}
              onChange={(e) => setSettings({ ...settings, adminPassword: e.target.value })}
              placeholder="Enter current password"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              value={settings.newPassword}
              onChange={(e) => setSettings({ ...settings, newPassword: e.target.value })}
              placeholder="Enter new password"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm"
            />
          </div>
        </div>
      </div>

      {/* Save */}
      <button
        onClick={handleSave}
        className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
      >
        <Save className="w-5 h-5" /> Save All Settings
      </button>
    </div>
  );
}
