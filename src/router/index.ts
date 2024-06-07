import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Login/index.vue')
    },
    {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('../views/Dashboard/index.vue')
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('../views/User/index.vue')
        }
      ]
    }
  ]
})

export default router
