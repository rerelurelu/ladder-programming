<script setup lang="ts">
import type { CompareSide } from "~/types/cheatsheet";

defineProps<{ left: CompareSide; right: CompareSide }>();
</script>

<template>
  <!-- グリッドの子は既定で min-width:auto のため、min-w-0 を付けないと
       中の <pre> が幅を押し広げてカードからはみ出す（overflow-x が効かない） -->
  <div class="grid gap-3 sm:grid-cols-2">
    <div class="min-w-0">
      <div
        class="mb-2 font-mono text-[0.7rem] font-bold uppercase tracking-wider text-azure-700"
      >
        {{ left.label }}
      </div>
      <CodeBlock :code="left.code" :lang="left.lang ?? 'typescript'" />
    </div>
    <div class="min-w-0">
      <div
        class="mb-2 font-mono text-[0.7rem] font-bold uppercase tracking-wider text-brand-700"
      >
        {{ right.label }}
      </div>
      <CodeBlock :code="right.code" :lang="right.lang ?? 'kotlin'" />
    </div>
  </div>
</template>
