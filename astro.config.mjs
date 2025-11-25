import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mermaid from "astro-mermaid";
import starlight from "@astrojs/starlight";
import starlightThemeRapide from "starlight-theme-rapide";
import starlightScrollToTop from "starlight-scroll-to-top";
import starlightAutoDrafts from "starlight-auto-drafts";

export default defineConfig({
  site: "http://localhost:4321",
  integrations: [
    mermaid({
      // Default theme: 'default', 'dark', 'forest', 'neutral', 'base'
      theme: "forest",
      autoTheme: true,
      mermaidConfig: {
        flowchart: {
          curve: "basis",
        },
      },
      iconPacks: [
        {
          name: "logos",
          loader: () =>
            fetch("https://unpkg.com/@iconify-json/logos@1/icons.json").then(
              (res) => res.json()
            ),
        },
        {
          name: "iconoir",
          loader: () =>
            fetch("https://unpkg.com/@iconify-json/iconoir@1/icons.json").then(
              (res) => res.json()
            ),
        },
      ],
    }),
    starlight({
      plugins: [
        starlightThemeRapide(),
        starlightAutoDrafts({
          highlights: {
            badges: true,
          },
        }),
        starlightScrollToTop({
          position: "right",
          tooltipText: "Back to top",
          showTooltip: false,
          smoothScroll: true,
          threshold: 10,
          svgStrokeWidth: 1.5,
          borderRadius: "20",
          showProgressRing: true,
          progressRingColor: "#011badff",
          showOnHomepage: true,
          svgPath: "M12 6L6 12M12 6L18 12M12 12L6 18M12 12L18 18",
        }),
      ],
      title: {
        id: "Dokumentasi",
        en: "Documentation",
        sn: "Pituduh",
      },
      defaultLocale: "root",
      locales: {
        root: { label: "Indonesia", lang: "id" },
        en: { label: "English" },
        sn: { label: "Sunda" },
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/zulfikriyahya",
        },
      ],
      sidebar: [
        {
          label: "Server",
          badge: { text: "Draft", variant: "caution", size: "small" },
          collapsed: false,
          autogenerate: {
            directory: "asesmen/server",
            attrs: { style: "font-style: italic" },
            collapsed: true,
          },
        },
        {
          label: "Jaringan",
          badge: { text: "Stable", variant: "success", size: "small" },
          collapsed: false,
          autogenerate: {
            directory: "asesmen/jaringan",
            attrs: { style: "font-style: italic" },
            collapsed: true,
          },
        },
        {
          label: "Aplikasi",
          badge: { text: "Draft", variant: "caution", size: "small" },
          collapsed: false,
          autogenerate: {
            directory: "asesmen/aplikasi",
            attrs: { style: "font-style: italic" },
            collapsed: true,
          },
        },
        {
          label: "Bantuan",
          badge: { text: "Draft", variant: "caution", size: "small" },
          collapsed: false,
          autogenerate: {
            directory: "asesmen/bantuan",
            attrs: { style: "font-style: italic" },
            collapsed: true,
          },
        },
      ],
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
