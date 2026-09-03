import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, HeartHandshake, Award, MapPin, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BrushImage } from "@/components/BrushImage";

import methodCowRear from "@/assets/method-cow-rear.webp";
import methodCowsBanner from "@/assets/method-cows-banner.webp";
import butcherShop from "@/assets/butcher-shop.webp";
import g1 from "@/assets/g1.webp";
import g2 from "@/assets/g2.webp";
import g3 from "@/assets/g3.webp";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — The Fat Bone Butcher | Bulawayo" },
      {
        name: "description",
        content:
          "Learn about The Fat Bone Butcher at 129 Fort Street, Bulawayo. Born from the bone, cut with care.",
      },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  {
    icon: ShieldCheck,
    title: "100% Pasture-Raised & Grass-Fed",
    desc: "We exclusively source livestock raised on open Matabeleland and Zimbabwean grasslands without synthetic hormones, routine antibiotics, or feedlot fillers.",
  },
  {
    icon: HeartHandshake,
    title: "Artisanal Whole-Carcass Butchery",
    desc: "Our master blockmen practice whole-carcass butchery, honoring the entire animal and preparing custom cuts to your exact thickness and culinary needs.",
  },
  {
    icon: Award,
    title: "Cold-Chain Integrity",
    desc: "From dry-aging in temperature-controlled cold rooms to vacuum-sealed insulated delivery packaging, our meats never sit frozen — guaranteed fresh.",
  },
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

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero Banner */}
      <section className="bg-cream py-16 sm:py-24 border-b border-border text-center">
        <div className="mx-auto max-w-4xl px-6">
          <Eyebrow>OUR STORY & HERITAGE</Eyebrow>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Born From The Bone,
            <br />
            Cut With Care
          </h1>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Located at <strong>129 Fort Street</strong> (between 13th & 14th Avenue) in Bulawayo,
            The Fat Bone Butcher was founded on an uncompromising commitment to honest cuts, deep
            flavor, and high-grade quality meats.
          </p>
        </div>
      </section>

      {/* Methods Section with BrushImage */}
      <section className="relative overflow-hidden bg-white py-16 lg:py-24">
        <div className="mx-auto flex max-w-[1560px] flex-col items-center justify-between gap-10 px-6 lg:flex-row lg:items-center lg:gap-8">
          <div className="w-full sm:w-[260px] lg:w-[300px] shrink-0 h-[320px] lg:h-[420px]">
            <BrushImage
              src={methodCowRear}
              alt="Pasture-raised cattle"
              className="h-full w-full"
              imgClassName="object-cover object-center"
            />
          </div>

          <div className="flex max-w-[480px] shrink-0 flex-col items-start px-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#c67c52]">
              OUR PHILOSOPHY
            </span>
            <h2 className="mt-2.5 font-display text-3xl sm:text-4xl font-bold leading-tight text-[#0e2638]">
              Pasture-Raised
              <br />
              Promise
            </h2>
            <p className="mt-3 font-display italic text-sm text-[#1c364c]">
              Animal welfare and traditional butchery craftsmanship.
            </p>
            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-[#555e6d]">
              We partner directly with local farms committed to natural grazing and ethical
              husbandry. Every carcass is chilled in strict cold-chain conditions, aged properly,
              and cut to order with master knife work.
            </p>
            <div className="mt-6">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] bg-brand text-brand-foreground hover:bg-ink transition-colors"
              >
                <span>Explore Cuts</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="w-full flex-1 min-w-0 h-[320px] lg:h-[420px]">
            <BrushImage
              src={methodCowsBanner}
              alt="Cattle in open pasture"
              className="h-full w-full"
              imgClassName="object-cover object-[center_35%]"
            />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-sand/60 py-20 border-y border-ink/10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-xl mx-auto mb-14">
            <Eyebrow>OUR PILLARS</Eyebrow>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold">
              The Fat Bone Standard
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="bg-white p-8 border border-ink/10 rounded-sm shadow-xs space-y-4"
                >
                  <div className="h-12 w-12 rounded-full bg-brand/10 text-brand flex items-center justify-center">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-ink">{val.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="bg-[#f7f4ee] py-20 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <Eyebrow>BEHIND THE BLOCK</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-bold">Artisan Butchery in Bulawayo</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3 items-center">
            <div className="overflow-hidden bg-slate-100 shadow-sm rounded-sm">
              <img
                src={g1}
                alt="Beef ribs hanging in butchery"
                className="h-72 w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="overflow-hidden bg-slate-100 shadow-sm sm:-mt-4 sm:-mb-4 rounded-sm">
              <img
                src={g2}
                alt="Cold locker dry aging"
                className="h-84 w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="overflow-hidden bg-slate-100 shadow-sm rounded-sm">
              <img
                src={g3}
                alt="Master butcher wrapping cuts"
                className="h-72 w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Visit Us CTA Banner */}
      <section className="bg-brand py-16 text-brand-foreground text-center">
        <div className="mx-auto max-w-3xl px-6 space-y-4">
          <h2 className="font-display text-3xl sm:text-4xl font-bold">
            Visit Our Counter on Fort Street
          </h2>
          <p className="text-sm text-brand-foreground/80 max-w-xl mx-auto leading-relaxed">
            129 Fort Street, between 13th & 14th Avenue, Bulawayo. Open 7 days a week.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 text-[11px] font-bold uppercase tracking-[0.18em] bg-white text-ink hover:bg-cream transition-colors"
            >
              <MapPin className="h-4 w-4 text-brand" />
              <span>Get Directions & Hours</span>
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-7 py-3 text-[11px] font-bold uppercase tracking-[0.18em] border border-white text-white hover:bg-white/10 transition-colors"
            >
              <span>Order Meat Hamper</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
