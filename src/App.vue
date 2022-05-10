<script setup>
import { onMounted, onUnmounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useMoralis } from '@/composables/useMoralis.js'

const toast = useToast()
const { connect, disconnect, isAuthenticated, getConnectedUser, isMetaMaskInstalled, detectChain, user, ownedNFT, handleUser, setChain } = useMoralis()

onMounted(() => {
  if (isMetaMaskInstalled.value) {
    detectChain()
      .then(() => {
        if (user.isNetwork) getConnectedUser()
      }
    )
    window.ethereum.on('accountsChanged', (accounts) => {
      const currentUser = Moralis.User.current()
      if (currentUser && user.isNetwork) handleUser(accounts[0])
    })
    window.ethereum.on('chainChanged', (chain) => {
      const currentUser = Moralis.User.current()
      if (currentUser) setChain(chain)
    })
  }
})

</script>

<template>
  <header class="text-center">
    <div class="flex gap-4 justify-center mt-10">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/gallery">Gallery</RouterLink>
    </div>
    <div class="text-center mt-10" @click="connect">
      Metamask: {{ isMetaMaskInstalled }}
    </div>
    <div class="fixed top-4 left-4 flex">
      <div class="text-left">
        <div v-for="(item, key) in user" :key="key">
          {{ key }}
        </div>
      </div>
      <div class="text-right">
        <div v-for="(item, key) in user" :key="key">
          {{ item ? item : 'none' }}
        </div>
      </div>
    </div>
    <div class="mt-4">
      <button v-if="isAuthenticated" @click="disconnect" class="bg-black text-white p-2 rounded-lg">Log out</button>
      <button v-if="!isAuthenticated" @click="connect('metamask')" class="bg-black text-white p-2 rounded-lg">Connect</button>
    </div>
  </header>
  <RouterView />
</template>

