import React, { useState } from "react";
import { ShoppingCart, ChevronDown, Snowflake } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { SelectedProduct } from "@/components/ProductOptionsModal";

export interface ProductItem {
  id: string;
  name: string;
  weight?: string;
  category?: string;
  price: number;
  was?: string | null;
  img: string;
  tag?: string | null;
  isFrozen?: boolean;
  isSale?: boolean;
  isNew?: boolean;
  outOfStock?: boolean;
  isSolidButton?: boolean;
  options?: string[];
}

interface ProductCardProps {
  product: ProductItem;
  onOpenOptions?: (product: SelectedProduct) => void;
}

export function ProductCard({ product, onOpenOptions }: ProductCardProps) {
  const { addItem, formatPrice } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = () => {
    if (product.outOfStock) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      priceFormatted: formatPrice(product.price),
      image: product.img,
      quantity,
      cutOption: product.options?.[0] || "Standard Cut",
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <article className="group flex flex-col justify-between bg-white border border-[#edf0f2] hover:border-slate-300/80 rounded-none sm:rounded-xs overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-all duration-300">
      <div className="flex-1 flex flex-col">
        {/* Product Image & Badges — Fills entire top portion edge-to-edge */}
        <div
          onClick={() => onOpenOptions?.(product)}
          className="relative aspect-square w-full overflow-hidden bg-[#faf9f6] cursor-pointer"
        >
          {/* Out of Stock Overlay */}
          {product.outOfStock && (
            <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-xs py-2 px-3 text-center border border-slate-200 shadow-xs z-20 pointer-events-none">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] text-slate-800">
                OUT OF STOCK
              </span>
            </div>
          )}

          {/* Top-Right Badges */}
          {product.isSale || product.tag === "SALE" ? (
            <span className="absolute right-2.5 top-2.5 z-10 bg-[#ea7e4b] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-xs">
              SALE
            </span>
          ) : product.isNew || product.tag === "NEW" ? (
            <span className="absolute right-2.5 top-2.5 z-10 bg-[#d9534f] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-xs">
              NEW
            </span>
          ) : product.isFrozen !== false ? (
            <span
              title="Freshly Chilled / Cold-Chain Protected"
              className="absolute right-2.5 top-2.5 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#3c789a]/90 backdrop-blur-xs text-white flex items-center justify-center shadow-xs"
            >
              <Snowflake className="h-4 w-4 stroke-[2.2]" />
            </span>
          ) : product.tag ? (
            <span className="absolute right-2.5 top-2.5 z-10 bg-[#143249] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-xs">
              {product.tag}
            </span>
          ) : null}

          <img
            src={product.img}
            alt={product.name}
            width={700}
            height={700}
            loading="lazy"
            decoding="async"
            className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
              product.outOfStock ? "opacity-75 grayscale-[20%]" : ""
            }`}
          />
        </div>

        {/* Product Info & Details with padding */}
        <div className="p-3.5 sm:p-4 pb-0 flex-1 flex flex-col justify-between">
          <div>
            <h3
              onClick={() => onOpenOptions?.(product)}
              className="font-display text-[15px] sm:text-[16px] font-bold text-[#14283b] leading-snug tracking-tight hover:text-brand transition-colors cursor-pointer line-clamp-2"
            >
              {product.name}
            </h3>

            {/* Weight / Portion Subtitle */}
            <p className="mt-1 text-[11px] sm:text-xs text-slate-400 font-medium tracking-wide">
              {product.weight || "1kg (~2.2 lbs)"}
            </p>

            {/* Price */}
            <div className="mt-2 sm:mt-2.5 flex items-baseline gap-2">
              {product.was && (
                <span className="text-xs sm:text-sm text-slate-400 line-through font-normal">
                  {product.was}
                </span>
              )}
              <span className="text-[15px] sm:text-base font-bold text-[#c24134] tracking-tight">
                {formatPrice(product.price)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Controls Row with padding */}
      <div className="px-3.5 sm:px-4 pb-3.5 sm:pb-4 pt-3 sm:pt-3.5">
        <div className="flex items-center gap-2">
          {/* Quantity Selector */}
          <div className="relative shrink-0">
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              disabled={product.outOfStock}
              aria-label={`Quantity for ${product.name}`}
              className="h-9 w-12 sm:w-14 appearance-none border border-slate-300 bg-white px-2.5 text-xs font-semibold text-slate-700 rounded-none focus:border-[#143249] focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          </div>

          {/* Action Button */}
          {product.outOfStock ? (
            <button
              disabled
              className="relative h-9 flex-1 flex items-center justify-center border border-slate-200 bg-slate-50 text-slate-400 text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.12em] rounded-none cursor-not-allowed"
            >
              <span className="absolute bottom-0 left-0 w-0 h-0 border-b-[7px] border-b-slate-300 border-r-[7px] border-r-transparent" />
              <span>READ MORE</span>
            </button>
          ) : product.isSolidButton ? (
            <button
              onClick={handleAddToCart}
              className="relative h-9 flex-1 flex items-center justify-center gap-1.5 bg-[#143249] hover:bg-[#0c2030] text-white text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.12em] transition-colors rounded-none cursor-pointer shadow-xs active:scale-[0.99]"
            >
              <ShoppingCart className="h-3.5 w-3.5 stroke-[2.2] shrink-0" />
              <span>{justAdded ? "ADDED!" : "ADD TO CART"}</span>
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="group/btn relative h-9 flex-1 flex items-center justify-center gap-1.5 border border-[#143249] bg-white hover:bg-[#143249] text-[#143249] hover:text-white text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.12em] transition-all rounded-none cursor-pointer shadow-2xs active:scale-[0.99]"
            >
              {/* Cleaved corner accent on bottom-left inspired by reference card */}
              <span className="absolute bottom-0 left-0 w-0 h-0 border-b-[7px] border-b-[#143249] border-r-[7px] border-r-transparent group-hover/btn:border-b-white transition-colors" />
              <ShoppingCart className="h-3.5 w-3.5 stroke-[2.2] shrink-0" />
              <span>{justAdded ? "ADDED!" : "ADD TO CART"}</span>
            </button>
          )}
        </div>

        {/* Custom Cut Options Link */}
        {product.options && product.options.length > 0 && (
          <button
            onClick={() => onOpenOptions?.(product)}
            className="mt-2 text-[10px] uppercase tracking-wider font-semibold text-slate-400 hover:text-brand transition-colors flex items-center justify-center gap-1 w-full cursor-pointer"
          >
            <span>Custom cut options</span>
            <span className="text-[11px]">›</span>
          </button>
        )}
      </div>
    </article>
  );
}
