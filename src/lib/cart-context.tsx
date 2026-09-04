import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

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

export interface OrderRecord {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryType: DeliveryType;
  deliverySuburb?: string | undefined;
  status: "Placed via WhatsApp" | "Completed" | "Processing";
}

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
  orderHistory: OrderRecord[];

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
  reorderPastOrder: (order: OrderRecord) => void;
  clearOrderHistory: () => void;

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
  const [deliveryType, setDeliveryType] = useState<DeliveryType>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("fat_bone_pref_delivery_type");
      if (saved === "pickup" || saved === "diaspora" || saved === "delivery") return saved;
    }
    return "delivery";
  });

  const [deliverySuburb, setDeliverySuburb] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("fat_bone_pref_suburb");
      if (saved) return saved;
    }
    return BULAWAYO_AREAS[0] || "Bulawayo Central (CBD)";
  });

  const [deliveryAddress, setDeliveryAddress] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("fat_bone_pref_address") || "";
    }
    return "";
  });

  const [customerName, setCustomerName] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("fat_bone_pref_name") || "";
    }
    return "";
  });

  const [customerPhone, setCustomerPhone] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("fat_bone_pref_phone") || "";
    }
    return "";
  });

  const [instructions, setInstructions] = useState("");
  const [currency, setCurrency] = useState<"USD" | "ZIG">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("fat_bone_currency");
      if (saved === "USD" || saved === "ZIG") return saved;
    }
    return "USD";
  });

  const [orderHistory, setOrderHistory] = useState<OrderRecord[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("fat_bone_orders");
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  const zigRate = 27.5;

  // Persist items
  useEffect(() => {
    try {
      localStorage.setItem("fat_bone_cart_items", JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  // Persist customer profile details for seamless app experience
  useEffect(() => {
    try {
      localStorage.setItem("fat_bone_pref_delivery_type", deliveryType);
      localStorage.setItem("fat_bone_pref_suburb", deliverySuburb);
      localStorage.setItem("fat_bone_pref_address", deliveryAddress);
      localStorage.setItem("fat_bone_pref_name", customerName);
      localStorage.setItem("fat_bone_pref_phone", customerPhone);
      localStorage.setItem("fat_bone_currency", currency);
    } catch (e) {
      console.error(e);
    }
  }, [deliveryType, deliverySuburb, deliveryAddress, customerName, customerPhone, currency]);

  // Persist order history
  useEffect(() => {
    try {
      localStorage.setItem("fat_bone_orders", JSON.stringify(orderHistory));
    } catch (e) {
      console.error(e);
    }
  }, [orderHistory]);

  const addItem = (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    const qtyToAdd = item.quantity || 1;
    setItems((prev) => {
      const matchKey = `${item.id}-${item.cutOption || "standard"}`;
      const existing = prev.find((i) => `${i.id}-${i.cutOption || "standard"}` === matchKey);
      if (existing) {
        return prev.map((i) =>
          `${i.id}-${i.cutOption || "standard"}` === matchKey
            ? { ...i, quantity: i.quantity + qtyToAdd }
            : i,
        );
      }
      return [...prev, { ...item, quantity: qtyToAdd }];
    });
    setIsOpen(true);
    toast.success(`Added ${qtyToAdd}x ${item.name} to hamper`, {
      description: item.cutOption ? `Option: ${item.cutOption}` : undefined,
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target) {
        toast.info(`Removed ${target.name} from hamper`);
      }
      return prev.filter((i) => i.id !== id);
    });
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
  const toggleCurrency = () => {
    setCurrency((c) => {
      const next = c === "USD" ? "ZIG" : "USD";
      toast.info(`Currency switched to ${next}`);
      return next;
    });
  };

  const reorderPastOrder = (order: OrderRecord) => {
    setItems(order.items);
    if (order.deliveryType) setDeliveryType(order.deliveryType);
    if (order.deliverySuburb) setDeliverySuburb(order.deliverySuburb);
    setIsOpen(true);
    toast.success("Previous meat hamper restored to your cart!");
  };

  const clearOrderHistory = () => {
    setOrderHistory([]);
    try {
      localStorage.removeItem("fat_bone_orders");
    } catch (e) {
      console.error(e);
    }
    toast.info("Order history cleared");
  };

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

    // Automatically record this order in local app history
    const orderRecord: OrderRecord = {
      id: `FB-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      items: [...items],
      subtotal,
      deliveryFee,
      total,
      deliveryType,
      deliverySuburb: deliveryType !== "pickup" ? deliverySuburb : undefined,
      status: "Placed via WhatsApp",
    };

    setOrderHistory((prev) => [orderRecord, ...prev.slice(0, 19)]); // Keep last 20 orders

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
        orderHistory,
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
        reorderPastOrder,
        clearOrderHistory,
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
