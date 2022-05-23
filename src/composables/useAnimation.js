import { reactive } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { gsap } from 'gsap'


export const useAnimation = createSharedComposable(() => {

  let tl = reactive({})

  const setTimeline = () => tl = gsap.timeline({ defaults: { duration: 1.5 } })
  
  const animateFrom = (container, options, speed) => tl.from(container, options, speed)

  const animateTo = (container, options, speed) => tl.to(container, options, speed)

  return {
    tl,
    setTimeline,
    animateFrom,
    animateTo
  }
})
