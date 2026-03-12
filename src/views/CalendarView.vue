<script setup>
import { ref, computed } from "vue"
import "@/assets/style.css"
import logo from "@/assets/logo.png"
import profile from "@/assets/profile.jpg"

const showSidebar = ref(false)

function toggleSidebar() {
  showSidebar.value = !showSidebar.value
}

const currentDate = ref(new Date(2026, 2)) 
const today = new Date();

const monthNames = [
  "Januar","Februar","März","April","Mai","Juni",
  "Juli","August","September","Oktober","November","Dezember"
]

const daysOfWeek = ["Mo","Di","Mi","Do","Fr","Sa","So"]

const year = computed(() => currentDate.value.getFullYear())
const month = computed(() => currentDate.value.getMonth())

function prevMonth() {
  currentDate.value = new Date(year.value, month.value - 1)
}

function nextMonth() {
  currentDate.value = new Date(year.value, month.value + 1)
}

const daysInMonth = computed(() => {
  const firstDay = new Date(year.value, month.value, 1)
  const lastDay = new Date(year.value, month.value + 1, 0)
  const totalDays = lastDay.getDate()

  let startDay = firstDay.getDay()
  startDay = startDay === 0 ? 6 : startDay - 1 // Montag Start

  const days = []

  for (let i = 0; i < startDay; i++) {
    days.push(null)
  }

  for (let d = 1; d <= totalDays; d++) {
    days.push(d)
  }

  return days
})

const selectedDay = ref(
  (month.value === today.getMonth() && year.value === today.getFullYear()) ? today.getDate() : null
)

function isToday(day) {
  return day &&
         day === today.getDate() &&
         month.value === today.getMonth() &&
         year.value === today.getFullYear();
}

function selectDay(day) {
  selectedDay.value = day
}
</script>

<template>
 <header class="header">
    <div class="settings" @click="toggleSidebar">☰</div>
    <div v-if="showSidebar" class="sidebar-overlay" @click.self="showSidebar = false">
  <div class="sidebar">

    <div class="sidebar-profile">
      <div class="profile-pic">
        <img :src="profile" alt="Profilbild" />
      </div>
      <div class="profile-name">Max Mustermann</div>
    </div>

    <!-- Navigation -->
<nav class="sidebar-nav">
  <router-link to="/" class="nav-link">Startseite</router-link>
  <router-link to="/task" class="nav-link">Aufgaben</router-link>
  <router-link to="/calendar" class="nav-link">Kalender</router-link>
  <router-link to="/kategorien" class="nav-link">Kategorien</router-link>
</nav>

    <!-- Settings Icon -->
    <div class="sidebar-settings">⚙️</div>
  </div>
</div>


    <img :src="logo" alt="Planex Logo" class="logo-img" />
  </header>
  <div class="calendar-container">

   

    <div class="calendar-header">
      <button @click="prevMonth"><</button>
      <h2>{{ monthNames[month] }} {{ year }}</h2>
      <button @click="nextMonth">></button>
    </div>

    <div class="weekdays">
      <div v-for="day in daysOfWeek" :key="day">
        {{ day }}
      </div>
    </div>

    <div class="days">
      <div
        v-for="(day, index) in daysInMonth"
        :key="index"
        class="day"
        :class="{ selected: day === selectedDay }"
        @click="day && selectDay(day)"
      >
          <span v-if="isToday(day)" class="today-dot"></span>
        {{ day }}
      </div>
    </div>

    <button class="overview-btn" @click="goToTask">
      Aufgaben im Überblick
    </button>

  </div>
</template>

<style scoped>
.calendar-container {
  max-width: 350px;
  margin: auto;
  text-align: center;
  font-family: Arial, sans-serif;
}

.logo {
  width: 140px;
  margin: 20px 0;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
}

.calendar-header h2 {
  font-size: 22px;
  font-weight: 600;
}

.calendar-header button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.weekdays,
.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
}

.weekdays div {
  font-weight: 500;
}

.day {
  padding: 8px;
  cursor: pointer;
  border-radius: 50%;
  position: relative;
  text-align: center;
}


.day:hover {
  background: #eee;
}

.overview-btn {
  margin-top: 100%;
  padding: 15px;
  width: 100%;
  background: #6f8fa3;
  color: white;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.today-dot {
  display: block;
  position: absolute;
  width: 6px;
  height: 6px;
  background-color: #000000;
  border-radius: 50%;
  left: 19px;
  bottom: 30px;
}
</style>