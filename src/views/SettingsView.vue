<script setup>
import profile from "@/assets/profile.jpg"
import { useRouter } from "vue-router"
import { usePlanexStore } from "@/stores/planexStore"
import { storeToRefs } from "pinia"

const router = useRouter()
const store = usePlanexStore()
const { user } = storeToRefs(store)

function goHome() {
  router.push("/")
}

function logout() {
  if (confirm("Möchtest du dich wirklich abmelden?")) {
    router.push("/login")
  }
}

function goSupport() {
  alert("Support page coming soon!")
}
</script>

<template>
  <div id="wrapper">
    <div class="back" @click="goHome">←</div>

    <div class="profile">
      <img :src="profile" class="profile-img" />
      <p class="name">{{ user.name }}</p>
    </div>

    <div id="menu">
      <button>Sprachen</button>
      <button>Design</button>
      <button>Geräte</button>
    </div>

    <div class="autologin">
      <label class="autologin-label">
        <span>Automatisch einloggen</span>
        <input type="checkbox" />
      </label>
    </div>

    <div id="bottom">
      <p class="link" @click="logout">Abmelden</p>
      <p class="link" @click="goSupport">Support</p>
    </div>
  </div>
</template>

<style scoped>
#wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  font-family: Arial, Helvetica, sans-serif;
  padding-top: 20px;
}

.back {
  font-size: 30px;
  cursor: pointer;
  align-self: flex-start;
  margin-left: 20px;
  margin-bottom: 20px;
}

.profile {
  text-align: center;
  margin-bottom: 30px;
}

.profile-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #ccc;
  margin-bottom: 10px;
}

.name {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

#menu {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

button {
  width: 260px;
  height: 50px;
  border-radius: 12px;
  border: none;
  background: #bfc3c9;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: #aeaeb6;
}

.autologin {
  margin-bottom: 40px;
}

.autologin-label {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  font-size: 18px;
  cursor: pointer;
}

.autologin-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

#bottom {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 40px;
  font-size: 18px;
}

.link {
  cursor: pointer;
  color: #333;
  text-decoration: none;
  transition: color 0.2s;
}

.link:hover {
  color: #8AB3C2;
}
</style>