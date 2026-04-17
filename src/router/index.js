import { createRouter, createWebHashHistory } from 'vue-router'
import MemoryPage from '@/page/memoryPage/index.vue'
import SelectGame from "@/page/selectGame/selectGame.vue";
import HostSelection from "@/page/hostSelection/index.vue"

const routes = [
  {
    path: '/',
    name: 'HostSelection',
    component: HostSelection
  },
  {
    path: '/memoryPage',
    name: 'MemoryPage',
    component: MemoryPage
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