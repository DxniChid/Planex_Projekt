import { defineStore } from "pinia";
import { ref, computed } from "vue"

export const useTaskStore = defineStore("tasks", () => {
    const tasks = ref ([
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
        (status) => tasks.value.filter(t => t.status === status)
    )
    const getByCategory = computed(() =>
        (category) => tasks.value.filter(t => t.category === category)
    )

    function addTask(task) {
        tasks.value.push({...task})
    }
    function updateTask(index, updateTask){
        tasks.value[index] = {...updateTask}
    }
    function deleteTask(index){
        tasks.value.splice(index, 1)
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