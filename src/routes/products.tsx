import React, { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/cart-context";
import { ProductOptionsModal, SelectedProduct } from "@/components/ProductOptionsModal";
import { ProductCard, ProductItem } from "@/components/ProductCard";

import tBoneImg from "@/assets/products/t-bone.webp";
import filletImg from "@/assets/products/fillet.webp";
import rumpImg from "@/assets/products/rump-steak.webp";
import chuckImg from "@/assets/products/chuck-roast.webp";
import boereworsImg from "@/assets/products/boerewors.webp";
import shortRibsImg from "@/assets/products/short-ribs.webp";
import braaiSteaksImg from "@/assets/products/braai-steaks.webp";
import oxtailImg from "@/assets/products/oxtail.webp";
import minceImg from "@/assets/products/beef-mince.webp";
import wholeChickenImg from "@/assets/products/whole-chicken.webp";
import chickenBreastImg from "@/assets/products/chicken-breast.webp";
import chickenThighsImg from "@/assets/products/chicken-thighs.webp";
import chickenWingsImg from "@/assets/products/chicken-wings.webp";
import breamImg from "@/assets/products/kariba-bream.webp";
import hakeFilletImg from "@/assets/products/hake-fillet.webp";
import babyHakeImg from "@/assets/products/baby-hake.webp";
import goatMeatImg from "@/assets/products/goat-meat.webp";
import lambChopsImg from "@/assets/products/lamb-chops.webp";
import porkRibsImg from "@/assets/products/pork-ribs.webp";
import porkChopsImg from "@/assets/products/pork-chops.webp";
import boxRegular from "@/assets/box-regular.webp";
import boxLarge from "@/assets/box-large.webp";
import boxPremium from "@/assets/box-premium.webp";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products & Cuts — The Fat Bone Butcher | Bulawayo" },
      {
        name: "description",
        content:
          "Explore fresh beef, goat, lamb, farm chicken, Kariba bream, boerewors, and curated hampers at The Fat Bone Butcher, Bulawayo.",
      },
    ],
  }),
  component: ProductsPage,
});

