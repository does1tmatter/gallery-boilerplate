<script setup>
import { useUser, useUtils } from '@/composables/'

const contract = import.meta.env.VITE_CONTRACT_ADDRESS

const { ownedTokens, isAuthenticated } = useUser()
const { getTokenId } = useUtils()
</script>

<template>
    <div class="text-center mt-24">
        <div v-if="isAuthenticated">
            <div class="text-5xl uppercase tracking-tighter leading-none font-thin">My muertos</div>
            <div class="flex flex-wrap justify-center gap-6 mt-16 leading-none uppercase">
                <div v-for="(nft, i) in ownedTokens" :key="i">
                    <a :href="`https://opensea.io/assets/${contract}/${getTokenId(nft.name)}`" target="_blank">
                        <img :src="nft.image" :alt="nft.name" class="w-[150px] mx-auto rounded-xl">
                    </a>
                    <span class="tracking-tighter"><a :href="`https://opensea.io/assets/${contract}/${getTokenId(nft.name)}`" target="_blank" class="underline">{{ nft.name }}</a></span>
                    <div v-for="(trait, ind) in nft.attributes" :key="ind" class="mt-4 uppercase leading-none">
                        <span class="tracking-tighter">{{ trait.trait_type }}</span> <br>
                        <span class="text-[10px] leading-none">{{ trait.value }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>