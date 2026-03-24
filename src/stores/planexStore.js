import { defineStore } from 'pinia';

export const usePlanexStore = defineStore('planex', {
  state: () => ({
    // User Profile
    user: {
      name: "Max Mustermann",
      profilePic: "@/assets/profile.jpg"
    },

    // Tasks (from TasksView and HomeView)
    tasks: [
      { id: 1, title: "Yoga", time: "07:10", status: "red", category: null, task: "Morgenyoga" },
      { id: 2, title: "Restaurant", time: "19:00", status: "green", category: 2, task: "Abendessen mit Freunden" }
    ],

    // Categories (from KategorienView and TasksView)
    categories: [
      { id: 1, name: "Arbeit", color: "#8AB3C2" },
      { id: 2, name: "Freizeit", color: "#ffd6e0" },
      { id: 3, name: "Schule", color: "#c8f7c5" }
    ],

    // Free Texts (from FreeTextView)
    freeTexts: JSON.parse(localStorage.getItem("freeTexts")) || [],
    
    // UI State
    nextCategoryId: 4,
    nextTaskId: 3
  }),

  getters: {
    // Get category name by ID (replaces getCategoryName in TasksView)
    getCategoryById: (state) => (id) => {
      return state.categories.find(c => c.id === id);
    },

    // Get today's brief summary (for HomeView timeline)
    todaySummary: (state) => {
      return state.tasks.map(t => ({ time: t.time, task: t.title }));
    }
  },

  actions: {
    // --- Task Actions ---
    addTask(newTask) {
      this.tasks.push({
        ...newTask,
        id: this.nextTaskId++
      });
    },
    updateTask(id, updatedTask) {
      const index = this.tasks.findIndex(t => t.id === id);
      if (index !== -1) this.tasks[index] = { ...updatedTask };
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id);
    },
    toggleTaskStatus(id) {
      const task = this.tasks.find(t => t.id === id);
      if (task) {
        task.status = task.status === "red" ? "green" : "red";
      }
    },

    // --- Category Actions ---
    addCategory(name, color = "#8AB3C2") {
      this.categories.push({
        id: this.nextCategoryId++,
        name,
        color
      });
    },
    deleteCategory(id) {
      this.categories = this.categories.filter(c => c.id !== id);
      // Clean up tasks that were in this category
      this.tasks.forEach(t => {
        if (t.category === id) t.category = null;
      });
    },

    // --- Free Text Actions (with LocalStorage) ---
    addFreeText(content) {
      const newText = { id: Date.now(), content };
      this.freeTexts.push(newText);
      this.saveFreeTexts();
    },
    updateFreeText(id, content) {
      const index = this.freeTexts.findIndex(t => t.id === id);
      if (index !== -1) {
        this.freeTexts[index].content = content;
        this.saveFreeTexts();
      }
    },
    deleteFreeText(id) {
      this.freeTexts = this.freeTexts.filter(t => t.id !== id);
      this.saveFreeTexts();
    },
    saveFreeTexts() {
      localStorage.setItem("freeTexts", JSON.stringify(this.freeTexts));
    }
  }
});