<script setup>
import { onMounted, onUnmounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useWallet, useUser, useUtils } from '@/composables/'

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
  if (_chain === import.meta.env.NETWORK_ID) {
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
  <header class="text-center">
    <div class="flex gap-4 justify-center mt-10">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/gallery">Gallery</RouterLink>
    </div>
    <div class="text-center mt-10">
      Metamask: {{ isMetaMaskInstalled }}
    </div>
    <div class="fixed top-4 left-4 flex uppercase text-[10px]">
      <div class="text-left">
        <div v-for="(item, key) in user" :key="key">
          {{ key }}
        </div>
      </div>
      <div class="text-right">
        <div v-for="(item, key) in user" :key="key">
          {{ item ? item.length === 42 ? sliceAddress(item) : item : 'none' }}
        </div>
      </div>
    </div>
    <div class="mt-4">
      <button v-if="!isAuthenticated" :disabled="userLoading" @click="connectUser" class="bg-black text-white p-2 rounded-lg disabled:opacity-20">{{ userLoading ? 'Loading' : 'Connect' }}</button>
    </div>
  </header>
  <RouterView />
</template>

