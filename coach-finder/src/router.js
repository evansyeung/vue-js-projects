import { createRouter, createWebHistory } from "vue-router";

import CoachDetail from "./pages/coaches/CoachDetail.vue";
import CoachesList from "./pages/coaches/CoachesList.vue";
import CoachRegistration from "./pages/coaches/CoachRegisteration.vue";
import ContactCoach from "./pages/requests/ContactCoach.vue";
import RequestsReceived from "./pages/requests/RequestsReceived.vue";
import NotFounded from "./pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/coaches",
    },
    {
      path: "/coaches",
      component: CoachesList,
    },
    {
      path: "/coaches/:id",
      component: CoachDetail,
      children: [
        {
          // /coaches/:id/contact
          path: "contact",
          component: ContactCoach,
        },
      ],
    },
    {
      path: "/register",
      component: CoachRegistration,
    },
    {
      path: "/requests",
      component: RequestsReceived,
    },
    {
      path: "/:notFounded(.*)",
      component: NotFounded,
    },
  ],
});

export default router;