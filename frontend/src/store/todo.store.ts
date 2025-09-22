import { defineStore } from "pinia";
import { useAuthStore } from "./auth.store";
import { Todo, TodoPriority } from "../definitions.d";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [] as Todo[],
  }),
  actions: {
    async addTodo(todo: Todo) {
      const apiReadyTodo: any = { ...todo };
      // Convert priority index to string for backend
      apiReadyTodo.priority = TodoPriority[apiReadyTodo.priority];

      const options: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${useAuthStore().token}`,
        },
        body: JSON.stringify(apiReadyTodo),
      };

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/todos`,
        options
      );

      if (!response.ok) throw new Error("request failed");
      const data = await response.json();
      // Convert received priority string to index for frontend
      data.priority = TodoPriority[data.priority as keyof typeof TodoPriority];
      this.todos.push(data);
    },
    removeTodo(todo: Todo) {
      this.todos = this.todos.filter((t) => t.id !== todo.id);
    },
    async fetchAllTodos() {
      const options: RequestInit = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${useAuthStore().token}`,
        },
      };

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/todos`,
        options
      );
      console.log(response);

      if (!response.ok) throw new Error("request failed");
      const data = await response.json();
      // Conversion de la priorité pour chaque todo reçu
      this.todos = data.map((todo: any) => ({
        ...todo,
        priority: TodoPriority[todo.priority as keyof typeof TodoPriority],
      }));
    },
    async fetchNextTodos(n: number) {
      const options: RequestInit = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${useAuthStore().token}`,
        },
      };
      const cursor =
        this.todos.length < 1 ? -1 : this.todos[this.todos.length - 1].id;
      const response = await fetch(
        `http://localhost:3000/todos?qte=${n}&cursor=${cursor}`,
        options
      );
      console.log(response);

      if (!response.ok) throw new Error("request failed");

      const data = await response.json();
      const addedTodos: Todo[] = data.map((todo: any) => ({
        ...todo,
        priority: TodoPriority[todo.priority as keyof typeof TodoPriority],
      }));

      this.todos.push(...addedTodos);
      return addedTodos;
    },
  },
});
