import React from "react";

interface BrushImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  style?: React.CSSProperties;
}

export function BrushImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  style,
}: BrushImageProps) {
  return (
    <div className={`relative overflow-visible ${className}`} style={style}>
      {/* Top Distressed Brush Border */}
      <div className="pointer-events-none absolute -top-5 -left-2 -right-2 z-10 h-10 select-none overflow-visible">
        <svg viewBox="0 0 1000 45" preserveAspectRatio="none" className="h-full w-full" fill="none">
          {/* Solid White Mask cutting into image from above */}
          <path
            d="M0 0 L1000 0 L1000 24 
               C980 20 965 27 940 22 
               C915 17 890 28 860 21 
               C830 15 810 29 780 23 
               C750 18 730 27 700 20 
               C670 14 650 29 620 22 
               C590 16 570 28 540 21 
               C510 15 490 29 460 22 
               C430 16 410 28 380 20 
               C350 13 330 29 300 22 
               C270 16 250 28 220 21 
               C190 15 170 29 140 20 
               C110 12 90 28 60 22 
               C35 17 15 26 0 22 Z"
            fill="#ffffff"
          />

          {/* Jagged white bristle teeth extending downward */}
          <path
            d="M20 22 L24 32 L28 22 M55 21 L59 34 L64 21 M105 20 L110 33 L116 20 
               M175 22 L180 35 L186 21 M245 20 L250 34 L256 21 M315 22 L320 36 L326 21 
               M385 19 L390 33 L396 20 M455 22 L460 37 L466 21 M525 20 L530 35 L536 21 
               M595 21 L600 36 L606 20 M665 19 L670 34 L676 21 M735 22 L740 37 L746 20 
               M805 21 L810 35 L816 22 M875 19 L880 34 L886 21 M945 22 L950 36 L956 20"
            fill="#ffffff"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Main Dark Grunge Brush Stroke Band */}
          <path
            d="M-10 20 Q120 16 260 21 Q400 17 550 22 Q700 16 850 21 Q950 18 1010 20"
            stroke="#1a1c1e"
            strokeWidth="5.5"
            strokeDasharray="45 8 110 12 70 7 160 14 85 9 140 11 90 6"
            strokeLinecap="round"
            opacity="0.95"
          />
          <path
            d="M-5 24 Q150 28 300 23 Q450 27 600 22 Q750 28 900 23 Q980 26 1005 24"
            stroke="#111827"
            strokeWidth="3.5"
            strokeDasharray="80 12 40 6 120 14 60 8 140 10 75 7 110 12"
            strokeLinecap="round"
            opacity="0.88"
          />

          {/* Dry Bristles & Stray Splatters Above */}
          <path
            d="M10 13 Q180 8 360 12 Q540 9 720 13 Q880 9 990 12"
            stroke="#1a1c1e"
            strokeWidth="2"
            strokeDasharray="18 10 45 14 12 8 65 15 25 10 50 12 15 7 70 18"
            strokeLinecap="round"
            opacity="0.75"
          />
          <path
            d="M30 7 Q200 4 400 6 Q600 3 800 6 Q920 4 970 7"
            stroke="#222"
            strokeWidth="1.2"
            strokeDasharray="10 14 30 18 8 12 40 20 15 14 28 16"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path
            d="M5 28 Q140 25 280 29 Q420 26 560 30 Q700 26 840 29 Q940 27 995 28"
            stroke="#1a1c1e"
            strokeWidth="1.8"
            strokeDasharray="15 6 35 9 10 5 45 8 20 6 55 10 12 5"
            strokeLinecap="round"
            opacity="0.7"
          />

          {/* Specks & Texture Dots */}
          <circle cx="45" cy="10" r="1.2" fill="#1a1c1e" opacity="0.8" />
          <circle cx="125" cy="6" r="1.5" fill="#1a1c1e" opacity="0.7" />
          <circle cx="210" cy="11" r="1" fill="#1a1c1e" opacity="0.8" />
          <circle cx="340" cy="5" r="1.4" fill="#1a1c1e" opacity="0.6" />
          <circle cx="480" cy="8" r="1.6" fill="#1a1c1e" opacity="0.75" />
          <circle cx="615" cy="5" r="1.2" fill="#1a1c1e" opacity="0.7" />
          <circle cx="740" cy="9" r="1.5" fill="#1a1c1e" opacity="0.8" />
          <circle cx="860" cy="6" r="1.3" fill="#1a1c1e" opacity="0.65" />
          <circle cx="930" cy="11" r="1.1" fill="#1a1c1e" opacity="0.75" />
        </svg>
      </div>

      {/* Main Image */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover ${imgClassName}`}
      />

      {/* Bottom Distressed Brush Border */}
      <div className="pointer-events-none absolute -bottom-5 -left-2 -right-2 z-10 h-10 select-none overflow-visible">
        <svg viewBox="0 0 1000 45" preserveAspectRatio="none" className="h-full w-full" fill="none">
          {/* Solid White Mask cutting into image from below */}
          <path
            d="M0 45 L1000 45 L1000 21 
               C980 25 965 18 940 23 
               C915 28 890 17 860 24 
               C830 30 810 16 780 22 
               C750 27 730 18 700 25 
               C670 31 650 16 620 23 
               C590 29 570 17 540 24 
               C510 30 490 16 460 23 
               C430 29 410 17 380 25 
               C350 32 330 16 300 23 
               C270 29 250 17 220 24 
               C190 30 170 16 140 25 
               C110 33 90 17 60 23 
               C35 28 15 19 0 23 Z"
            fill="#ffffff"
          />

          {/* Jagged white bristle teeth extending upward */}
          <path
            d="M30 23 L34 11 L39 23 M80 24 L85 10 L91 24 M150 22 L155 9 L161 22 
               M220 24 L225 10 L231 24 M290 23 L295 8 L301 23 M360 25 L365 11 L371 25 
               M430 22 L435 8 L441 22 M500 24 L505 9 L511 24 M570 23 L575 8 L581 23 
               M640 25 L645 10 L651 25 M710 22 L715 8 L721 22 M780 24 L785 9 L791 24 
               M850 23 L855 10 L861 23 M920 25 L925 11 L931 25"
            fill="#ffffff"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Main Dark Grunge Brush Stroke Band */}
          <path
            d="M-10 24 Q130 28 270 23 Q410 27 560 22 Q710 28 860 23 Q960 26 1010 24"
            stroke="#1a1c1e"
            strokeWidth="5"
            strokeDasharray="60 10 130 14 55 8 150 12 95 10 120 8 80 12"
            strokeLinecap="round"
            opacity="0.95"
          />
          <path
            d="M-5 21 Q140 17 290 22 Q440 18 590 23 Q740 17 890 22 Q975 19 1005 21"
            stroke="#111827"
            strokeWidth="3"
            strokeDasharray="100 15 45 8 90 12 70 9 130 11 60 8"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Dry Bristles & Stray Splatters Below (Just like in screenshot) */}
          <path
            d="M15 32 Q190 37 370 33 Q550 36 730 32 Q890 36 985 33"
            stroke="#1a1c1e"
            strokeWidth="2.2"
            strokeDasharray="35 12 60 16 20 10 80 18 40 12 65 14 30 9"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M25 38 Q210 42 410 39 Q610 42 810 39 Q930 41 975 38"
            stroke="#222"
            strokeWidth="1.5"
            strokeDasharray="20 16 45 20 15 14 55 22 25 16 40 18"
            strokeLinecap="round"
            opacity="0.65"
          />
          <path
            d="M50 43 Q250 45 480 43 Q680 46 880 43"
            stroke="#333"
            strokeWidth="1"
            strokeDasharray="12 18 28 22 10 16 35 24"
            strokeLinecap="round"
            opacity="0.5"
          />

          {/* Specks & Texture Dots */}
          <circle cx="65" cy="36" r="1.3" fill="#1a1c1e" opacity="0.75" />
          <circle cx="155" cy="40" r="1.5" fill="#1a1c1e" opacity="0.65" />
          <circle cx="270" cy="35" r="1.2" fill="#1a1c1e" opacity="0.8" />
          <circle cx="395" cy="41" r="1.6" fill="#1a1c1e" opacity="0.7" />
          <circle cx="515" cy="37" r="1.1" fill="#1a1c1e" opacity="0.75" />
          <circle cx="670" cy="40" r="1.4" fill="#1a1c1e" opacity="0.65" />
          <circle cx="790" cy="35" r="1.2" fill="#1a1c1e" opacity="0.8" />
          <circle cx="910" cy="39" r="1.5" fill="#1a1c1e" opacity="0.7" />
        </svg>
      </div>
    </div>
  );
}
