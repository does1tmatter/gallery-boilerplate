<script setup>
import { useMoralis } from '@/composables/useMoralis.js'

const { ownedNFT } = useMoralis()
</script>

<template>
    <div class="text-center mt-20">
        <div v-if="ownedNFT" class="mt-4">
            <div class="flex justify-center gap-4 mt-4">
                <div v-for="(nft, i) in ownedNFT" :key="i">
                    {{ nft.name }}
                    <img :src="nft.image" :alt="nft.name" class="w-[150px] mx-auto">
                    <div v-for="(trait, ind) in nft.attributes" :key="ind" class="mt-2">
                        {{ trait.trait_type }}<br>
                        {{ trait.value }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>