import React, { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Search,
  ShoppingBag,
  Instagram,
  Facebook,
  Twitter,
  Check,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import { useCart } from "@/lib/cart-context";
import { ProductOptionsModal, SelectedProduct } from "@/components/ProductOptionsModal";
import { ReferralModal } from "@/components/ReferralModal";
import { ProductCard, ProductItem } from "@/components/ProductCard";

import heroSteakDark from "@/assets/hero-steak-dark.webp";
import illusPork from "@/assets/illus-pork.png";
import illusBeef from "@/assets/illus-beef.png";
import illusPoultry from "@/assets/illus-poultry.png";
import tBoneImg from "@/assets/products/t-bone.webp";
import filletImg from "@/assets/products/fillet.webp";
import breamImg from "@/assets/products/kariba-bream.webp";
import boereworsImg from "@/assets/products/boerewors.webp";
import pMince from "@/assets/p-mince.webp";
import boxRegular from "@/assets/box-regular.webp";
import boxLarge from "@/assets/box-large.webp";
import boxPremium from "@/assets/box-premium.webp";
import butcherShop from "@/assets/butcher-shop.webp";
import g1 from "@/assets/g1.webp";
import g2 from "@/assets/g2.webp";
import g3 from "@/assets/g3.webp";


import stepCut from "@/assets/step-cut.webp";
import stepPack from "@/assets/step-pack.webp";
import stepFresh from "@/assets/step-fresh.webp";
import featLambChop from "@/assets/feat-lamb-chop.webp";
import featLegShank from "@/assets/feat-leg-shank.webp";
import featRoundSteak from "@/assets/feat-round-steak.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Fat Bone Butcher — Honest Cuts. Deep Flavor." },
      {
        name: "description",
        content:
          "Pasture-raised, high-grade meat butchered to order and delivered fresh. Build your box of grass-fed steaks, pork and poultry from The Fat Bone Butcher, Bulawayo.",
      },
      { property: "og:title", content: "The Fat Bone Butcher — Honest Cuts. Deep Flavor." },
      {
        property: "og:description",
        content:
          "Pasture-raised, rare-breed meat butchered to order and delivered fresh to your door.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const CATEGORIES = [
  {
    id: "beef",
    title: "Prime Beef",
    copy: "100% pasture-raised grass-fed beef cuts, steaks, and boerewors.",
    img: illusBeef,
    price: 26.0,
  },
  {
    id: "goat-lamb",
    title: "Goat & Lamb",
    copy: "Fresh Matabeleland stew meat and prime bone-in chops.",
    img: featLambChop,
    price: 16.0,
  },
  {
    id: "chicken-fish",
    title: "Chicken & Fish",
    copy: "Farm-fresh chicken cuts and wild fresh Kariba bream.",
    img: illusPoultry,
    price: 9.5,
  },
];

const PRODUCTS: ProductItem[] = [
  {
    id: "t-bone",
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
    id: "filet-mignon",
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
    id: "kariba-bream",
    img: breamImg,
    name: "Fresh Whole Kariba Bream",
    weight: "Scaled & Gutted (~800g)",
    price: 12.0,
    was: null,
    isFrozen: true,
    isSolidButton: true,
    tag: "Kariba Catch",
    options: ["Whole Cleaned (Braai Ready)", "Head-Off Cleaned", "Deep Scored for Grilling"],
  },
  {
    id: "boerewors",
    img: boereworsImg,
    name: "Traditional Bulawayo Boerewors",
    weight: "1kg (~2.2 lbs)",
    price: 13.5,
    was: null,
    isFrozen: true,
    options: ["Classic Spiced Coil", "Thick Braai Wheels", "Mild Coriander & Cloves"],
  },
  {
    id: "beef-mince",
    img: pMince,
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
    id: "box-large",
    img: boxLarge,
    name: "Ultimate Weekend Braai Hamper",
    weight: "12–16 lbs (Steaks & Boerewors)",
    price: 68.0,
    was: null,
    isFrozen: true,
    options: ["Braai Meat & Boerewors Pack", "Steaks & Ribs Hamper", "Custom Cutting"],
  },
];

