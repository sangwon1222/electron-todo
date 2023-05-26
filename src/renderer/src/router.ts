import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('./pages/todo.vue') },
  { path: '/todo', name: 'todo', component: () => import('./pages/todo.vue') },
  {
    path: '/404',
    name: 'notFound',
    component: () => import('./pages/404.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('./pages/404.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
