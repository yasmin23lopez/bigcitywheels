"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface QuoteItem {
  part: string;
  desc: string;
  price: string;
  image: string | null;
  quantity: number;
  brand: string;
}

interface QuoteCartContextType {
  items: QuoteItem[];
  addItem: (item: Omit<QuoteItem, "quantity">, qty?: number) => void;
  removeItem: (part: string) => void;
  updateQuantity: (part: string, qty: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  totalItems: number;
}

const QuoteCartContext = createContext<QuoteCartContextType | null>(null);

export function useQuoteCart() {
  const ctx = useContext(QuoteCartContext);
  if (!ctx) throw new Error("useQuoteCart must be used within QuoteCartProvider");
  return ctx;
}

export function QuoteCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("quoteCart");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [isOpen, setIsOpen] = useState(false);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("quoteCart", JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<QuoteItem, "quantity">, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.part === item.part);
      if (existing) {
        return prev.map((i) =>
          i.part === item.part ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { ...item, quantity: qty }];
    });
    setIsOpen(true);
  };

  const removeItem = (part: string) => {
    setItems((prev) => prev.filter((i) => i.part !== part));
  };

  const updateQuantity = (part: string, qty: number) => {
    if (qty <= 0) {
      removeItem(part);
      return;
    }
    setItems((prev) => prev.map((i) => (i.part === part ? { ...i, quantity: qty } : i)));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <QuoteCartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, isOpen, setIsOpen, totalItems }}
    >
      {children}
    </QuoteCartContext.Provider>
  );
}
