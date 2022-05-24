<script setup>
import { useUtils } from "@/composables/"
import { onMounted, ref, computed, watch } from "vue"
import {
  useInfiniteScroll,
  TransitionPresets,
  useTransition,
} from "@vueuse/core"
import meta from "@/assets/meta.json"
import GalleryItems from "@/components/GalleryItems.vue"
import AOS from 'aos'

const { paginate, generateFilters, createFilterObject, filterData } = useUtils()

const data = ref([])
const metadata = ref([...meta])

const pageNumber = ref(1)
const pageSize = ref(48)
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
  if (filters[key].includes(trait)) {
    filters[key].splice(filters[key].indexOf(trait), 1)
  } else {
    filters[key].push(trait)
  }
}

const resetAllFilters = () => {
  for (const key in filters) {
    key !== 'id' ? filters[key] = [] : filters[key] = null
  }
  selected.value = []
}

const resetId = () => {
  filters.id = null
}

watch(filters, () => search())

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
  setTimeout(() => AOS.refreshHard(), 500)
})
</script>

<template>
  <div class="flex flex-wrap px-4 pb-16 max-w-[1920px] mx-auto">
    <div
      class="w-full lg:sticky lg:max-w-[250px] shrink-0 top-[0px] lg:max-h-screen scrollbar-lightbox"
    >
      <div class="flex justify-between">
        <div class="flex gap-1 pl-4">
          <div>
            <div class="uppercase text-[10px] dark:text-purple-100 font-normal">
              Filter by ID
            </div>
            <input
              v-model="filters.id"
              type="number"
              min="1"
              max="10000"
              class="border border-zinc-500 dark:border-purple-300 rounded-sm py-1 pl-2 text-[12px] bg-transparent appearance-none text-center"
            />
          </div>
          <div v-if="filters.id" class="cursor-pointer self-end text-black dark:text-purple-400 fill-current" @click="resetId">
            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9584 4.25H12.0416C13.4108 4.24999 14.4957 4.24999 15.3621 4.33812C16.2497 4.42841 16.9907 4.61739 17.639 5.05052C18.1576 5.39707 18.6029 5.84239 18.9495 6.36104C19.3826 7.00926 19.5716 7.7503 19.6619 8.63794C19.75 9.5043 19.75 10.5892 19.75 11.9584V12.0416C19.75 13.4108 19.75 14.4957 19.6619 15.3621C19.5716 16.2497 19.3826 16.9907 18.9495 17.639C18.6029 18.1576 18.1576 18.6029 17.639 18.9495C16.9907 19.3826 16.2497 19.5716 15.3621 19.6619C14.4957 19.75 13.4108 19.75 12.0416 19.75H11.9584C10.5892 19.75 9.5043 19.75 8.63794 19.6619C7.7503 19.5716 7.00926 19.3826 6.36104 18.9495C5.84239 18.6029 5.39707 18.1576 5.05052 17.639C4.61739 16.9907 4.42841 16.2497 4.33812 15.3621C4.24999 14.4957 4.24999 13.4108 4.25 12.0416V11.9584C4.24999 10.5892 4.24999 9.5043 4.33812 8.63794C4.42841 7.7503 4.61739 7.00926 5.05052 6.36104C5.39707 5.84239 5.84239 5.39707 6.36104 5.05052C7.00926 4.61739 7.7503 4.42841 8.63794 4.33812C9.5043 4.24999 10.5892 4.24999 11.9584 4.25ZM14.5303 9.46967C14.8232 9.76256 14.8232 10.2374 14.5303 10.5303L13.0607 12L14.5303 13.4697C14.8232 13.7626 14.8232 14.2374 14.5303 14.5303C14.2374 14.8232 13.7626 14.8232 13.4697 14.5303L12 13.0607L10.5303 14.5303C10.2374 14.8232 9.76256 14.8232 9.46967 14.5303C9.17678 14.2374 9.17678 13.7626 9.46967 13.4697L10.9393 12L9.46967 10.5303C9.17678 10.2374 9.17678 9.76256 9.46967 9.46967C9.76256 9.17678 10.2374 9.17678 10.5303 9.46967L12 10.9393L13.4697 9.46967C13.7626 9.17678 14.2374 9.17678 14.5303 9.46967Z"/>
            </svg>
          </div>
        </div>
        <div
          class="text-[10px] uppercase -mt-1 text-zinc-200 dark:text-purple-200 tracking-normal font-normal self-end mb-1"
        >
          <Transition name="resetButton">
            <div
              v-if="isFiltering"
              class="cursor-pointer inline bg-black dark:bg-purple-400 dark:text-black p-1 rounded-md mr-1"
              @click="resetAllFilters"
            >
              Reset filters
            </div>
          </Transition>
          <span class="text-zinc-500 dark:text-purple-100">
            {{ resultSize.toFixed() }} Results
          </span>
          <div></div>
        </div>
      </div>
      <div v-for="(traits, key, indx) in traitList" :key="indx" class="mt-2">
        <div
          class="cursor-pointer uppercase tracking-tighter mt-6 mb-3 px-4 rounded-xl border-b border-zinc-500 dark:border-purple-500 pb-6"
          @click="expand"
        >
          {{ key }}
          <img
            src="@/assets/img/arrow.svg"
            alt=""
            class="w-[24] transition float-right pointer-events-none invert dark:invert-0"
          />
        </div>
        <div
          class="w-full px-6 max-h-80 h-0 scrollbar transition-all rounded-xl"
        >
          <div
            v-for="(trait, i) in traits"
            :key="i"
            class="flex items-center mt-1 text-[14px]"
          >
            <input
              v-model="selected[key + '_' + i]"
              type="checkbox"
              :id="`${key + i}`"
              class="appearance-none rounded-md bg-transparent border border-zinc-500 dark:border-purple-500 p-2 checked:bg-zinc-600 dark:checked:bg-purple-300"
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
          class="text-center grid max-w-[500px] sm:max-w-none mx-auto sm:mx-0 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-6 px-6 pb-4"
        >
          <GalleryItems :data="data" :url="'/collection/'" />
        </div>
        <button v-if="hasMore" class="bg-zinc-500 text-white dark:bg-purple-500 w-[50%] mb-4 text-xs py-1" @click="loadMore">
          Load more
        </button>
      </div>
    </Transition>
  </div>
</template>
