<script setup lang="ts">
import type { BadgeVariant } from "~/types/cheatsheet";

const props = defineProps<{ variant: BadgeVariant }>();

const styles: Record<BadgeVariant, { label: string; class: string }> = {
  // 必須: 赤系（重要・必ず押さえる）
  must: {
    label: "必須",
    class: "bg-red-100 text-red-700 ring-1 ring-inset ring-red-200",
  },
  // 高頻度: 青系（よく出てくる・情報）
  high: {
    label: "高頻度",
    class: "bg-sky-100 text-sky-700 ring-1 ring-inset ring-sky-200",
  },
};

const badge = computed(() => styles[props.variant]);
</script>

<template>
  <span
    class="inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-bold tracking-wide"
    :class="badge.class"
  >
    {{ badge.label }}
  </span>
</template>
