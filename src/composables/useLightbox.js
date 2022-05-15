import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createSharedComposable } from '@vueuse/core'
import Lightbox from '@/components/Lightbox.vue'

export const useLightbox = createSharedComposable(() => {

  const route = useRoute()
  const router = useRouter()

  const showBox = ref(false)

  const openBox = () => showBox.value = true

  const closeBox = () => {
    if (route.params.token) history.state.back ? history.back() : router.push({ path: '/' })
    setTimeout(() => showBox.value = false, 10)
  }

  const checkModal = () => route.params.token ? openBox() : closeBox()

  watch(() => route.params.token, () => checkModal())

  return {
    Lightbox,
    showBox,
    openBox,
    closeBox,
    checkModal
  }
}) 