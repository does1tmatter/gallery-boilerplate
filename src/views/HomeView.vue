<script setup>
import { useUser } from '@/composables/'

const { ownedTokens, isAuthenticated } = useUser()
</script>

<template>
    <div class="text-center mt-24">
        <div v-if="isAuthenticated">
            <div class="text-5xl uppercase tracking-tighter leading-none font-thin">My muertos</div>
            <div class="flex justify-center gap-6 mt-16 leading-none uppercase">
                <div v-for="(nft, i) in ownedTokens" :key="i">
                    <img :src="nft.image" :alt="nft.name" class="w-[150px] mx-auto rounded-xl">
                    <span class="tracking-tighter">{{ nft.name }}</span>
                    <div v-for="(trait, ind) in nft.attributes" :key="ind" class="mt-4 uppercase leading-none">
                        <span class="tracking-tighter">{{ trait.trait_type }}</span> <br>
                        <span class="text-[10px] leading-none">{{ trait.value }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>