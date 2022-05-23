import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Lightbox from '@/components/Lightbox.vue'
import { useToast } from "vue-toastification"

export const useLightbox = () => {

  const route = useRoute()
  const router = useRouter()
  const toast = useToast()

  const showBox = ref(false)

  const openBox = () => showBox.value = true

  const closeBox = () => {
    const routeSplit = route.path.split('/')
    if (route.params.token) history.state.back ? router.push({ path: `/${routeSplit[1]}` }) : router.push({ path: '/collection' })
    showBox.value = false
  }

  const checkModal = () => route.params.token ? parseFloat(route.params.token) <= 10000 ? openBox() : toast.error(`Token ${route.params.token} doesn't exist`) : closeBox()

  watch(() => route.params.token, () => checkModal())

  return {
    Lightbox,
    showBox,
    openBox,
    closeBox,
    checkModal
  }
}