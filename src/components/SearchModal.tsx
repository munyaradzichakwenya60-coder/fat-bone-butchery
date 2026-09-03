import React, { useState, useMemo } from "react";
import { X, Search, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import tBoneImg from "@/assets/products/t-bone.webp";
import filletImg from "@/assets/products/fillet.webp";
import rumpImg from "@/assets/products/rump-steak.webp";
import chuckImg from "@/assets/products/chuck-roast.webp";
import boereworsImg from "@/assets/products/boerewors.webp";
import wholeChickenImg from "@/assets/products/whole-chicken.webp";
import chickenBreastImg from "@/assets/products/chicken-breast.webp";
import breamImg from "@/assets/products/kariba-bream.webp";
import hakeFilletImg from "@/assets/products/hake-fillet.webp";
import goatMeatImg from "@/assets/products/goat-meat.webp";
import lambChopsImg from "@/assets/products/lamb-chops.webp";
import boxRegular from "@/assets/box-regular.webp";
import boxLarge from "@/assets/box-large.webp";
import boxPremium from "@/assets/box-premium.webp";

import { SelectedProduct } from "@/components/ProductOptionsModal";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: SelectedProduct) => void;
}

const CATALOG_ITEMS = [
  {
    id: "t-bone",
    name: "Prime Aged T-Bone Steak (~500g)",
    price: 26.0,
    category: "Beef",
    image: tBoneImg,
  },
  {
    id: "fillet-mignon",
    name: "Tenderloin Beef Fillet (6oz / ~200g)",
    price: 36.0,
    category: "Beef",
    image: filletImg,
  },
  {
    id: "rump-steak",
    name: "Grass-Fed Rump Steak / Picanha (~400g)",
    price: 24.0,
    category: "Beef",
    image: rumpImg,
  },
  {
    id: "boneless-chuck",
    name: "Boneless Beef Chuck Pot Roast (~1.5kg)",
    price: 18.0,
    category: "Beef",
    image: chuckImg,
  },
  {
    id: "boerewors",
    name: "Traditional Bulawayo Beef Boerewors (1kg)",
    price: 13.5,
    category: "Boerewors",
    image: boereworsImg,
  },
  {
    id: "goat-stew",
    name: "Fresh Matabeleland Stewing Goat Meat (1kg)",
    price: 16.0,
    category: "Goat",
    image: goatMeatImg,
  },
  {
    id: "lamb-chops",
    name: "Prime Cut Bone-In Lamb Chops (1kg)",
    price: 24.0,
    category: "Lamb",
    image: lambChopsImg,
  },
  {
    id: "whole-chicken",
    name: "Farm Fresh Whole Spatchcock Chicken (~1.4kg)",
    price: 9.5,
    category: "Chicken",
    image: wholeChickenImg,
  },
  {
    id: "chicken-breast",
    name: "Skinless Chicken Breast Fillets (1kg)",
    price: 11.0,
    category: "Chicken",
    image: chickenBreastImg,
  },
  {
    id: "kariba-bream",
    name: "Fresh Whole Kariba Bream (Scaled & Gutted)",
    price: 12.0,
    category: "Fish",
    image: breamImg,
  },
  {
    id: "hake-fillet",
    name: "Premium Fresh Hake Fillets (1kg)",
    price: 14.5,
    category: "Fish",
    image: hakeFilletImg,
  },
  {
    id: "box-regular",
    name: "Family Weekly Meat Hamper (6–8 lbs)",
    price: 45.0,
    category: "Hamper",
    image: boxRegular,
  },
  {
    id: "box-large",
    name: "Ultimate Weekend Braai Hamper (12–16 lbs)",
    price: 68.0,
    category: "Hamper",
    image: boxLarge,
  },
  {
    id: "box-premium",
    name: "Diaspora Bulawayo Monthly Box (22–28 lbs)",
    price: 115.0,
    category: "Hamper",
    image: boxPremium,
  },
];

export function SearchModal({ isOpen, onClose, onSelectProduct }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const { formatPrice } = useCart();

  const results = useMemo(() => {
    if (!query.trim()) return CATALOG_ITEMS.slice(0, 6);
    const q = query.toLowerCase();
    return CATALOG_ITEMS.filter(
      (item) => item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q),
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center pt-16 sm:pt-20 px-4"
    >
      {/* High-Contrast Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        aria-hidden="true"
      />

      <div className="relative bg-white border-2 border-slate-300 shadow-2xl max-w-xl w-full rounded-md overflow-hidden z-10 animate-in fade-in-50 zoom-in-95 duration-200">
        <div className="p-4 border-b-2 border-slate-200 flex items-center gap-3 bg-[#f7f4ee]">
          <Search className="h-5 w-5 text-brand shrink-0 stroke-[2.5]" />
          <input
            id="search-modal-title"
            type="text"
            placeholder="Search steaks, mince, boerewors, boxes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent border-none text-slate-900 placeholder:text-slate-500 text-sm sm:text-base font-semibold focus:outline-none"
          />
          <button
            onClick={onClose}
            aria-label="Close search"
            className="p-1.5 text-slate-700 hover:text-black transition-colors rounded-full hover:bg-slate-200 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-slate-200 bg-white">
          {results.length === 0 ? (
            <div className="py-12 text-center text-slate-700">
              <p className="text-sm sm:text-base font-bold">No butchery items match "{query}"</p>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Try searching for "Steak", "Mince", "Box", or "Boerewors"
              </p>
            </div>
          ) : (
            results.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectProduct(item);
                  onClose();
                }}
                className="py-3.5 px-3 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-100 rounded-md transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-md border-2 border-slate-200 shadow-xs shrink-0"
                  />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-brand block">
                      {item.category}
                    </span>
                    <h5 className="font-display text-sm sm:text-base font-bold text-slate-900 group-hover:text-brand transition-colors">
                      {item.name}
                    </h5>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm font-extrabold text-slate-900">
                    {formatPrice(item.price)}
                  </span>
                  <div className="p-2 rounded-full bg-brand text-white transition-transform group-hover:scale-110">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-3.5 bg-[#f7f4ee] border-t-2 border-slate-200 text-xs text-center text-slate-800 font-medium">
          Tip: You can order any custom cut via our WhatsApp line at{" "}
          <strong className="text-brand">+263 712 851 525</strong>
        </div>
      </div>
    </div>
  );
}
