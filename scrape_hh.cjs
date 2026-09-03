const https = require("https");
const fs = require("fs");
const path = require("path");

function fetchUrl(urlStr) {
  return new Promise((resolve) => {
    const parsed = new URL(urlStr);
    const options = {
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
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

async function scrape() {
  const categories = [
    "https://headsandhooves.co.zw/shop/",
    "https://headsandhooves.co.zw/product-category/beef/",
    "https://headsandhooves.co.zw/product-category/chicken/",
    "https://headsandhooves.co.zw/product-category/lamb/",
    "https://headsandhooves.co.zw/product-category/goat/",
    "https://headsandhooves.co.zw/product-category/fish/",
    "https://headsandhooves.co.zw/product-category/pork/",
    "https://headsandhooves.co.zw/product-sitemap.xml",
  ];

  const products = new Map();

  for (const catUrl of categories) {
    console.log("Fetching", catUrl);
    const html = await fetchUrl(catUrl);
    if (!html) continue;

    // Look for sitemap URLs
    if (catUrl.endsWith(".xml")) {
      const locs =
        html.match(/<loc>(https:\/\/headsandhooves\.co\.zw\/product\/[^<]+)<\/loc>/g) || [];
      for (const locTag of locs) {
        const prodUrl = locTag.replace(/<\/?loc>/g, "");
        if (!products.has(prodUrl)) {
          products.set(prodUrl, { url: prodUrl });
        }
      }
      continue;
    }

    // Parse WooCommerce products from shop/category html
    // Look for <li class="...product..."> ... <img src="..." alt="..." ... /> ... <h2>...</h2> ... <span class="price">...</span>
    const prodRegex = /<li[^>]*class="[^"]*product[^"]*"[\s\S]*?<\/li>/gi;
    const matches = html.match(prodRegex) || [];
    console.log(`Found ${matches.length} products on ${catUrl}`);

    for (const card of matches) {
      const linkMatch = card.match(/href="([^"]*product\/[^"]*)"/);
      const imgMatch = card.match(/<img[^>]+src="([^"]+)"/);
      const titleMatch =
        card.match(
          /<h[23][^>]*class="[^"]*woocommerce-loop-product__title[^"]*"[^>]*>([^<]+)<\/h[23]>/i,
        ) || card.match(/<h[23][^>]*>([^<]+)<\/h[23]>/i);
      const priceMatch = card.match(
        /<span class="woocommerce-Price-amount amount">([\s\S]*?)<\/span>/i,
      );

      const url = linkMatch ? linkMatch[1] : null;
      const title = titleMatch ? titleMatch[1].trim() : null;
      let img = imgMatch ? imgMatch[1] : null;

      if (img) {
        // Upgrade thumbnail to full resolution by stripping -300x300 or similar
        img = img.replace(/-\d+x\d+(\.[a-zA-Z]+)$/, "$1");
      }

      if (url && (title || img)) {
        products.set(url, {
          url,
          title: title || (products.get(url) || {}).title,
          img: img || (products.get(url) || {}).img,
          rawPrice: priceMatch ? priceMatch[1].replace(/<[^>]+>/g, "").trim() : null,
        });
      }
    }
  }

  console.log(`Total unique products discovered: ${products.size}`);
  const list = Array.from(products.values());
  fs.writeFileSync("hh_products.json", JSON.stringify(list, null, 2));
  console.log(list.slice(0, 25));
}

scrape();
