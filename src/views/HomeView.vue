<script setup>
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useUtils, useAnimation } from '@/composables'

const { randomNumber } = useUtils()
const { setTimeline, animateFrom, animateTo } = useAnimation()

const getImageUrl = (id) => {
    return new URL(`../assets/img/jpeg/${id}.jpg`, import.meta.url).href
}

const images = [
  [randomNumber(1, 10000),
  randomNumber(1, 10000)],
  [randomNumber(1, 10000),
  randomNumber(1, 10000)],
  [randomNumber(1, 10000),
  randomNumber(1, 10000)],
]

onMounted(() => {
  setTimeline()
  animateFrom('#back', { scale: 1.05, filter: 'blur(3px)' }).delay(0.5)
  animateFrom('.col0', { opacity: 0, x: -200 }, '-=1')
  animateFrom('.col1', { opacity: 0, x: -200 }, '-=1')
  animateFrom('.col2', { opacity: 0, x: -200 }, '-=1')
  animateFrom('.group', { filter: 'blur(3px)' }, '-=1')
  animateTo('.img', { rotation: -6, ease: 'power2.out' }, '-=1.5')
  animateTo('.path', { clipPath: 'polygon(0 0, 100% 0%, 100% 100%, 0% 100%)' }, '-=1')
  animateFrom('.path', { filter: 'blur(3px)' }, '-=1.5')
})
</script>

<template>
  <div class="max-w-[1920px] mx-auto px-4 mb-16">
    <div class="lg:flex lg:justify-center lg:items-center lg:gap-16 xl:gap-32 mt-16 lg:mt-36">
      <div class="flex w-full max-w-[350px] lg:max-w-[460px] gap-4 group mx-auto lg:mx-0">
        <div v-for="(col, i) in images" :key="i" :class="`min-w-[100px] max-w-[100px] lg:min-w-[150px] lg:max-w-[150px] col${i} flex flex-col gap-4`">
          <RouterLink v-for="(id, indx) in col" :key="indx" :to="`/collection/${id}`" class="group-hover:blur-sm group-hover:hover:blur-0 transition-all">
            <div :class="`w-full shadow-xl shadow-black/[.15] dark:shadow-purple-200/[.05] img max-w-[100px] lg:max-w-[150px] h-[200px] lg:h-[250px] bg-cover bg-center rounded-xl`" :style="{
              backgroundImage:  `url('${getImageUrl(id)}')`
            }" />
          </RouterLink>
        </div>
      </div>
      <div class="max-w-[635px] mx-auto lg:mx-0 text-center lg:text-left mt-16 lg:mt-0 path">
        <div class="font-architect tracking-[-0.04em] text-[9vw] lg:text-[72px] text-black dark:text-purple-300 font-black uppercase textshadow">
          MuertoViewer
        </div>
        <div class="text-justify text-zinc-100 dark:text-purple-100 mt-8">
          <figure>
            <blockquote class="italic bg-zinc-700 dark:bg-purple-700 p-4">
              <q>Los Muertos World is built to serve its members. We are a highly experienced team with wildly ambitious goals.
                We are upcoming digital artists, we are web3 nerds, we are community builders. We are Muerto!</q>
            </blockquote>
            <figcaption class="text-xs text-right italic text-zinc-800 dark:text-purple-100">
              — <a href="https://www.los-muertos.io/" target="_blank" class="link transition-all">www.Los-Muertos.io</a>
            </figcaption>
          </figure>
          <div class="mt-12 text-center lg:text-right overflow-visible pb-2">
            <RouterLink to="/collection">
              <button class="
                ml-4
                leading-none
                font-architect
                uppercase
                text-[50px]
                text-black
                hover:text-white
                dark:text-purple-300
                hover:dark:text-purple-100
                transition-all
                textshadow
                tracking-[-0.1em]
                font-black
              ">
                Explore
              </button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.path {
  clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
}
</style>