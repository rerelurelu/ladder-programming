# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ UI / デザインを実装・変更する前に

**`docs/design-guidelines.md` を必ず読んでから着手すること。**
世界観・カラートークン・タイポグラフィ・バッジ・コード表示・レスポンシブ・**禁止事項
（グラデ罫線や divider を使わない／外部フォント禁止／詳細カードはホバーなし 等）** を定めている。
このルールに反する実装はしない。

## プロジェクトの目的

個人の学習成果・Tips/チートシートを置く静的サイト。SEOは考慮不要。コンテンツは
Markdown CMSではなく **Vueコンポーネントとして直接ハードコード** して組み立てる方針
（参考イメージはカード＋バッジ＋コード比較ブロック型のチートシート）。配信は **SSG**。

## パッケージマネージャ

**Bun**（`bun.lock` を採用）。`npm`/`pnpm`/`yarn` は使わない。

## コマンド

```bash
bun run dev        # 開発サーバ (http://localhost:3000)
bun run build      # === nuxt generate（SSG）。.output/public に静的出力
bun run generate   # build と同じ（明示用）
bun run preview    # 生成物をローカルでプレビュー
bun run typecheck  # vue-tsc による型チェック（strict）
bun run lint       # Biome チェック（修正なし）
bun run lint:fix   # Biome 自動修正
bun run format     # Biome フォーマットのみ
```

shadcn コンポーネントの追加は shadcn-vue CLI 経由（例: `bunx shadcn-vue@latest add button`）。
追加先は `app/components/ui/`。

## アーキテクチャ / 重要な前提

- **Nuxt 4**。ソースは `app/` ディレクトリ配下（`app/app.vue`, `app/assets/`, ページは
  `app/pages/`、UIは `app/components/`）。`tsconfig.json` は `.nuxt/` の生成設定を参照するだけ。

- **SSGがこのリポジトリの肝**。`build` スクリプトは通常の `nuxt build`（サーバ向け）ではなく
  **`nuxt generate` に差し替えてある**。`nuxt generate` がルート `/` と `app/pages/` を
  自動でクロール＆事前レンダリングするため、`nuxt.config.ts` に `nitro.prerender` の追加設定は
  **不要**。リンクで辿れない孤立ルート（例: `/sitemap.xml`）を足すときだけ
  `nitro.prerender.routes` に追記する。デプロイ先は Vercel（`build` を叩くだけで静的化）。

- **shadcn-nuxt**: `nuxt.config.ts` の `shadcn` で `prefix: ''`・`componentDir: '@/components/ui'`
  を設定（Nuxt 4 では実体は `app/components/ui`）。`components.json` は持たず Nuxt モジュールが管理。

- **Tailwind CSS v4**: `@tailwindcss/vite` プラグイン経由（`nuxt.config.ts` の `vite.plugins`）。
  エントリは `app/assets/css/main.css`。`@theme` でデザイントークン（`brand`/`azure`/`gold`/`ink`/
  `line`/`code-bg` 等）を一元定義しており、これが配色の単一ソース。詳細は `docs/design-guidelines.md`。

- **TypeScript**: `strict: true`。`typeCheck` は dev/build を軽く保つため **off**にしてあり、
  型検証は `bun run typecheck` と pre-push フックで行う。

## Lint / フォーマット（Biome）

- `biome.json` で管理。スタイルは **ダブルクォート・スペースインデント・セミコロンあり**、
  `organizeImports` 有効。`bun.lock` は対象外。
- 設定変更時は recommended ルールを基準にする。

## Git フック（lefthook）

`lefthook.yml` で管理（`bun install` の postinstall で自動インストール）。

- **pre-commit**: ステージ済みファイルに `biome check --write` を実行し、**修正結果を再ステージ**。
  汚いコードはコミットに入らない。
- **pre-push**: `bun run typecheck`（重いのでコミット毎ではなくプッシュ時）。

## コミット規約

Conventional Commits（`feat`/`fix`/`docs`/`style`/`refactor`/`perf`/`test`/`build`/`ci`/`chore`）、
**説明は日本語**、subjectは72文字以内。1コミット＝1論理変更（アトミック）を守る。
