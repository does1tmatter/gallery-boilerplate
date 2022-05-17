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
      <div class="pl-4">
        <RouterLink to="/" class="hover:text-purple-200 transition-all rounded-md font-black text-[4vw] md:text-3xl uppercase leading-none tracking-tighter">
          MUERTOVIEWER
        </RouterLink>
        <div class="text-center text-[10px] leading-none text-purple-100 hidden sm:flex justify-between">
          <div>
            UNOFFICIAL
          </div>
          <div class="uppercase">
            built by <a href="http://twitter.com/ddoesitmatter" target="_blank" class="hover:text-purple-200 transition-all">angrybud.eth</a>
          </div>
        </div>
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
