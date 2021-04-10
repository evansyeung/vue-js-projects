import { defineAsyncComponent } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import CoachesList from "./pages/coaches/CoachesList.vue";
import NotFounded from "./pages/NotFound.vue";
import store from "./store/index.js";

const CoachDetail = defineAsyncComponent(() =>
  import("./pages/coaches/CoachDetail.vue")
);
const CoachRegistration = defineAsyncComponent(() =>
  import("./pages/coaches/CoachRegistration.vue")
);
const ContactCoach = defineAsyncComponent(() =>
  import("./pages/requests/ContactCoach.vue")
);
const RequestsReceived = defineAsyncComponent(() =>
  import("./pages/requests/RequestsReceived.vue")
);
const UserAuth = defineAsyncComponent(() =>
  import("./pages/auth/UserAuth.vue")
);

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
      props: true,
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
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/requests",
      component: RequestsReceived,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/auth",
      component: UserAuth,
      meta: {
        requiresUnauth: true,
      },
    },
    {
      path: "/:notFounded(.*)",
      component: NotFounded,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = store.getters;

  // Pages that require auth
  if (to.meta.requiresAuth && !isAuthenticated) {
    // redirect to login/register
    next("/auth");
  }
  // Doesnt make sense to go back to login/register page if already logged in
  else if (to.meta.requiresUnauth && isAuthenticated) {
    next("/coaches");
  } else {
    next();
  }
});

export default router;
