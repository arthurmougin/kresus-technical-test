import { defineStore } from "pinia";

interface User {
  email: string;
  // Add other user fields as needed
}

interface AuthState {
  token: string | null;
  user: User | null;
}

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
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("jwt");
    },
    async login(email: string, password: string) {
      // Replace with your API endpoint
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error("Login failed");
      const data = await response.json();
      this.setToken(data.access_token);
      this.setUser(data.user.email);
    },
    loadTokenFromStorage() {
      const token = localStorage.getItem("jwt");
      if (token) {
        this.token = token;
      }
    },
  },
});
