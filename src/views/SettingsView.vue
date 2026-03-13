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

    <div class="back" @click="goHome">←</div>

    <div class="profile">
      <img :src="profile" class="profile-img" />
      <p class="name">Max Mustermann</p>
    </div>

    <div class="menu">
      <button>Sprachen</button>
      <button>Design</button>
      <button>Geräte</button>

      <div class="autologin">
        <label class="autologin-label">
          <span>Automatisch einloggen</span>
          <input type="checkbox" />
        </label>
      </div>
    </div>

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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

.menu button {
  width: min(320px, 80%);
  padding: 12px;
  background: #d9dde3;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

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
.bottom {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 40px;
  font-size: 22px;
}
</style>