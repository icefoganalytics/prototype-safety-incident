import { authGuard } from "@auth0/auth0-vue";

const routes = [
  {
    path: "",
    component: () => import("@/layouts/Default.vue"),
    children: [
      {
        path: "/incident",
        component: () => import("../views/Dashboard.vue"),
        beforeEnter: authGuard,
      },
      {
        path: "/thank-you",
        component: () => import("../views/ThankYou.vue"),
        beforeEnter: authGuard,
      },
    ],
  },
];

export default routes;
