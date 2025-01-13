import emitter from '@/utils/emitter'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory((import.meta as any).env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/time-keep'
    },
    {
      path: '/time-keep',
      component: () => import('@/view/TimeKeep.vue')
    },
    {
      path: '/time-limit',
      component: () => import('@/view/TimeLimit.vue')
    },
    {
      path: '/setting',
      component: () => import('@/view/Setting.vue')
    },
    {
      path: '/rank',
      component: () => import('@/view/Rank.vue')
    }
  ]
})

// 创建一个全局状态来管理首次访问状态
const visitedRoutes = new Set()

// 路由守卫
router.beforeEach((to, from, next) => {
  if (!visitedRoutes.has(to.path)) {
    emitter.emit('loading', true)
  }
  next()
})

router.afterEach((to) => {
  if (!visitedRoutes.has(to.path)) {
    visitedRoutes.add(to.path)
    emitter.emit('loading', false)
  }
})

export default router
