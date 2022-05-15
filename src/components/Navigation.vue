<script setup>
import { RouterLink } from 'vue-router'
import { useWallet, useUtils, useUser } from '@/composables/'
import UserProfile from '@/components/UserProfile.vue'

const { switchNetwork } = useWallet()
const { isMetaMaskInstalled } = useUtils()
const { isAuthenticated, userLoading, connectUser, user } = useUser()

</script>

<template>
  <header class="py-8 transition-all bg-opacity-10 fixed top-0 left-0 w-full z-40">
    <div class="max-w-[1920px] mx-auto flex justify-between items-center px-4">
      <div class="cursor-pointer flex gap-6 font-bold uppercase divide-x divide-dashed divide-purple-300/[.3]">
        <RouterLink to="/" class="border-b border-transparent hover:border-purple-300 transition-all py-3 px-4 rounded-md">LM</RouterLink>
      </div>
      <div class="flex gap-4 items-center">
        <div>
          <Transition name="fadeout">
            <button v-if="!user.isNetwork && isMetaMaskInstalled" class="p-[10px] bg-purple-200 rounded-lg mr-4 hover:bg-purple-200" @click="switchNetwork">
              Switch Network
            </button>
          </Transition>
          <Transition name="fadeout">
            <button
              v-if="!isAuthenticated"
              :disabled="userLoading || !user.isNetwork || !isMetaMaskInstalled"
              @click="connectUser"
              class="disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-purple-100 bg-purple-200 rounded-lg p-[10px] hover:bg-purple-200"
            >
              Connect
            </button>
          </Transition>
        </div>
        <UserProfile />
      </div>
    </div>
  </header>
</template>
