<script setup>
import { computed, ref } from 'vue'
import { useUser, useUtils } from '@/composables/'
import { RouterLink } from 'vue-router'

const { isMetaMaskInstalled, randomNumber } = useUtils()
const { isAuthenticated, userLoading, user, ownedTokens } = useUser()

const usernameString = computed(() => isMetaMaskInstalled.value ? isAuthenticated.value ? user.username : 'Not connected' : 'No metamask')

const fallbackAvatar = computed(() => `https://avatars.dicebear.com/api/initials/${usernameString.value}.svg`)

const avatarString = computed(() => user.ensAvatar || fallbackAvatar.value)

const openUserData = ref(false)

const toggleUserData = (e) => isAuthenticated.value ? openUserData.value = !openUserData.value : ''
</script>

<template>
  <div class="relative">
    <div
      :class="
        isAuthenticated ?
        openUserData ?
        'bg-purple-900 flex gap-3 items-center border-b border-purple-300 hover:border-purple-300 transition-all py-3 px-4 rounded-md cursor-pointer' :
        'bg-purple-900 flex gap-3 items-center border-b border-transparent hover:border-purple-300 transition-all py-3 px-4 rounded-md cursor-pointer' :
        'bg-purple-900 flex gap-3 items-center border-b border-transparent hover:border-purple-300 py-3 px-4 rounded-md pointer-events-none'
      "
      @click="toggleUserData"
    >
      <span class="whitespace-nowrap pointer-events-none text-[12px] sm:text-base font-thin">
        {{ userLoading ? 'Loading' : usernameString }}
      </span>
      <div class="w-[20px] bg-purple-500 rounded-full flex items-center justify-center overflow-hidden pointer-events-none">
        <img :src="avatarString" class="opacity-80">
      </div>
    </div>
    <Transition name="slide-profile">
      <div v-if="openUserData && isAuthenticated" class="z-50 absolute w-full mt-2 bg-purple-500 rounded-md text-[10px] sm:text-[11px] uppercase leading-none">
        <div class="absolute -top-1 left-2 w-0 h-0 border-b-[5px] border-x-[5px] border-b-purple-500 border-x-transparent">
        </div>
        <div class="flex justify-between whitespace-nowrap p-2">
          <div class="text-white">
            <div>balance:</div>
            <div class="mt-2">owned:</div>
          </div>
          <div class="text-sunflower text-right text-white">
            <div>{{ user.balance }} eth</div>
            <div class="mt-2">{{ user.ownedBalance }} LM</div>
          </div>
        </div>
        <RouterLink to="/profile" @click="toggleUserData">
          <div class="text-center py-1 bg-purple-700 hover:bg-purple-400 transition-all rounded-b-md">
            My Tokens
          </div>
        </RouterLink>
      </div>
    </Transition>
  </div>
</template>
