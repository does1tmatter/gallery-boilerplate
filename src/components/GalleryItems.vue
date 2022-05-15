<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useUtils, useLightbox } from '@/composables/'

const props = defineProps(['data'])

const { getTokenId } = useUtils()
const { showBox } = useLightbox()

const route = useRoute()

const getImageUrl = (id) => {
    return new URL(`../assets/img/jpeg/${id}.jpg`, import.meta.url).href
}

const test = import.meta.env.BASE_URL

const baseURL = computed(() => route.path === '/' ? '' : showBox.value ? '' : route.path)

</script>

<template>
  <RouterLink v-for="(item, i) in data" :key="i" :to="`${baseURL}/${getTokenId(item.name)}`" class="relative uppercase tracking-tighter border-[3px] border-purple-900 hover:border-purple-200 transition-all duration-500 rounded-xl overflow-hidden">
      <div data-aos="fade-in">
        <img :src="getImageUrl(getTokenId(item.name))" :alt="item.name">
        <div class="text-center w-full bg-purple-600 text-[12px]">{{ item.name }}</div>
      </div>
  </RouterLink>
</template>