<script setup>
import "@/assets/style.css"
import { ref, computed } from "vue"
import { usePlanexStore } from "@/stores/planexStore"
import { storeToRefs } from "pinia"
import logo from "@/assets/logo.png"
import profile from "@/assets/profile.jpg"


// Initialize Store
const store = usePlanexStore()
// Extract reactive data from store - use "tasks" not "todayItems"
const { tasks, categories, user } = storeToRefs(store)

const showChoiceModal = ref(false)
const showTaskModal = ref(false)
const showCategoryModal = ref(false)
const showTextModal = ref(false)
const editingTaskId = ref(null)

const newTask = ref({
  title: "",
  task: "", 
  time: "",
  status: "red",
  category: null,
  date: null
})

const newCategory = ref({ name: "", color: "#8AB3C2" })
const newText = ref({ content: "" })

// --- Logic Updates ---

function openTaskModal(item = null, id = null) {
  showChoiceModal.value = false
  showTaskModal.value = true

  if (item) {
    newTask.value = { ...item }
    editingTaskId.value = id
  } else {
    newTask.value = { title: "", task: "", time: "", status: "red", category: null, date: null }
    editingTaskId.value = null
  }
}

function createTask() {
  if (!newTask.value.title || !newTask.value.time || !newTask.value.date) {
    alert("Bitte Titel, Uhrzeit und Datum angeben!")
    return
  }

  if (editingTaskId.value !== null) {
    store.updateTask(editingTaskId.value, newTask.value)
  } else {
    store.addTask(newTask.value)
  }

  newTask.value = { title: "", task: "", time: "", status: "red", category: null }
  showTaskModal.value = false
  editingTaskId.value = null
}

function createCategory() {
  if (!newCategory.value.name) return
  store.addCategory(newCategory.value.name, newCategory.value.color)
  newCategory.value = { name: "", color: "#8AB3C2" }
  showCategoryModal.value = false
}

function createText() {
  if (!newText.value.content) return
  store.addFreeText(newText.value.content)
  newText.value = { content: "" }
  showTextModal.value = false
}

// --- Search & Filter ---
const searchQuery = ref("")
const showSearch = ref(false)
const showFilterMenu = ref(false)
const showCategorySubmenu = ref(false)
const selectedStatus = ref(null)
const selectedCategory = ref(null)
const statuses = ["Alle", "Offen", "Erledigt", "Kategorie"]

const filteredItems = computed(() => {
  // Use tasks.value for filtering
  return tasks.value.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = !selectedStatus.value || item.status === selectedStatus.value
    const matchesCategory = !selectedCategory.value || item.category === selectedCategory.value
    return matchesSearch && matchesStatus && matchesCategory
  })
})

function selectStatus(status) {
  if (status === "Kategorie") {
    showCategorySubmenu.value = true
  } else if (status === "Alle") {
    selectedStatus.value = null
    selectedCategory.value = null
    showFilterMenu.value = false
  } else {
    selectedStatus.value = status === "Erledigt" ? "green" : "red"
    selectedCategory.value = null
    showFilterMenu.value = false
  }
}
function deleteTask(id) {
  if (confirm("Möchtest du diese Aufgabe wirklich löschen?")) {
    store.deleteTask(id)
  }
}

const showSidebar = ref(false)
</script>

