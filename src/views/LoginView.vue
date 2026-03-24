<script>
export default {
    data(){
        return {
            email: null,
            password: null,
            submit: false
        }
    },
    methods: {
        checkAcc(email){
            if(true){
                alert("Login erfolgreich!")
                this.submit = true
                this.$router.push("/")
            }
        },
        goToSignup() {
            this.$router.push("/signup")  
        }
    }
}
</script>

<template>
    <img id="logo" src="@/assets/logo.png" alt="">
    <h1>Anmeldung</h1>
    <div id="login">
        <form v-on:submit.prevent="checkAcc(email)">
            <div id="input"><label for="name">Email</label> <br><input type="text" name="name" v-model="email"></div>
            <br>
            <div><label for="email">Passwort</label><br> <input type="password" name="name" v-model="password" required></div>
            <button type="submit">Anmelden</button>
        </form> 
    </div>
    <p>Kein Konto? &nbsp; <RouterLink to="/register"><u style="cursor: pointer;">Hier</u></RouterLink>&nbsp; registrieren!</p>
    <p>Passwort vergessen?</p>
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
        margin-bottom: 30px;
        margin-top: 30px;
    }
    button {
        margin-top: 100px;
        width: 160px;
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