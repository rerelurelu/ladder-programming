<script setup lang="ts">
useHead({ title: "Ladder — プログラミングTips" });

// 公開しているチートシートの一覧（増えたらここに足す）
const sheets = [
  {
    slug: "kotlin",
    title: "Kotlin API開発 チートシート",
    desc: "TypeScript経験者向け — 出現頻度が高い文法・テクニック",
  },
];
</script>

<template>
  <main class="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
    <header class="reveal mb-14">
      <p
        class="mb-4 font-mono text-xs font-bold uppercase tracking-[0.3em] text-brand-700"
      >
        Operator Field Manual
      </p>
      <h1
        class="font-display text-5xl font-black tracking-tight text-ink sm:text-6xl"
      >
        Ladder
      </h1>
      <p
        class="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-base"
      >
        学んだことを少しずつ。プログラミングTips置き場。
      </p>
      <div class="mt-6">
        <span class="font-mono text-[0.7rem] uppercase tracking-wider text-ink-soft">
          {{ String(sheets.length).padStart(2, "0") }} sheets / JP
        </span>
      </div>
    </header>

    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="(sheet, i) in sheets"
        :key="sheet.slug"
        :to="`/${sheet.slug}`"
        class="group relative flex flex-col rounded-lg border border-line bg-white p-5 shadow-[0_1px_2px_rgba(20,40,28,0.04),0_8px_24px_-14px_rgba(20,40,28,0.16)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-[0_2px_4px_rgba(20,40,28,0.05),0_18px_44px_-18px_rgba(31,87,51,0.28)]"
      >
        <!-- HUDコーナーブラケット（ホバーで出現） -->
        <span
          aria-hidden="true"
          class="pointer-events-none absolute right-2 top-2 h-3.5 w-3.5 border-r-2 border-t-2 border-brand-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        <span class="font-mono text-xs font-bold text-gold-800">
          {{ String(i + 1).padStart(2, "0") }}
        </span>
        <h2
          class="mt-2 font-display text-lg font-bold text-ink transition group-hover:text-brand-700"
        >
          {{ sheet.title }}
        </h2>
        <p class="mt-2 text-sm leading-relaxed text-ink-soft">{{ sheet.desc }}</p>
        <span
          class="mt-4 inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-brand-700"
        >
          Open
          <span aria-hidden="true" class="transition group-hover:translate-x-0.5"
            >→</span
          >
        </span>
      </NuxtLink>
    </div>
  </main>
</template>
