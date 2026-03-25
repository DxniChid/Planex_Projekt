<script setup>
import "@/assets/style.css"  
import { ref } from "vue"
import logo from "@/assets/logo.png"
import profile from "@/assets/profile.jpg"
import { usePlanexStore } from "@/stores/planexStore"
import { storeToRefs } from "pinia"

const store = usePlanexStore()
const { tasks, categories, user } = storeToRefs(store)

const showChoiceModal = ref(false)
const showTaskModal = ref(false)
const showCategoryModal = ref(false)
const showTextModal = ref(false)

const newTask = ref({
  title: "",
  task: "",
  time: "",
  status: "red",
  category: null
})

const newCategory = ref({
  name: "",
  color: "#8AB3C2"
})

const newText = ref({
  content: ""
})

const showSidebar = ref(false)

function toggleSidebar() {
  showSidebar.value = !showSidebar.value
}

function openTaskModal() {
  showChoiceModal.value = false
  showTaskModal.value = true
}

function createTask() {
  if (!newTask.value.title || !newTask.value.time) {
    alert("Bitte Titel und Uhrzeit angeben!")
    return
  }
  store.addTask(newTask.value)
  newTask.value = { title: "", task: "", time: "", status: "red", category: null }
  showTaskModal.value = false
}

function createCategory() {
  if (!newCategory.value.name) {
    alert("Bitte einen Namen eingeben!")
    return
  }
  store.addCategory(newCategory.value.name, newCategory.value.color)
  newCategory.value = { name: "", color: "#8AB3C2" }
  showCategoryModal.value = false
}

function createText() {
  if (!newText.value.content.trim()) {
    alert("Bitte Text eingeben!")
    return
  }
  store.addFreeText(newText.value.content)
  newText.value = { content: "" }
  showTextModal.value = false
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

  <div class="welcome">
    <h1>Willkommen</h1>
    <h2>{{ user.name }}</h2>
  </div>

  <div class="card">
    <h3 class="card-title">Heute</h3>

    <div class="timeline">
      <div
        v-for="(item, i) in tasks"
        :key="i"
        class="timeline-row"
      >
        <div class="timeline-left">
          <div class="dot"></div>
          <div v-if="i !== tasks.length - 1" class="line"></div>
        </div>

        <div class="time">{{ item.time }}</div>
        <div class="task">{{ item.title }}</div>
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
  top: 700px;
}
  .choice-overlay {
    position: absolute;
    margin-left: 120px;
    top: 320px;
  }
}

</style>