const ALL_PRODUCTS: ProductItem[] = [
  // BEEF
  {
    id: "t-bone",
    category: "Beef",
    img: tBoneImg,
    name: "Prime Aged T-Bone Steak",
    weight: "~500g (1.1 lbs)",
    price: 26.0,
    was: null,
    tag: "Butcher Choice",
    isFrozen: true,
    options: ["Thick Braai Cut (1.5 inch)", "Standard Cut (1 inch)", "2x 250g Portions"],
  },
  {
    id: "fillet-mignon",
    category: "Beef",
    img: filletImg,
    name: "Tenderloin Beef Fillet",
    weight: "6oz / ~200g (Center-Cut)",
    price: 36.0,
    was: "$44.00",
    isSale: true,
    tag: "SALE",
    isFrozen: true,
    options: ["Center-Cut Medallions", "Chateaubriand Tenderloin", "Butterflied Medallions"],
  },
  {
    id: "rump-steak",
    category: "Beef",
    img: rumpImg,
    name: "Grass-Fed Rump Steak / Picanha",
    weight: "~400g (0.9 lbs)",
    price: 24.0,
    was: null,
    tag: null,
    isFrozen: true,
    options: ["Standard Cut (~1 inch)", "Thick Braai Cut", "Thin Minute Steaks"],
  },
  {
    id: "braai-steaks",
    category: "Beef",
    img: braaiSteaksImg,
    name: "Marinated Master Braai Steaks",
    weight: "1kg (~2.2 lbs)",
    price: 22.0,
    was: null,
    tag: "Braai Master",
    isFrozen: true,
    options: ["Special Braai Marinade", "Traditional Dry Rub", "Unseasoned Fresh"],
  },
  {
    id: "beef-mince",
    category: "Beef",
    img: minceImg,
    name: "Fresh Ground Beef Chuck Mince",
    weight: "1kg (~2.2 lbs)",
    price: 14.0,
    was: null,
    isNew: true,
    tag: "NEW",
    isFrozen: true,
    options: ["Fine Grind (Lean 90/10)", "Coarse Grind (80/20)", "2x 500g Separate Packs"],
  },
  {
    id: "short-ribs",
    category: "Beef",
    img: shortRibsImg,
    name: "Thick-Cut Beef Short Ribs",
    weight: "1kg (~2.2 lbs)",
    price: 20.0,
    was: null,
    tag: null,
    isFrozen: true,
    options: ["Flanken Cut (Thin)", "English Braising Blocks", "Whole Slab"],
  },
  {
    id: "boneless-chuck",
    category: "Beef",
    img: chuckImg,
    name: "Boneless Beef Chuck Pot Roast",
    weight: "~1.5kg (3.3 lbs)",
    price: 18.0,
    was: null,
    tag: null,
    isFrozen: true,
    options: ["Potjie Stew Cubes", "Whole Pot Roast", "Diced Goulash Cuts"],
  },
  {
    id: "oxtail",
    category: "Beef",
    img: oxtailImg,
    name: "Selected Grass-Fed Beef Oxtail",
    weight: "1kg (~2.2 lbs)",
    price: 22.0,
    was: null,
    tag: "Traditional",
    isFrozen: true,
    options: ["Joint Cut (Braai/Potjie)", "Fine Trimmed", "Whole Tail"],
  },

  // GOAT & LAMB
  {
    id: "goat-stew",
    category: "Goat & Lamb",
    img: goatMeatImg,
    name: "Matabeleland Stewing Goat Meat",
    weight: "1kg (~2.2 lbs)",
    price: 16.0,
    was: null,
    tag: "Local Favorite",
    isFrozen: true,
    options: ["Bone-In Potjie Cubes", "Lean Stew Cubes", "Curry Cut Portions"],
  },
  {
    id: "lamb-chops",
    category: "Goat & Lamb",
    img: lambChopsImg,
    name: "Prime Cut Bone-In Lamb Chops",
    weight: "1kg (~2.2 lbs)",
    price: 24.0,
    was: null,
    tag: "Chef's Cut",
    isFrozen: true,
    options: ["Loin Chops", "Rib Cutlets (French Trim)", "Assorted Mixed Chops"],
  },

  // CHICKEN
  {
    id: "whole-chicken",
    category: "Chicken",
    img: wholeChickenImg,
    name: "Farm Fresh Whole Chicken",
    weight: "~1.4kg (3.1 lbs)",
    price: 9.5,
    was: null,
    tag: "Farm Fresh",
    isFrozen: true,
    options: ["Whole Butterfly Spatchcock", "Cut into 8 Pieces", "Whole Intact"],
  },
  {
    id: "chicken-breast",
    category: "Chicken",
    img: chickenBreastImg,
    name: "Skinless Chicken Breast Fillets",
    weight: "1kg (~2.2 lbs)",
    price: 11.0,
    was: null,
    tag: "Lean & Healthy",
    isFrozen: true,
    options: ["Whole Fillets", "Escalope Slices", "Diced Stir-Fry Strips"],
  },
  {
    id: "chicken-thighs",
    category: "Chicken",
    img: chickenThighsImg,
    name: "Juicy Chicken Thighs & Drumsticks",
    weight: "1kg (~2.2 lbs)",
    price: 9.0,
    was: null,
    tag: null,
    isFrozen: true,
    options: ["Skin-On Bone-In", "Boneless Skinless Thighs", "Drumsticks Only"],
  },
  {
    id: "chicken-wings",
    category: "Chicken",
    img: chickenWingsImg,
    name: "Crispy Braai Chicken Wings",
    weight: "1kg (~2.2 lbs)",
    price: 8.5,
    was: null,
    tag: "Braai Ready",
    isFrozen: true,
    options: ["Whole Wings", "Split Flats & Drumettes", "Spicy Dry Rub"],
  },

  // FISH
  {
    id: "kariba-bream",
    category: "Fish",
    img: breamImg,
    name: "Fresh Whole Kariba Bream",
    weight: "Scaled & Gutted (~800g)",
    price: 12.0,
    was: null,
    tag: "Kariba Catch",
    isFrozen: true,
    isSolidButton: true,
    options: ["Whole Cleaned (Braai Ready)", "Head-Off Cleaned", "Deep Scored for Grilling"],
  },
  {
    id: "hake-fillet",
    category: "Fish",
    img: hakeFilletImg,
    name: "Premium Fresh Hake Fillets",
    weight: "1kg (~2.2 lbs)",
    price: 14.5,
    was: null,
    tag: "Ocean Fresh",
    isFrozen: true,
    options: ["Skinless Fillets", "Skin-On Portion Cuts", "Crumb-Ready Strips"],
  },
  {
    id: "baby-hake",
    category: "Fish",
    img: babyHakeImg,
    name: "Tender Baby Hake Portions",
    weight: "1kg (~2.2 lbs)",
    price: 12.5,
    was: null,
    tag: null,
    isFrozen: true,
    options: ["Whole Gutted", "Pan-Fry Steaks", "Filleted Halves"],
  },

  // BOEREWORS & PORK
  {
    id: "boerewors",
    category: "Boerewors & Pork",
    img: boereworsImg,
    name: "Traditional Bulawayo Beef Boerewors",
    weight: "1kg (~2.2 lbs)",
    price: 13.5,
    was: null,
    tag: "Secret Recipe",
    isFrozen: true,
    options: ["Classic Spiced Coil", "Thick Braai Wheels", "Mild Coriander & Cloves"],
  },
  {
    id: "pork-ribs",
    category: "Boerewors & Pork",
    img: porkRibsImg,
    name: "Marinated Pork Belly Spare Ribs",
    weight: "1kg (~2.2 lbs)",
    price: 17.0,
    was: null,
    tag: "Sticky Braai",
    isFrozen: true,
    options: ["Honey BBQ Marinated", "Traditional Salt & Pepper", "Whole Rack"],
  },
  {
    id: "pork-chops",
    category: "Boerewors & Pork",
    img: porkChopsImg,
    name: "Tender Bone-In Pork Loin Chops",
    weight: "1kg (~2.2 lbs)",
    price: 15.0,
    was: null,
    tag: null,
    isFrozen: true,
    options: ["Thick Cut (~250g each)", "Thin Quick-Fry", "Herb & Garlic Crusted"],
  },

  // HAMPERS
  {
    id: "box-regular",
    category: "Hampers",
    img: boxRegular,
    name: "Family Weekly Meat Hamper",
    weight: "6–8 lbs (Mixed Selection)",
    price: 45.0,
    was: null,
    tag: "Top Value",
    isFrozen: true,
    options: ["Mixed Selection (Beef + Chicken)", "All Beef Box", "Stew & Mince Box"],
  },
  {
    id: "box-large",
    category: "Hampers",
    img: boxLarge,
    name: "Ultimate Weekend Braai Hamper",
    weight: "12–16 lbs (Steaks & Boerewors)",
    price: 68.0,
    was: null,
    tag: "Braai Pack",
    isFrozen: true,
    options: ["Braai Meat & Boerewors Pack", "Steaks & Ribs Hamper", "Custom Cutting"],
  },
  {
    id: "box-premium",
    category: "Hampers",
    img: boxPremium,
    name: "Diaspora Bulawayo Monthly Box",
    weight: "22–28 lbs (Delivered in Bulawayo)",
    price: 115.0,
    was: null,
    tag: "Diaspora Favorite",
    isFrozen: true,
    options: ["Delivered to Family in Bulawayo", "Vacuum Sealed 1kg Packs", "Assorted Prime Cuts"],
  },
];

