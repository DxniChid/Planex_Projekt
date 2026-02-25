<script >


export default{
    

    data(){
        return {
            name: null,
            email: null,
            submit: false
        }
    },
    methods: {
        checkAcc(name, email){
            if(true){
                alert("Hello " + name + "your email: " + email)
                this.submit = true
                this.$router.push("/")
                
            }
        }
    }
}

</script>

<template>
    <img src="@/assets/logo.png" alt="">
    <h1>Anmeldung</h1>
    <div id="login">
        <form v-on:submit.prevent="checkAcc(name, email)">
            <label for="name">Username</label> <input type="text" name="name" v-model="name">
            <br>
            <label for="email">email</label> <input type="text" name="name" v-model="email">
            <button type="submit">Login</button>
        </form>
    </div>
    <p>Kein Konto? <u>Hier</u> registrieren!</p>
    <br>
    <p>Passwort vergessen?</p>
</template>

<style scoped>
    #login{
        display: flex;
        justify-content: center;   
    }
    form {
        display: flex;
        flex-direction: column;
        flex-shrink: 2;
        gap: 5px;
        background-color: aquamarine;
        padding: 20px;
    }
</style>