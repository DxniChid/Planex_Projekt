<script>
export default {
    data(){
        return {
            prename: null,
            name: null,
            email: null,
            password: null,
            confirmation: null,
            submit: false
        }
    },
    methods: {
        checkAcc(prename, email){
            if(true){
                alert("Registrierung erfolgreich!")
                this.submit = true
                this.$router.push("/login")
            }
        }
    }
}
</script>

<template>
    <img id="logo" src="@/assets/logo.png" alt="">
    <h1>Registrierung</h1>
    <div id="login">
        <form v-on:submit.prevent="checkAcc(prename, email)">
            <div id="input"><label for="name">Vorname*</label> <br><input type="text" name="name" v-model="prename"></div>
            <br>
            <div id="input"><label for="name">Nachname</label> <br><input type="text" name="name" v-model="name"></div>
            <br>
            <div id="input"><label for="name">Email*</label> <br><input type="email" name="name" v-model="email" required></div>
            <br>
            <div id="input"><label for="name">Passwort*</label> <br><input type="password" name="name" v-model="password" required></div>
            <br>
            <div id="input"><label for="name">Passwort bestätigen*</label> <br><input type="password" name="name" v-model="confirmation" required></div>
            <br>
            <button type="submit">Registrieren</button>
        </form> 
    </div>
    <p>Bereits ein Konto? Klicken Sie &nbsp; <RouterLink to="/login"><u style="cursor: pointer;">Hier</u></RouterLink></p>
</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap');
    #login{
        display: flex;
        justify-content: center;   
    }
 form {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 20px;
    align-items: center; 
}
    h1, p {
        display: flex;
        justify-content: center;
        font-family: Fredoka;
    }
    h1 {
        font-size: 60px;
        font-weight: 400;
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
    img {
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-top: 60px;
    }
    p {
        font-size: 25px;
    }
    
</style>