<script>

export default {
    props: {
        holder: {
            type: Text,
            required: true
        }
    }
}



</script>

<template>

    <label> {{ holder }}</label><br>
    <input/>

</template>

<style scoped>

input {
    background-color: rgb(224, 224, 224);
}

</style>