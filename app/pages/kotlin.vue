<script setup lang="ts">
import type { Section } from "~/types/cheatsheet";

useHead({ title: "Kotlin API開発 チートシート | Ladder" });

// コンテンツはハードコード。Shiki でハイライトするため、コードは生文字列で持つ。
// テンプレートリテラル内の `${ }` は補間されないよう `\${` でエスケープしている。
const sections: Section[] = [
  {
    title: "Null Safety",
    tips: [
      {
        title: "?. — Safe Call（セーフコール）",
        badge: "must",
        desc: "`null` かもしれないオブジェクトのメソッドを安全に呼ぶ。`null` なら呼ばずに `null` を返す。",
        code: {
          lang: "kotlin",
          code: `// nullだったらnullを返す、例外は投げない
val userId = task?.user?.id   // user が null なら userId も null

// TypeScript の ?. と同じ感覚
// const userId = task?.user?.id`,
        },
      },
      {
        title: "?: — Elvis演算子",
        badge: "must",
        desc: "`null` のとき右辺を返す。`return` や `throw` も書けるのが TS の `??` との大きな違い。",
        compare: {
          left: {
            label: "TypeScript ??",
            lang: "typescript",
            code: `// 値の代替しかできない
const name = user ?? "anonymous"`,
          },
          right: {
            label: "Kotlin ?:",
            lang: "kotlin",
            code: `// return / throw も書ける
val task = repo.findById(id)
  ?: return ResponseEntity.notFound().build()

val user = repo.findById(id)
  ?: throw NoSuchElementException()`,
          },
        },
      },
      {
        title: "!! — Non-null Assertion",
        badge: "high",
        desc: "「絶対 `null` じゃない」と断言する。`null` だったら `NullPointerException` が投げられる。多用は禁物。",
        code: {
          lang: "kotlin",
          code: `val name = user!!.name  // user が null なら NPE`,
        },
      },
    ],
  },
  {
    title: "Scope Functions",
    tips: [
      {
        title: "let — null チェックとブロック実行",
        badge: "must",
        desc: "`?.let { }` で `null` でないときだけブロックを実行する。`it` でオブジェクトを参照。",
        code: {
          lang: "kotlin",
          code: `// null でないときだけ実行
task?.let {
    println(it.title)  // it = task
}

// TypeScript の等価コード
// if (task !== null) { console.log(task.title) }`,
        },
      },
      {
        title: "also / apply — オブジェクトの設定",
        badge: "high",
        desc: "`also` は `it` でオブジェクト参照・自身を返す。`apply` は `this` で参照・自身を返す。",
        code: {
          lang: "kotlin",
          code: `// also: ログ出力などの副作用に使う
val task = taskRepository.save(newTask)
    .also { log.info("saved: \${it.id}") }

// apply: オブジェクト初期化に使う
val task = Task().apply {
    title = "タスク"
    status = "TODO"
}`,
        },
      },
    ],
  },
  {
    title: "Extension Functions（拡張関数）",
    tips: [
      {
        title: "既存クラスにメソッドを追加",
        badge: "must",
        desc: "クラスを継承せずにメソッドを追加できる。Entity→DTO変換でよく使う。",
        code: {
          lang: "kotlin",
          code: `// Task クラスに toResponse() を追加
fun Task.toResponse() = TaskResponse(
    id = id,
    title = title,
    status = status,
)

// 呼び出し側はメソッドのように使える
val response = task.toResponse()`,
        },
      },
    ],
  },
  {
    title: "data class",
    tips: [
      {
        title: "DTO・値オブジェクトに最適",
        badge: "must",
        desc: "`equals` / `hashCode` / `toString` / `copy` が自動生成される。Java の Lombok の `@Data` に相当。",
        code: {
          lang: "kotlin",
          code: `data class TaskResponse(
    val id: Long,
    val title: String,
    val status: String,
)

// copy() で一部だけ変更した新しいオブジェクトを作れる
val updated = response.copy(status = "DONE")`,
        },
      },
    ],
  },
  {
    title: "Collection Operations",
    tips: [
      {
        title: "map / filter / find",
        badge: "must",
        desc: "TS の `Array.map` と同じ感覚。ラムダのパラメータが1つのとき `it` で省略できる。",
        code: {
          lang: "kotlin",
          code: `// map — Entity → DTO 変換でよく使う
val responses = tasks.map { it.toResponse() }

// filter
val todos = tasks.filter { it.status == "TODO" }

// find — 最初の1件 or null
val task = tasks.find { it.id == targetId }`,
        },
      },
    ],
  },
  {
    title: "when 式",
    tips: [
      {
        title: "switch より強力な分岐",
        badge: "high",
        desc: "値を返す式として使える。型チェックや範囲チェックも書ける。",
        code: {
          lang: "kotlin",
          code: `// 値を返す式として使う
val label = when (status) {
    "TODO"        -> "未着手"
    "IN_PROGRESS" -> "進行中"
    "DONE"        -> "完了"
    else          -> "不明"
}

// 型チェックにも使える
when (error) {
    is NotFoundException  -> ResponseEntity.notFound().build()
    is ValidationException -> ResponseEntity.badRequest().build()
    else                   -> ResponseEntity.internalServerError().build()
}`,
        },
      },
    ],
  },
  {
    title: "Named Arguments / Default Parameters",
    tips: [
      {
        title: "引数名指定・デフォルト値",
        badge: "high",
        desc: "引数が多いオブジェクトの生成で可読性が上がる。デフォルト値でオーバーロード不要。",
        code: {
          lang: "kotlin",
          code: `data class Task(
    val title: String,
    val status: String = "TODO",   // デフォルト値
    val description: String? = null,
)

// 引数名を指定して渡す → 順番を気にしなくていい
Task(
    title = "タスク",
    description = "説明",
    // status は省略 → "TODO" になる
)`,
        },
      },
    ],
  },
  {
    title: "String Templates",
    tips: [
      {
        title: "文字列補間",
        badge: "must",
        desc: "TS のテンプレートリテラルと同じ感覚。`$変数名` または `${式}` で埋め込む。",
        code: {
          lang: "kotlin",
          code: `val id = 1L
log.info("User not found: $id")
log.info("Count: \${tasks.size}")  // 式は {} で囲む`,
        },
      },
    ],
  },
];
</script>

<template>
  <CheatPage
    title="Kotlin API開発 チートシート"
    description="TypeScript経験者向け — 出現頻度が高い文法・テクニックまとめ"
    :sections="sections"
  />
</template>
