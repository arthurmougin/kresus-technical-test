import { createRouter, createWebHistory } from "vue-router";
import dashboard from "./views/dashboard.vue";
import login from "./views/login.vue";
import home from "./views/home.vue";
import { useAuthStore } from "./store/auth.store";

const routes = [
  {
    name: "home",
    path: "/",
    component: home,
  },
  {
    name: "login",
    path: "/login",
    component: login,
  },
  {
    name: "dashboard",
    path: "/dashboard",
    component: dashboard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = useAuthStore().isAuthenticated;
  if (to.name == "dashboard" && !isAuthenticated) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
