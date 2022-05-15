<script setup>
import { useRoute } from 'vue-router'
import { useUtils } from '@/composables/'

const props = defineProps(['metadata'])
const contract = import.meta.env.VITE_CONTRACT_ADDRESS

const { getTokenId, fixURL } = useUtils()

const hide = () => $emit('hide-lightbox', false)
const route = useRoute()

const token = props.metadata.find(token => getTokenId(token.name) === parseFloat(route.params.token))
</script>

<template>
  <div class="fixed top-0 left-0 z-50 w-screen h-screen bg-black bg-opacity-60 backdrop-blur-md flex justify-center items-center p-8 lg:p-0" @click.self="$emit('hide-lightbox', false)">
    <div class="bg-purple-700 rounded-2xl overflow-hidden lg:flex lg:grid-cols-2 2xl:max-w-[90vw] max-h-[90vh]">
      <div class="h-full lg:min-h-[420px] lg:min-w-[420px] lg:max-h-[420px] w-full max-w-[500px] lg:max-w-[420px]">
        <img :src="fixURL(token.image)" />
      </div>
      <div class="px-4 py-8 lg:px-8 flex flex-col gap-4">
        <div class="font-black text-3xl uppercase">
          {{ token.name }}
        </div>
        <div class="flex gap-2 flex-wrap">
          <a :href="`https://opensea.io/assets/${contract}/${route.params.token}`" target="_blank" class="py-2 px-4 bg-purple-500 text-[10px] rounded-md">
          OpenSea
          </a>
          <a :href="`https://looksrare.org/collections/${contract}/${route.params.token}`" target="_blank" class="py-2 px-4 bg-purple-500 ml-2 text-[10px] rounded-md">
            LooksRare
          </a>
          <a :href="`https://rarible.com/token/${contract}:${route.params.token}`" target="_blank" class="py-2 px-4 bg-purple-500 ml-2 text-[10px] rounded-md">
            Rarible
          </a>
          <a :href="`https://nft.coinbase.com/nft/ethereum/${contract}/${route.params.token}`" target="_blank" class="py-2 px-4 bg-purple-500 ml-2 text-[10px] rounded-md">
            Coinbase
          </a>
        </div>
        <div class="grid grid-cols-2 gap-2 mt-auto">
          <div v-for="(trait, i) in token.attributes" :key="i" class="max-w-[300px] bg-purple-500 py-2 px-4">
            <div class="uppercase font-black text-purple-100">
              {{ trait.trait_type }}
            </div>
            <div class="uppercase tracking-tighter">
              {{ trait.value }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
