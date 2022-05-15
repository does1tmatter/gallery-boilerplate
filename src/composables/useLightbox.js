import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Lightbox from '@/components/Lightbox.vue'

export function useLightbox () {

  const route = useRoute()
  const router = useRouter()

  const showBox = ref(false)

  const openBox = () => showBox.value = true

  const closeBox = () => {
    showBox.value = false
    if (route.params.token) router.push({ path: '/' })
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
}