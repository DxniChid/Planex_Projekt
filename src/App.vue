<script setup>
import { ref } from "vue"
import logo from "@/assets/logo.png"

const name =  ref("Max Mustermann");
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


</script>

<template>
  <header class="header">
    <div class="menu">☰</div>

    <!-- correct image binding -->
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
    <button class="add">+</button>
</template>

<style scoped>

.body {
  min-height: 1000px;
  background: #f4f6f8;
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
</style>