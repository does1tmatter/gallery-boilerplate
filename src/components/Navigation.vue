<script setup>
import { RouterLink } from 'vue-router'
import { useWallet, useUtils, useUser } from '@/composables/'
import UserProfile from '@/components/UserProfile.vue'

const { switchNetwork } = useWallet()
const { isMetaMaskInstalled } = useUtils()
const { isAuthenticated, userLoading, connectUser, user } = useUser()

</script>

<template>
  <header class="py-8 transition-all bg-opacity-10 w-full">
    <div class="max-w-[1920px] mx-auto flex justify-between items-center px-4">
      <div class="cursor-pointer flex gap-6 font-bold uppercase divide-x divide-dashed divide-purple-300/[.3]">
        <RouterLink to="/" class="border-b border-transparent hover:border-purple-300 transition-all py-3 px-4 rounded-md">
          Logo
        </RouterLink>
      </div>
      <div class="flex gap-4 items-center">
        <div>
          <Transition name="fadeout">
            <button v-if="!user.isNetwork && isMetaMaskInstalled" class="py-[5px] px-[10px] bg-purple-500 rounded-lg mr-4 hover:bg-purple-400" @click="switchNetwork">
              Switch Network
            </button>
          </Transition>
          <Transition name="fadeout">
            <button
              v-if="!isAuthenticated && isMetaMaskInstalled"
              :disabled="userLoading || !user.isNetwork"
              @click="connectUser"
              class="disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-purple-500 bg-purple-500 rounded-lg py-[5px] px-[10px] hover:bg-purple-400"
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
