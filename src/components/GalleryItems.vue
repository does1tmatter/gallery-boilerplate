<script setup>
import { onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useUtils } from '@/composables/'

const props = defineProps(['data', 'url'])
const route = useRoute()

const { getTokenId } = useUtils()

const getImageUrl = (id) => {
    return new URL(`../assets/img/jpeg/${id}.jpg`, import.meta.url).href
}
</script>

<template>
  <RouterLink v-for="(item, i) in data" :key="i" :to="`${url}${getTokenId(item.name)}`" class="relative uppercase tracking-tighter hover:scale-[1.03] transition-all rounded-xl overflow-hidden item shadow-xl shadow-black/[.15] dark:shadow-purple-200/[.15]">
      <div :data-aos="route.name === 'collection' ? 'fade-in' : ''">
        <img :src="getImageUrl(getTokenId(item.name))" :alt="item.name">
        <div class="text-center w-full bg-zinc-600 dark:bg-purple-600 transition-all text-white text-[12px]">{{ item.name }}</div>
      </div>
  </RouterLink>
</template>