const STEPS = [
  {
    n: "1",
    img: stepCut,
    alt: "Raw prime tomahawk steak cut with wooden handle butcher knife",
    title: "Cut to order",
    isScript: true,
    copy: "Our master butcher expertly cuts to your requirements with skilled knife craftsmanship.",
  },
  {
    n: "2",
    img: stepPack,
    alt: "Insulated cardboard delivery box with gel packs and vacuum packed meat cuts",
    title: "Packaged with care",
    isScript: false,
    copy: "The cuts are packaged into specially designed insulated boxes, with cooling packs that keep products chilled.",
  },
  {
    n: "3",
    img: stepFresh,
    alt: "Fresh cut raw steaks arranged on a wooden cutting board with rosemary herbs",
    title: "Delivered Fresh",
    isScript: false,
    copy: "Your order arrives with you perfectly chilled, always fresh. Unlike most other online butchers, we never freeze our meat.",
  },
];

const FEATURES = [
  {
    img: featLambChop,
    alt: "Responsibly raised meat and fish illustration",
    title: "Responsibly Raised Meat & Poultry",
    copy: "100% pasture-raised and grass-fed. No added antibiotics or hormones, ever. GMO-free.",
  },
  {
    img: featLegShank,
    alt: "Sourced locally illustration",
    title: "Sourced Locally in Bulawayo",
    copy: "We partner with local farms who commit to quality and ethical treatment of animals.",
  },
  {
    img: featRoundSteak,
    alt: "Complete flexibility illustration",
    title: "Complete Flexibility",
    copy: "FREE SHIPPING on every order over $50. Express store pickup available anytime.",
  },
];

const BOXES = [
  {
    id: "box-regular",
    img: boxRegular,
    name: "Regular Box",
    feeds: "Feeds 1–2 people",
    weight: "6–8 lbs of meat",
    pricePerMeal: "$6.25",
    totalPrice: 45.0,
    featured: false,
    options: ["Classic Mixed Box (Beef, Pork & Poultry)", "All Beef Box", "Braai Master Selection"],
  },
  {
    id: "box-large",
    img: boxLarge,
    name: "Large Box",
    feeds: "Feeds 3–5 people",
    weight: "12–16 lbs of meat",
    pricePerMeal: "$5.85",
    totalPrice: 85.0,
    featured: true,
    options: ["Family Feast Mixed Box", "Braai & Steaks Ultimate", "High Protein Lean Selection"],
  },
  {
    id: "box-premium",
    img: boxPremium,
    name: "Premium Box",
    feeds: "Feeds 6–8 people",
    weight: "22–28 lbs of meat",
    pricePerMeal: "$5.40",
    totalPrice: 140.0,
    featured: false,
    options: ["Connoisseur Dry-Aged Box", "Diaspora Family Monthly Box", "Executive Braai Hamper"],
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-px w-6 bg-brand/40" />
      <span className="eyebrow">{children}</span>
      <span className="h-px w-6 bg-brand/40" />
    </div>
  );
}

function Btn({
  children,
  variant = "solid",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "solid" | "outline" | "light";
  onClick?: () => void;
}) {
  const base =
    "inline-flex items-center justify-center px-6 sm:px-7 py-3 text-xs font-extrabold uppercase tracking-[0.18em] transition-colors cursor-pointer rounded-xs shadow-xs";
  const styles = {
    solid: "bg-brand text-white hover:bg-ink shadow-sm",
    outline:
      "border-2 border-slate-400 bg-white text-slate-900 hover:border-brand hover:text-brand",
    light: "bg-cream text-brand hover:bg-brand hover:text-white border-2 border-brand/30",
  } as const;
  return (
    <button onClick={onClick} className={`${base} ${styles[variant]}`}>
      {children}
    </button>
  );
}



