<script setup>
import "@/assets/style.css"  
import { ref } from "vue"
import logo from "@/assets/logo.png"
import profile from "@/assets/profile.jpg"

const showSidebar = ref(false)

function toggleSidebar() {
  showSidebar.value = !showSidebar.value
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
  <router-link to="/">Startseite</router-link>
  <router-link to="/calendar">Kalender</router-link>
  <router-link to="/kategorien">Kategorien</router-link>
    </nav>

    <!-- Settings Icon -->
    <div class="sidebar-settings">⚙️</div>
  </div>
</div>


    <img :src="logo" alt="Planex Logo" class="logo-img" />
  </header>

  <div class="welcome">
    <h1>Kategorien</h1>
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

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  margin-top: 10px;
  background: #f4f4f4;
  border-radius: 8px;
}

.category-name {
  font-size: 24px;
}

.delete-btn {
  background: transparent;
  border: none;
  color: #67889a;
  font-size: 16px;
  cursor: pointer;
}
</style>

