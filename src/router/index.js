import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'
import GalleryView from '@/views/GalleryView.vue'
import Lightbox from '@/components/Lightbox.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/collection',
      name: 'collection',
      component: GalleryView,
      children: [
        { path: ':token', component: Lightbox }
      ]
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      children: [
        { path: ':token', component: Lightbox }
      ]
    }
  ],
  scrollBehavior (to, from, savedPosition) {
      return savedPosition
  }
})

export default router
