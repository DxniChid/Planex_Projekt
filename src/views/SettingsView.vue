<script>
export default {
    methods: {
        goBack() {
            this.$router.push("/")
        },
        logout() {
            this.$router.push("/login")
        },
    }
}
</script>

<template>
    <div id="wrapper">

        <div id="top">
            <span id="back" @click="goBack">←</span>
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

#bottom {
    margin-top: auto;
    margin-bottom: 30px;
    display: flex;
    gap: 50px;
}

.link {
    cursor: pointer;
    font-size: 18px;
}
</style>