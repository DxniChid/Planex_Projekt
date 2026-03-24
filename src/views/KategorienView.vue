<script setup>
import "@/assets/style.css"
import "@/assets/laptops.css"
import "@/assets/phones.css"
import { ref } from "vue"
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

    <div v-else class="card">
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
  </main>
</template>

<style scoped>
.categories-page {
  padding: 20px;
}

.page-title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 32px;
  font-weight: 600;
}

.card {
  background: #D5E8F2;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
  max-width: 900px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  min-height: auto;
}

.empty-text {
  text-align: center;
  margin-top: 40px;
  font-size: 18px;
  color: #777;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  margin-bottom: 10px;
  background: #f4f6f8;
  border-radius: 8px;
  border-left: 4px solid #8AB3C2;
  transition: all 0.2s ease;
}

.category-item:hover {
  background: #e8eef4;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.category-item:last-child {
  margin-bottom: 0;
}

.category-name {
  font-size: 18px;
  font-weight: 500;
  color: #333;
  flex: 1;
}

.delete-btn {
  background: transparent;
  border: none;
  color: #d32f2f;
  font-size: 20px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.delete-btn:hover {
  background: rgba(211, 47, 47, 0.1);
  color: #b71c1c;
}

.delete-btn:active {
  transform: scale(0.95);
}

.create-btn {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  background: #8AB3C2;
  color: white;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}

.create-btn:hover {
  background: #6a94a8;
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
  transition: all 0.2s;
}

.edit-btn:hover {
  background: #f0f0f0;
}

h1 {
  font-size: 40px;
  text-align: center;
  margin-bottom: 40px;
}
</style>