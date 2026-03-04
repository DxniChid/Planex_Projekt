
<script >
import RegisterItems from'@/components/RegisterItems.vue'

export default{
    methods: {
        checkAcc(prename, email){
            if(true){
                alert("Hello " + prename + "your email: " + email)
                this.submit = true
                this.$router.push("/login")
                
            }
        }
    },
    components: {
        RegisterItems
    }
}

</script>

<template>
    <img id="logo" src="@/assets/logo.png" alt="">
    <h1>Registierung</h1>
    <div id="login">
        <RegisterItems/>
    </div>
    <p>Bereits ein Konto? Klicken Sie &nbsp; <RouterLink to="/login"> <u style="cursor: pointer;" >Hier</u></RouterLink></p>
</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap');
    #login{
        display: flex;
        justify-content: center;   
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

    img {
        display: block;    /* Required for margin: auto to work */
        margin-left: auto;
        margin-right: auto;
        margin-top: 60px;  /* Keeping your existing top margin */
    }
    p {
        font-size: 25px;
    }
    
</style>