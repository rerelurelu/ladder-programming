# Ladder

> 学んだことを少しずつ。個人のプログラミング Tips / チートシート置き場。

澄んだ白基調に淡いセージグリーンを差した、軽やかでアクセシブルな静的サイト。
コンテンツは Vue コンポーネントで直接組み、**SSG** で配信する。

## 技術スタック

| 領域 | 採用 |
| --- | --- |
| フレームワーク | [Nuxt 4](https://nuxt.com/) / Vue 3（SSG: `nuxt generate`） |
| スタイル | [Tailwind CSS v4](https://tailwindcss.com/)（CSSファースト・`@theme` トークン）/ [shadcn-nuxt](https://www.shadcn-vue.com/) |
| コードハイライト | [Shiki](https://shiki.style/)（`catppuccin-latte`・ビルド時に焼き込み） |
| 言語 | TypeScript（strict） |
| パッケージ管理 | [Bun](https://bun.sh/) |
| Lint / フォーマット | [Biome](https://biomejs.dev/) |
| Git フック | [lefthook](https://lefthook.dev/)（pre-commit 整形 / pre-push 型チェック） |
| ホスティング | Vercel |

## セットアップ

```bash
bun install
```

## コマンド

```bash
bun run dev        # 開発サーバ (http://localhost:3000)
bun run build      # SSG ビルド（= nuxt generate）。出力は .output/public
bun run preview    # 生成物をローカルでプレビュー
bun run typecheck  # vue-tsc による型チェック
bun run lint       # Biome チェック
bun run lint:fix   # Biome 自動修正
bun run format     # Biome フォーマット
```

## ディレクトリ構成

```
app/
├─ app.vue                 # ルート（背景・NuxtPage）
├─ assets/css/main.css     # @theme デザイントークン・グローバルスタイル
├─ components/             # CheatPage / CheatSection / TipCard / TipBadge / CodeBlock / CodeCompare / RichText
├─ composables/            # useHighlighted（Shiki）
├─ pages/                  # index（一覧）/ kotlin（チートシート）
└─ types/                  # コンテンツの型
docs/design-guidelines.md  # デザイン規約（配色・タイポ・禁止事項）
public/                    # favicon / PWA アイコン / manifest
```

## 新しいチートシートを足す

1. `app/pages/<slug>.vue` を作り、コンテンツを `sections` 配列で持つ
2. `<CheatPage :title :description :sections />` で組む
3. `app/pages/index.vue` の `sheets` に1行追加する

色やレイアウトは共有コンポーネントとデザイントークンに任せれば、デザインが揃う。
詳細は [`docs/design-guidelines.md`](./docs/design-guidelines.md) を参照。

## デプロイ

Vercel に接続するだけ。`build`（= `nuxt generate`）で `.output/public` に静的出力され、そのまま配信される。
SEO は対象外、ダークテーマは持たない（ライトテーマのみ）。

---

開発の前提や規約は [`CLAUDE.md`](./CLAUDE.md) に、デザインのルールは
[`docs/design-guidelines.md`](./docs/design-guidelines.md) にまとめてある。
