<script setup>
import { onMounted, onUnmounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useWallet, useUser, useUtils } from '@/composables/'
import Navigation from '@/components/Navigation.vue'

const toast = useToast()
const { connectProvider, provider } = useWallet()
const { isMetaMaskInstalled, sliceAddress } = useUtils()
const { loadConnectedUser, detectChain, setChain, isNetwork, resetUser, isAuthenticated, user, connectUser, userLoading } = useUser()

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
  <Navigation />
  <RouterView v-slot="{ Component }">
    <Transition name="galleryAnim">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>

