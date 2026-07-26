import manifest from "@/app/manifest";

test("declares regular and maskable web app icons", () => {
  expect(manifest()).toMatchObject({
    name: "Chorba - Clean Cooking Guides",
    short_name: "Chorba",
    description: "Turn any messy recipe link into a clean cooking guide.",
    start_url: "/",
    display: "standalone",
    icons: [
      { src: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { src: "/icon-512.png", type: "image/png", sizes: "512x512" },
      {
        src: "/icon-192-maskable.png",
        type: "image/png",
        sizes: "192x192",
        purpose: "maskable",
      },
      {
        src: "/icon-512-maskable.png",
        type: "image/png",
        sizes: "512x512",
        purpose: "maskable",
      },
    ],
  });
});
