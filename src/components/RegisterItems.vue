<script setup>
import { useAuthStore } from '@/stores/useAuthStore';

const userData = useAuthStore()


</script>

<template>
<form v-on:submit.prevent="console.log(userData.prename)">
            <div id="input"><label for="name">Vorname*</label> <br><input type="text" v-model="userData.prename"></div>
            <br>
            <div id="input"><label for="name">Nachname</label> <br><input type="text" name="name"></div>
            <br>
            <div id="input"><label for="name">Email*</label> <br><input type="email" name="name"></div>
            <br>
            <div id="input"><label for="name">Passwort*</label> <br><input type="password" name="name"></div>
            <br>
            <div id="input"><label for="name">Passwort bestätigen*</label> <br><input type="password" name="name"></div>
            <br>
            <button type="submit">Registrieren</button>
        </form> 
</template>

<style scoped>

    form {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 20px;
    /* Add this line */
    align-items: center; 
    }
    input {
        width: 450px;
        height: 25px;
    }
    #input {
        margin-bottom: 10px;
        margin-top: 10px;
    }
    button {
        margin-top: 30px;
        width: 180px;
        font-size: 30px;
    }
    label {
        font-size: 30px;
    }

</style>