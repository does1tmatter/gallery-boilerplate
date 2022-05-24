<script setup>
import { onMounted, onUnmounted } from 'vue'
import { RouterView } from 'vue-router'
import { useWallet, useUser, useUtils, useLightbox } from '@/composables/'
import Navigation from '@/components/Navigation.vue'
import Background from '@/components/Background.vue'
import meta from '@/assets/meta.json'
import AOS from 'aos'

const { connectProvider, provider } = useWallet()
const { isMetaMaskInstalled } = useUtils()
const { loadConnectedUser, detectChain, setChain, resetUser, isAuthenticated, user } = useUser()

const { Lightbox, showBox, closeBox } = useLightbox()

const setListeners = (bool) => {
  if (bool) {
    provider.value.on('accountsChanged', onAccountChanged)
    provider.value.on('chainChanged', onChainChanged)
  } else {
    provider.value.removeAllListeners()
  }
}

const onAccountChanged = () => {
  resetUser()
  detectChain().then(() => {
    if (user.isNetwork) { 
      loadConnectedUser()
    }
  })
}

const onChainChanged = (_chain) => {
  setChain(_chain)
  if (_chain === import.meta.env.VITE_NETWORK_ID) {
    connectProvider(window.ethereum)
    loadConnectedUser()
  } else {
    resetUser()
  }
}

onMounted(() => {
  AOS.init({ once: true })
  if (isMetaMaskInstalled.value) {
    connectProvider(window.ethereum)
    detectChain().then(() => {
      if (user.isNetwork) {
        if (isAuthenticated) resetUser()
        loadConnectedUser()
      }
    })
    setListeners(true)
  } else {
    console.error('Non Ethereum Browser. Please install metamask. https://metamask.io/download/')
  }
})

onUnmounted(() => {
  if (isMetaMaskInstalled.value) {
    setListeners(false)
  }
})
</script>

<template>
  <Transition name="slide-profile">
    <div v-if="isMetaMaskInstalled && !user.isNetwork" class="fixed top-0 left-0 w-full z-[100] text-center bg-zinc-500 dark:bg-purple-500 text-white text-[10px] uppercase">
      wrong network detected. please switch to ethereum mainnet
    </div>
  </Transition>
  <Background id="back" />
  <div class="flex flex-col min-h-screen">
    <Navigation class="shrink-0" />
    <RouterView v-slot="{ Component }">
      <Transition name="galleryAnim">
        <component :is="Component" class="flex-1" />
      </Transition>
    </RouterView>
  </div>
  <Transition name="slide-modal">
      <Lightbox v-if="showBox" @hide-lightbox="closeBox" :metadata="meta" />
  </Transition>
</template>

