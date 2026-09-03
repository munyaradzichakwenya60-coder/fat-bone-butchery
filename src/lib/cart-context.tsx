import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number; // in USD
  priceFormatted: string;
  quantity: number;
  weight?: string;
  cutOption?: string;
  image: string;
  unit?: string;
}

export type DeliveryType = "delivery" | "pickup" | "diaspora";

export interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  deliveryType: DeliveryType;
  deliverySuburb: string;
  deliveryAddress: string;
  customerName: string;
  customerPhone: string;
  instructions: string;
  currency: "USD" | "ZIG";

  // Actions
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  setDeliveryType: (type: DeliveryType) => void;
  setDeliverySuburb: (suburb: string) => void;
  setDeliveryAddress: (address: string) => void;
  setCustomerName: (name: string) => void;
  setCustomerPhone: (phone: string) => void;
  setInstructions: (text: string) => void;
  toggleCurrency: () => void;

  // Computed
  totalCount: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  formatPrice: (amount: number) => string;
  getWhatsAppUrl: () => string;
}

export const BULAWAYO_AREAS = [
  "Bulawayo Central (CBD)",
  "Kumalo",
  "Suburbs",
  "Hillside",
  "Bradfield",
  "Burnside",
  "Matsheumhlope",
  "Ascot",
  "Malindela",
  "North End",
  "Sauerstown",
  "Morningside",
  "Montrose",
  "Famona",
  "Bellevue",
  "Tshabalala",
  "Nketa",
  "Nkulumane",
  "Luveve",
  "Cowdray Park",
  "Other Bulawayo Suburb",
];

const LOCAL_WHATSAPP = "263712851525";
const UK_WHATSAPP = "447762068799";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("fat_bone_cart_items");
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  const [isOpen, setIsOpen] = useState(false);
  const [deliveryType, setDeliveryType] = useState<DeliveryType>("delivery");
  const [deliverySuburb, setDeliverySuburb] = useState(BULAWAYO_AREAS[0]);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [instructions, setInstructions] = useState("");
  const [currency, setCurrency] = useState<"USD" | "ZIG">("USD");
  const zigRate = 27.5;

  useEffect(() => {
    try {
      localStorage.setItem("fat_bone_cart_items", JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  const addItem = (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    setItems((prev) => {
      const matchKey = `${item.id}-${item.cutOption || "standard"}`;
      const existing = prev.find((i) => `${i.id}-${i.cutOption || "standard"}` === matchKey);
      if (existing) {
        return prev.map((i) =>
          `${i.id}-${i.cutOption || "standard"}` === matchKey
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i,
        );
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems(
      (prev) =>
        prev
          .map((i) => {
            if (i.id === id) {
              const newQty = i.quantity + delta;
              return newQty > 0 ? { ...i, quantity: newQty } : null;
            }
            return i;
          })
          .filter(Boolean) as CartItem[],
    );
  };

  const clearCart = () => setItems([]);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);
  const toggleCurrency = () => setCurrency((c) => (c === "USD" ? "ZIG" : "USD"));

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const deliveryFee = deliveryType === "pickup" ? 0 : subtotal >= 50 ? 0 : 3.0;
  const total = subtotal + deliveryFee;

  const formatPrice = (amount: number) => {
    if (currency === "ZIG") {
      return `ZiG ${(amount * zigRate).toFixed(2)}`;
    }
    return `$${amount.toFixed(2)}`;
  };

  const getWhatsAppUrl = () => {
    const phone = deliveryType === "diaspora" ? UK_WHATSAPP : LOCAL_WHATSAPP;
    const lines: string[] = [];
    lines.push("🥩 *ORDER — THE FAT BONE BUTCHER* 🥩");
    lines.push("📍 129 Fort Street, Bulawayo\n");

    lines.push("📋 *ITEMS:*");
    items.forEach((item, index) => {
      const cut = item.cutOption ? ` (${item.cutOption})` : "";
      const itemTotal = (item.price * item.quantity).toFixed(2);
      lines.push(
        `${index + 1}. *${item.name}*${cut} — ${item.quantity}x @ $${item.price.toFixed(2)} = *$${itemTotal}*`,
      );
    });

    lines.push(`\n💰 *Subtotal:* $${subtotal.toFixed(2)}`);
    lines.push(
      `🚚 *Fulfillment:* ${deliveryType === "pickup" ? "Express Pickup (129 Fort St)" : `Delivery ($${deliveryFee.toFixed(2)})`}`,
    );
    lines.push(
      `⭐ *Total:* *$${total.toFixed(2)}* (approx. ZiG ${(total * zigRate).toFixed(2)})\n`,
    );

    lines.push("📦 *DELIVERY / CONTACT INFO:*");
    if (customerName) lines.push(`▸ Name: ${customerName}`);
    if (customerPhone) lines.push(`▸ Phone: ${customerPhone}`);
    if (deliveryType !== "pickup") {
      lines.push(`▸ Bulawayo Suburb: ${deliverySuburb}`);
      if (deliveryAddress) lines.push(`▸ Address: ${deliveryAddress}`);
    }
    if (instructions) lines.push(`▸ Cutting Notes: ${instructions}`);

    lines.push("\n_Please confirm order and payment details. Thank you!_");
    const text = encodeURIComponent(lines.join("\n"));
    return `https://wa.me/${phone}?text=${text}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        deliveryType,
        deliverySuburb,
        deliveryAddress,
        customerName,
        customerPhone,
        instructions,
        currency,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        toggleCart,
        setDeliveryType,
        setDeliverySuburb,
        setDeliveryAddress,
        setCustomerName,
        setCustomerPhone,
        setInstructions,
        toggleCurrency,
        totalCount,
        subtotal,
        deliveryFee,
        total,
        formatPrice,
        getWhatsAppUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
