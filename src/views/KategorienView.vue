<script setup>
import "@/assets/style.css"
import "@/assets/laptops.css"
import "@/assets/phones.css"
import { ref, onMounted } from "vue"
import logo from "@/assets/logo.png"
import profile from "@/assets/profile.jpg"
import { usePlanexStore } from "@/stores/planexStore"
import { storeToRefs } from "pinia"

const store = usePlanexStore()
const { categories, user } = storeToRefs(store)

const showSidebar = ref(false)
function toggleSidebar() {
  showSidebar.value = !showSidebar.value
}

function deleteCategory(id) {
  store.deleteCategory(id)
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
          <div class="profile-name">{{ user.name }}</div>
        </div>

        <nav class="sidebar-nav">
          <router-link to="/" class="nav-link">Startseite</router-link>
          <router-link to="/task" class="nav-link">Aufgaben</router-link>
          <router-link to="/calendar" class="nav-link">Kalender</router-link>
          <router-link to="/kategorien" class="nav-link">Kategorien</router-link>
          <router-link to="/freetext" class="nav-link">Freitext</router-link>
        </nav>
        <router-link
          to="/settings"
          class="sidebar-settings"
          @click="showSidebar = false"
        >
          ⚙️
        </router-link>
      </div>
    </div>

    <img :src="logo" alt="Planex Logo" class="logo-img" />
  </header>

  <main class="categories-page">
    <h1 class="page-title">Meine Kategorien</h1>

    <div v-if="categories.length === 0" class="empty-text">
      Noch keine Kategorien vorhanden.
    </div>

  <div class="card">
    <div 
      v-for="category in categories" 
      :key="category.id" 
      class="category-item"
    >
      <span class="category-name">
        {{ category.name }}
      </span>

      <button 
        class="delete-btn"
        @click="deleteCategory(category.id)"
      >
        ✖
      </button>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 40px;
}

.card {
  height: 300px;
}

.create-btn {
  display: block;
  margin: 10px auto 20px auto;
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  background: #4caf50;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.empty-text {
  text-align: center;
  margin-top: 40px;
  font-size: 18px;
  color: #777;
}

.notes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  padding: 10px;
}

.note-card {
  padding: 18px;
  border-radius: 12px;
  min-height: 120px;
  width: 500px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  font-size: 16px;
  word-break: break-word;
  position: relative;
}

.delete-btn {
  margin-top: 100px;
  margin-right: 5px;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  background: #ffffff;
  color: rgb(0, 0, 0);
  font-weight: bolder;
}

.edit-btn {
  margin-top: 10px;
  margin-right: 5px;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  background: #ffffff;
  color: rgb(0, 0, 0);
  font-weight: bold;
}

</style>