import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth' 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      redirect: '/files',
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
      component: () => import('../views/auth/AuthIndex.vue'),
      redirect: '/login',
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('../views/auth/AuthLogin.vue')          
        },
        {
          path: '/create',
          name: 'create',
          component: () => import('../views/auth/AuthCreate.vue')          
        }           
      ]
    },
    // {
    //   path: '/auth',
    //   name: 'auth',
    //   component: () => import('../views/Auth.vue')
    // }    
  ]
})

// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore()

//   if (to.path !== '/auth' && !authStore.user) {
//     next('/auth')
//   } else {
//     next()
//   }
// })

export default router
