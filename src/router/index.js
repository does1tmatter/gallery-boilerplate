import { createRouter, createWebHistory } from 'vue-router'
import ProfileView from '@/views/ProfileView.vue'
import GalleryView from '@/views/GalleryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: GalleryView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    }
  ]
})

export default router
