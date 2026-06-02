import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["./app/assets/css/main.css"],

  app: {
    head: {
      htmlAttrs: { lang: "ja" },
      link: [
        // SVGを優先、.ico を旧ブラウザ向けフォールバックに
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        // ホーム画面追加用（Android: 名前・アイコン）。Service Worker は使わない軽量構成
        { rel: "manifest", href: "/manifest.webmanifest" },
      ],
      meta: [
        { name: "theme-color", content: "#f6f8f4" },
        // iOS のホーム画面の表示名・挙動
        { name: "apple-mobile-web-app-title", content: "Ladder" },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-status-bar-style", content: "default" },
        { name: "mobile-web-app-capable", content: "yes" },
      ],
    },
  },

  // SSG は `nuxt generate`（= package.json の build スクリプト）で行う。
  // generate がルート `/` と pages/ を自動でクロール＆事前レンダリングするため、
  // nitro.prerender の追加設定は不要。リンクで辿れない孤立ルートを足したくなった
  // ときだけ nitro.prerender.routes に書き加えること。

  // 型チェックは `bun run typecheck` / pre-push フックで実行（dev/build は速いまま）
  typescript: {
    strict: true,
    typeCheck: false,
  },

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ["shadcn-nuxt"],
  shadcn: {
    prefix: "",
    componentDir: "@/components/ui",
  },
});
