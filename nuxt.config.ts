import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["./app/assets/css/main.css"],

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
