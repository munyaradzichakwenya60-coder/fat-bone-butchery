import { useState, useEffect } from "react";
import { CartItem, DeliveryType } from "./cart-context";

export interface AdminOrder {
  id: string;
  date: string;
  customerName: string;
  customerPhone: string;
  deliveryType: DeliveryType;
  deliverySuburb?: string | undefined;
  deliveryAddress?: string | undefined;
  instructions?: string | undefined;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  currency: "USD" | "ZIG";
  status: "Pending Review" | "Cutting & Packing" | "Ready / Out for Delivery" | "Completed" | "Cancelled";
  paymentStatus: "Unpaid (COD)" | "EcoCash" | "USD Cash" | "InnBucks" | "UK Bank / Diaspora" | "Paid";
  createdAt: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  price: number;
  weight: string;
  inStock: boolean;
  stockLevel: "High" | "Medium" | "Low" | "Out of Stock";
  dailyYieldKg?: number;
}

export interface AdminSettings {
  managerPin: string;
  localWhatsApp: string;
  ukWhatsApp: string;
  zigRate: number;
  freeDeliveryThreshold: number;
  standardDeliveryFee: number;
  storeAddress: string;
  storeHours: string;
}

const DEFAULT_SETTINGS: AdminSettings = {
  managerPin: "1290",
  localWhatsApp: "263712851525",
  ukWhatsApp: "447762068799",
  zigRate: 27.5,
  freeDeliveryThreshold: 50.0,
  standardDeliveryFee: 3.0,
  storeAddress: "129 Fort Street (btwn 13th & 14th Ave), Bulawayo",
  storeHours: "Mon - Sat: 07:30 - 18:00 | Sun: 08:00 - 13:00",
};

const SEED_ORDERS: AdminOrder[] = [
  {
    id: "FB-894210",
    date: "Today, 11:45 AM",
    customerName: "Sipho Moyo",
    customerPhone: "+263 77 234 5678",
    deliveryType: "delivery",
    deliverySuburb: "Kumalo",
    deliveryAddress: "14 Gwanda Road, Kumalo, Bulawayo",
    instructions: "Please cut T-Bones thick for open flame braai. Extra boerewors seasoning if possible.",
    items: [
      {
        id: "t-bone",
        name: "Prime Aged T-Bone Steak",
        price: 26.0,
        priceFormatted: "$26.00",
        quantity: 2,
        weight: "~500g (1.1 lbs)",
        cutOption: "Thick Braai Cut (1.5 inch)",
        image: "/assets/products/t-bone.webp",
      },
      {
        id: "boerewors",
        name: "Traditional Farm Boerewors (1kg)",
        price: 13.5,
        priceFormatted: "$13.50",
        quantity: 2,
        weight: "1kg pack",
        cutOption: "Traditional Spice Coil",
        image: "/assets/products/boerewors.webp",
      },
      {
        id: "pork-ribs",
        name: "Prime Pork Spare Ribs",
        price: 21.0,
        priceFormatted: "$21.00",
        quantity: 1,
        weight: "~1kg (2.2 lbs)",
        cutOption: "Whole St. Louis Rack",
        image: "/assets/products/pork-ribs.webp",
      },
    ],
    subtotal: 100.0,
    deliveryFee: 0.0,
    total: 100.0,
    currency: "USD",
    status: "Cutting & Packing",
    paymentStatus: "USD Cash",
    createdAt: Date.now() - 1000 * 60 * 75,
  },
  {
    id: "FB-893902",
    date: "Today, 09:20 AM",
    customerName: "Mrs. Brenda Ndlovu",
    customerPhone: "+263 71 890 1234",
    deliveryType: "pickup",
    deliverySuburb: "Bulawayo Central (CBD)",
    deliveryAddress: "Counter Pickup (129 Fort St)",
    instructions: "Pack into 500g vacuum bags for home freezing.",
    items: [
      {
        id: "fillet-mignon",
        name: "Tenderloin Beef Fillet",
        price: 36.0,
        priceFormatted: "$36.00",
        quantity: 1,
        weight: "6oz / ~200g (Center-Cut)",
        cutOption: "Center-Cut Medallions",
        image: "/assets/products/fillet.webp",
      },
      {
        id: "beef-mince",
        name: "Lean Prime Beef Mince",
        price: 12.0,
        priceFormatted: "$12.00",
        quantity: 3,
        weight: "1kg pack",
        cutOption: "Fine Ground",
        image: "/assets/products/beef-mince.webp",
      },
    ],
    subtotal: 72.0,
    deliveryFee: 0.0,
    total: 72.0,
    currency: "USD",
    status: "Ready / Out for Delivery",
    paymentStatus: "EcoCash",
    createdAt: Date.now() - 1000 * 60 * 220,
  },
  {
    id: "FB-891154",
    date: "Today, 08:05 AM",
    customerName: "Tawanda Ncube (UK Diaspora)",
    customerPhone: "+44 7700 900123",
    deliveryType: "diaspora",
    deliverySuburb: "Burnside",
    deliveryAddress: "Delivering to parents: 28 Burnside Drive, Bulawayo",
    instructions: "Please call my mum on +263 77 111 2222 before delivery. Thank you!",
    items: [
      {
        id: "box-large",
        name: "The Grand Carcass Hamper (Family Box)",
        price: 125.0,
        priceFormatted: "$125.00",
        quantity: 1,
        weight: "12kg assorted cuts",
        cutOption: "Mixed Family Cuts",
        image: "/assets/box-large.webp",
      },
    ],
    subtotal: 125.0,
    deliveryFee: 0.0,
    total: 125.0,
    currency: "USD",
    status: "Completed",
    paymentStatus: "UK Bank / Diaspora",
    createdAt: Date.now() - 1000 * 60 * 300,
  },
  {
    id: "FB-889412",
    date: "Yesterday, 04:15 PM",
    customerName: "Dave Harrison",
    customerPhone: "+263 77 987 6543",
    deliveryType: "delivery",
    deliverySuburb: "Hillside",
    deliveryAddress: "7 Cecil Avenue, Hillside, Bulawayo",
    instructions: "Stewing beef cut in 2-inch chunks for potjiekos.",
    items: [
      {
        id: "oxtail",
        name: "Grass-Fed Beef Oxtail",
        price: 28.0,
        priceFormatted: "$28.00",
        quantity: 2,
        weight: "1kg pack",
        cutOption: "Joint Cut",
        image: "/assets/products/oxtail.webp",
      },
      {
        id: "short-ribs",
        name: "Braai Short Ribs",
        price: 19.5,
        priceFormatted: "$19.50",
        quantity: 1,
        weight: "1kg",
        cutOption: "Asado Cross-Cut",
        image: "/assets/products/short-ribs.webp",
      },
    ],
    subtotal: 75.5,
    deliveryFee: 0.0,
    total: 75.5,
    currency: "USD",
    status: "Completed",
    paymentStatus: "Paid",
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
  },
];

