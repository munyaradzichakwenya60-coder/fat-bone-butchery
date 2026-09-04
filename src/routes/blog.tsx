import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { X, Clock, Users, Flame, ShoppingBag, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/cart-context";

import recipes from "@/assets/recipes.webp";
import butcherShop from "@/assets/butcher-shop.webp";
import g1 from "@/assets/g1.webp";
import pRibeye from "@/assets/p-ribeye.webp";
import pMince from "@/assets/p-mince.webp";
import pFilet from "@/assets/p-filet.webp";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog & Butcher Recipes — The Fat Bone Butcher" },
      {
        name: "description",
        content:
          "Cooking guides, braai techniques, and recipes from the master butchers at The Fat Bone Butcher, Bulawayo.",
      },
    ],
  }),
  component: BlogPage,
});

interface RecipePost {
  id: string;
  img: string;
  title: string;
  date: string;
  time: string;
  serves: string;
  cutRecommended: string;
  cutPrice: number;
  cutImage: string;
  excerpt: string;
  ingredients: string[];
  steps: string[];
  butcherSecret: string;
}

const POSTS: RecipePost[] = [
  {
    id: "boerewors-braai",
    img: recipes,
    title: "Mastering the Authentic Bulawayo Boerewors Braai",
    date: "May 2026",
    time: "25 Mins",
    serves: "4–6 people",
    cutRecommended: "Traditional Champion Boerewors (1kg)",
    cutPrice: 14.0,
    cutImage: pRibeye,
    excerpt:
      "Why medium-hot coals and zero piercing are the golden rules for juicy, flavor-bursting traditional boerewors.",
    ingredients: [
      "1kg The Fat Bone Traditional Boerewors",
      "Fresh hot braai coals (camelthorn or mopane)",
      "Coarse salt and fresh ground black pepper",
      "Traditional sadza or crusty rolls to serve",
    ],
    steps: [
      "Build your fire early. Wait until the coals are grey with a gentle, consistent glow — never cook over active flames.",
      "Place the boerewors coil gently on the grill. NEVER pierce the casing with a fork; keeping the natural juices sealed inside is what preserves deep flavor.",
      "Turn carefully using tongs every 3–4 minutes until both sides develop a deep caramel brown crust.",
      "Rest the sausage for 3 minutes before slicing to allow the spices and juices to settle.",
    ],
    butcherSecret:
      "At The Fat Bone Butcher, we use a 80/20 lean-to-fat ratio with whole coriander seeds roasted in-house.",
  },
  {
    id: "braised-oxtail",
    img: g1,
    title: "The Art of Slow-Braised Oxtail in a Potjie",
    date: "April 2026",
    time: "3.5 Hours",
    serves: "6–8 people",
    cutRecommended: "Grass-Fed Beef Oxtail & Stew Chuck",
    cutPrice: 22.0,
    cutImage: pMince,
    excerpt:
      "Layering root vegetables, rich red wine reduction, and thick marrow cuts for melt-in-the-mouth winter stews.",
    ingredients: [
      "1.5kg The Fat Bone Oxtail & Beef Chuck",
      "2 large brown onions, roughly chopped",
      "4 cloves garlic and 2 sprigs fresh rosemary",
      "1 cup dry red wine and 500ml beef marrow stock",
      "Baby carrots, potatoes, and butter beans",
    ],
    steps: [
      "Sear the meat cuts in a cast iron pot until deeply browned on all sides, then set aside.",
      "Sweat the onions and garlic until translucent and fragrant.",
      "Deglaze the pot with red wine, scraping up all the fond, then add the beef stock and herbs.",
      "Return the meat, cover tightly, and simmer over low coals for 3 hours until gelatinous and tender.",
      "Add baby vegetables in the final 35 minutes of cooking.",
    ],
    butcherSecret:
      "Bone marrow from pasture-raised cattle naturally thickens the sauce without needing cornstarch.",
  },
  {
    id: "reverse-sear-steak",
    img: butcherShop,
    title: "How to Reverse-Sear a Thick-Cut T-Bone",
    date: "March 2026",
    time: "45 Mins",
    serves: "2 people",
    cutRecommended: "Prime Aged T-Bone (~500g)",
    cutPrice: 26.0,
    cutImage: pFilet,
    excerpt:
      "A butcher's breakdown of which cuts belong over low indirect heat first, followed by a screaming hot sear.",
    ingredients: [
      "1x The Fat Bone 1.5-inch Thick-Cut T-Bone",
      "2 tbsp clarified butter or beef tallow",
      "Flaky sea salt & coarse black pepper",
      "2 sprigs fresh thyme and 2 smashed garlic cloves",
    ],
    steps: [
      "Bring the steak to room temperature 30 minutes before cooking. Pat completely dry with butcher paper.",
      "Season generously with flaky salt and coarse black pepper on all sides.",
      "Bake or place on the cool side of the braai at 105°C (220°F) until internal temp hits 48°C (approx. 25 mins).",
      "Transfer immediately to a smoking-hot cast iron skillet with beef tallow. Sear for 60 seconds per side, basting with thyme and garlic butter.",
      "Rest 5 minutes on a warm cutting board before slicing against the grain.",
    ],
    butcherSecret:
      "Dry surface + thick cut = edge-to-edge pink center with a crunchy mahogany crust.",
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

function BlogPage() {
  const { addItem, formatPrice } = useCart();
  const [selectedPost, setSelectedPost] = useState<RecipePost | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Featured Header Banner: Recipes that'll make your mouth water */}
      <section className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] border-b border-border">
        <div className="flex flex-col justify-center bg-brand px-6 sm:px-10 lg:px-16 py-14 sm:py-20 text-brand-foreground">
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-cream/70 mb-2">
            BUTCHER'S KITCHEN & JOURNAL
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Recipes that'll make
            <br />
            your mouth water
          </h1>
          <p className="mt-4 sm:mt-5 max-w-md text-xs sm:text-sm leading-relaxed text-brand-foreground/85">
            Reverse-seared rib of beef, slow-braised shin, Sunday roast — written by our head
            butcher for real kitchens, with timings that actually work.
          </p>
          <div className="mt-6 sm:mt-8 flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-cream/80 font-bold">
              Explore Our Tested Guides Below ↓
            </span>
          </div>
        </div>
        <img
          src={recipes}
          alt="Master butcher slicing fresh beef tenderloin on cutting board"
          width={1400}
          height={900}
          loading="eager"
          decoding="async"
          className="h-64 sm:h-80 w-full object-cover lg:h-full"
        />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="grid gap-10 md:grid-cols-3">
          {POSTS.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col justify-between bg-white border border-ink/10 p-5 rounded-sm shadow-xs hover:shadow-md transition-all"
            >
              <div>
                <div className="overflow-hidden bg-secondary rounded-sm aspect-[4/3]">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 flex items-center gap-3 text-xs text-ink/60">
                  <span className="font-semibold uppercase tracking-wider text-brand">
                    {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {post.time}
                  </span>
                </div>
                <h2 className="mt-2 font-display text-xl font-bold leading-snug group-hover:text-brand transition-colors">
                  {post.title}
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-ink/10 flex items-center justify-between">
                <button
                  onClick={() => setSelectedPost(post)}
                  className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand hover:text-ink transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Read Full Recipe</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Recipe Modal */}
      {selectedPost && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="recipe-modal-title"
          className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4"
        >
          {/* High-Contrast Backdrop */}
          <div
            onClick={() => setSelectedPost(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            aria-hidden="true"
          />

          <div className="relative bg-white border-2 border-slate-300 shadow-2xl max-w-2xl w-full rounded-md overflow-hidden z-10 my-8 animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b-2 border-slate-200 flex items-center justify-between bg-[#f7f4ee]">
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-brand" />
                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand">
                  Butcher Master Recipe
                </span>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                aria-label="Close recipe dialog"
                className="p-1.5 text-slate-700 hover:text-black transition-colors rounded-full hover:bg-slate-200 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6 bg-white">
              <div>
                <h3
                  id="recipe-modal-title"
                  className="font-display text-2xl sm:text-3xl font-bold text-slate-900 leading-tight"
                >
                  {selectedPost.title}
                </h3>
                <div className="mt-3 flex items-center gap-4 text-xs sm:text-sm text-slate-800">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Clock className="h-4 w-4 text-brand" /> {selectedPost.time}
                  </span>
                  <span className="flex items-center gap-1.5 font-bold">
                    <Users className="h-4 w-4 text-brand" /> {selectedPost.serves}
                  </span>
                </div>
              </div>

              {/* Recommended Cut Card */}
              <div className="p-4 bg-[#f7f4ee] border-2 border-slate-200 rounded-md flex items-center justify-between gap-4 shadow-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedPost.cutImage}
                    alt={selectedPost.cutRecommended}
                    className="w-16 h-16 object-cover rounded-md border-2 border-slate-200 shadow-xs"
                  />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-brand block">
                      Recommended Cut
                    </span>
                    <h5 className="font-display text-base font-bold text-slate-900">
                      {selectedPost.cutRecommended}
                    </h5>
                    <p className="text-sm text-brand font-extrabold">
                      {formatPrice(selectedPost.cutPrice)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    addItem({
                      id: selectedPost.id,
                      name: selectedPost.cutRecommended,
                      price: selectedPost.cutPrice,
                      priceFormatted: `$${selectedPost.cutPrice.toFixed(2)}`,
                      image: selectedPost.cutImage,
                      cutOption: "Recipe Cut",
                    });
                    setSelectedPost(null);
                  }}
                  className="px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider bg-brand text-white hover:bg-ink transition-colors rounded shadow-xs shrink-0 flex items-center gap-1.5 cursor-pointer"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Add Cut</span>
                </button>
              </div>

              {/* Ingredients */}
              <div className="space-y-2.5">
                <h4 className="font-display text-lg font-bold text-slate-900">Ingredients</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-800 font-medium">
                  {selectedPost.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="h-2 w-2 rounded-full bg-brand shrink-0 mt-1.5" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Steps */}
              <div className="space-y-3">
                <h4 className="font-display text-lg font-bold text-slate-900">
                  Butcher Step-by-Step
                </h4>
                <ol className="space-y-3 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  {selectedPost.steps.map((st, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="font-extrabold text-brand font-mono text-sm shrink-0 mt-0.5">
                        {idx + 1}.
                      </span>
                      <span>{st}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Butcher Secret */}
              <div className="p-4 bg-red-50/70 border-l-4 border-brand text-xs sm:text-sm text-slate-900 font-medium rounded-r-md">
                <span className="font-extrabold not-italic text-brand block mb-1">
                  💡 Blockman's Secret:
                </span>
                "{selectedPost.butcherSecret}"
              </div>
            </div>

            <div className="p-4 border-t-2 border-slate-200 bg-[#f7f4ee] text-right">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-6 py-2.5 text-xs font-bold uppercase tracking-[0.16em] bg-slate-900 text-white hover:bg-brand transition-colors rounded-sm cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
