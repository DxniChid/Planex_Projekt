<script setup>
import { ref } from "vue"
import logo from "@/assets/logo.png"

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
</script>

<template>
  <header class="header">
    <div class="settings">☰</div>


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
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap');

body {
  min-height: 1000px;
  background: #f4f6f8;
    font-family: "Fredoka";
}

.header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
}

.settings {
  font-size: 40px;
  color: #A8D3E9;
  cursor: pointer;
}

.logo-img {
  height: 80px;
  margin-left: 42%;
  padding: 50px;
}

.welcome {
  padding: 16px;
  margin-left: 46%;
}

.card {
  background: #D5E8F2;
  margin-left: 37%;
  padding: 16px;
  width: 900px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  font-size: 20px;
}

.timeline-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;

}

.timeline-left {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dot {
  width: 10px;
  height: 10px;
  background: #8AB3C2 ;
  border-radius: 50%;
}

.line {
  width: 2px;
  height: 30px;
  background: #ddd;
  margin-top: 2px;
}

.time {
  font-weight: bold;
  width: 60px;
}

.task {
  flex: 1;
}


.add {
  background-color: #8AB3C2;
  border-color: #D5E8F2;
  margin-left: 50%;
  margin-top: 500px;
  transform: translateX(-50%);
  width: 70px;
  height: 70px;
  font-size: 50px;
  color: #FFFFFF;
  border-radius: 50%;
  border: none;


}


/* Auswahl Popup */
.choice-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.choice-box {
  position: absolute;
  bottom: 150px;
  right: 45%;
  background: #D5E8F2;
  padding: 15px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.choice-box button {
  background: #BFDCE9;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
}


.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #D5E8F2;
  width: 400px;
  padding: 25px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input {
  padding: 10px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}
</style>