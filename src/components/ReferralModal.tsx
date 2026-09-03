import React, { useState } from "react";
import { X, Copy, Check, Gift, Share2 } from "lucide-react";

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEmail?: string;
}

export function ReferralModal({ isOpen, onClose, initialEmail = "" }: ReferralModalProps) {
  const [copied, setCopied] = useState(false);
  const referralCode = "CLEAVER20";
  const referralUrl = `https://assemble-beauty.vercel.app/?ref=${referralCode}`;

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="referral-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4"
    >
      {/* High-Contrast Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        aria-hidden="true"
      />

      <div className="relative bg-white border-2 border-slate-300 shadow-2xl max-w-md w-full rounded-md overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b-2 border-slate-200 flex items-center justify-between bg-[#f7f4ee]">
          <div className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-brand" />
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand">
              Give $20, Get $20
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close referral dialog"
            className="p-1.5 text-slate-700 hover:text-black transition-colors rounded-full hover:bg-slate-200 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 text-center bg-white">
          <div className="space-y-2">
            <h3
              id="referral-modal-title"
              className="font-display text-2xl font-bold text-slate-900 leading-snug"
            >
              Your Exclusive Referral Link
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed max-w-xs mx-auto">
              Share your link with family and friends in Bulawayo or in the diaspora. When they
              place their first meat order, you both get $20 off!
            </p>
          </div>

          <div className="p-3 bg-slate-100 border-2 border-slate-300 rounded-md flex items-center justify-between gap-2 shadow-xs">
            <span className="text-xs font-mono font-bold text-slate-900 truncate">
              {referralUrl}
            </span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-extrabold uppercase tracking-wider bg-brand text-white hover:bg-ink transition-colors rounded cursor-pointer shrink-0 shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-300 stroke-[3]" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>

          <div className="pt-2 flex justify-center gap-3">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`Hey! Get $20 off your first grass-fed meat box from The Fat Bone Butcher in Bulawayo using my link: ${referralUrl}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white rounded transition-colors shadow-sm"
            >
              <Share2 className="h-4 w-4" />
              <span>Share on WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="p-4 border-t-2 border-slate-200 bg-[#f7f4ee] text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-black transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
