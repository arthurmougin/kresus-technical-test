<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAuthStore } from '../store/auth.store';
import { Button } from '../components/ui/button';
import { useTodoStore } from '../store/todo.store';
import type { Todo } from '../store/todo.store';

const user = useAuthStore().$state.user;
const todoStore = useTodoStore();

import { columns } from '../components/todos/todo-columns';
import todoDataTable from '../components/todos/todo-data-table.vue';
import todoInputDialog from '../components/todos/todo-input-dialog.vue';

const data = ref<Todo[]>([]);

onMounted(async () => {
  try {
    await todoStore.fetchAllTodos();
    data.value = todoStore.$state.todos;
  } catch (error) {
    console.error("Error fetching todos:", error);
    useAuthStore().logout();
  }
});

</script>

<template>
  <header class="flex w-full justify-between items-center">
    <p>{{ user?.email }}</p>
    <Button @click="useAuthStore().logout">Se déconnecter</Button>
  </header>
  <main>
    <div class="container py-10 mx-auto">
      <todoDataTable :columns="columns" :data="data" class="m-4" />
      <todoInputDialog />
    </div>
  </main>
</template>
