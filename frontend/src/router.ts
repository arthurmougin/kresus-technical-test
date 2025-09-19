import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("./views/home-view.vue"),
  },
  {
    path: "/login",
    component: () => import("./views/login-view.vue"),
  },
  {
    path: "/dashboard",
    component: () => import("./views/dashboard-view.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
