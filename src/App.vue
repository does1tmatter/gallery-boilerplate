<script setup>
import { onMounted, onUnmounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useWallet, useUser, useUtils, useLightbox } from '@/composables/'
import Navigation from '@/components/Navigation.vue'
import meta from '@/assets/meta.json'

const toast = useToast()
const { connectProvider, provider } = useWallet()
const { isMetaMaskInstalled, sliceAddress } = useUtils()
const { loadConnectedUser, detectChain, setChain, isNetwork, resetUser, isAuthenticated, user, connectUser, userLoading } = useUser()

const { Lightbox, showBox, closeBox, checkModal } = useLightbox()

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
    if (isNetwork.value) { 
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
  checkModal()
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
    toast.error('Non Ethereum Browser.')
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
    <div v-if="isMetaMaskInstalled && !user.isNetwork" class="fixed top-0 left-0 w-full z-[100] text-center bg-purple-500 text-[10px] uppercase">
      wrong network detected. please switch to ethereum mainnet
    </div>
  </Transition>
  <Navigation />
  <RouterView v-slot="{ Component }">
    <Transition name="galleryAnim">
      <component :is="Component" />
    </Transition>
  </RouterView>
  <Transition name="slide-modal">
      <Lightbox v-if="showBox" @hide-lightbox="closeBox" :metadata="meta" />
  </Transition>
</template>

