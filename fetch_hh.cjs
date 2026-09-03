const https = require("https");

function fetchPage(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "headsandhooves.co.zw",
      path: path,
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
    };
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ status: res.statusCode, headers: res.headers, data }));
    });
    req.on("error", reject);
    req.end();
  });
}

async function run() {
  try {
    const res = await fetchPage("/");
    console.log("Homepage status:", res.status, "Length:", res.data.length);
    if (res.headers.location) {
      console.log("Redirect to:", res.headers.location);
    }
    const matches = res.data.match(/https?:\/\/[^"'\s<>]+?\.(?:jpg|jpeg|png|webp)/gi) || [];
    console.log("Image URLs found:", Array.from(new Set(matches)).slice(0, 40));
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

run();
