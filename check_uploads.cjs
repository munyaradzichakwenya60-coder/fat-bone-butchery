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

async function checkUploads() {
  const html = await fetchUrl("https://headsandhooves.co.zw/");
  const imgs = html.match(/https:\/\/headsandhooves\.co\.zw\/wp-content\/uploads\/[^\s"']+/g) || [];
  const matches = imgs.filter((i) => /lamb|goat|mutton/i.test(i));
  console.log("Uploads with lamb/goat on homepage:", matches);
}

checkUploads();
