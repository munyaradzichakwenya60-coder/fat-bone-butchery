import React from "react";
import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter, Lock } from "lucide-react";
import { Logo } from "./Header";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div className="space-y-3">
          <Logo />
          <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
            Bulawayo's artisanal whole-carcass butchery. Honest cuts, deep flavor, and high-grade
            pasture-raised meats.
          </p>
          <p className="font-display italic text-xs text-brand font-semibold tracking-wide">
            Born from the Bone, Cut with Care.
          </p>
        </div>
        {[
          {
            title: "Our Company",
            links: [
              { label: "About Us", to: "/about" },
              { label: "Our Farmers", to: "/about" },
              { label: "Our Butchers", to: "/about" },
              { label: "Socials & Community", to: "/socials" },
              { label: "The Fat Bone Butcher", to: "/" },
            ],
          },
          {
            title: "Customer Service",
            links: [
              { label: "How to Order", to: "/products" },
              { label: "Delivery Info", to: "/contact" },
              { label: "FAQ", to: "/contact" },
              { label: "Contact Us", to: "/contact" },
            ],
          },
          {
            title: "Need Assistance?",
            links: [
              { label: "hello@fatbonebutcher.com", to: "/contact" },
              { label: "129 Fort Street, Bulawayo", to: "/contact" },
              { label: "+263 712 851 525", to: "tel:+263712851525" },
            ],
          },
        ].map((col) => (
          <div key={col.title}>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.18em]">{col.title}</h3>
            <ul className="mt-4 space-y-2">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm text-muted-foreground hover:text-brand transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-border px-6 py-6">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>© 2026 The Fat Bone Butcher. All rights reserved.</span>
          {/* Subtle manager access portal */}
          <Link
            to="/admin"
            className="text-muted-foreground/30 hover:text-brand transition-colors p-1"
            title="Butcher Management Portal"
            aria-label="Manager Portal"
          >
            <Lock className="h-3 w-3" />
          </Link>
        </div>
        <div className="flex items-center gap-4 text-muted-foreground">
          <Instagram className="h-4 w-4 hover:text-brand cursor-pointer transition-colors" />
          <Facebook className="h-4 w-4 hover:text-brand cursor-pointer transition-colors" />
          <Twitter className="h-4 w-4 hover:text-brand cursor-pointer transition-colors" />
        </div>
      </div>
    </footer>
  );
}
