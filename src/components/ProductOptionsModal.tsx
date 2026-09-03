import React, { useState } from "react";
import { X, Plus, Minus, Check, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export interface SelectedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  tag?: string | null;
  description?: string;
  options?: string[];
}

interface ProductOptionsModalProps {
  product: SelectedProduct | null;
  onClose: () => void;
}

export function ProductOptionsModal({ product, onClose }: ProductOptionsModalProps) {
  const { addItem, formatPrice } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string>(
    product?.options ? product.options[0] : "Standard Cut",
  );
  const [specialNote, setSpecialNote] = useState("");
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const defaultOptions = product.options || [
    "Standard Cut (~1 inch)",
    "Thick Braai Cut (1.5 inch)",
    "Stewing Cubes",
    "Coarse Mince Ground",
  ];

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      priceFormatted: `$${product.price.toFixed(2)}`,
      quantity: quantity,
      image: product.image,
      cutOption: `${selectedOption}${specialNote ? ` (${specialNote})` : ""}`,
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 400);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4"
    >
      {/* High-Contrast Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        aria-hidden="true"
      />

      {/* Solid High-Contrast Modal Dialog */}
      <div className="relative bg-white border-2 border-slate-300 shadow-2xl max-w-lg w-full rounded-md overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b-2 border-slate-200 flex items-center justify-between bg-[#f7f4ee]">
          <div className="flex items-center gap-2">
            <span className="h-0.5 w-5 bg-brand" />
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand">
              Select Cut Options
            </span>
            <span className="h-0.5 w-5 bg-brand" />
          </div>
          <button
            onClick={onClose}
            aria-label="Close options modal"
            className="p-2 text-slate-700 hover:text-black transition-colors rounded-full hover:bg-slate-200 focus-visible:ring-2 focus-visible:ring-brand"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 bg-white">
          {/* Product Header & Price */}
          <div className="flex gap-4 items-start pb-4 border-b border-slate-200">
            <img
              src={product.image}
              alt={product.name}
              className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-md border-2 border-slate-200 shrink-0 shadow-xs"
            />
            <div className="space-y-1.5 flex-1">
              <h3
                id="product-modal-title"
                className="font-display text-xl sm:text-2xl font-bold text-slate-900 leading-snug"
              >
                {product.name}
              </h3>
              <p className="text-lg font-extrabold text-brand">{formatPrice(product.price)}</p>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                100% pasture-raised, grass-fed & antibiotic-free from Zimbabwe ranches.
              </p>
            </div>
          </div>

          {/* Cutting / Preparation Style */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-900 block">
              Butcher Cutting Style:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {defaultOptions.map((opt) => {
                const isSelected = selectedOption === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => setSelectedOption(opt)}
                    className={`p-3 text-left text-xs rounded-md transition-all flex items-center justify-between cursor-pointer focus-visible:ring-2 focus-visible:ring-brand ${
                      isSelected
                        ? "border-2 border-brand bg-red-50 text-slate-900 font-bold shadow-xs"
                        : "border-2 border-slate-300 hover:border-slate-500 bg-white text-slate-800 font-semibold"
                    }`}
                  >
                    <span className="text-xs sm:text-[13px]">{opt}</span>
                    {isSelected && <Check className="h-4 w-4 text-brand shrink-0 stroke-[2.5]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity */}
          <div className="space-y-2.5 pt-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-900 block">
              Quantity / Packs:
            </label>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center border-2 border-slate-300 rounded-md bg-white overflow-hidden shadow-xs">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold transition-colors cursor-pointer"
                >
                  <Minus className="h-4 w-4 stroke-[2.5]" />
                </button>
                <span className="px-5 text-base font-extrabold text-slate-900 min-w-[36px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold transition-colors cursor-pointer"
                >
                  <Plus className="h-4 w-4 stroke-[2.5]" />
                </button>
              </div>
              <span className="text-sm text-slate-800 font-semibold">
                Total:{" "}
                <span className="text-base font-extrabold text-brand">
                  {formatPrice(product.price * quantity)}
                </span>
              </span>
            </div>
          </div>

          {/* Special Requests */}
          <div className="space-y-2 pt-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-900 block">
              Custom Cutting Instructions (Optional):
            </label>
            <input
              type="text"
              placeholder="e.g. Separate into 500g vacuum packs, trim fat, etc."
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              className="w-full bg-white border-2 border-slate-300 focus:border-brand rounded-md p-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-500 font-medium focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t-2 border-slate-200 bg-[#f7f4ee] flex flex-wrap gap-3 justify-end items-center">
          <button
            onClick={onClose}
            className="px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] border-2 border-slate-400 bg-white hover:bg-slate-100 text-slate-900 transition-colors rounded-md cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleAddToCart}
            className="inline-flex items-center justify-center gap-2 px-7 py-3 text-xs font-extrabold uppercase tracking-[0.16em] bg-brand text-white hover:bg-ink transition-colors rounded-md shadow-md cursor-pointer"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>
              {added ? "Added to Box!" : `Add to Box — ${formatPrice(product.price * quantity)}`}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
