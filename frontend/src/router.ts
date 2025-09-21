import { createRouter, createWebHistory } from "vue-router";
import dashboard from "./views/dashboard.vue";
import login from "./views/login.vue";
import home from "./views/home.vue";
const routes = [
  {
    path: "/",
    component: home,
  },
  {
    path: "/login",
    component: login,
  },
  {
    path: "/dashboard",
    component: dashboard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
