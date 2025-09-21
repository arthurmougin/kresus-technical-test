<script setup lang="ts">
import { onMounted, shallowRef } from 'vue';
import { useAuthStore } from '../store/auth.store';
import { Button } from '../components/ui/button';
import { useTodoStore } from '../store/todo.store';
import { columns } from '../components/todos/todo-columns';
import todoDataTable from '../components/todos/todo-data-table.vue';
import todoInputDialog from '../components/todos/todo-input-dialog.vue';
import { Todo } from '../definitions';


const user = useAuthStore().$state.user;
const todoStore = useTodoStore();
const data = shallowRef<Todo[]>([]);

onMounted(async () => {
  try {
    await todoStore.fetchAllTodos();
    data.value = todoStore.todos;
  } catch (error) {
    console.error("Error fetching todos:", error);
    useAuthStore().logout();
  }
});

function handleSubmit(todo: Todo) {
  //As data is shallow, only a full refresh will guaranty that the table is updated
  data.value = [...todoStore.todos];
}

</script>

<template>
  <header class="flex w-full justify-between items-center">
    <p>{{ user?.email }}</p>
    <Button @click="useAuthStore().logout">Se déconnecter</Button>
  </header>
  <main>
    <div class="container py-10 mx-auto">
      <todoDataTable :columns="columns" :data="data" class="m-4" />
      <todoInputDialog @submit="handleSubmit" />
    </div>
  </main>
</template>
