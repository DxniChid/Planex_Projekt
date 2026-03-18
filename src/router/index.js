import { createRouter, createWebHistory } from "vue-router"

import HomeView from "@/views/HomeView.vue"
import KategorienView from "@/views/KategorienView.vue"
import CalendarView from "@/views/CalendarView.vue"
import TasksView from "@/views/TasksView.vue"
import SettingsView from "@/views/SettingsView.vue"
import LoginView from "@/views/LoginView.vue"
import SignUpView from "@/views/SignUpView.vue"
import FreeTextView from "@/views/FreeTextView.vue"


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
  },
  {
    path: "/settings",
    name: "settings",
    component: SettingsView
  },
  {
    path: "/login",
    name: "login",
    component: LoginView
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUpView
  },
  {
    path: "/freetext",
    name: "freetext",
    component: FreeTextView
  }






  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router