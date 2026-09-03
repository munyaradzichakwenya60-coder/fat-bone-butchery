import React from "react";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  MessageCircle,
  MapPin,
  Truck,
  Store,
  Globe,
} from "lucide-react";
import { useCart, BULAWAYO_AREAS } from "@/lib/cart-context";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    deliveryFee,
    total,
    deliveryType,
    setDeliveryType,
    deliverySuburb,
    setDeliverySuburb,
    deliveryAddress,
    setDeliveryAddress,
    customerName,
    setCustomerName,
    customerPhone,
    setCustomerPhone,
    instructions,
    setInstructions,
    formatPrice,
    getWhatsAppUrl,
  } = useCart();

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* High-Contrast Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-white border-l-2 border-slate-300 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Drawer Header */}
          <div className="p-5 border-b-2 border-slate-200 bg-[#f7f4ee] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-brand text-white flex items-center justify-center shadow-xs">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div>
                <h3
                  id="cart-drawer-title"
                  className="font-display text-xl font-bold tracking-tight text-slate-900"
                >
                  Your Meat Hamper
                </h3>
                <p className="text-xs font-bold text-slate-700 uppercase tracking-widest">
                  {items.length === 0
                    ? "Empty Cart"
                    : `${items.length} unique cut${items.length > 1 ? "s" : ""}`}
                </p>
              </div>
            </div>

            <button
              onClick={closeCart}
              className="p-2 text-slate-700 hover:text-black transition-colors rounded-full hover:bg-slate-200 cursor-pointer"
              aria-label="Close meat cart"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 bg-white">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200">
                  <ShoppingBag className="h-8 w-8" />
                </div>
                <h4 className="font-display text-xl font-bold text-slate-900">Your bag is empty</h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xs mx-auto font-medium">
                  Browse our grass-fed cuts, boerewors, or butcher boxes to start your order.
                </p>
                <button
                  onClick={closeCart}
                  className="mt-4 inline-flex items-center justify-center px-7 py-3 text-xs font-bold uppercase tracking-[0.18em] bg-brand text-white hover:bg-ink transition-colors rounded-sm cursor-pointer shadow-sm"
                >
                  Explore Cuts
                </button>
              </div>
            ) : (
              <>
                {/* List of items */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand">
                      Selected Cuts & Boxes
                    </span>
                    <button
                      onClick={clearCart}
                      className="text-xs uppercase tracking-wider font-bold text-slate-500 hover:text-brand transition-colors cursor-pointer"
                    >
                      Clear All
                    </button>
                  </div>

                  <div className="divide-y divide-slate-200 border-y-2 border-slate-200">
                    {items.map((item) => (
                      <div
                        key={`${item.id}-${item.cutOption || ""}`}
                        className="py-3.5 flex items-center gap-3"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md border-2 border-slate-200 shrink-0 shadow-xs"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-display text-sm sm:text-base font-bold text-slate-900 leading-snug line-clamp-1">
                            {item.name}
                          </h5>
                          {item.cutOption && (
                            <p className="text-xs text-brand font-bold mt-0.5">{item.cutOption}</p>
                          )}
                          <p className="text-xs text-slate-700 font-semibold mt-0.5">
                            {formatPrice(item.price)} each
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center border-2 border-slate-300 rounded-md bg-white overflow-hidden shadow-xs">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold transition-colors cursor-pointer"
                              aria-label={`Decrease quantity of ${item.name}`}
                            >
                              <Minus className="h-3.5 w-3.5 stroke-[2.5]" />
                            </button>
                            <span className="px-2.5 text-xs font-extrabold text-slate-900 min-w-[24px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold transition-colors cursor-pointer"
                              aria-label={`Increase quantity of ${item.name}`}
                            >
                              <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-slate-400 hover:text-red-700 transition-colors rounded-full hover:bg-red-50 cursor-pointer"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="h-4 w-4 stroke-[2]" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fulfillment Selection */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand block">
                    Fulfillment Method:
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setDeliveryType("delivery")}
                      className={`p-3 text-center rounded-md border-2 transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                        deliveryType === "delivery"
                          ? "border-brand bg-red-50 text-slate-900 font-bold shadow-xs"
                          : "border-slate-300 hover:border-slate-500 bg-white text-slate-800 font-semibold"
                      }`}
                    >
                      <Truck className="h-5 w-5 text-brand" />
                      <span className="text-[10.5px] uppercase tracking-wider">BYO Delivery</span>
                    </button>

                    <button
                      onClick={() => setDeliveryType("pickup")}
                      className={`p-3 text-center rounded-md border-2 transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                        deliveryType === "pickup"
                          ? "border-brand bg-red-50 text-slate-900 font-bold shadow-xs"
                          : "border-slate-300 hover:border-slate-500 bg-white text-slate-800 font-semibold"
                      }`}
                    >
                      <Store className="h-5 w-5 text-brand" />
                      <span className="text-[10.5px] uppercase tracking-wider">Shop Pickup</span>
                    </button>

                    <button
                      onClick={() => setDeliveryType("diaspora")}
                      className={`p-3 text-center rounded-md border-2 transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                        deliveryType === "diaspora"
                          ? "border-brand bg-red-50 text-slate-900 font-bold shadow-xs"
                          : "border-slate-300 hover:border-slate-500 bg-white text-slate-800 font-semibold"
                      }`}
                    >
                      <Globe className="h-5 w-5 text-brand" />
                      <span className="text-[10.5px] uppercase tracking-wider">Diaspora UK</span>
                    </button>
                  </div>

                  {deliveryType === "pickup" ? (
                    <div className="p-3.5 bg-slate-50 border-2 border-slate-200 rounded-md text-xs text-slate-900 flex items-start gap-2.5">
                      <MapPin className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                      <div>
                        <span className="font-extrabold block text-slate-900">Pickup Counter:</span>
                        129 Fort Street (btwn 13th & 14th Ave), Bulawayo. Ready in 45 mins.
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      <div>
                        <label className="text-xs font-bold text-slate-900 block mb-1">
                          Bulawayo Suburb:
                        </label>
                        <select
                          value={deliverySuburb}
                          onChange={(e) => setDeliverySuburb(e.target.value)}
                          className="w-full bg-white border-2 border-slate-300 focus:border-brand rounded-md px-3 py-2.5 text-xs sm:text-sm text-slate-900 font-semibold focus:outline-none"
                        >
                          {BULAWAYO_AREAS.map((area) => (
                            <option key={area} value={area}>
                              {area}
                            </option>
                          ))}
                        </select>
                      </div>

                      <input
                        type="text"
                        placeholder="Street Address / House Number"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="w-full bg-white border-2 border-slate-300 focus:border-brand rounded-md px-3 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-500 font-medium focus:outline-none"
                      />
                    </div>
                  )}
                </div>

                {/* Customer Details */}
                <div className="space-y-2.5 pt-2">
                  <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand block">
                    Your Contact Information:
                  </span>
                  <div className="grid grid-cols-2 gap-2.5">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-white border-2 border-slate-300 focus:border-brand rounded-md px-3 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-500 font-medium focus:outline-none"
                    />
                    <input
                      type="tel"
                      placeholder="Phone / WhatsApp"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-white border-2 border-slate-300 focus:border-brand rounded-md px-3 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-500 font-medium focus:outline-none"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Custom cutting notes (e.g. 1kg bags, thick braai cut)"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="w-full bg-white border-2 border-slate-300 focus:border-brand rounded-md px-3 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-500 font-medium focus:outline-none"
                  />
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer */}
          {items.length > 0 && (
            <div className="p-5 sm:p-6 border-t-2 border-slate-200 bg-[#f7f4ee] space-y-4">
              <div className="space-y-2 text-xs sm:text-sm text-slate-800">
                <div className="flex justify-between font-semibold">
                  <span>Subtotal</span>
                  <span className="font-extrabold text-slate-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>
                    {deliveryType === "pickup" ? "Pickup Fee" : "Local Bulawayo Delivery"}
                  </span>
                  <span className="font-extrabold text-slate-900">
                    {deliveryType === "pickup"
                      ? "FREE"
                      : deliveryFee === 0
                        ? "FREE (Over $50)"
                        : formatPrice(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-300">
                  <span className="font-display">Total Estimate</span>
                  <span className="font-display text-brand text-lg">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Order via WhatsApp CTA */}
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold uppercase tracking-[0.16em] text-xs transition-colors shadow-md rounded-md cursor-pointer"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Place Order via WhatsApp</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <p className="text-[11px] text-center text-slate-600 leading-relaxed font-medium">
                Orders are freshly cut at 129 Fort St, vacuum sealed, and sent directly to your
                phone for confirmation.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
