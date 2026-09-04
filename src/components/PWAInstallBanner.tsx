import React, { useEffect, useState } from "react";
import { Download, X, WifiOff, Wifi, Smartphone } from "lucide-react";
import { toast } from "sonner";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode (already installed)
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true
    ) {
      setIsInstalled(true);
    }

    // Check if previously dismissed
    const dismissed = localStorage.getItem("fatbone_pwa_dismissed");
    if (dismissed && Date.now() - parseInt(dismissed, 10) < 1000 * 60 * 60 * 24 * 7) {
      setIsDismissed(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      toast.success("The Fat Bone Butcher app is installed on your device!");
    };

    const handleOnline = () => {
      toast.success("Back online! Connected to butchery store.", {
        icon: <Wifi className="h-4 w-4 text-emerald-500" />,
      });
    };

    const handleOffline = () => {
      toast.info("Offline mode active. You can still browse cuts and saved hampers.", {
        icon: <WifiOff className="h-4 w-4 text-amber-500" />,
        duration: 5000,
      });
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setDeferredPrompt(null);
      }
    } catch (err) {
      console.error("PWA install error:", err);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem("fatbone_pwa_dismissed", Date.now().toString());
  };

  if (isInstalled || isDismissed || !deferredPrompt) {
    return null;
  }

  return (
    <aside
      aria-label="Install App"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-40 bg-zinc-900/95 backdrop-blur-md border border-amber-500/30 rounded-xl p-4 shadow-2xl text-cream animate-in slide-in-from-bottom duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-lg bg-brand/20 border border-brand/40 flex items-center justify-center text-brand shrink-0">
          <Smartphone className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="font-display font-bold text-sm tracking-wide text-cream">
              Install Fat Bone App
            </h4>
            <button
              onClick={handleDismiss}
              className="text-zinc-400 hover:text-white p-0.5 rounded transition-colors cursor-pointer"
              aria-label="Dismiss install banner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
            Install to your home screen for fast meat ordering, offline access, and cut updates.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={handleInstallClick}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-brand hover:bg-brand-dark text-white text-xs font-semibold tracking-wide shadow-xs transition-colors cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              Install App
            </button>
            <button
              onClick={handleDismiss}
              className="px-2.5 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
