<script setup lang="ts">
const props = withDefaults(defineProps<{ code: string; lang?: string }>(), {
  lang: "kotlin",
});

const { data: html } = await useHighlighted(props.code, props.lang);
</script>

<template>
  <!-- v-html の中身はビルド時に Shiki が生成した信頼できる HTML -->
  <div class="code-block" v-html="html ?? ''" />
</template>
