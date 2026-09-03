const https = require("https");
const fs = require("fs");
const path = require("path");

const destDir = path.join(__dirname, "src", "assets", "products");
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const items = [
  {
    name: "t-bone.jpg",
    url: "https://headsandhooves.co.zw/wp-content/uploads/2026/06/t-bone_600x.jpg",
  },
  {
    name: "fillet.jpg",
    url: "https://headsandhooves.co.zw/wp-content/uploads/2026/06/Tenderloin-vs_-Filet-Mignon-Tastylicious.jpg",
  },
  {
    name: "rump-steak.jpg",
    url: "https://headsandhooves.co.zw/wp-content/uploads/2026/06/USDA-Organic-Beef-Picanha-_-Wild-Fork-Foods-_-Wild-Fork-Foods.jpg",
  },
  {
    name: "chuck-roast.jpg",
    url: "https://headsandhooves.co.zw/wp-content/uploads/2026/06/Chuck-Roast-Boneless.jpg",
  },
  {
    name: "boerewors.jpg",
    url: "https://headsandhooves.co.zw/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-11-at-09.07.37.jpeg",
  },
  {
    name: "short-ribs.jpg",
    url: "https://headsandhooves.co.zw/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-11-at-10.08.21.jpeg",
  },
  {
    name: "braai-steaks.jpg",
    url: "https://headsandhooves.co.zw/wp-content/uploads/2026/06/raw-steak.jpg",
  },
  {
    name: "oxtail.jpg",
    url: "https://headsandhooves.co.zw/wp-content/uploads/2026/06/Charolais-Ochsenschwanz-in-Scheiben.jpg",
  },
  {
    name: "beef-mince.jpg",
    url: "https://headsandhooves.co.zw/wp-content/uploads/2026/06/Tajine-de-keftas-aux-courgettes-et-poivrons.jpg",
  },
  {
    name: "whole-chicken.jpg",
    url: "https://headsandhooves.co.zw/wp-content/uploads/2026/06/Juicy-Spatchcock-Chicken-Recipe-1-1.jpg",
  },
  {
    name: "chicken-breast.jpg",
    url: "https://headsandhooves.co.zw/wp-content/uploads/2026/06/Chicken-Breast-1kg.jpg",
  },
  {
    name: "chicken-thighs.jpg",
    url: "https://headsandhooves.co.zw/wp-content/uploads/2026/06/Teriyaki-Chicken-Thighs-1.jpg",
  },
  {
    name: "chicken-cuts.jpg",
    url: "https://headsandhooves.co.zw/wp-content/uploads/2026/06/The-Best-Brined-Fried-Chicken.jpg",
  },
  {
    name: "chicken-wings.jpg",
    url: "https://headsandhooves.co.zw/wp-content/uploads/2026/06/Pileca-krilca-Pakovanje_-1-kg-Zemlja-porekla_-Srbija.jpg",
  },
  {
    name: "kariba-bream.jpg",
    url: "https://headsandhooves.co.zw/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-11-at-09.26.46.jpeg",
  },
  {
    name: "hake-fillet.jpg",
    url: "https://headsandhooves.co.zw/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-11-at-10.56.33.jpeg",
  },
  {
    name: "baby-hake.png",
    url: "https://headsandhooves.co.zw/wp-content/uploads/2026/06/HAKE-FILLET-e1673680024471.png",
  },
  {
    name: "pork-ribs.jpg",
    url: "https://headsandhooves.co.zw/wp-content/uploads/2026/06/Rare-Breed-Pork-Belly-Ribs.jpg",
  },
  {
    name: "pork-chops.jpg",
    url: "https://headsandhooves.co.zw/wp-content/uploads/2026/06/opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2018__05__Sous-Vide-Pork-Chops-2-METHOD-6213631163ae435a81dbae61e65ca12f.jpg",
  },
];

function downloadItem(item) {
  return new Promise((resolve) => {
    const filePath = path.join(destDir, item.name);
    const file = fs.createWriteStream(filePath);
    https
      .get(
        item.url,
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
          },
        },
        (res) => {
          if (res.statusCode !== 200) {
            console.error(`Failed ${item.name}: Status ${res.statusCode}`);
            file.close();
            resolve(false);
            return;
          }
          res.pipe(file);
          file.on("finish", () => {
            file.close();
            const stat = fs.statSync(filePath);
            console.log(`Downloaded ${item.name} (${stat.size} bytes)`);
            resolve(true);
          });
        },
      )
      .on("error", (err) => {
        console.error(`Error downloading ${item.name}:`, err.message);
        resolve(false);
      });
  });
}

async function downloadAll() {
  for (const item of items) {
    await downloadItem(item);
  }
  console.log("All downloads completed.");
}

downloadAll();
