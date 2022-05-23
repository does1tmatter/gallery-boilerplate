<script setup>
import skulls from '@/assets/img/skulls.svg'
</script>

<template>
  <div class="fixed top-0 left-0 z-[-10] min-h-screen min-w-full">
    <div class="fixed top-0 left-0 min-h-screen min-w-full dark:invert transition-all opacity-[0.05]" :style="{
      backgroundImage: `url(${skulls})`
    }">
    <div class="fixed top-0 left-0 min-h-screen bg-gradient-to-b from-transparent to-zinc-300 dark:to-purple-900 w-full"></div>
    </div>
  </div>
</template>