export function getStoredAdminOrders(): AdminOrder[] {
  if (typeof window === "undefined") return SEED_ORDERS;
  try {
    const rawLocal = localStorage.getItem("fat_bone_orders");
    const rawAdmin = localStorage.getItem("fat_bone_admin_orders");

    let combined: AdminOrder[] = [];

    if (rawAdmin) {
      combined = JSON.parse(rawAdmin);
    } else {
      combined = [...SEED_ORDERS];
    }

    // Also import any recent orders placed from the customer frontend cart
    if (rawLocal) {
      const customerOrders = JSON.parse(rawLocal);
      customerOrders.forEach((co: any) => {
        if (!combined.some((o) => o.id === co.id)) {
          combined.unshift({
            id: co.id,
            date: co.date,
            customerName: co.customerName || "Web Customer",
            customerPhone: co.customerPhone || "N/A",
            deliveryType: co.deliveryType || "delivery",
            deliverySuburb: co.deliverySuburb || "Bulawayo",
            deliveryAddress: co.deliveryAddress || "Not specified",
            instructions: co.instructions || "",
            items: co.items || [],
            subtotal: co.subtotal || 0,
            deliveryFee: co.deliveryFee || 0,
            total: co.total || 0,
            currency: "USD",
            status: "Pending Review",
            paymentStatus: "Unpaid (COD)",
            createdAt: Date.now(),
          });
        }
      });
    }

    return combined;
  } catch (e) {
    console.error(e);
    return SEED_ORDERS;
  }
}

export function saveAdminOrders(orders: AdminOrder[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("fat_bone_admin_orders", JSON.stringify(orders));
  } catch (e) {
    console.error(e);
  }
}

export function getAdminSettings(): AdminSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const saved = localStorage.getItem("fat_bone_admin_settings");
    if (saved) return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
  } catch (e) {
    console.error(e);
  }
  return DEFAULT_SETTINGS;
}

export function saveAdminSettings(settings: AdminSettings) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("fat_bone_admin_settings", JSON.stringify(settings));
  } catch (e) {
    console.error(e);
  }
}