function Index() {
  const navigate = useNavigate();
  const { addItem, formatPrice } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct | null>(null);
  const [isReferralOpen, setIsReferralOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterName, setNewsletterName] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setTimeout(() => {
        setNewsletterEmail("");
        setNewsletterName("");
      }, 3500);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Clean Sticky Header Navigation */}
      <Header />

      {/* Hero Section — Strictly contained within hero bounds, no overlap */}
      <section className="relative w-full overflow-hidden bg-neutral-950 text-white isolate border-b border-ink/10">
        {/* Background Image with Dark Vignette Overlays - strictly contained */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img
            src={heroSteakDark}
            alt="Raw marbled prime steak with rosemary and sea salt on dark cutting board"
            className="h-full w-full object-cover object-center pointer-events-none select-none"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width={1920}
            height={1080}
          />
          {/* Multi-layered cinematic gradient overlays for high legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black/85" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Hero Content Container */}
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-14 sm:py-20 lg:py-24 text-center flex flex-col items-center">
          {/* Eyebrow / Script Tag matching reference */}
          <div className="flex flex-col items-center">
            <span className="font-script text-3xl sm:text-4xl lg:text-5xl text-white/90 lowercase tracking-wide drop-shadow-sm">
              quality meat
            </span>
            <span className="mt-1 block h-[2.5px] w-9 bg-[#c22020] rounded-full" />
          </div>

          {/* Main Bold Stacked Headline */}
          <h1 className="mt-4 sm:mt-5 font-sans font-black uppercase tracking-tight text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.04] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
            ENJOY THE HIGHEST
            <br />
            QUALITY MEAT
          </h1>

          {/* Centered Descriptive Subtitle */}
          <p className="mt-4 sm:mt-5 max-w-xl mx-auto text-xs sm:text-sm md:text-base text-white/80 font-medium leading-relaxed drop-shadow-md">
            Pasture-raised, whole-carcass butchery from the grasslands of Matabeleland.
            Hand-selected cuts, dry-aged to perfection and prepared fresh daily at 129 Fort Street,
            Bulawayo.
          </p>

          {/* Call to Action Button matching reference */}
          <div className="mt-7 sm:mt-8">
            <button
              onClick={() => navigate({ to: "/products" })}
              className="inline-flex items-center justify-center px-8 sm:px-10 py-3.5 sm:py-4 text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em] bg-[#b81414] hover:bg-[#940e0e] text-white shadow-xl hover:shadow-red-950/60 transition-all duration-300 rounded-none cursor-pointer active:scale-[0.98]"
            >
              VIEW OUR MENU
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {CATEGORIES.map((c) => (
            <div
              key={c.title}
              onClick={() => {
                setSelectedProduct({
                  id: c.id,
                  name: c.title,
                  price: c.price,
                  image: c.img,
                  options: ["1kg Family Pack", "2kg Value Pack", "Custom Trim Cut"],
                });
              }}
              className="group relative flex min-h-[150px] sm:min-h-[175px] items-center justify-between overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-md cursor-pointer"
            >
              <div className="flex h-full w-[40%] sm:w-[44%] items-center justify-start">
                <img
                  src={c.img}
                  alt={c.title}
                  width={200}
                  height={150}
                  loading="lazy"
                  decoding="async"
                  className="max-h-[100px] sm:max-h-[125px] w-full object-contain object-left transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="w-[60%] sm:w-[56%] pl-3">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#0f2942]">
                  {c.title}
                </h3>
                <div className="my-2 h-[2px] w-6 bg-slate-300" />
                <p className="text-xs font-normal leading-relaxed text-slate-500 line-clamp-2 sm:line-clamp-none">
                  {c.copy}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* Recommended */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="flex flex-col items-center text-center">
          <Eyebrow>Shop the Cuts</Eyebrow>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold">Recommended For You</h2>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground">Fresh Meat Products</p>
        </div>
        <div className="mt-10 sm:mt-12 grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onOpenOptions={(prod) => setSelectedProduct(prod)}
            />
          ))}
        </div>
      </section>

      {/* Steps - From block to box to you */}
      <section className="relative overflow-hidden bg-white">
        <div className="relative pt-6 pb-16 sm:pb-20 lg:pb-24">
          <div className="absolute inset-x-0 bottom-0 top-[100px] sm:top-[120px] lg:top-[135px] bg-[#ede7dc]">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage: `radial-gradient(#4d5d6c 0.85px, transparent 0.85px), radial-gradient(#2c3740 0.5px, #ede7dc 0.5px)`,
                backgroundSize: "36px 36px, 84px 84px",
                backgroundPosition: "0 0, 28px 42px",
              }}
            />
          </div>

          <div className="relative mx-auto max-w-[1440px] px-4 sm:px-10 lg:px-14">
            <div className="grid items-start gap-8 lg:grid-cols-[270px_1fr] xl:grid-cols-[300px_1fr]">
              <div className="pt-8 sm:pt-28 lg:pt-36 text-center lg:text-left">
                <h2 className="font-sans text-2xl sm:text-3xl lg:text-[40px] font-bold leading-[1.12] tracking-tight text-[#4e5e6e]">
                  From block to
                  <br />
                  box to you
                </h2>
              </div>

              <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-3 lg:gap-10 xl:gap-14">
                {STEPS.map((s) => (
                  <div
                    key={s.n}
                    className="flex flex-col bg-white/40 lg:bg-transparent p-4 sm:p-0 rounded-lg lg:rounded-none"
                  >
                    <div className="flex h-[130px] sm:h-[160px] lg:h-[185px] w-full items-end justify-center sm:justify-start overflow-visible">
                      <img
                        src={s.img}
                        alt={s.alt}
                        width={260}
                        height={200}
                        loading="lazy"
                        decoding="async"
                        className="max-h-full max-w-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.1)] transition-transform duration-300 hover:scale-105"
                      />
                    </div>

                    <div className="mt-4 flex items-start gap-3 sm:gap-4">
                      <span className="font-sans text-[50px] sm:text-[62px] lg:text-[78px] font-extrabold leading-[0.82] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.06)] select-none">
                        {s.n}
                      </span>
                      <div className="flex-1 pt-0.5">
                        {s.isScript ? (
                          <h3 className="font-script text-[24px] sm:text-[28px] lg:text-[32px] italic leading-tight text-[#4e5e6e]">
                            {s.title}
                          </h3>
                        ) : (
                          <h3 className="font-sans text-[13px] sm:text-[15px] font-bold leading-snug text-[#4e5e6e]">
                            {s.title}
                          </h3>
                        )}
                        <p className="mt-2 text-[11px] sm:text-[11.5px] leading-[1.65] text-[#637282] font-normal">
                          {s.copy}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rare breeds */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="grid gap-8 sm:gap-12 grid-cols-1 lg:grid-cols-2">
          <div>
            <Eyebrow>Provenance</Eyebrow>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-tight">
              Rare-breeds Sourced
              <br />
              from Small Farms
            </h2>
            <p className="mt-3 text-xs sm:text-sm uppercase tracking-[0.14em] text-muted-foreground">
              Where meat comes from
            </p>
            <div className="mt-6 sm:mt-7">
              <Link to="/about">
                <Btn variant="outline">Learn More</Btn>
              </Link>
            </div>
          </div>
          <div className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
            <p>
              <span className="float-left mr-3 font-display text-5xl sm:text-6xl leading-none text-ink">
                R
              </span>
              are breeds are slower to fatten and smaller in frame than commodity animals. Longhorn,
              Tamworth, Dexter and native cattle carry fat differently, marble more finely, and
              reward a butcher willing to work with the whole carcass with honest care.
            </p>
            <p className="mt-4">
              We select the best livestock from farms committed to quality and animal welfare. That
              means our range delivers exceptional freshness and flavor in every cut.
            </p>
          </div>
        </div>
        <div className="mt-10 sm:mt-14 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3 items-center">
          <div className="overflow-hidden bg-slate-100 shadow-sm rounded-sm">
            <img
              src={g1}
              alt="Artisanal beef ribs hanging in a rustic butcher shop"
              width={800}
              height={600}
              loading="lazy"
              decoding="async"
              className="h-64 sm:h-72 lg:h-80 w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="overflow-hidden bg-slate-100 shadow-sm rounded-sm sm:-mt-6 sm:-mb-6">
            <img
              src={g2}
              alt="Beef carcasses dry-aging on overhead rails in cold locker"
              width={600}
              height={800}
              loading="lazy"
              decoding="async"
              className="h-72 sm:h-80 lg:h-96 w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="overflow-hidden bg-slate-100 shadow-sm rounded-sm">
            <img
              src={g3}
              alt="Master butcher wrapping seasoned beef roast in wax butcher paper"
              width={800}
              height={600}
              loading="lazy"
              decoding="async"
              className="h-64 sm:h-72 lg:h-80 w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Features - Value Pillars */}
      <section className="border-t border-slate-200/80 bg-white py-14 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 lg:gap-16 px-4 sm:px-6 sm:grid-rows-[auto_auto_auto]">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="flex flex-col items-center text-center sm:grid sm:grid-rows-subgrid sm:row-span-3 sm:gap-0"
            >
              {/* Row 1: Fixed-dimension optically-balanced icon */}
              <div className="flex h-16 sm:h-20 w-16 sm:w-20 items-center justify-center mx-auto mb-4 sm:mb-5">
                <img
                  src={f.img}
                  alt={f.alt}
                  width={80}
                  height={80}
                  className="h-16 w-16 sm:h-20 sm:w-20 object-contain transition-transform duration-300 hover:scale-110"
                />
              </div>

              {/* Row 2: Headline with aligned height across all columns */}
              <div className="min-h-[3rem] sm:min-h-[3.75rem] flex items-start justify-center px-1">
                <h3 className="font-display text-lg sm:text-[21px] lg:text-[22px] font-bold text-[#143048] tracking-tight leading-snug">
                  {f.title}
                </h3>
              </div>

              {/* Row 3: Description starting on the exact same horizontal baseline */}
              <p className="mt-2 sm:mt-3 max-w-[300px] text-xs sm:text-[13px] leading-[1.65] text-slate-500 font-normal mx-auto">
                {f.copy}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Refer a friend */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <img
          src={butcherShop}
          alt="Butcher serving a customer at the shop counter"
          width={1200}
          height={900}
          loading="lazy"
          decoding="async"
          className="h-64 sm:h-80 w-full object-cover lg:h-full"
        />
        <div className="flex flex-col items-center justify-center bg-sand px-6 sm:px-8 py-14 sm:py-20 text-center">
          <Eyebrow>Give $20, Get $20</Eyebrow>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold">Refer a Friend</h2>
          <p className="mt-4 max-w-md text-xs sm:text-sm leading-relaxed text-muted-foreground">
            Give a friend $20 off their first order and we'll drop $20 into your account the moment
            they check out. No limit on how many you send.
          </p>
          <div className="mt-6 sm:mt-7">
            <Btn onClick={() => setIsReferralOpen(true)}>Get My Link</Btn>
          </div>
        </div>
      </section>

      {/* Boxes */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="flex flex-col items-center text-center">
          <Eyebrow>Our Boxes</Eyebrow>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold">Choose size of box</h2>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground">We only offer the best</p>
        </div>
        <div className="mt-10 sm:mt-12 grid gap-6 grid-cols-1 md:grid-cols-3">
          {BOXES.map((b) => (
            <div
              key={b.name}
              className={`flex flex-col items-center p-6 sm:p-8 text-center rounded-sm border border-ink/10 ${
                b.featured ? "bg-sand shadow-sm" : "bg-cream"
              }`}
            >
              <div className="w-full h-44 sm:h-52 overflow-hidden rounded-xs border border-ink/10 shadow-xs bg-white">
                <img
                  src={b.img}
                  alt={`${b.name} selection of meat cuts`}
                  width={700}
                  height={560}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <h3 className="mt-5 sm:mt-6 font-display text-2xl font-bold">{b.name}</h3>
              <p className="mt-2 sm:mt-3 text-xs uppercase tracking-[0.14em] text-muted-foreground font-semibold">
                {b.feeds}
              </p>
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {b.weight}
              </p>
              <p className="mt-4 text-sm font-bold text-brand">
                Total {formatPrice(b.totalPrice)} ({b.pricePerMeal} / meal)
              </p>
              <div className="mt-6 w-full">
                <button
                  onClick={() => {
                    setSelectedProduct({
                      id: b.id,
                      name: b.name,
                      price: b.totalPrice,
                      image: b.img,
                      options: b.options,
                    });
                  }}
                  className="w-full inline-flex items-center justify-center px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] bg-brand text-brand-foreground hover:bg-ink transition-colors cursor-pointer"
                >
                  Build Your Box
                </button>
              </div>
              <p className="mt-5 text-[11px] leading-relaxed text-muted-foreground">
                Every box is butchered to order and shipped chilled the same week.
              </p>
            </div>
          ))}
        </div>
      </section>





      {/* Newsletter */}
      <section className="bg-sand py-14 sm:py-20">
        <div className="mx-auto max-w-xl px-4 sm:px-6 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold">
            Subscribe to our newsletter
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
            Sign up to get $10 off your first order
          </p>

          {newsletterSuccess ? (
            <div className="mt-6 p-4 bg-emerald-50 border border-emerald-300 rounded text-emerald-800 flex items-center justify-center gap-2 animate-in zoom-in-95">
              <Check className="h-5 w-5 text-emerald-600" />
              <span className="text-xs sm:text-sm font-semibold">
                Thank you! Check your inbox for your $10 voucher code.
              </span>
            </div>
          ) : (
            <form
              className="mt-6 flex flex-col gap-3 sm:flex-row"
              onSubmit={handleNewsletterSubmit}
            >
              <input
                type="text"
                placeholder="First name"
                value={newsletterName}
                onChange={(e) => setNewsletterName(e.target.value)}
                required
                className="flex-1 border border-border bg-background px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-brand rounded-xs"
              />
              <input
                type="email"
                placeholder="Email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="flex-1 border border-border bg-background px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-brand rounded-xs"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center px-6 sm:px-7 py-2.5 sm:py-3 text-[11px] font-semibold uppercase tracking-[0.18em] bg-brand text-brand-foreground hover:bg-ink transition-colors cursor-pointer rounded-xs"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Shared Footer */}
      <Footer />

      {/* Product Options Modal */}
      <ProductOptionsModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />

      {/* Referral Link Modal */}
      <ReferralModal isOpen={isReferralOpen} onClose={() => setIsReferralOpen(false)} />
    </div>
  );
}
