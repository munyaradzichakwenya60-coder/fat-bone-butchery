const https = require("https");

function fetchUrl(urlStr) {
  return new Promise((resolve) => {
    https
      .get(
        urlStr,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            Accept: "text/html,*/*",
          },
        },
        (res) => {
          let data = "";
          res.on("data", (c) => (data += c));
          res.on("end", () => resolve(data));
        },
      )
      .on("error", () => resolve(""));
  });
}

async function run() {
  const cats = [
    "/product-category/super-beef/",
    "/product-category/commercial-beef/",
    "/product-category/processed-meats/",
  ];

  for (const c of cats) {
    const html = await fetchUrl("https://headsandhooves.co.zw" + c);
    const prods = html.match(/<li[^>]*class="[^"]*product[^"]*"[\s\S]*?<\/li>/gi) || [];
    console.log(`=== ${c} (${prods.length} products) ===`);
    prods.forEach((p) => {
      const title = (p.match(/<h[23][^>]*>([^<]+)<\/h[23]>/i) || [])[1];
      const img = (p.match(/<img[^>]+src="([^"]+)"/i) || [])[1];
      const price = (p.match(/<span class="woocommerce-Price-amount amount">([\s\S]*?)<\/span>/i) ||
        [])[1];
      console.log(` - ${title}: ${price ? price.replace(/<[^>]+>/g, "").trim() : ""} -> ${img}`);
    });
  }
}

run();
