<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { useWallet, useUtils, useUser } from '@/composables/'
import UserProfile from '@/components/UserProfile.vue'
import MyButton from '@/components/MyButton.vue'

const route = useRoute()
const { switchNetwork } = useWallet()
const { isMetaMaskInstalled } = useUtils()
const { isAuthenticated, userLoading, connectUser, user } = useUser()

</script>

<template>
  <header class="py-8 transition-all bg-opacity-10 w-full">
    <div class="max-w-[1920px] mx-auto flex justify-between items-center px-4">
      <div class="pl-4">
        <RouterLink to="/" class="text-purple-300 hover:text-purple-200 transition-all font-black text-[4vw] md:text-3xl uppercase leading-none font-architect tracking-[-0.02em]">
          MUERTOVIEWER
        </RouterLink>
        <div class="text-center text-[10px] leading-none text-purple-100 hidden sm:flex justify-between -mt-2">
          <div>
            UNOFFICIAL
          </div>
          <div class="uppercase">
            built by <a href="http://twitter.com/angry1bud" target="_blank" class="hover:text-purple-200 transition-all">angrybud.eth</a>
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
      </div>
    </div>
  </header>
</template>
