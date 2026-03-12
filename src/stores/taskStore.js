import { defineStore } from "pinia";
import { Update } from "vite";
import { ref, computed } from "vue"

export const useTaskStore = defineStore("tasks", () => {
    const tasks = ([
        {
            title: "Yoga",
            task: "Every Morning yoga",
            time: "8:00",
            status: "open",
            category: ""
        },
        { 
            title: "Restaurant", 
            task: "Dinner reservation", 
            time: "19:00", 
            status: "done", 
            category: "" 
        }
    ])

    const getByStatus = computed(() =>
        (status) => tasks.values.filter(t => t.status === status)
    )
    const getByCategory = computed(() =>
        (category) => tasks.values.filter(t => t.category === category)
    )

    function addTask(task) {
        tasks.values.push({...task})
    }
    function updateTask(index, updateTask){
        tasks.values[index] = {...updateTask}
    }
    function deleteTask(index){
        tasks.values.splice(index, 1)
    }

    return {
        tasks,
        getByStatus,
        getByCategory,
        addTask,
        updateTask,
        deleteTask
    }
})