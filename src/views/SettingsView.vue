<script setup>
import profile from "@/assets/profile.jpg"
import { useRouter } from "vue-router"

const router = useRouter()

function goHome() {
  router.push("/")
}
</script>

<template>
  <div class="settings">

    <!-- Back Button -->
    <div class="back" @click="goHome">←</div>

    <!-- Profil -->
    <div class="profile">
      <img :src="profile" class="profile-img" />
      <p class="name">Max Mustermann</p>
    </div>

    <!-- Buttons -->
    <div class="menu">
      <button>Sprachen</button>
      <button>Design</button>
      <button>Geräte</button>

      <!-- Auto Login (unter Buttons) -->
      <div class="autologin">
        <label class="autologin-label">
          <span>Automatisch einloggen</span>
          <input type="checkbox" />
        </label>
      </div>
    </div>

    <!-- Bottom -->
    <div class="bottom">
      <span>Ausloggen</span>
      <span>Support</span>
    </div>

  </div>
</template>

<style scoped>
.settings {
  padding: 20px;
  color: black;
}

.back {
  font-size: 32px;
  cursor: pointer;
  margin-bottom: 20px;
}

.profile {
  text-align: center;
}

.profile-img {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: #ccc;
}

.name {
  margin-top: 10px;
  font-size:32px;
}

.menu {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
}

/* Buttons nicht volle Breite */
.menu button {
  width: min(320px, 80%);
  padding: 12px;
  background: #d9dde3;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

/* Autologin unter den Buttons */
.autologin {
  margin-top: 10px;
}
.autologin-label {
  width: min(420px, 90%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  font-size: 20px;
  white-space: nowrap;
}
/* Footer unten fix */
.bottom {
  position: fixed;
  bottom: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  justify-content: space-between;
  font-size: 22px;
}
</style>