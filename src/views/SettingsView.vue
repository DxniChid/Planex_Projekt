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
</script>

<template>
    <div id="wrapper">

    <div class="back" @click="goHome">←</div>

    <div class="profile">
      <img :src="profile" class="profile-img" />
      <p class="name">{{ user.name }}</p>
    </div>

        <img id="avatar" src="@/assets/profile.jpg" alt="Profilbild">
        <h2>Max Mustermann</h2>

        <div id="menu">
            <button>Sprachen</button>
            <button>Design</button>
            <button>Geräte</button>
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
}

#top {
    width: 100%;
    padding: 20px;
    margin-left: 80px;
}

#back {
    font-size: 30px;
    cursor: pointer;
}

#avatar {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-top: 20px;
}

h1 {
    margin: 20px 0 30px 0;
    font-size: 40px;
}

#menu {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
}

button {
    width: 260px;
    height: 55px;
    border-radius: 12px;
    border: none;
    background: #bfc3c9;
    font-size: 18px;
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