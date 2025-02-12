import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import homeRoutes from "./modules/home/router";
import authenticationRoutes from "./modules/authentication/router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    children: [
      {
        path: "",
        component: () => import("./views/Default.vue"),
      },
      ...authenticationRoutes,
      ...homeRoutes,

      {
        path: "*",
        component: () => import("./views/NotFound.vue"),
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
