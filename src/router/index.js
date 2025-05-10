import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/page/Home/home.vue'
import SelectGame from "@/page/selectGame/selectGame.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/select_game',
    name: 'SelectGame',
    component: SelectGame
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router