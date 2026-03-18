<script setup>
import "@/assets/style.css"  
import { ref } from "vue"
import logo from "@/assets/logo.png"
import profile from "@/assets/profile.jpg"
import "@/assets/laptops.css"
import "@/assets/phones.css"




const name = ref("Max Mustermann")

const todayItems = ref([
  { time: "06:00", task: "Hund Gassi" },
  { time: "11:30", task: "Einkaufen" }
])

function addItem() {
  todayItems.value.push({
    time: "00:00",
    task: "Neue Aufgabe"
  })
}



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
    <h2>{{ name }}</h2>
  </div>

  <div class="card">
    <h3 class="card-title">Heute</h3>

    <div class="timeline">
      <div
        v-for="(item, i) in todayItems"
        :key="i"
        class="timeline-row"
      >
        <div class="timeline-left">
          <div class="dot"></div>
          <div v-if="i !== todayItems.length - 1" class="line"></div>
        </div>

        <div class="time">{{ item.time }}</div>
        <div class="task">{{ item.task }}</div>
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

</style>