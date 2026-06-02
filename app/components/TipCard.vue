<script setup lang="ts">
import type { Tip } from "~/types/cheatsheet";

defineProps<{ tip: Tip }>();
</script>

<template>
  <article
    class="rounded-lg border border-line bg-white p-5 shadow-[0_1px_2px_rgba(20,40,28,0.04),0_8px_24px_-14px_rgba(20,40,28,0.16)]"
  >
    <header class="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <h3 class="font-display text-base font-bold text-ink">{{ tip.title }}</h3>
      <TipBadge :variant="tip.badge" />
    </header>

    <p class="mb-4 text-sm leading-relaxed text-ink-soft">
      <RichText :text="tip.desc" />
    </p>

    <CodeCompare
      v-if="tip.compare"
      :left="tip.compare.left"
      :right="tip.compare.right"
    />
    <CodeBlock v-else-if="tip.code" :code="tip.code.code" :lang="tip.code.lang" />
  </article>
</template>
