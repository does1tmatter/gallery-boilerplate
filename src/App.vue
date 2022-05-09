<script setup>
import { onMounted, unref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useMoralis } from '@/composables/useMoralis.js'

const toast = useToast()
const { connect, disconnect, isAuthenticated, getConnectedUser, isMetaMaskInstalled, detectChain, user, ownedNFT } = useMoralis()

onMounted(() => {
  if (isMetaMaskInstalled.value) {
    detectChain()
      .then(() => {
        if (user.isNetwork) getConnectedUser()
      }
    )
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
    <div>
      {{ user }}
    </div>
    <div>
      <button v-if="isAuthenticated" @click="disconnect" class="bg-black text-white p-2 rounded-lg">Log out</button>
      <button v-if="!isAuthenticated" @click="connect('metamask')" class="bg-black text-white p-2 rounded-lg">Connect</button>
    </div>
  </header>
  <RouterView />
</template>

