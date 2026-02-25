import { createRouter, createWebHistory } from "vue-router"

import HomeView from "@/views/HomeView.vue"
import KategorienView from "@/views/KategorienView.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/kategorien",
    name: "kategorien",
    component: KategorienView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router