<template>
  <header class="header">
    <div class="settings" @click="showSidebar = !showSidebar">☰</div>
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

  <h1>Aufgaben</h1>
  
  <div class="task-area">
    <div class="search-container">
      <input v-if="showSearch" type="text" v-model="searchQuery" placeholder="Suchen..." class="search-input" />
      <div @click="showSearch = !showSearch" style="cursor: pointer;">🔍</div>
    </div>

    <div class="task-list">
      <div v-for="item in filteredItems" :key="item.id" class="task-box">
        <span class="task-name">{{ item.title }}</span>
        
        <span v-if="item.category" class="task-category">{{ store.getCategoryById(item.category)?.name }}</span>
        <span class="task-time">{{ item.time }}</span>
        <span 
          class="status" 
          :class="item.status"
          :title="item.status === 'green' ? 'Erledigt' : 'Offen'"
          @click="store.toggleTaskStatus(item.id)"
          style="cursor: pointer;">
        </span>
        <span class="edit" @click="openTaskModal(item, item.id)">✏️</span>
        <span class="icon-btn delete-btn" @click="deleteTask(item.id)">🗑️</span>      </div>
    </div>

    <div class="filter" style="position: relative;">
      <button @click="showFilterMenu = !showFilterMenu">Filter ▼</button>
      <div v-if="showFilterMenu" class="filter-menu">
        <div v-for="status in statuses" :key="status" class="filter-item" @click="selectStatus(status)">
          {{ status }}
          <div v-if="status === 'Kategorie' && showCategorySubmenu" class="filter-submenu">
            <div v-for="cat in categories" :key="cat.id" class="filter-item" @click.stop="selectedCategory = cat.id; showFilterMenu = false">
              {{ cat.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <button class="add" @click="showChoiceModal = true">+</button>

  <div v-if="showChoiceModal" class="choice-overlay" @click.self="showChoiceModal = false">
    <div class="choice-box">
      <button @click="openTaskModal()">Aufgabe</button>
      <button @click="showTextModal = true; showChoiceModal = false">Freitext</button>
      <button @click="showCategoryModal = true; showChoiceModal = false">Kategorie</button>
    </div>
  </div>

  <div v-if="showTaskModal" class="modal-overlay" @click.self="showTaskModal = false">
    <div class="modal">
      <h3>{{ editingTaskId !== null ? 'Aufgabe bearbeiten' : 'Neue Aufgabe' }}</h3>
      <input type="text" v-model="newTask.title" placeholder="Titel" class="input" style="width: 100%; margin-bottom: 10px; box-sizing: border-box;"/>
      <input type="time" v-model="newTask.time" class="input" style="width: 100%; margin-bottom: 10px; box-sizing: border-box;"/>
      <input type="date" v-model="newTask.date" class="input" 
        style="width: 100%; margin-bottom: 10px; box-sizing: border-box;" />
      <textarea v-model="newTask.task" placeholder="Aufgabenbeschreibung" class="input" style="width: 100%; margin-bottom: 10px; box-sizing: border-box; height: 80px;"></textarea>
      <select v-model.number="newTask.category" class="category-select" style="width: 100%; padding: 8px; margin-bottom: 10px;">
        <option :value="null">Keine Kategorie</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
      </select>
      <div class="modal-actions">
        <button class="cancel" @click="showTaskModal = false">Abbrechen</button>
        <button class="create" @click="createTask">Speichern</button>
      </div>
    </div>
  </div>

  <div v-if="showCategoryModal" class="modal-overlay" @click.self="showCategoryModal = false">
    <div class="modal">
      <h3>Kategorie erstellen</h3>
      <input type="text" v-model="newCategory.name" placeholder="Name" class="input" style="width: 100%; margin-bottom: 10px; box-sizing: border-box;" />
      <input type="color" v-model="newCategory.color" class="input" style="width: 100%; height: 40px; margin-bottom: 10px; box-sizing: border-box;" />
      <div class="modal-actions">
        <button class="cancel" @click="showCategoryModal = false">Abbrechen</button>
        <button class="create" @click="createCategory">Erstellen</button>
      </div>
    </div>
  </div>

  <div v-if="showTextModal" class="modal-overlay" @click.self="showTextModal = false">
    <div class="modal">
      <h3>Freitext hinzufügen</h3>
      <textarea v-model="newText.content" placeholder="Text..." class="input" style="width: 100%; height: 120px; box-sizing: border-box;"></textarea>
      <div class="modal-actions">
        <button class="cancel" @click="showTextModal = false">Abbrechen</button>
        <button class="create" @click="createText">Speichern</button>
      </div>
    </div>
  </div>
</template>

<style scoped>


h1 {
  text-align: center;
  margin-bottom: 40px;
}

.task-area {
  width: 324px;
  margin: auto;
  position: relative;
  height: 100%;
}

.search-container {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.search-input {
  flex: 1;
  max-width: 300px;
  padding: 5px 10px;
  border: 2px solid #ccc;
  border-radius: 8px;
}

.task-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
}

.task-box {
  width: 300px;
  border: 2px solid black;
  background: #c8d9e2;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  gap: 10px;
}

.task-name {
  flex: 1;
}

.task-time {
  margin-right: 10px;
}

.task-category {
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
}

.category-select {
  width: 100%;
  padding: 5px;
  border: 2px solid #ccc;
  border-radius: 4px;
}

.status {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.status.red {
  background: red;
}

.status.green {
  background: green;
}

.filter {
  margin-top: 10px;
}

.filter button {
  background: #c8d9e2;
  border: 2px solid black;
  padding: 5px 15px;
}

.filter-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: #c8d9e2;
  border: 2px solid black;
  width: 76px;
}

.filter-item {
  padding: 5px;
  cursor: pointer;
  border-bottom: 1px solid #999;
  position: relative;
  font-size: 14px;
}

.filter-item:hover {
  background: #b0c5d1;
}

.filter-submenu {
  position: absolute;
  top: 0;
  left: 100%;
  background: #c8d9e2;
  border: 2px solid black;
  width: 70px;
  display: flex;
  flex-direction: column;
}


@media (max-width: 600px){
  button.add {
  position: absolute;
  display: block;
  margin:  auto;
  width: 70px;
  height: 70px;
  font-size: 50px;
  color: #fff;
  background-color: #8AB3C2;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}
}

@media (min-width: 1024px) {
button.add {
  position: absolute;
  width: 70px;
  height: 70px;
  font-size: 50px;
  color: #fff;
  background-color: #8AB3C2;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  top: 600px;
}
  .choice-overlay {
    position: absolute;
    margin-left: 120px;
    top: 220px;
  }
    .sidebar-settings {
    position: absolute;
    bottom: 20px;     
    left: 20px;       
    font-size: 24px;
    cursor: pointer;
  }
}
</style>