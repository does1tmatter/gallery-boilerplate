<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useUtils } from '@/composables/'

const props = defineProps(['data'])

const { getTokenId, getImageUrl } = useUtils()
const route = useRoute()

const baseURL = route.path === '/' ? '' : route.path

</script>

<template>
  <RouterLink v-for="(item, i) in data" :key="i" :to="`${baseURL}/${getTokenId(item.name)}`" class="relative uppercase tracking-tighter border-[3px] border-purple-900 hover:border-purple-200 transition-all duration-500 rounded-xl overflow-hidden">
      <img :src="getImageUrl(getTokenId(item.name))" :alt="item.name">
      <div class="text-center w-full bg-purple-600 text-[12px]">{{ item.name }}</div>
  </RouterLink>
</template>