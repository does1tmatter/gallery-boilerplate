<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'
import { useWallet, useUtils, useUser } from '@/composables/'
import UserProfile from '@/components/UserProfile.vue'
import MyButton from '@/components/MyButton.vue'
import sun from '@/assets/img/sun.svg'
import moon from '@/assets/img/moon.svg'

const route = useRoute()
const { switchNetwork } = useWallet()
const { isMetaMaskInstalled } = useUtils()
const { isAuthenticated, userLoading, connectUser, user } = useUser()

const isDark = useDark()
const toggleDarkMode = useToggle(isDark)
</script>

<template>
  <header class="py-8 transition-all bg-opacity-10 w-full">
    <div class="max-w-[1920px] mx-auto flex justify-between items-center px-4">
      <div class="pl-4">
        <RouterLink to="/" class="text-black textshadow hover:text-white dark:text-purple-300 dark:hover:text-purple-100 transition-all font-black text-[4vw] md:text-3xl uppercase leading-none font-architect tracking-[-0.02em]">
          MUERTOVIEWER
        </RouterLink>
        <div class="text-center text-[10px] leading-none text-zinc-400 dark:text-purple-100 hidden sm:flex justify-between -mt-2">
          <div>
            UNOFFICIAL
          </div>
          <div class="uppercase">
            built by <a href="http://twitter.com/angry1bud" target="_blank" class="link text-black dark:text-white transition-all">angrybud.eth</a>
          </div>
        </div>
      </div>
      <div class="flex gap-4 items-center">
        <div>
          <Transition name="fadeout">
            <RouterLink v-if="route.name === 'profile'" to="/collection">
              <MyButton>
                Explore collection
              </MyButton>
            </RouterLink>
          </Transition>
          <Transition name="fadeout">
            <MyButton v-if="!user.isNetwork && isMetaMaskInstalled" @click="switchNetwork">
              Switch Network
            </MyButton>
          </Transition>
          <Transition name="fadeout">
            <MyButton
              v-if="!isAuthenticated && isMetaMaskInstalled"
              :disabled="userLoading || !user.isNetwork"
              @click="connectUser"
              class="ml-2"
            >
              Connect
            </MyButton>
          </Transition>
        </div>
        <UserProfile />
        <button class="w-8 h-8 bg-zinc-700 dark:bg-purple-500 rounded-xl overflow-hidden" @click="toggleDarkMode()">
          <Transition name="slide-button">
            <img v-if="isDark" src="@/assets/img/sun.svg" class="hidden dark:block mx-auto">
            <img v-else-if="!isDark" src="@/assets/img/moon.svg" class="block dark:hidden mx-auto">
          </Transition>
        </button>
      </div>
    </div>
  </header>
</template>
