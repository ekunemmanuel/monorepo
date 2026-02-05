<script setup lang="ts">
import { ref } from "vue";
import { useConvexQuery, useConvexMutation } from "@monorepo/ui/convex";
import { api } from "@monorepo/convex";
import type { Id } from "@monorepo/convex/dataModel"

const { data: tasks, isPending } = useConvexQuery(api.tasks.list, {});
const addTaskMutation = useConvexMutation(api.tasks.add);
const toggleTaskMutation = useConvexMutation(api.tasks.toggle);
const removeTaskMutation = useConvexMutation(api.tasks.remove);

const newTaskText = ref("");

const addTask = async () => {
  if (!newTaskText.value.trim()) return;
  await addTaskMutation.mutate({ text: newTaskText.value });
  newTaskText.value = "";
};

const toggleTask = (id: Id<"tasks">) => {
  toggleTaskMutation.mutate({ id });
};

const removeTask = (id: Id<"tasks">) => {
  removeTaskMutation.mutate({ id });
};
</script>

<template>
  <div class="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 font-sans text-foreground">
    <div class="max-w-md mx-auto bg-card rounded-xl shadow-sm border border-border overflow-hidden md:max-w-xl p-8">
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-foreground tracking-tight">
          To-Do List
        </h1>
        <p class="mt-2 text-sm text-muted-foreground font-medium">
          Stay organized and get things done.
        </p>
      </div>

      <form @submit.prevent="addTask" class="flex gap-2 mb-6">
        <input v-model="newTaskText" type="text" placeholder="Add a new task..."
          class="flex-1 rounded-xl bg-muted/30 border-border border p-3 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary transition duration-200 outline-none text-foreground placeholder:text-muted-foreground" />
        <button type="submit"
          class="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold hover:opacity-90 transition duration-200 shadow-sm">
          Add
        </button>
      </form>

      <div v-if="isPending" class="text-center py-4 text-muted-foreground font-medium">
        Loading your tasks...
      </div>

      <ul v-else class="space-y-3">
        <li v-for="task in tasks" :key="task._id"
          class="group flex items-center justify-between p-4 bg-muted/10 rounded-xl hover:bg-muted/20 transition duration-200 border border-transparent hover:border-border">
          <div class="flex items-center gap-4 flex-1 min-w-0 cursor-pointer" @click="toggleTask(task._id)">
            <div :class="[
              'w-6 h-6 rounded-lg border flex items-center justify-center transition-all duration-200',
              task.isCompleted ? 'bg-primary border-primary' : 'bg-transparent border-muted-foreground'
            ]">
              <svg v-if="task.isCompleted" class="w-4 h-4 text-primary-foreground" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span :class="[
              'text-lg font-medium truncate transition-all duration-200 select-none',
              task.isCompleted ? 'text-muted-foreground line-through' : 'text-foreground'
            ]">
              {{ task.text }}
            </span>
          </div>

          <button @click="removeTask(task._id)"
            class="text-muted-foreground hover:text-red-500 p-2 rounded-full hover:bg-red-500/10 transition-colors duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
            title="Delete task">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </li>
        <li v-if="tasks && tasks.length === 0" class="text-center py-8 text-muted-foreground italic font-medium">
          No tasks yet. Add one above!
        </li>
      </ul>
    </div>
  </div>
</template>