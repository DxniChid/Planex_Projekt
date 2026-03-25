<script setup>
import "@/assets/style.css"
import "@/assets/laptops.css"
import "@/assets/phones.css"
import { ref, computed } from "vue"
import { usePlanexStore } from "@/stores/planexStore" // Adjust path if necessary
import logo from "@/assets/logo.png"
import profile from "@/assets/profile.jpg"

// Initialize Store
const store = usePlanexStore()

// Sidebar Logic
const showSidebar = ref(false)
function toggleSidebar() {
  showSidebar.value = !showSidebar.value
}

// Access State from Store
const categories = computed(() => store.categories)

// Modals State
const showEditModal = ref(false)
const showCreateModal = ref(false)

const editingCategory = ref({ id: null, name: "", color: "#8AB3C2" })
const newCategory = ref({ name: "", color: "#8AB3C2" })

// --- Actions using Store ---

function handleDelete(id) {
  const hasTasks = store.tasks.some(task => task.category === id);

  if (hasTasks) {
    alert("Diese Kategorie kann nicht gelöscht werden, da Aufgaben darin existieren.");
    return; 
  }
  if (confirm("Möchtest du diese Kategorie wirklich löschen?")) {
    store.deleteCategory(id);
  }
}

function startEdit(category) {
  editingCategory.value = { ...category }
  showEditModal.value = true
}

function saveEdit() {
  // We can use a custom action or just update the state directly if simple, 
  // but for consistency let's assume you might add an updateCategory action:
  const index = store.categories.findIndex(c => c.id === editingCategory.value.id)
  if (index !== -1) {
    store.categories[index] = { ...editingCategory.value }
  }
  showEditModal.value = false
}

function handleCreate() {
  if (!newCategory.value.name.trim()) return
  store.addCategory(newCategory.value.name, newCategory.value.color)
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
          <div class="profile-name">{{ store.user.name }}</div>
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
    <div class="header-row">
       <h1 class="page-title">Meine Kategorien</h1>
    </div>

    <div v-if="categories.length === 0" class="empty-text">
      Noch keine Kategorien vorhanden.
    </div>

    <div v-else class="notes-grid">
      <div 
        v-for="cat in categories" 
        :key="cat.id" 
        class="note-card" 
        :style="{ backgroundColor: cat.color }"
      >
        <p><strong>{{ cat.name }}</strong></p>
        <div class="card-actions">
          <button class="edit-btn" @click="startEdit(cat)">Bearbeiten</button>
          <button class="delete-btn" @click="handleDelete(cat.id)">Löschen</button>
        </div>
      </div>
    </div>
  </main>

  <div v-if="showEditModal" class="modal-overlay">
    <div class="modal">
      <h2>Kategorie bearbeiten</h2>
      <input type="text" v-model="editingCategory.name" class="input"/>
      <input type="color" v-model="editingCategory.color" class="color-input" />
      <div class="modal-actions">
        <button class="cancel" @click="showEditModal = false">Abbrechen</button>
        <button class="create" @click="saveEdit">Speichern</button>
      </div>
    </div>
  </div>

  <div v-if="showCreateModal" class="modal-overlay">
    <div class="modal">
      <h2>Neue Kategorie</h2>
      <input type="text" v-model="newCategory.name" placeholder="Name" class="input"/>
      <input type="color" v-model="newCategory.color" class="color-input" />
      <div class="modal-actions">
        <button class="cancel" @click="showCreateModal = false">Abbrechen</button>
        <button class="create" @click="handleCreate">Erstellen</button>
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
  grid-template-columns: repeat(auto-fit, minmax(20px, 35rem));
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

.color-input {
  width: 60px;   
  height: 35px;  
  border: none;
  cursor: pointer;
  border-radius: 4px; 
}
@media (max-width: 700px){

  .note-card {
    width: 370px;
    margin-left: 30px;
  }
}
</style>