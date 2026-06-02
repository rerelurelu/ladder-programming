<script setup lang="ts">
import type { Section } from "~/types/cheatsheet";

defineProps<{ section: Section }>();
</script>

<template>
  <section class="mb-12">
    <!-- セクション見出し: 金の菱形 ◆ ＋ オペレーター調のラベル -->
    <div class="mb-5 flex items-center gap-3">
      <span aria-hidden="true" class="text-[0.7rem] text-gold-600">◆</span>
      <h2
        class="font-mono text-[0.72rem] font-bold uppercase tracking-[0.22em] text-brand-700"
      >
        {{ section.title }}
      </h2>
    </div>
    <!-- コード可読性のためカードは1列フル幅。比較ブロックはカード内部でグリッド分割する -->
    <div class="grid grid-cols-1 gap-4">
      <TipCard v-for="tip in section.tips" :key="tip.title" :tip="tip" />
    </div>
  </section>
</template>
