import { defineStore } from "pinia";
import { useAuthStore } from "./auth.store";
export type Todo = {
  id?: number;
  title: string;
  content: string;
  priority: string;
  executionDate?: Date | string | null;
};

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [] as Todo[],
  }),
  actions: {
    addTodo(todo: Todo) {
      this.todos.push(todo);
    },
    removeTodo(todo: Todo) {
      this.todos = this.todos.filter((t) => t.id !== todo.id);
    },
    async fetchAllTodos() {
      const options = {
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
      console.log(data);

      this.todos = data;
    },
  },
});
