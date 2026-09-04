import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Mail,
  Check,
  ChevronDown,
  ChevronUp,
  Send,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us & Location — The Fat Bone Butcher | Bulawayo" },
      {
        name: "description",
        content:
          "Visit The Fat Bone Butcher at 129 Fort Street (btwn 13th & 14th Ave), Bulawayo. Call / WhatsApp +263 712 851 525.",
      },
    ],
  }),
  component: ContactPage,
});

const FAQS = [
  {
    q: "Where exactly are you located in Bulawayo?",
    a: "We are located at 129 Fort Street, between 13th and 14th Avenue in Bulawayo Central. Easy access and street parking available right outside our counter.",
  },
  {
    q: "How does delivery in Bulawayo work?",
    a: "We offer refrigerated delivery across all Bulawayo suburbs (Kumalo, Hillside, Suburbs, Bradfield, Burnside, Ascot, North End, Morningside, etc.). Orders over $50 receive free delivery!",
  },
  {
    q: "I live in the UK/Diaspora. Can I order meat hampers for my family in Bulawayo?",
    a: "Yes! Use our Diaspora WhatsApp line (+44 7762 068799). We accept UK bank transfers, WorldRemit, Mukuru, and international cards. We package the hamper and deliver directly to your family's doorstep in Bulawayo.",
  },
  {
    q: "Can I request custom cutting and vacuum packing?",
    a: "Absolutely. Our master butchers can cut your steaks to your preferred thickness (e.g. 1.5-inch braai cut), dice stew meat into potjie cubes, or split orders into 500g or 1kg vacuum sealed freezer packs at no extra charge.",
  },
  {
    q: "What payment methods do you accept at the counter?",
    a: "We accept USD cash, ZiG cash & card (swipe), EcoCash, InnBucks, and Mukuru pay-in.",
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

function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone && message) {
      setSubmitted(true);
      setTimeout(() => {
        setName("");
        setPhone("");
        setMessage("");
      }, 4000);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="bg-cream py-16 sm:py-20 border-b border-border text-center">
        <div className="mx-auto max-w-4xl px-6">
          <Eyebrow>GET IN TOUCH · VISIT THE SHOP</Eyebrow>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-bold">Contact & Location</h1>
          <p className="mt-3 text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Opening soon in the heart of Bulawayo. Visit our butchery counter on Fort Street or
            place your order via phone or WhatsApp.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-2 items-start">
          {/* Details & Location */}
          <div className="space-y-9">
            <div className="pb-6 border-b border-ink/10">
              <h2 className="font-display text-2xl sm:text-3xl font-bold">The Fat Bone Butcher</h2>
              <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">
                High grade meat with great taste for every meal. Born from the bone, cut with care.
              </p>
            </div>

            <div className="space-y-7 text-sm">
              <div className="flex items-start gap-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand mt-0.5">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold uppercase tracking-wider text-xs text-ink/70">
                    Our Location
                  </h3>
                  <p className="mt-1.5 text-ink font-medium">
                    129 Fort Street (between 13th & 14th Avenue)
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">Bulawayo, Zimbabwe</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand mt-0.5">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold uppercase tracking-wider text-xs text-ink/70">
                    Phone & Local Orders
                  </h3>
                  <p className="mt-1.5 font-semibold text-brand text-base">
                    <a href="tel:+263712851525" className="hover:underline">
                      +263 712 851 525
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand mt-0.5">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold uppercase tracking-wider text-xs text-ink/70">
                    WhatsApp Lines
                  </h3>
                  <div className="mt-2.5 flex flex-wrap gap-2.5">
                    <a
                      href="https://wa.me/263712851525?text=Hello%20The%20Fat%20Bone%20Butcher,%20I%20would%20like%20to%20order"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-semibold transition-colors shadow-xs"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>Local (+263 712 851 525)</span>
                    </a>
                    <a
                      href="https://wa.me/447762068799?text=Hello%20The%20Fat%20Bone%20Butcher,%20I%20am%20ordering%20from%20Diaspora"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded text-xs font-semibold transition-colors shadow-xs"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>Diaspora UK (+44 7762 068799)</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand mt-0.5">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold uppercase tracking-wider text-xs text-ink/70">
                    Counter Operating Hours
                  </h3>
                  <div className="mt-2 text-xs sm:text-sm text-muted-foreground space-y-1.5">
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span className="text-ink font-semibold min-w-[125px]">Mon – Fri:</span>
                      <span>7:30 AM – 6:00 PM</span>
                    </div>
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span className="text-ink font-semibold min-w-[125px]">Saturday:</span>
                      <span>7:30 AM – 6:30 PM</span>
                    </div>
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span className="text-ink font-semibold min-w-[125px]">Sunday & Holidays:</span>
                      <span>8:00 AM – 1:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bulawayo Map Visual */}
            <div className="mt-8 p-5 sm:p-6 bg-sand/60 border border-ink/15 rounded-sm text-xs text-ink/80 space-y-2 leading-relaxed">
              <span className="font-bold uppercase tracking-wider text-[10px] text-brand block">
                🗺️ Fort Street Location Directions
              </span>
              <p>
                Located centrally on <strong>Fort Street</strong> between{" "}
                <strong>13th Avenue and 14th Avenue</strong>. Look for our signage and signature
                deep burgundy entrance. Ample curbside parking for quick order pick-ups.
              </p>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="bg-sand/90 border border-ink/15 p-8 sm:p-10 rounded-sm shadow-sm">
            <h3 className="font-display text-2xl font-bold text-ink">Send an Inquiry</h3>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Have a question about whole carcass orders, braai catering, restaurant supply, or
              diaspora payments?
            </p>

            {submitted ? (
              <div className="mt-8 p-6 bg-emerald-50 border border-emerald-300 rounded text-emerald-900 space-y-2 animate-in zoom-in-95">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-emerald-600" />
                  <span className="font-bold">Inquiry Sent Successfully!</span>
                </div>
                <p className="text-xs text-emerald-800">
                  Our butcher manager will get back to you shortly on WhatsApp or phone.
                </p>
              </div>
            ) : (
              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-ink/80">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sipho Ndlovu"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-brand rounded"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-ink/80">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+263 7... or +44 7..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-brand rounded"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-ink/80">
                    Message / Meat Order Inquiry *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us what cuts, quantities, or catering details you need..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full border border-border bg-white p-3 text-sm outline-none focus:border-brand rounded"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-foreground hover:bg-ink transition-colors flex items-center justify-center gap-2 cursor-pointer rounded"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Send Message to The Fat Bone Butcher</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="mt-20 pt-16 border-t border-ink/10">
          <div className="text-center max-w-xl mx-auto mb-12">
            <Eyebrow>FREQUENTLY ASKED QUESTIONS</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-bold">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, index) => (
              <div
                key={index}
                className="border border-ink/15 rounded bg-white overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full p-4 text-left font-display text-base font-semibold flex items-center justify-between gap-4 hover:bg-cream/50 transition-colors"
                >
                  <span>{faq.q}</span>
                  {openFaqIndex === index ? (
                    <ChevronUp className="h-4 w-4 text-brand shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-ink/50 shrink-0" />
                  )}
                </button>
                {openFaqIndex === index && (
                  <div className="px-4 pb-4 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-ink/5 pt-3 animate-in fade-in-50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
