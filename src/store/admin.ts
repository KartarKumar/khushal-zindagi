"use client";
import { create } from "zustand";

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  bundleId: string;
  bundleName: string;
  quantity: number;
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: "cod" | "jazzcash" | "easypaisa";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  shippingStatus: "processing" | "shipped" | "delivered" | "returned" | "cancelled";
  courier: string;
  trackingNumber: string;
  source: "website" | "whatsapp" | "facebook";
  notes: string;
  createdAt: string;
}

export interface Review {
  id: string;
  orderId: string;
  name: string;
  city: string;
  rating: number;
  text: string;
  isApproved: boolean;
  createdAt: string;
}

export interface DiscountCode {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minOrder: number;
  maxUses: number;
  currentUses: number;
  isActive: boolean;
  expiresAt: string;
}

interface AdminState {
  isAuthenticated: boolean;
  orders: Order[];
  reviews: Review[];
  discountCodes: DiscountCode[];
  login: (password: string) => boolean;
  logout: () => void;
  updateOrderStatus: (id: string, field: "paymentStatus" | "shippingStatus", value: string) => void;
  addOrderNote: (id: string, note: string) => void;
  approveReview: (id: string) => void;
  deleteReview: (id: string) => void;
  addDiscountCode: (code: DiscountCode) => void;
  toggleDiscount: (id: string) => void;
}

// Demo data
const demoOrders: Order[] = [
  {
    id: "1", orderNumber: "KZ-20260325-001", customerName: "Ahmed Khan", phone: "0312-3456789",
    email: "ahmed@gmail.com", city: "Lahore", address: "House 45, Block C, Johar Town",
    bundleId: "popular", bundleName: "Couple's Choice (2 Bottles)", quantity: 1,
    subtotal: 4500, shipping: 200, total: 4700, paymentMethod: "cod",
    paymentStatus: "pending", shippingStatus: "processing", courier: "TCS",
    trackingNumber: "", source: "website", notes: "", createdAt: "2026-03-25T10:30:00",
  },
  {
    id: "2", orderNumber: "KZ-20260325-002", customerName: "Bilal Mahmood", phone: "0321-7654321",
    email: "", city: "Karachi", address: "Flat 12, Askari Apartments, Clifton",
    bundleId: "premium", bundleName: "Premium Supply (3 Bottles)", quantity: 1,
    subtotal: 6000, shipping: 0, total: 6000, paymentMethod: "jazzcash",
    paymentStatus: "paid", shippingStatus: "shipped", courier: "Leopards",
    trackingNumber: "LP-78901234", source: "whatsapp", notes: "Urgent delivery requested",
    createdAt: "2026-03-25T08:15:00",
  },
  {
    id: "3", orderNumber: "KZ-20260324-003", customerName: "Usman Ali", phone: "0333-1112233",
    email: "usman.a@yahoo.com", city: "Islamabad", address: "Street 5, F-8/2",
    bundleId: "starter", bundleName: "Starter Pack (1 Bottle)", quantity: 1,
    subtotal: 2500, shipping: 200, total: 2700, paymentMethod: "cod",
    paymentStatus: "paid", shippingStatus: "delivered", courier: "TCS",
    trackingNumber: "TCS-45678901", source: "facebook", notes: "",
    createdAt: "2026-03-24T14:20:00",
  },
  {
    id: "4", orderNumber: "KZ-20260324-004", customerName: "Farhan Siddiqui", phone: "0345-9876543",
    email: "", city: "Faisalabad", address: "House 78, Peoples Colony #2",
    bundleId: "popular", bundleName: "Couple's Choice (2 Bottles)", quantity: 1,
    subtotal: 4500, shipping: 200, total: 4700, paymentMethod: "easypaisa",
    paymentStatus: "paid", shippingStatus: "shipped", courier: "PostEx",
    trackingNumber: "PX-33445566", source: "website", notes: "",
    createdAt: "2026-03-24T09:45:00",
  },
  {
    id: "5", orderNumber: "KZ-20260323-005", customerName: "Hamza Rauf", phone: "0300-5551234",
    email: "hamza.r@hotmail.com", city: "Rawalpindi", address: "Plaza 3, Saddar",
    bundleId: "premium", bundleName: "Premium Supply (3 Bottles)", quantity: 1,
    subtotal: 6000, shipping: 0, total: 6000, paymentMethod: "cod",
    paymentStatus: "paid", shippingStatus: "delivered", courier: "TCS",
    trackingNumber: "TCS-11223344", source: "website", notes: "Repeat customer",
    createdAt: "2026-03-23T16:00:00",
  },
  {
    id: "6", orderNumber: "KZ-20260323-006", customerName: "Imran Malik", phone: "0311-2223344",
    email: "", city: "Multan", address: "Bosan Road, near Chenab Market",
    bundleId: "starter", bundleName: "Starter Pack (1 Bottle)", quantity: 1,
    subtotal: 2500, shipping: 200, total: 2700, paymentMethod: "cod",
    paymentStatus: "pending", shippingStatus: "processing", courier: "",
    trackingNumber: "", source: "whatsapp", notes: "Confirm phone before shipping",
    createdAt: "2026-03-23T11:30:00",
  },
  {
    id: "7", orderNumber: "KZ-20260322-007", customerName: "Kashif Nawaz", phone: "0346-6667788",
    email: "kashif@gmail.com", city: "Peshawar", address: "University Road, near Board Bazaar",
    bundleId: "popular", bundleName: "Couple's Choice (2 Bottles)", quantity: 1,
    subtotal: 4500, shipping: 200, total: 4700, paymentMethod: "cod",
    paymentStatus: "failed", shippingStatus: "returned", courier: "TCS",
    trackingNumber: "TCS-55667788", source: "facebook", notes: "Customer refused delivery",
    createdAt: "2026-03-22T13:15:00",
  },
  {
    id: "8", orderNumber: "KZ-20260322-008", customerName: "Saad Hussain", phone: "0334-8889900",
    email: "", city: "Sialkot", address: "Cantt Area, Main GT Road",
    bundleId: "popular", bundleName: "Couple's Choice (2 Bottles)", quantity: 1,
    subtotal: 4500, shipping: 200, total: 4700, paymentMethod: "jazzcash",
    paymentStatus: "paid", shippingStatus: "delivered", courier: "Leopards",
    trackingNumber: "LP-99001122", source: "website", notes: "",
    createdAt: "2026-03-22T09:00:00",
  },
];

