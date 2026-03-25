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
const { freeTexts, user } = storeToRefs(store)

// Sidebar
const showSidebar = ref(false)
function toggleSidebar() {
  showSidebar.value = !showSidebar.value
}

// Bearbeiten
const showEditModal = ref(false)
const editingText = ref({ id: null, content: "" })

// 🔹 Löschen
function deleteText(id) {
  store.deleteFreeText(id)
}

// 🔹 Bearbeiten starten
function startEdit(text) {
  editingText.value = { ...text }
  showEditModal.value = true
}

// 🔹 Änderungen speichern
function editText() {
  store.updateFreeText(editingText.value.id, editingText.value.content)
  showEditModal.value = false
  editingText.value = { id: null, content: "" }
}
</script>

<template>
  <header class="header">
    <div class="settings" @click="toggleSidebar">☰</div>

    <div
      v-if="showSidebar"
      class="sidebar-overlay"
      @click.self="showSidebar = false"
    >
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

  <main class="freetext-page">
    <h1 class="page-title">Meine Freitexte</h1>

    <div v-if="freeTexts.length === 0" class="empty-text">
      Noch keine Freitexte vorhanden.
    </div>

    <div v-else class="notes-grid">
      <div
        v-for="text in freeTexts"
        :key="text.id"
        class="note-card"
      >
        <p>{{ text.content }}</p>

        <button class="delete-btn" @click="deleteText(text.id)">
          Löschen
        </button>
        <button class="edit-btn" @click="startEdit(text)">
          Bearbeiten
        </button>
      </div>
    </div>
  </main>

  <div v-if="showEditModal" class="modal-overlay">
    <div class="modal">
      <h2>Freitext bearbeiten</h2>

      <textarea
        v-model="editingText.content"
        placeholder=""
        class="input"
        rows="5"
        style="resize: none;"
      ></textarea>

      <div class="modal-actions">
        <button class="cancel" @click="showEditModal = false">Abbrechen</button>
        <button class="create" @click="editText">Speichern</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.freetext-page {
  padding: 20px;
}

.page-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 28px;
}

.empty-text {
  text-align: center;
  margin-top: 40px;
  font-size: 18px;
  color: #777;
}

.notes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20px, 35rem));
  gap: 20px;
  padding: 10px;
}


.note-card {
  background: #dbe5f2;
  padding: 18px;
  border-radius: 12px;
  min-height: 180px;
  width: 500px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  font-size: 16px;
  white-space: pre-wrap;
  word-break: break-word;
  position: relative;
}

.note-card:nth-child(even) {
  background: #ffd6e0;
}

.note-card:nth-child(3n) {
  background: #c8f7c5;
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