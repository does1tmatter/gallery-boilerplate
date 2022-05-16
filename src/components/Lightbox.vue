<script setup>
import { useRoute } from 'vue-router'
import { useUtils, useWallet } from '@/composables/'
import { onMounted, ref, watch, reactive } from 'vue'
import { computed } from '@vue/reactivity'

const props = defineProps(['metadata'])
const contract = import.meta.env.VITE_CONTRACT_ADDRESS

const { getTokenId, fixURL, getToken, sliceAddress } = useUtils()
const { lookupAddress } = useWallet()

const route = useRoute()

const token = props.metadata.find(token => getTokenId(token.name) === parseFloat(route.params.token))

const tokenData = ref(null)
const owner = reactive({
  ensName: null,
  address: null,
  username: computed(() => owner.ensName || sliceAddress(owner.address))
})

watch(tokenData, async () => {
  if (tokenData.value.owner_of) {
    owner.address = tokenData.value.owner_of
    owner.ensName = await lookupAddress(owner.address)
  }
})

onMounted(async () => {
  tokenData.value = await getToken(parseFloat(route.params.token))
})
</script>

<template>
  <div class="fixed top-0 left-0 z-50 w-screen h-screen bg-black bg-opacity-30 backdrop-blur-md flex justify-center items-center p-8 lg:p-0" @click.self="$emit('hide-lightbox')">
    <div class="bg-purple-700 rounded-2xl overflow-hidden lg:flex 2xl:max-w-[90vw] max-h-[90vh] scrollbar-lightbox">
      <div class="h-full lg:min-h-[420px] lg:min-w-[420px] lg:max-h-[420px] w-full max-w-[420px] lg:max-w-[420px]">
        <a :href="fixURL(token.image)" target="_blank">
          <img :src="fixURL(token.image)" />
        </a>
      </div>
      <div class="px-4 py-8 lg:px-8 flex flex-col gap-4 max-w-[420px] lg:max-w-none">
        <div class="font-black text-3xl uppercase">
          {{ token.name }}
        </div>
        <div>
          <a :href="`https://opensea.io/assets/${contract}/${route.params.token}`" target="_blank" class="py-2 px-2 bg-purple-500 text-[2vw] sm:text-[10px]">
          OpenSea
          </a>
          <a :href="`https://looksrare.org/collections/${contract}/${route.params.token}`" target="_blank" class="py-2 px-2 bg-purple-500 ml-2 text-[2vw] sm:text-[10px]">
            LooksRare
          </a>
          <a :href="`https://rarible.com/token/${contract}:${route.params.token}`" target="_blank" class="py-2 px-2 bg-purple-500 ml-2 text-[2vw] sm:text-[10px]">
            Rarible
          </a>
          <a :href="`https://nft.coinbase.com/nft/ethereum/${contract}/${route.params.token}`" target="_blank" class="py-2 px-2 bg-purple-500 ml-2 text-[2vw] sm:text-[10px]">
            Coinbase
          </a>
        </div>
        <div class="text-sm p-2 bg-purple-500">
          <span class="uppercase text-[10px]">Owner</span>
          <Transition name="galleryAnim">
            <div v-if="owner.address" class="inline">
              <a :href="`https://etherscan.io/address/${owner.address}`" target="_blank" class="ml-2 underline underline-offset-1 text-[12px]">{{ owner.username }}</a>
            </div>
            <div v-else-if="!owner.address" class="inline">
              <span class="ml-2 text-[10px] uppercase">Loading</span>
            </div>
          </Transition>
        </div>        
        <div class="grid grid-cols-2 gap-2 mt-auto">
          <div v-for="(trait, i) in token.attributes" :key="i" class="max-w-[300px] bg-purple-500 py-2 px-4">
            <div class="uppercase font-black text-purple-100 text-[2vw] sm:text-sm">
              {{ trait.trait_type }}
            </div>
            <div class="uppercase tracking-tighter text-[2.5vw] sm:text-base">
              {{ trait.value }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
