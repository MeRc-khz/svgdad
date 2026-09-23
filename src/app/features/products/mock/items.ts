// Live catalog — single product for launch. Mock products removed 2026-09-17.
// Backend catalog endpoint: when ENV.catalog is set in environments, getCatalog()
// switches from this static list to a real HTTP catalog automatically.
export const Items = [{
  "id": 0,
  "imgUri": "assets/images/products/bzrlnx-tee-front-clean.jpg",
  "imgUriAlt": "assets/images/products/bzrlnx-tee-back.jpg",
  "images": [
    "assets/images/products/bzrlnx-tee-front-clean.jpg",
    "assets/images/products/bzrlnx-tee-back.jpg"
  ],
  "title": "BzrLnx QR Tee",
  "fit": ["small","medium","large","x-large", "xx-large"],
  "description": "White cotton tee with the BzrLnx QR-code chest print — scan it, land on the site. Front graphic, QR back print.",
  "price": 35.00,
  "ordered": false,
  "quantity": 1
}];
