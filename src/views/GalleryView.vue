<script setup>
import { useUtils } from "@/composables/"
import { onMounted, ref, computed } from "vue"
import {
  useInfiniteScroll,
  TransitionPresets,
  useTransition,
} from "@vueuse/core"
import meta from "@/assets/meta.json"
import GalleryItems from "@/components/GalleryItems.vue"

const { paginate, generateFilters, createFilterObject, filterData } = useUtils()

const data = ref([])
const metadata = ref([...meta])

const pageNumber = ref(1)
const pageSize = ref(42)
const handleData = (array = metadata.value) => data.value.push(...paginate(array, pageSize.value, pageNumber.value))

const isLoaded = ref(false)

const traitList = generateFilters([...meta])
const filters = createFilterObject(traitList)
const selected = ref([])
const isFiltering = computed(() => Boolean(Object.values(filters).find((value) => value?.length !== 0)))

const search = () => {
  isLoaded.value = false
  pageNumber.value = 1
  data.value = []
  metadata.value = filterData([...meta], filters)
  handleData()
  isLoaded.value = true
}

const toggle = (key, trait) => {
  setTimeout(() => {
    if (filters[key].includes(trait)) {
      filters[key].splice(filters[key].indexOf(trait), 1)
    } else {
      filters[key].push(trait)
    }
    search()
  }, 10)
}

const resetAllFilters = () => {
  for (const key in filters) {
    key !== 'id' ? filters[key] = [] : filters[key] = null
  }
  selected.value = []
  search()
}

const resetId = () => {
  filters.id = null
  search()
}

const computedSize = computed(() => isFiltering.value ? metadata.value.length : [...meta].length)

const resultSize = useTransition(computedSize, {
  duration: 1000,
  transition: TransitionPresets.easeOutQuart,
})

const hasMore = computed(() => Boolean(data.value.length !== metadata.value.length))

const loadMore = () => {
  pageNumber.value++
  handleData()
}

const el = ref(window)
useInfiniteScroll(el, () => loadMore())

const expand = (event) => {
  event.target.nextSibling.classList.toggle("h-0")
  event.target.nextSibling.classList.toggle("mb-2")
  event.target.lastChild.classList.toggle("rotate-180")
}

onMounted(() => {
  handleData()
  isLoaded.value = true
})
</script>

<template>
  <div class="flex flex-wrap px-4 max-w-[1920px] mx-auto">
    <div
      class="w-full lg:sticky lg:max-w-xs shrink-0 top-[0px] lg:max-h-screen scrollbar-lightbox"
    >
      <div class="flex justify-between">
        <div class="flex gap-1 pl-4">
          <div>
            <div class="uppercase text-[10px] text-purple-100 font-normal">
              Filter by ID
            </div>
            <input
              v-model="filters.id"
              type="number"
              min="1"
              max="10000"
              class="border border-purple-300 rounded-sm py-1 pl-2 text-[12px] bg-transparent appearance-none text-center"
              @input="search"
            />
          </div>
          <img
            v-if="filters.id"
            src="@/assets/img/close.svg"
            class="cursor-pointer self-end"
            @click="resetId"
          />
        </div>
        <div
          class="text-[10px] uppercase -mt-1 text-purple-200 tracking-normal font-normal self-end"
        >
          <Transition name="resetButton">
            <div
              v-if="isFiltering"
              class="cursor-pointer inline bg-purple-500 p-1 rounded-md mr-1"
              @click="resetAllFilters"
            >
              Reset filters
            </div>
          </Transition>
          {{ resultSize.toFixed() }} Results
          <div></div>
        </div>
      </div>
      <div v-for="(traits, key, indx) in traitList" :key="indx" class="mt-2">
        <div
          class="cursor-pointer uppercase tracking-tighter my-6 px-4 rounded-xl border-b border-purple-500 pb-6"
          @click="expand"
        >
          {{ key }}
          <img
            src="@/assets/img/arrow.svg"
            alt=""
            class="w-[24] transition float-right pointer-events-none"
          />
        </div>
        <div
          class="w-full px-6 mt-3 max-h-80 h-0 scrollbar transition-all rounded-xl"
        >
          <div
            v-for="(trait, i) in traits"
            :key="i"
            class="flex items-center mt-2 text-[14px]"
          >
            <input
              v-model="selected[key + '_' + i]"
              type="checkbox"
              :id="`${key + i}`"
              class="appearance-none rounded-md bg-transparent border border-purple-500 p-2 checked:bg-purple-300"
              @click="toggle(key, trait)"
            />
            <label :for="`${key + i}`" class="ml-2">{{ trait }}</label>
          </div>
        </div>
      </div>
    </div>
    <Transition name="galleryAnim">
      <div v-if="!isLoaded" class="text-center">Loading</div>
      <div v-else-if="isLoaded" class="flex-1 text-center">
        <div
          class="text-center grid max-w-[500px] sm:max-w-none mx-auto sm:mx-0 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6 px-6 pb-4"
        >
          <GalleryItems :data="data" :url="''" />
        </div>
        <button v-if="hasMore" class="bg-purple-500 w-[50%] mb-4 text-xs py-1" @click="loadMore">
          Load more
        </button>
      </div>
    </Transition>
  </div>
</template>
