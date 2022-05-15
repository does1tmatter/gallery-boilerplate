<script setup>
import { useRoute } from 'vue-router'

const hide = () => $emit('hide-lightbox', false)
const route = useRoute()

const token = parseFloat(route.params.token)
</script>

<template>
  <div class="fixed top-0 left-0 z-50 w-screen h-screen bg-black bg-opacity-60 backdrop-blur-md flex justify-center items-center p-8 lg:p-0" @click.self="$emit('hide-lightbox', false)">
    <div class="bg-purple-700 p-8 rounded-2xl overflow-hidden flex flex-wrap 2xl:flex-nowrap items-center max-w-[900px] 2xl:max-w-none">
      <!-- <div class="h-full max-h-[500px] w-full min-w-[400px] max-w-[900px]" /> -->
      <div class="mb-2 font-black text-3xl">
        Token #{{ token }}
      </div>
    </div>
  </div>
</template>
