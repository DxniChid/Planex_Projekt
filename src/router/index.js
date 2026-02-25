import { createRouter, createWebHistory } from "vue-router"

import HomeView from "@/views/HomeView.vue"
import KategorienView from "@/views/KategorienView.vue"
import CalendarView from "@/views/CalendarView.vue"

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
  },
  {
    path: "/calendar",
    name: "calendar",
    component: CalendarView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router