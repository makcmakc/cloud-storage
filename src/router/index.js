import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      // redirect: 'files',
      children: [
        {
          path: '/files',
          name: 'files',
          component: () => import('../views/Files.vue'),
        },
        {
          path: '/gallery',
          name: 'gallery',
          component: () => import('../views/Gallery.vue')          
        },
        {
          path: '/playlist',
          name: 'playlist',
          component: () => import('../views/Playlist.vue')          
        }        
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Auth.vue')
    }
  ]
})

export default router
