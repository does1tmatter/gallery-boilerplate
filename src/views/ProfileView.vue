<script setup>
import { useUser, useUtils } from '@/composables/'
import GalleryItems from '@/components/GalleryItems.vue'

const contract = import.meta.env.VITE_CONTRACT_ADDRESS

const { ownedTokens, isAuthenticated } = useUser()
const { getTokenId } = useUtils()
</script>

<template>
    <div class="text-center sm:pt-24 pb-16 max-w-[1200px] mx-auto">
        <div v-if="isAuthenticated">
            <div class="text-5xl uppercase tracking-tighter leading-none font-black text-purple-200">My tokens</div>
            <div class="text-center mt-8 grid max-w-[500px] sm:max-w-none mx-auto sm:mx-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-6 px-6">
                <GalleryItems :data="ownedTokens" />
            </div>
        </div>
    </div>
</template>