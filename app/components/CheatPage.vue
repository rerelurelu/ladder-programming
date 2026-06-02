<script setup lang="ts">
import type { Section } from "~/types/cheatsheet";

/**
 * チートシートページの共有レイアウト。
 * 新しいチートシートは「データ + <CheatPage>」だけで同じデザインになる。
 */
defineProps<{ title: string; description?: string; sections: Section[] }>();
</script>

<template>
  <main class="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
    <NuxtLink
      to="/"
      class="group mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-soft transition hover:text-brand-700"
    >
      <span aria-hidden="true" class="transition group-hover:-translate-x-0.5"
        >←</span
      >
      Index
    </NuxtLink>

    <header class="mb-12">
      <p
        class="mb-3 font-mono text-[0.72rem] font-bold uppercase tracking-[0.28em] text-brand-700"
      >
        // Field Notes
      </p>
      <h1
        class="font-display text-3xl font-black leading-tight tracking-tight text-ink sm:text-4xl"
      >
        {{ title }}
      </h1>
      <p
        v-if="description"
        class="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft sm:text-base"
      >
        {{ description }}
      </p>
    </header>

    <CheatSection
      v-for="(section, i) in sections"
      :key="section.title"
      :section="section"
      class="reveal"
      :style="{ animationDelay: `${i * 70}ms` }"
    />
  </main>
</template>
