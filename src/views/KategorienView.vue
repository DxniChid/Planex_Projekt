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
    <h3 class="card-title">Test</h3>

  </div>


   
</template>

