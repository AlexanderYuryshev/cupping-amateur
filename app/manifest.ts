import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Каппинг кофе",
    short_name: "Каппинг",
    description: "Приложение для заметок на каппинг-сессиях",
    start_url: "/",
    id: "/",
    display: "standalone",
    background_color: "#faf9f7",
    theme_color: "#78716c",
    orientation: "portrait-primary",
    scope: "/",
    lang: "ru",
    categories: ["food", "lifestyle", "utilities"],
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-192x192.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-192x192.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
