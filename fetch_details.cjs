const https = require("https");
const fs = require("fs");

function fetchPage(urlStr) {
  return new Promise((resolve) => {
    const parsed = new URL(urlStr);
    const options = {
      hostname: parsed.hostname,
      path: parsed.pathname,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
    };
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve(data));
    });
    req.on("error", () => resolve(""));
    req.end();
  });
}

const targetSlugs = [
  "super-t-bone",
  "choice-t-bone",
  "fillet",
  "sirloin",
  "rump",
  "short-ribs",
  "chuck",
  "standard-mince",
  "boerewors",
  "oxtail",
  "braai-steaks",
  "beef-chops",
  "whole-chicken",
  "breast",
  "chicken-thigh",
  "chicken-wings",
  "kariba-bream",
  "bream",
  "hake-fillet",
  "baby-hake",
  "mackerel",
  "goat-meat",
  "lamb-chops",
  "lamb-stew",
  "pork-loin",
  "pork-ribs-kg",
];

async function run() {
  const results = [];
  for (const slug of targetSlugs) {
    const url = `https://headsandhooves.co.zw/product/${slug}/`;
    const html = await fetchPage(url);
    if (!html) continue;

    const titleMatch =
      html.match(/<h1[^>]*class="[^"]*product_title[^"]*"[^>]*>([^<]+)<\/h1>/i) ||
      html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
    const priceMatch = html.match(/<p class="price">([\s\S]*?)<\/p>/i);
    // Main product image
    const imgMatches =
      html.match(/href="([^"]+wp-content\/uploads\/[^"]+\.(?:jpg|jpeg|png|webp))"/gi) ||
      html.match(/src="([^"]+wp-content\/uploads\/[^"]+\.(?:jpg|jpeg|png|webp))"/gi) ||
      [];

    const cleanImgs = Array.from(
      new Set(
        imgMatches
          .map((m) => m.replace(/^(?:href|src)="|"$|-300x\d+|-100x\d+|-150x\d+|-600x\d+/g, ""))
          .filter(
            (u) => !u.includes("logo") && !u.includes("icon") && !u.includes("e1783089796232"),
          ),
      ),
    );

    const priceText = priceMatch ? priceMatch[1].replace(/<[^>]+>/g, "").trim() : "";

    results.push({
      slug,
      title: titleMatch ? titleMatch[1].trim() : slug,
      price: priceText,
      images: cleanImgs,
    });
    console.log(
      `[${slug}] ${titleMatch ? titleMatch[1].trim() : slug}: ${cleanImgs.length} images found`,
    );
  }

  fs.writeFileSync("hh_details.json", JSON.stringify(results, null, 2));
}

run();
