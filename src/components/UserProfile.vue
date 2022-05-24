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
  <div class="relative text-white">
    <div
      :class="
        isAuthenticated ?
        openUserData ?
        'bg-zinc-500 dark:bg-purple-400 flex gap-3 items-center hover:bg-zinc-500 transition-all py-1 px-3 rounded-md cursor-pointer' :
        'bg-zinc-700 dark:bg-purple-500 flex gap-3 items-center hover:bg-zinc-500 dark:hover:bg-purple-400 transition-all py-1 px-3 rounded-md cursor-pointer' :
        'bg-zinc-700 dark:bg-purple-500 flex gap-3 items-center hover:bg-zinc-500 dark:hover:bg-purple-400 py-1 px-3 rounded-md pointer-events-none'
      "
      @click="toggleUserData"
    >
      <span class="whitespace-nowrap pointer-events-none text-[12px] sm:text-base font-thin">
        {{ userLoading ? 'Loading' : usernameString }}
      </span>
      <div class="w-[20px] bg-zinc-500 dark:bg-purple-500 rounded-full flex items-center justify-center overflow-hidden pointer-events-none">
        <img :src="avatarString">
      </div>
    </div>
    <Transition name="slide-profile">
      <div v-if="openUserData && isAuthenticated" class="z-50 absolute w-full mt-2 bg-zinc-500 dark:bg-purple-500 rounded-md text-[10px] sm:text-[11px] uppercase leading-none">
        <div class="absolute -top-1 left-2 w-0 h-0 border-b-[5px] border-x-[5px] border-b-zinc-500 dark:border-b-purple-500 border-x-transparent">
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
          <div class="text-center py-1 bg-zinc-700 dark:bg-purple-700 hover:bg-zinc-400 dark:hover:bg-purple-400 transition-all rounded-b-md">
            My Tokens
          </div>
        </RouterLink>
      </div>
    </Transition>
  </div>
</template>
