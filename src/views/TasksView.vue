<script setup>
import "@/assets/style.css"  
import { ref } from "vue"
import logo from "@/assets/logo.png"
import profile from "@/assets/profile.jpg"



const showChoiceModal = ref(false)
const showTaskModal = ref(false)

const newTask = ref({
  time: "",
  task: ""
})

function openTaskModal() {
  showChoiceModal.value = false
  showTaskModal.value = true
}

function createTask() {
  if (!newTask.value.task || !newTask.value.time) return

  todayItems.value.push({
    time: newTask.value.time,
    task: newTask.value.task
  })

  newTask.value = { time: "", task: "" }
  showTaskModal.value = false
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
  <router-link to="/" class="nav-link">Startseite</router-link>
  <router-link to="/task" class="nav-link">Aufgaben</router-link>
  <router-link to="/calendar" class="nav-link">Kalender</router-link>
  <router-link to="/kategorien" class="nav-link">Kategorien</router-link>
</nav>

    <!-- Settings Icon -->
    <div class="sidebar-settings">⚙️</div>
  </div>
</div>


    <img :src="logo" alt="Planex Logo" class="logo-img" />
  </header>


<div class="time-container">
    <div class="timebox">
      <h2>Heute</h2>
    </div>
    <div class="timebox">
      <h2>Woche</h2>
    </div>
    <div class="timebox">
      <h2>Jahr</h2>
    </div>
</div>

<h1>Aufgaben</h1>
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

    <input
    type="text"
    v-model="newTask.title"
    placeholder="Titel der Aufgabe"
    class="input"
  />

    <input
      type="text"
      v-model="newTask.task"
      placeholder="Hier eingeben (max. 100 Zeichen)"
      maxlength="100"
      class="input"
    />

    <input
      type="time"
      v-model="newTask.time"
      class="input"
    />

    <div class="modal-actions">
      <button class="cancel" @click="showTaskModal = false">
        Abbrechen
      </button>

      <button class="create" @click="createTask">
        Erstellen
      </button>
    </div>

  </div>
</div>


<div v-if="showCategoryModal" class="modal-overlay">
  <div class="modal">

    <h2>Kategorie erstellen</h2>

    <input
      type="text"
      v-model="newCategory.name"
      placeholder="Name (max. 30 Zeichen)"
      maxlength="50"
      class="input"
    />


    <label>Farbe wählen:</label>
    <input
      type="color"
      v-model="newCategory.color"
      class="input"
      style="height: 50px; width: 100%; padding: 0; border-radius: 8px;"
    />

    <div class="modal-actions">
      <button class="cancel" @click="showCategoryModal = false">Abbrechen</button>
      <button class="create" @click="createCategory">Erstellen</button>
    </div>

  </div>
</div>

<div v-if="showTextModal" class="modal-overlay">
  <div class="modal">

    <h2>Freitext</h2>

    <textarea
      v-model="newText.content"
      placeholder=""
      class="input"
      rows="5"
      style="resize: none;"
    ></textarea>

    <div class="modal-actions">
      <button class="cancel" @click="showTextModal = false">Abbrechen</button>
      <button class="create" @click="createText">Erstellen</button>
    </div>

  </div>
</div>
</template>

<style scoped>
button.add {
  background-color: #8AB3C2;
  border-color: #D5E8F2;
  margin-left: 50%;
  margin-top: 800px;
  transform: translateX(-50%);
  width: 70px;
  height: 70px;
  font-size: 50px;
  color: #FFFFFF;
  border-radius: 50%;
  border: none;


}

.time-container {
  display: flex;        
  gap: 20px;             
  justify-content: center; 
  align-items: center;  
}

.time-container div {
  padding: 5px;
  background-color: #d5e8f2;
  border: 1px solid #ccc;
  text-align: center;
}

h1 {
  margin-left: 1000px;
}
</style>