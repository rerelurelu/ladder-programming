/**
 * Shiki でコードをハイライトした HTML を返す。
 *
 * useAsyncData を使うことで、ハイライト処理は SSG のビルド時（サーバ）のみ実行され、
 * 結果は payload に直列化される。クライアントは shiki を読み込まず、焼き込まれた
 * HTML をそのまま再利用する（バンドルが軽くなる）。
 */

// 同一コードでキーが衝突するよう、コード文字列から安定したハッシュを作る
function hash(input: string): string {
  let h = 5381;
  for (let i = 0; i < input.length; i++) {
    h = (h * 33) ^ input.charCodeAt(i);
  }
  return (h >>> 0).toString(36);
}

export function useHighlighted(code: string, lang = "kotlin") {
  const trimmed = code.trim();
  return useAsyncData(`shiki-${lang}-${hash(trimmed)}`, async () => {
    const { codeToHtml } = await import("shiki");
    return codeToHtml(trimmed, { lang, theme: "catppuccin-latte" });
  });
}
