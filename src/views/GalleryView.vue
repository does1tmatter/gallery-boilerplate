<script setup>
import { useUtils, useLightbox } from '@/composables/'
import { onMounted, ref, computed, watch } from 'vue'
import { useInfiniteScroll, TransitionPresets, useTransition, useScroll } from '@vueuse/core'
import { RouterLink } from 'vue-router'
import meta from '@/assets/meta.json'

const metadata = ref([...meta])
const contract = import.meta.env.VITE_CONTRACT_ADDRESS

const { Lightbox, showBox, openBox, closeBox, checkModal } = useLightbox()
const { paginate, fixURL, getTokenId, generateFilters, createFilterObject } = useUtils()
const traitList = generateFilters([...meta])

const filters = createFilterObject(traitList)

const pageNumber = ref(1)
const pageSize = ref(25)

const handleData = (array = metadata.value) => data.value.push(...paginate(array, pageSize.value, pageNumber.value))

const data = ref([])
const searchArray = ref([])

const el = ref(window)

useInfiniteScroll(el, () => {
    pageNumber.value++
    if (searchArray.value.length) handleData(searchArray.value)
    if (!searchArray.value.length) handleData()
})

const { y } = useScroll(window)


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

const resetCategory = (category) => filters[category] = []

const resetAllFilters = () => { 
    console.log(filters)
    filters.forEach(item => {
        if (item === typeof Array) {
            console.log('array!')
        }
    })
    filters.id = null
}

const filterData = (_metadata, _filters) => {
    const filterById = (token) => _filters.id ? Number(_filters.id) === getTokenId(token.name) : true
    const filterByTraits = (token) => Object.entries(_filters).filter(([ key, value ]) => value?.length).map(([key, value]) => key).every(key => _filters[key].includes(token.attributes?.find(attribute => attribute.trait_type === key)?.value))
    return _metadata
            .filter(filterById)
            .filter(filterByTraits)
            .sort((a, b) => getTokenId(a.name) + getTokenId(b.name))
}

const search = () => {
    pageNumber.value = 1
    data.value = []
    metadata.value = filterData([...meta], filters)
    handleData()
}

const selected = ref([])

const resetId = () => {
    filters.id = null
    search()
}

const getImageUrl = (id) => {
        return new URL(`../assets/img/jpeg/${id}.jpg`, import.meta.url).href
    }

const expand = (event) => {
    event.target.nextSibling.classList.toggle('h-0')
    event.target.nextSibling.classList.toggle('mb-2')
    event.target.lastChild.classList.toggle('rotate-180')
}

const isFiltering = computed(() => Boolean(Object.values(filters).find(value => value?.length !== 0)))

const computedSize = computed(() => isFiltering.value.length ? metadata.value.length : [...meta].length)

const resultSize = useTransition(computedSize, {
  duration: 1000,
  transition: TransitionPresets.easeOutQuart,
})

const isScrolled = computed(() => Boolean(y.value))

const isLoaded = computed(() => Boolean(data.value.length))

onMounted(() => {
    checkModal()
    handleData()
})
</script>

<template>
    <div class="flex flex-wrap px-4 pb-24 pt-[120px] max-w-[1920px] mx-auto">
        <div class="w-full lg:fixed lg:max-w-xs shrink-0 top-[120px] max-h-screen scrollbar">
            <div class="flex justify-between">
                <div class="flex gap-1 pl-4">
                    <div>
                        <div class="uppercase text-[10px] text-purple-100 font-normal">Filter by ID</div>
                        <input v-model="filters.id" type="number" min="1" max="10000" class="border border-purple-300 rounded-sm py-1 pl-2 text-[12px] bg-transparent appearance-none text-center" @input="search">
                    </div>
                    <img v-if="filters.id" src="@/assets/img/close.svg" class="cursor-pointer self-end" @click="resetId">
                </div>
                <div class="text-[10px] uppercase -mt-1 text-purple-200 tracking-normal font-normal self-end">
                    <!-- <Transition name="resetButton">
                        <div v-if="isFiltering" class="cursor-pointer" @click="resetAllFilters">
                            Reset filters
                        </div>
                    </Transition> -->
                    <div>
                        {{ resultSize.toFixed() }} Results
                    </div>
                </div>
            </div>
            <div v-for="(traits, key, indx) in traitList" :key="indx" class="mt-2">
                <div class="cursor-pointer uppercase tracking-tighter my-6 px-4 rounded-xl border-b border-purple-500 pb-6" @click="expand">
                    {{ key }}
                    <img src="@/assets/img/arrow.svg" alt="" class="w-[24] transition float-right pointer-events-none">
                </div>
                <div class="w-full px-6 mt-3 max-h-80 h-0 scrollbar transition-all rounded-xl">
                    <div v-for="(trait, i) in traits" :key="i" class="flex items-center mt-2 text-[14px]">
                        <input v-model="selected[key + '_' + i]" type="checkbox" :id="`${key + i}`" class="appearance-none rounded-md bg-transparent border border-purple-500 p-2 checked:bg-purple-300" @click="toggle(key, trait)">
                        <label :for="`${key + i}`" class="ml-2">{{ trait }}</label>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div :class="isScrolled ? 'text-center flex-1 lg:pl-[320px]' : 'text-center flex-1'">
            <div v-for="(item, i) in data" :key="i" class="mt-8">
                <div class="uppercase tracking-tighter">
                    Token: {{ getTokenId(item.name) }} ({{ i }})
                    <img :src="fixURL(item.image)" :alt="item.name" class="w-14 inline rounded-xl ml-4">
                    <a :href="`https://opensea.io/assets/${contract}/${getTokenId(item.name)}`" target="_blank" class="underline ml-4">{{ item.name }}</a>
                </div>
                <div class="flex flex-wrap gap-10 justify-center mt-4">
                    <div v-for="(trait) in item.attributes" class="uppercase leading-none">
                        <span class="tracking-tighter">{{ trait.trait_type }}</span> <br>
                        <span class="text-[10px]">{{ trait.value }}</span>
                    </div>
                </div>
            </div>
        </div> -->
        <Transition name="galleryAnim">
            <div v-if="!isLoaded" class="lg:pl-[344px] text-center">Loading</div>
            <div v-else-if="isLoaded" id="gallery" class="text-center flex-1 lg:pl-[344px] grid max-w-[500px] sm:max-w-none mx-auto sm:mx-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 px-6">
                <RouterLink v-for="(item, i) in data" :key="i" :to="`/${getTokenId(item.name)}`" class="relative uppercase tracking-tighter border-[3px] border-purple-900 hover:border-purple-200 transition-all duration-500 rounded-xl overflow-hidden">
                    <img :src="getImageUrl(getTokenId(item.name))" :alt="item.name">
                    <div class="text-center w-full bg-purple-600 text-[12px]">{{ item.name }}</div>
                </RouterLink>
            </div>
        </Transition>
    </div>
    <Transition name="slide-profile">
        <Lightbox v-if="showBox" @hide-lightbox="closeBox" />
    </Transition>
</template>
