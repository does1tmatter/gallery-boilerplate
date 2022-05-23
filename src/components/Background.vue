<script setup>
import skulls from '@/assets/img/skulls.svg'
</script>

<template>
  <div class="fixed top-0 left-0 min-h-screen min-w-full z-[-10] dark:invert transition-all opacity-[0.05]" :style="{
    backgroundImage: `url(${skulls})`
  }">

  </div>
</template>