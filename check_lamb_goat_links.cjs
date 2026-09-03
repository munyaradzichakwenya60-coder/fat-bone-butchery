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
  for (const c of ["/product-category/lamb/", "/product-category/goat/"]) {
    const html = await fetchUrl("https://headsandhooves.co.zw" + c);
    // Find all links to products
    const links = html.match(/href="https:\/\/headsandhooves\.co\.zw\/product\/[^"]+"/g) || [];
    console.log(c, "product links:", Array.from(new Set(links)));
  }
}

run();
