<script setup>
import { useUser } from '@/composables/'

const { ownedTokens, isAuthenticated, userLoading } = useUser()
</script>

<template>
    <div class="text-center mt-20">
        <div v-if="isAuthenticated" class="mt-4">
            <div v-if="userLoading">
                Loading
            </div>
            <div class="flex justify-center gap-4 mt-4">
                <div v-for="(nft, i) in ownedTokens" :key="i">
                    {{ nft.name }}
                    <img :src="nft.image" :alt="nft.name" class="w-[150px] mx-auto rounded-full">
                    <div v-for="(trait, ind) in nft.attributes" :key="ind" class="mt-2">
                        {{ trait.trait_type }}<br>
                        {{ trait.value }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>