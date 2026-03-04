import { ref, computed } from 'vue'
import { defineStore } from "pinia";

export const useAuthStore = defineStore ('auth', {
        state: () => ({
            name: 'Hans Jürgen Peterson',
            prename: '',
            email: '',
            password: '',
            confirmation: ''
           })
        })