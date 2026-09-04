import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Instagram,
  Facebook,
  Twitter,
  MessageCircle,
  Camera,
  Share2,
  Heart,
  ExternalLink,
  MapPin,
  Flame,
  Award,
  ArrowRight,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import g1 from "@/assets/g1.webp";
import g2 from "@/assets/g2.webp";
import g3 from "@/assets/g3.webp";
import butcherShop from "@/assets/butcher-shop.webp";
import recipes from "@/assets/recipes.webp";
import heroSteakDark from "@/assets/hero-steak-dark.webp";

export const Route = createFileRoute("/socials")({
  head: () => ({
    meta: [
      { title: "Socials & Community — The Fat Bone Butcher" },
      {
        name: "description",
        content:
          "Join The Fat Bone Butcher community. Follow our cuts, braai cooks, butcher block updates, and share your #FatBone experience.",
      },
    ],
  }),
  component: SocialsPage,
});

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 justify-center">
      <span className="h-px w-6 bg-brand/40" />
      <span className="eyebrow">{children}</span>
      <span className="h-px w-6 bg-brand/40" />
    </div>
  );
}

const SOCIAL_CHANNELS = [
  {
    name: "Instagram",
    handle: "@thefatbonebutcher",
    followers: "12.4k Meat Lovers",
    desc: "Daily prime cut displays, dry-aging room drops, and weekend braai inspiration.",
    icon: Instagram,
    url: "https://instagram.com",
    btnLabel: "Follow on Instagram",
    color: "bg-pink-50 text-pink-700 border-pink-200",
  },
  {
    name: "Facebook",
    handle: "The Fat Bone Butcher Bulawayo",
    followers: "8.8k Community Members",
    desc: "Special hamper announcements, weekly pricing updates, and store notices at 129 Fort St.",
    icon: Facebook,
    url: "https://facebook.com",
    btnLabel: "Like our Page",
    color: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    name: "WhatsApp Channel",
    handle: "Fat Bone Butcher VIP Alerts",
    followers: "Daily Direct Updates",
    desc: "Instant notification when whole-carcass oxtail, prime rib, or fresh Kariba bream arrives.",
    icon: MessageCircle,
    url: "https://wa.me/263712851525",
    btnLabel: "Join WhatsApp VIP",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    name: "Twitter / X",
    handle: "@FatBoneButcher",
    followers: "4.5k Followers",
    desc: "Butchery craftsmanship, agriculture discussions, and pasture-raised farming in Zimbabwe.",
    icon: Twitter,
    url: "https://twitter.com",
    btnLabel: "Follow @FatBoneButcher",
    color: "bg-stone-100 text-stone-800 border-stone-300",
  },
];

const COMMUNITY_GALLERY = [
  {
    img: g3,
    caption: "Master butcher hand-trimming 28-day dry aged ribeye on our block.",
    tag: "#DryAgedBulawayo",
    author: "@bulawayochef",
  },
  {
    img: g1,
    caption: "Fresh pasture-raised beef short ribs ready for the weekend open coals.",
    tag: "#SundayBraai",
    author: "@tinashe_eats",
  },
  {
    img: g2,
    caption: "The cold room at 129 Fort St: whole-carcass hanging and prime sides.",
    tag: "#HonestCuts",
    author: "@thefatbonebutcher",
  },
  {
    img: butcherShop,
    caption: "Evening service at the butcher counter. Vacuum sealing custom hampers.",
    tag: "#129FortStreet",
    author: "@byo_foodies",
  },
  {
    img: recipes,
    caption: "Center-cut fillet medallions sliced thick for cast-iron skillet sear.",
    tag: "#BornFromTheBone",
    author: "@chipo_cooks",
  },
  {
    img: heroSteakDark,
    caption: "Prime T-Bone flame grilled over hot mopane embers.",
    tag: "#FatBoneExperience",
    author: "@braaimaster_zw",
  },
];

function SocialsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero Banner */}
      <section className="bg-cream py-16 sm:py-24 border-b border-border text-center">
        <div className="mx-auto max-w-4xl px-6 space-y-4">
          <Eyebrow>CONNECT & CELEBRATE HONEST CUTS</Eyebrow>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink">
            Share Your <span className="text-brand">#FatBone</span> Experience
          </h1>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We are all about lifelong tastes, honest cuts, and deep flavor. Tag us in your braai
            cooks, Sunday roasts, and kitchen creations to get featured on our butchery board!
          </p>
        </div>
      </section>

      {/* Official Social Channels */}
      <section className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
        <div className="text-center max-w-xl mx-auto mb-12">
          <Eyebrow>OFFICIAL CHANNELS</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold">Follow The Block</h2>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
            Get daily cut announcements, live butchering clips, and exclusive specials.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SOCIAL_CHANNELS.map((channel) => {
            const Icon = channel.icon;
            return (
              <div
                key={channel.name}
                className="bg-white border-2 border-stone-200 rounded-xl p-6 flex flex-col justify-between space-y-5 shadow-xs hover:shadow-md hover:border-brand/40 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-lg bg-red-50 border border-brand/20 text-brand flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-stone-100 text-stone-700">
                      {channel.followers}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-lg font-bold text-slate-900">
                      {channel.name}
                    </h3>
                    <p className="text-xs font-mono text-brand font-semibold">{channel.handle}</p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {channel.desc}
                  </p>
                </div>

                <a
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-md bg-stone-900 hover:bg-brand text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
                >
                  <span>{channel.btnLabel}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* Community Gallery Grid */}
      <section className="bg-sand/40 py-16 sm:py-24 border-y border-border">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
            <div>
              <Eyebrow>COMMUNITY SHOWCASE</Eyebrow>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold">
                Cooked by You, Cut by Us
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-lg leading-relaxed">
                A live snapshot of weekend braais, family gatherings, and gourmet steak dinners
                prepared with cuts from 129 Fort St.
              </p>
            </div>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-brand hover:bg-ink text-white text-xs font-extrabold uppercase tracking-wider transition-colors shadow-xs"
            >
              <Camera className="h-4 w-4" />
              <span>Tag #FatBoneButcher</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMMUNITY_GALLERY.map((item, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden bg-white border-2 border-stone-200 rounded-xl shadow-xs hover:shadow-lg transition-all"
              >
                <div className="aspect-[4/3] overflow-hidden bg-stone-100">
                  <img
                    src={item.img}
                    alt={item.caption}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-brand">{item.tag}</span>
                    <span className="text-stone-500 font-mono text-[11px]">{item.author}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Get Featured */}
      <section className="mx-auto max-w-5xl px-6 py-16 sm:py-20 text-center">
        <div className="bg-white border-2 border-stone-200 rounded-2xl p-8 sm:p-12 shadow-sm space-y-6">
          <div className="mx-auto w-14 h-14 rounded-full bg-red-50 border-2 border-brand/30 text-brand flex items-center justify-center">
            <Flame className="h-7 w-7" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
              Want your braai featured?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Snap a high-res photo or short reel of your sizzle, tag <strong>@thefatbonebutcher</strong> or
              WhatsApp your photos to <strong>+263 712 851 525</strong> with your recipe.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="https://wa.me/263712851525?text=Hello%20Fat%20Bone%20Butcher%2C%20here%20is%20a%20photo%20of%20my%20recent%20cook!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-md text-xs font-extrabold uppercase tracking-wider transition-colors shadow-xs"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Submit via WhatsApp</span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-stone-300 hover:border-brand text-slate-800 hover:text-brand rounded-md text-xs font-extrabold uppercase tracking-wider transition-colors"
            >
              <Instagram className="h-4 w-4" />
              <span>Instagram Tag</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
