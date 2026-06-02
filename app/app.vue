<template>
  <div class="relative min-h-screen">
    <!-- HUD風のドットグリッド（上部だけ薄く出す装飾レイヤー） -->
    <div
      aria-hidden="true"
      class="pointer-events-none fixed inset-0 -z-10"
      style="
        background-image: radial-gradient(
          rgba(31, 87, 51, 0.06) 1px,
          transparent 1.5px
        );
        background-size: 24px 24px;
        -webkit-mask-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.7),
          transparent 55%
        );
        mask-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.7),
          transparent 55%
        );
      "
    />
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
