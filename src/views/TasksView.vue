<script setup>
import "@/assets/style.css"
import { ref, computed } from "vue"
import logo from "@/assets/logo.png"
import profile from "@/assets/profile.jpg"



const showChoiceModal = ref(false)
const showTaskModal = ref(false)

const newTask = ref({
  time: "",
  task: ""
})

function openTaskModal(item = null, index = null) {
  showChoiceModal.value = false
  showTaskModal.value = true

  if (item) {
    newTask.value = { ...item }
    editingTaskIndex.value = index
  } else {
    newTask.value = { title: "", task: "", time: "" }
    editingTaskIndex.value = null
  }
}

function createTask() {
  if (!newTask.value.task || !newTask.value.time) return

  if (editingTaskIndex.value !== null) {
    todayItems.value[editingTaskIndex.value] = { ...newTask.value }
  } else {
    todayItems.value.push({ ...newTask.value })
  }

  newTask.value = { title: "", task: "", time: "" }
  showTaskModal.value = false
  editingTaskIndex.value = null
}


const texts = ref([])

function createText() {
  if (!newText.value.content) return
  texts.value.push({ ...newText.value })
  newText.value = { content: "" }
  showTextModal.value = false
}

function deleteTask(index) {
  todayItems.value.splice(index, 1)
}

const showCategoryModal = ref(false)

const newCategory = ref({
  name: "",
  color: "#8AB3C2"
})


const showTextModal = ref(false)
const newText = ref({
  content: ""
})


const showSidebar = ref(false)

function toggleSidebar() {
  showSidebar.value = !showSidebar.value
}


const todayItems = ref([
  {
    title: "Yoga",
    time: "07:10",
    status: "red"
  },
  {
    title: "Restaurant",
    time: "19:00",
    status: "green"
  }
])

const editingTaskIndex = ref(null) // speichert den Index der bearbeiteten Aufgabe



const searchQuery = ref("");
const showSearch = ref(false);

function toggleSearch() {
  showSearch.value = !showSearch.value;
  searchQuery.value = ""; // reset beim Öffnen
}

const showFilterMenu = ref(false)
const showCategorySubmenu = ref(false)
const selectedStatus = ref(null)
const selectedCategory = ref(null)

const statuses = ["Erledigt", "Offen", "Kategorie"]
const categories = ["Arbeit", "Freizeit", "Schule"]

function toggleFilterMenu() {
  showFilterMenu.value = !showFilterMenu.value
  showCategorySubmenu.value = false
}

function selectStatus(status) {
  if (status === "Kategorie") {
    showCategorySubmenu.value = true
  } else {
    selectedStatus.value = status === "Erledigt" ? "green" : "red"
    selectedCategory.value = null
    showFilterMenu.value = false
    showCategorySubmenu.value = false
  }
}

function selectCategory(category) {
  selectedCategory.value = category
  showFilterMenu.value = false
  showCategorySubmenu.value = false
}
const filteredItems = computed(() => {
  return todayItems.value.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = !selectedStatus.value || item.status === selectedStatus.value
    const matchesCategory = !selectedCategory.value || item.category === selectedCategory.value
    return matchesSearch && matchesStatus && matchesCategory
  })
})

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
      <input v-if="showSearch" type="text" v-model="searchQuery" placeholder="Aufgaben suchen..."
        class="search-input" />
      <div @click="toggleSearch">🔍</div>
    </div>

    <div class="task-list">
      <div v-for="(item, index) in filteredItems" :key="index" class="task-box">
        <span class="task-name">{{ item.title }}</span>
        <span class="task-time">{{ item.time }}</span>
        <span class="status" :class="item.status"></span>
        <span class="edit" @click="openTaskModal(item, todayItems.indexOf(item))">✏️</span>
        <span class="icon-btn delete-btn" @click="deleteTask(todayItems.indexOf(item))" title="Löschen">🗑️</span>
      </div>
    </div>

    <div class="filter" style="position: relative;">
      <button @click="toggleFilterMenu">Filter ▼</button>

      <div v-if="showFilterMenu" class="filter-menu">
        <div v-for="status in statuses" :key="status" class="filter-item" @click="selectStatus(status)">
          {{ status }}

          <div v-if="status === 'Kategorie' && showCategorySubmenu" class="filter-submenu">
            <div v-for="cat in categories" :key="cat" class="filter-item" @click.stop="selectCategory(cat)">
              {{ cat }}
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>


  <button class="add" @click="showChoiceModal = true">+</button>
  <div v-if="showChoiceModal" class="choice-overlay">
    <div class="choice-box">
      <button @click="openTaskModal">Aufgabe</button>
      <button @click="showTextModal = true; showChoiceModal = false">Freitext</button>
      <button @click="showCategoryModal = true; showChoiceModal = false">Kategorie</button>
    </div>
  </div>

  <!-- Task Modal -->
  <div v-if="showTaskModal" class="modal-overlay">
    <div class="modal">

      <input type="text" v-model="newTask.title" placeholder="Titel der Aufgabe" class="input" />

      <input type="text" v-model="newTask.task" placeholder="Hier eingeben (max. 100 Zeichen)" maxlength="100"
        class="input" />

      <input type="time" v-model="newTask.time" class="input" />

      <div class="modal-actions">
        <button class="cancel" @click="showTaskModal = false">
          Abbrechen
        </button>

        <button class="create" @click="createTask">
          Speichern
        </button>
      </div>

    </div>
  </div>


  <div v-if="showCategoryModal" class="modal-overlay">
    <div class="modal">

      <h2>Kategorie erstellen</h2>

      <input type="text" v-model="newCategory.name" placeholder="Name (max. 30 Zeichen)" maxlength="50" class="input" />


      <label>Farbe wählen:</label>
      <input type="color" v-model="newCategory.color" class="input"
        style="height: 50px; width: 100%; padding: 0; border-radius: 8px;" />

      <div class="modal-actions">
        <button class="cancel" @click="showCategoryModal = false">Abbrechen</button>
        <button class="create" @click="createCategory">Speichern</button>
      </div>

    </div>
  </div>

  <div v-if="showTextModal" class="modal-overlay">
    <div class="modal">

      <h2>Freitext</h2>

      <textarea v-model="newText.content" placeholder="" class="input" rows="5" style="resize: none;"></textarea>

      <div class="modal-actions">
        <button class="cancel" @click="showTextModal = false">Abbrechen</button>
        <button class="create" @click="createText">Speichern</button>
      </div>

    </div>
  </div>
</template>

<style scoped>
button.add {
  position: fixed;
  bottom: 160px;
  right: 48%;
  transform: translateX(-45%);
  width: 70px;
  height: 70px;
  font-size: 50px;
  color: #fff;
  background-color: #8AB3C2;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  padding:0;
}




h1 {
  margin-left: 1000px;
}

.task-area {
  width: 324px;
  margin: auto;
  position: relative;
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
  width: 77px;
  z-index: 10;
}

.filter-item {
  padding: 5px 10px;
  cursor: pointer;
  border-bottom: 1px solid #999;
  position: relative;
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
</style>