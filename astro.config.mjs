import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mermaid from "astro-mermaid";
import starlight from "@astrojs/starlight";
import starlightThemeRapide from "starlight-theme-rapide";
import starlightScrollToTop from "starlight-scroll-to-top";

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
        // {
        //   label: "...",
        //   autogenerate: { directory: "..." },
        // },
        {
          label: "Server",
          items: [
            { label: "Pendahuluan", slug: "asesmen/server" },
            { label: "Spesifikasi Server", slug: "asesmen/server/spesifikasi" },
            {
              label: "Instalasi Sistem Operasi",
              slug: "asesmen/server/install-os",
            },
            {
              label: "Konfigurasi Sistem Operasi",
              slug: "asesmen/server/konfigurasi-os",
            },
            {
              label: "Instalasi Database Server",
              slug: "asesmen/server/install-database",
            },
            {
              label: "Konfigurasi Database Server",
              slug: "asesmen/server/konfigurasi-database",
            },
            {
              label: "Instalasi Web Server",
              slug: "asesmen/server/install-web",
            },
            {
              label: "Konfigurasi Web Server",
              slug: "asesmen/server/konfigurasi-web",
            },
          ],
        },
        {
          label: "Jaringan",
          items: [
            { label: "Pendahuluan", slug: "asesmen/jaringan" },
            {
              label: "Spesifikasi Perangkat Jaringan",
              slug: "asesmen/jaringan/spesifikasi",
            },
            {
              label: "Konfigurasi Router",
              slug: "asesmen/jaringan/konfigurasi-router",
            },
            {
              label: "Konfigurasi Access Point",
              slug: "asesmen/jaringan/konfigurasi-ap",
            },
          ],
        },
        {
          label: "Aplikasi",
          items: [{ label: "Pendahuluan", slug: "asesmen/aplikasi" }],
        },
        {
          label: "Bantuan",
          items: [
            { label: "Pendahuluan", slug: "asesmen/bantuan" },
            { label: "Bantuan Server", slug: "asesmen/bantuan/server" },
            { label: "Bantuan Jaringan", slug: "asesmen/bantuan/jaringan" },
            { label: "Bantuan Aplikasi", slug: "asesmen/bantuan/aplikasi" },
          ],
        },
      ],
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
