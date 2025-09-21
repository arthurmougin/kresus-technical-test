import { defineStore } from "pinia";
import router from "../router";
import { AuthState } from "../definitions";

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    token: null,
    user: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem("jwt", token);
    },
    setUser(userEmail: string) {
      this.user = { email: userEmail };
      localStorage.setItem("user", JSON.stringify(this.user));
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
      router.push({ name: "home" });
    },
    async login(email: string, password: string) {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      };
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        options
      );
      if (!response.ok) throw new Error("Login failed");
      const data = await response.json();
      this.setToken(data.access_token);
      this.setUser(data.user.email);
    },
    loadFromStorage() {
      const token = localStorage.getItem("jwt");
      if (token) {
        this.token = token;
      }
      const user = localStorage.getItem("user");
      if (user) {
        this.user = JSON.parse(user);
      }
      if (!user || !token) {
        this.logout();
      }
    },
  },
});
