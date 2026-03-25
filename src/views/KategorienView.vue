<script setup>
import "@/assets/style.css"
import "@/assets/laptops.css"
import "@/assets/phones.css"
import { ref, onMounted } from "vue"
import logo from "@/assets/logo.png"
import profile from "@/assets/profile.jpg"

const showSidebar = ref(false)
function toggleSidebar() {
  showSidebar.value = !showSidebar.value
}

const categories = ref([])

const showEditModal = ref(false)
const editingCategory = ref({ id: null, name: "", color: "#8AB3C2" })

onMounted(() => {
  const savedCategories = localStorage.getItem("categories")
  if (savedCategories) {
    categories.value = JSON.parse(savedCategories)
  }
})

function deleteCategory(id) {
  categories.value = categories.value.filter(cat => cat.id !== id)
  localStorage.setItem("categories", JSON.stringify(categories.value))
}

function startEdit(category) {
  editingCategory.value = { ...category }
  showEditModal.value = true
}

function editCategory() {
  const index = categories.value.findIndex(c => c.id === editingCategory.value.id)
  if (index !== -1) {
    categories.value[index] = { ...editingCategory.value }
    localStorage.setItem("categories", JSON.stringify(categories.value))
  }
  showEditModal.value = false
  editingCategory.value = { id: null, name: "", color: "#8AB3C2" }
}

const showCreateModal = ref(false)
const newCategory = ref({ name: "", color: "#8AB3C2" })

function createCategory() {
  if (!newCategory.value.name.trim()) return
  categories.value.push({
    id: Date.now(),
    name: newCategory.value.name,
    color: newCategory.value.color
  })
  localStorage.setItem("categories", JSON.stringify(categories.value))
  newCategory.value = { name: "", color: "#8AB3C2" }
  showCreateModal.value = false
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
        <nav class="sidebar-nav">
          <router-link to="/" class="nav-link">Startseite</router-link>
          <router-link to="/task" class="nav-link">Aufgaben</router-link>
          <router-link to="/calendar" class="nav-link">Kalender</router-link>
          <router-link to="/kategorien" class="nav-link">Kategorien</router-link>
          <router-link to="/freetext" class="nav-link">Freitext</router-link>
        </nav>
        <router-link to="/settings" class="sidebar-settings" @click="showSidebar = false">
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

    <div v-else class="notes-grid">
      <div v-for="cat in categories" :key="cat.id" class="note-card" :style="{ background: cat.color }">
        <p>{{ cat.name }}</p>
        <button class="edit-btn" @click="startEdit(cat)">Bearbeiten</button>
        <button class="delete-btn" @click="deleteCategory(cat.id)">Löschen</button>
      </div>
    </div>
  </main>

  <div v-if="showEditModal" class="modal-overlay">
    <div class="modal">
      <h2>Kategorie bearbeiten</h2>
      <input type="text" v-model="editingCategory.name" placeholder="Name" class="input"/>
      <input type="color" v-model="editingCategory.color" class="input" style="height:50px; width:100%; padding:0; border-radius:8px;" />
      <div class="modal-actions">
        <button class="cancel" @click="showEditModal = false">Abbrechen</button>
        <button class="create" @click="editCategory">Speichern</button>
      </div>
    </div>
  </div>

  <div v-if="showCreateModal" class="modal-overlay">
    <div class="modal">
      <h2>Neue Kategorie</h2>
      <input type="text" v-model="newCategory.name" placeholder="Name" class="input"/>
      <input type="color" v-model="newCategory.color" class="input" style="height:50px; width:100%; padding:0; border-radius:8px;" />
      <div class="modal-actions">
        <button class="cancel" @click="showCreateModal = false">Abbrechen</button>
        <button class="create" @click="createCategory">Erstellen</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.categories-page {
  padding: 20px;
}

.page-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 28px;
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