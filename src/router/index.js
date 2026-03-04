import { createRouter, createWebHistory } from "vue-router"

import HomeView from "@/views/HomeView.vue"
import KategorienView from "@/views/KategorienView.vue"
import CalendarView from "@/views/CalendarView.vue"
import TasksView from "@/views/TasksView.vue"


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
  }, 
  {
    path: "/task",
    name: "task",
    component: TasksView

  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router