const demoReviews: Review[] = [
  { id: "1", orderId: "3", name: "Usman A.", city: "Islamabad", rating: 5,
    text: "Amazing results within 10 days. My confidence has improved a lot. Highly recommended!",
    isApproved: true, createdAt: "2026-03-25T12:00:00" },
  { id: "2", orderId: "5", name: "Hamza R.", city: "Rawalpindi", rating: 5,
    text: "Ordered the 3-bottle pack. Best decision ever. Natural ingredients and no side effects.",
    isApproved: true, createdAt: "2026-03-25T10:00:00" },
  { id: "3", orderId: "8", name: "Saad H.", city: "Sialkot", rating: 4,
    text: "Good product. Took about 2 weeks to see results but worth the wait. Ordering again.",
    isApproved: false, createdAt: "2026-03-24T15:00:00" },
  { id: "4", orderId: "", name: "Zahid M.", city: "Lahore", rating: 5,
    text: "Meri biwi ne farq notice kiya. Bahut acha product hai. 100% recommend karta hoon.",
    isApproved: false, createdAt: "2026-03-24T08:00:00" },
];

const demoCodes: DiscountCode[] = [
  { id: "1", code: "FIRST15", type: "percentage", value: 15, minOrder: 2500,
    maxUses: 100, currentUses: 23, isActive: true, expiresAt: "2026-04-30" },
  { id: "2", code: "WELCOME500", type: "fixed", value: 500, minOrder: 4000,
    maxUses: 50, currentUses: 12, isActive: true, expiresAt: "2026-04-15" },
  { id: "3", code: "COUPLE10", type: "percentage", value: 10, minOrder: 4500,
    maxUses: 200, currentUses: 45, isActive: true, expiresAt: "2026-06-30" },
];

const ADMIN_PASSWORD = "khushalzindagi2026";

export const useAdminStore = create<AdminState>((set, get) => ({
  isAuthenticated: false,
  orders: demoOrders,
  reviews: demoReviews,
  discountCodes: demoCodes,

  login: (password) => {
    if (password === ADMIN_PASSWORD) {
      set({ isAuthenticated: true });
      return true;
    }
    return false;
  },

  logout: () => set({ isAuthenticated: false }),

  updateOrderStatus: (id, field, value) =>
    set((s) => ({
      orders: s.orders.map((o) => (o.id === id ? { ...o, [field]: value } : o)),
    })),

  addOrderNote: (id, note) =>
    set((s) => ({
      orders: s.orders.map((o) =>
        o.id === id ? { ...o, notes: o.notes ? `${o.notes}\n${note}` : note } : o
      ),
    })),

  approveReview: (id) =>
    set((s) => ({
      reviews: s.reviews.map((r) => (r.id === id ? { ...r, isApproved: true } : r)),
    })),

  deleteReview: (id) =>
    set((s) => ({ reviews: s.reviews.filter((r) => r.id !== id) })),

  addDiscountCode: (code) =>
    set((s) => ({ discountCodes: [...s.discountCodes, code] })),

  toggleDiscount: (id) =>
    set((s) => ({
      discountCodes: s.discountCodes.map((d) =>
        d.id === id ? { ...d, isActive: !d.isActive } : d
      ),
    })),
}));
