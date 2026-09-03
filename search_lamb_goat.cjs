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

async function searchWordpress() {
  for (const q of ["lamb", "goat"]) {
    const html = await fetchUrl("https://headsandhooves.co.zw/?s=" + q + "&post_type=product");
    const prods = html.match(/<li[\s\S]*?<\/li>/gi) || [];
    const prodItems = prods.filter((p) => p.includes("product"));
    console.log(`=== Query: ${q} (${prodItems.length} items) ===`);
    prodItems.forEach((p) => {
      console.log("ITEM SNIPPET:", p.slice(0, 400));
    });
  }
}

searchWordpress();
