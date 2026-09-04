import React, { useState, useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export function FloatingCartBubble() {
  const location = useLocation();
  const { items, totalCount, subtotal, formatPrice, openCart, isOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [prevCount, setPrevCount] = useState(totalCount);
  const [isPulsing, setIsPulsing] = useState(false);

  // Pulse animation when items are added
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (totalCount > prevCount) {
      setIsPulsing(true);
      timer = setTimeout(() => setIsPulsing(false), 900);
    }
    setPrevCount(totalCount);
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [totalCount, prevCount]);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past top navbar area (140px)
      setIsScrolled(window.scrollY > 140);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Do not show on admin dashboard, or when drawer is already open, or when cart is empty, or at top of page
  if (
    !isScrolled ||
    totalCount === 0 ||
    isOpen ||
    location.pathname.startsWith("/admin")
  ) {
    return null;
  }

  return (
    <div
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Desktop Hover Quick Preview Card */}
      {isHovered && items.length > 0 && (
        <div
          role="tooltip"
          className="hidden sm:block mb-2.5 w-72 rounded-xl bg-stone-950/95 text-cream border border-amber-500/25 p-3.5 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-stone-800 pb-2 mb-2.5">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-xs tracking-wide text-white uppercase">
                Your Hamper
              </span>
              <span className="text-[10px] font-bold bg-brand text-white px-1.5 py-0.5 rounded-full">
                {totalCount} {totalCount === 1 ? "item" : "items"}
              </span>
            </div>
            <span className="text-xs font-bold text-amber-400">
              {formatPrice(subtotal)}
            </span>
          </div>

          {/* Cuts list (up to 3 items) */}
          <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
            {items.slice(0, 3).map((item) => (
              <div
                key={`${item.id}-${item.cutOption || "std"}`}
                className="flex items-center justify-between text-xs py-1 border-b border-stone-800/40 last:border-none"
              >
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <div className="h-6 w-6 rounded bg-stone-800 shrink-0 overflow-hidden border border-stone-700">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="truncate">
                    <p className="font-medium text-cream truncate text-[11px] leading-tight">
                      {item.name}
                    </p>
                    {item.cutOption && (
                      <p className="text-[9px] text-stone-400 truncate">
                        {item.cutOption}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] text-stone-400">
                    {item.quantity}x{" "}
                  </span>
                  <span className="text-[11px] font-bold text-cream">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}

            {items.length > 3 && (
              <p className="text-[10px] text-center text-stone-400 pt-1 italic">
                + {items.length - 3} more {items.length - 3 === 1 ? "cut" : "cuts"} in hamper
              </p>
            )}
          </div>

          {/* Quick CTA inside preview */}
          <button
            onClick={openCart}
            className="mt-2.5 w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-brand hover:bg-brand/90 text-white text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
          >
            <span>View Hamper & Checkout</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      )}

      {/* Main Tiny Floating Bubble Button */}
      <button
        onClick={openCart}
        aria-label={`View shopping cart with ${totalCount} items totaling ${formatPrice(subtotal)}`}
        className={`relative flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-stone-900/95 hover:bg-stone-900 text-cream border border-amber-500/30 hover:border-amber-400/60 shadow-xl hover:shadow-2xl backdrop-blur-md transition-all duration-300 cursor-pointer active:scale-95 animate-in fade-in slide-in-from-bottom-4 ${
          isPulsing
            ? "scale-110 ring-4 ring-brand/60 shadow-red-900/50"
            : "hover:scale-105"
        }`}
      >
        {/* Shopping bag icon with count badge */}
        <div className="relative flex items-center justify-center">
          <ShoppingBag className="h-4 w-4 text-amber-400 transition-transform group-hover:scale-110" />
          <span className="absolute -top-2 -right-2.5 min-w-[18px] h-[18px] px-1 bg-brand text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-xs border border-stone-950">
            {totalCount}
          </span>
        </div>

        {/* Subtotal amount */}
        <span className="text-xs font-extrabold tracking-wide text-white pl-0.5">
          {formatPrice(subtotal)}
        </span>

        {/* Small arrow indicator */}
        <div className="flex items-center text-stone-400 group-hover:text-amber-400 transition-colors">
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </button>
    </div>
  );
}
