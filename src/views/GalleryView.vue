<script setup>
import { useUtils } from '@/composables/useUtils.js'
import { onMounted, ref } from 'vue'
import { useInfiniteScroll } from '@vueuse/core'
import meta from '@/assets/meta.json'

const { paginate } = useUtils()

const el = ref(window)
const data = ref([])

const pageNumber = ref(1)
const pageSize = ref(100)

const handleData = () => data.value.push(...paginate(meta, pageSize.value, pageNumber.value))

useInfiniteScroll(el, () => {
    pageNumber.value++
    handleData()
})

onMounted(() => {
    handleData()
    console.log(data.value)
})
</script>

<template>
    <div class="text-center mt-20">
        <div v-for="(item, i) in data" :key="i" class="mt-4">
            {{ item.name }}<br>
            <span v-for="(trait, i) in item.attributes" class="ml-4">{{ trait.value }}</span>
        </div>
    </div>
</template>