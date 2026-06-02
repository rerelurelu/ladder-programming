/** チートシートのコンテンツを表す型定義（コンポーネントとページで共有） */

/** バッジの種類: must=必須 / high=高頻度 */
export type BadgeVariant = "must" | "high";

export interface CodeSnippet {
  lang: string;
  code: string;
}

/** TS↔Kotlin のような左右比較の片側 */
export interface CompareSide {
  label: string;
  lang?: string;
  code: string;
}

export interface Tip {
  title: string;
  badge: BadgeVariant;
  desc: string;
  /** 単一コードブロック */
  code?: CodeSnippet;
  /** 左右比較ブロック（code とは排他） */
  compare?: { left: CompareSide; right: CompareSide };
}

export interface Section {
  title: string;
  tips: Tip[];
}