const CATEGORIES = [
  "All Cuts",
  "Beef",
  "Goat & Lamb",
  "Chicken",
  "Fish",
  "Boerewors & Pork",
  "Hampers",
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 justify-center">
      <span className="h-px w-6 bg-brand/40" />
      <span className="eyebrow">{children}</span>
      <span className="h-px w-6 bg-brand/40" />
    </div>
  );
}

function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Cuts");
  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct | null>(null);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All Cuts") return ALL_PRODUCTS;
    return ALL_PRODUCTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Header Banner */}
      <section className="bg-cream py-16 sm:py-20 border-b border-border text-center">
        <div className="mx-auto max-w-4xl px-6">
          <Eyebrow>OUR BUTCHER SELECTION</Eyebrow>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-bold">
            Fresh Meat Cuts & Boxes
          </h1>
          <p className="mt-3 text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            High grade meat with great taste for every meal. Hand-selected, aged, and prepared daily
            at 129 Fort Street, Bulawayo.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.14em] transition-all cursor-pointer ${
                    isSelected
                      ? "bg-brand text-white shadow-sm border-2 border-brand font-extrabold"
                      : "bg-white text-slate-800 hover:bg-slate-100 border-2 border-slate-300 hover:border-slate-500"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Grid - Clean, uncrowded 3-column layout matching reference */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onOpenOptions={(prod) => setSelectedProduct(prod)}
            />
          ))}
        </div>
      </section>

      <Footer />

      {/* Product Options Modal */}
      <ProductOptionsModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}
