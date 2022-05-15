<script setup>
import { onMounted, ref, computed, watch } from "vue"
import { useUser, useUtils } from "@/composables/"
import GalleryItems from "@/components/GalleryItems.vue"
import { useInfiniteScroll } from "@vueuse/core"

const { ownedTokens, isAuthenticated } = useUser()
const { paginate } = useUtils()

const data = ref([])

const pageNumber = ref(1)
const pageSize = ref(25)

const handleData = (array = ownedTokens.value) =>
  data.value.push(...paginate(array, pageSize.value, pageNumber.value))

const loadMore = () => {
  pageNumber.value++
  handleData()
}

useInfiniteScroll(window, () => loadMore())

watch(ownedTokens, () => {
  data.value = []
  handleData()
})

const hasMore = computed(() =>
  Boolean(data.value.length !== ownedTokens.value.length)
)

onMounted(() => {
    handleData()
})
</script>

<template>
  <div class="text-center sm:pt-24 pb-16 max-w-[1200px] mx-auto">
    <div v-if="isAuthenticated">
      <div
        class="text-5xl uppercase tracking-tighter leading-none font-black text-purple-200"
      >
        My tokens
      </div>
      <div v-if="ownedTokens.length" class="text-center mt-8">
        <div
          class="text-center mt-8 grid max-w-[500px] sm:max-w-none mx-auto sm:mx-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-6 px-6"
        >
          <GalleryItems :data="data" />
        </div>
        <button
          v-if="hasMore"
          class="bg-purple-500 w-[50%] mb-4 text-xs py-1"
          @click="loadMore"
        >
          Load more
        </button>
      </div>
      <div v-else-if="!ownedTokens.length" class="text-center mt-8">
        No tokens owned. 😔
      </div>
    </div>
  </div>
</template>
