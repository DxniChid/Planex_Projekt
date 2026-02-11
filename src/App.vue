<script>
import { ref } from "vue"
const name =  ref("Max Mustermann");

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




</script>

<template>
<header class="header">
      <div class="menu">☰</div>

      <img
        src="../src/assets/logo.png"
        alt="Planex Logo"
        class="logo-img"
      />
    </header>
        <div class="welcome">
      <h1>Willkommen</h1>
      <h2>{{ name }}</h2>
    </div>

      <div class="card">
      <h3 class="card-title">Heute</h3>

      <RouterLink to="/login">Login</RouterLink>

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
    
    <RouterView/>


</template>

<style scoped>

.body {
  min-height: 1000px;
  background: #f4f6f8;

}


</style>
