<script setup lang="ts">
/**
 * 本文中の `バッククォート` で囲んだ部分をインラインコードとして表示する。
 * v-html を使わず、分割したセグメントを描画するので安全。
 */
const props = defineProps<{ text: string }>();

const segments = computed(() =>
  props.text
    .split(/(`[^`]+`)/g)
    .filter((seg) => seg.length > 0)
    .map((seg) => {
      const isCode = seg.startsWith("`") && seg.endsWith("`");
      return { isCode, value: isCode ? seg.slice(1, -1) : seg };
    }),
);
</script>

<template>
  <span>
    <template v-for="(seg, i) in segments" :key="i">
      <code
        v-if="seg.isCode"
        class="rounded-[3px] bg-code-bg px-1.5 py-0.5 font-mono text-[0.85em] text-brand-800"
        >{{ seg.value }}</code
      >
      <template v-else>{{ seg.value }}</template>
    </template>
  </span>
</template>
