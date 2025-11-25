import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightThemeRapide from "starlight-theme-rapide";

export default defineConfig({
  integrations: [
    starlight({
      plugins: [starlightThemeRapide()],
      title: "Dokumentasi",
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
});
