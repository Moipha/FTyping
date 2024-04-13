import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/time-keep'
    },
    {
      path: '/time-keep',
      component: () => import('@/view/TimeKeep.vue'),
    },
    {
      path: '/time-limit',
      component: () => import('@/view/TimeLimit.vue'),
    },
    {
      path: '/setting',
      component: ()=> import('@/view/Setting.vue')
    }
  ],
})

export default router
