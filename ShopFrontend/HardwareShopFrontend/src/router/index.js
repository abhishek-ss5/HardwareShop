import { createRouter, createWebHistory } from 'vue-router'
import ShopDashboard from '../views/ShopDashboard.vue'

const routes = [
  { path: '/', name: 'ShopDashboard', component: ShopDashboard }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router


