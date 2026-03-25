"use client";
import { create } from "zustand";

export interface CartItem {
  bundleId: string;
  name: string;
  quantity: number;
  price: number;
  originalPrice: number;
}

interface CartState {
  item: CartItem | null;
  setItem: (item: CartItem) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  item: null,
  setItem: (item) => set({ item }),
  clearCart: () => set({ item: null }),
}));
