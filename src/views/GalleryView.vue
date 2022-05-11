<script setup>
import { useUtils } from '@/composables/'
import { onMounted, ref, computed } from 'vue'
import { useInfiniteScroll } from '@vueuse/core'
import meta from '@/assets/meta.json'

const metadata = [...meta]
const contract = import.meta.env.VITE_CONTRACT_ADDRESS

const { paginate, fixURL, getTokenId } = useUtils()

const pageNumber = ref(1)
const pageSize = ref(10)

const handleData = (array = metadata) => data.value.push(...paginate(array, pageSize.value, pageNumber.value))

const data = ref([])
const searchArray = ref([])
const filter = ref([])
const resultSize = computed(() => searchArray.value.length || metadata.length)

const el = ref(window)

useInfiniteScroll(el, () => {
    pageNumber.value++
    if (searchArray.value.length) handleData(searchArray.value)
    if (!searchArray.value.length) handleData()
})

const search = () => {
    if (filter.value.length) {
        searchArray.value = []
        data.value = []
        filter.value.forEach(term =>
            metadata.forEach(object =>
                object.attributes.forEach(trait => {
                    if (trait.value === term) searchArray.value.push(object)
                })
            )
        )
        if (searchArray.value.length) handleData(searchArray.value)
    } else {
        searchArray.value = []
        data.value = []
        handleData()
    }
}

const searchCallback = () => {
    setTimeout(() => search(), 10)
}

onMounted(() => {
    handleData()
})
</script>

<template>
    <div class="text-center mt-20">
        <div>{{ filter }}</div>
        <div>{{ resultSize }} results</div>
        <div class="flex gap-4 justify-center items-center">
            <div>
                <input v-model="filter" type="checkbox" id="test1" name="Everyday Metallic" value="Everyday Metallic" @click="searchCallback">
                <label for="test1">Everyday Metallic</label>
            </div>
            <div>
                <input v-model="filter" type="checkbox" id="test2" name="Everyday Yellow" value="Everyday Yellow" @click="searchCallback">
                <label for="test2">Everyday Yellow</label>
            </div>
            <div>
                <input v-model="filter" type="checkbox" id="test3" name="Yeti" value="Yeti" @click="searchCallback">
                <label for="test3">Yeti</label>
            </div>
            <div>
                <input v-model="filter" type="checkbox" id="test4" name="The Pink Devil" value="The Pink Devil" @click="searchCallback">
                <label for="test4">The Pink Devil</label>
            </div>
        </div>
        <div v-for="(item, i) in data" :key="i" class="mt-8">
            <div class="uppercase tracking-tighter">
                Token: {{ getTokenId(item.name) }} ({{ i }})
                <img :src="fixURL(item.image)" :alt="item.name" class="w-14 inline rounded-xl ml-4">
                <a :href="`https://opensea.io/assets/${contract}/${getTokenId(item.name)}`" target="_blank" class="underline ml-4">{{ item.name }}</a>
            </div>
            <div class="flex gap-10 justify-center mt-4">
                <div v-for="(trait, i) in item.attributes" class="uppercase leading-none">
                    <span class="tracking-tighter">{{ trait.trait_type }}</span> <br>
                    <span class="text-[10px]">{{ trait.value }}</span>
                </div>
            </div>
        </div>
    </div>
</template>