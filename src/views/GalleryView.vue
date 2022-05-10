<script setup>
import { useUtils } from '@/composables/'
import { onMounted, ref } from 'vue'
import { useInfiniteScroll } from '@vueuse/core'
import meta from '@/assets/meta.json'

const { paginate, fixURL } = useUtils()

const el = ref(window)
const data = ref([])

const pageNumber = ref(1)
const pageSize = ref(20)

const handleData = () => data.value.push(...paginate(meta, pageSize.value, pageNumber.value))

useInfiniteScroll(el, () => {
    pageNumber.value++
    handleData()
})

onMounted(() => {
    handleData()
})
</script>

<template>
    <div class="text-center mt-20">
        <div v-for="(item, i) in data" :key="i" class="mt-8">
            <div class="uppercase">
                <img :src="fixURL(item.image)" :alt="item.name" class="w-14 inline rounded-full">
                {{ item.name }}
            </div>
            <div class="flex gap-10 justify-center text-[12px] mt-4">
                <div v-for="(trait, i) in item.attributes" class="uppercase">
                    {{ trait.trait_type }}<br>
                    {{ trait.value }}
                </div>
            </div>
        </div>
    </div>
</template>