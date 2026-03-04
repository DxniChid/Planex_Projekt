import { ref, computed } from 'vue'
import { defineStore } from "pinia";

export const useAuthStore = defineStore ('auth', {
    state: () => ({
        name: '',
        prename: '',
        email: '',
        password: '',
        confirmation: ''
    }),
    actions: {
        checkPass(password, confirmation, prename, name, email) {
            if(password !== confirmation || password == null){
                return alert("Passwords do not match")
            }
            console.log("YEAH MAN")
            this.insertData(prename, name, email, password, confirmation)
        }, 
        printInitials(){
            alert(
                "Prename: " + this.prename +
                "Name: " + this.name +
                "Email: " + this.email +
                "Password: " + this.password +
                "Confirmation: " + this.confirmation
            )
        },
        insertData(prename, name, email, password, confirmation){
            this.prename = prename,
            this.name = name,
            this.email = email,
            this.password = password,
            this.confirmation = confirmation
        }
    },
    persist: true
})