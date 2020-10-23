import Vue from "vue";
import VueRouter from "vue-router";

import store from "@/store";

Vue.use(VueRouter);

const ensureAuthenticated = (to, from, next) =>
  !store.getters["auth/authenticated"] ? next({ name: "Sigin" }) : next();

const routes = [
  {
    path: "/",
    name: "CreateFeedback",
    component: () => import("../views/CreateFeedback.vue"),
    beforeEnter: ensureAuthenticated
  },
  {
    path: "/received_feedbacks",
    name: "ReceivedFeedbacks",
    component: () => import("../views/ReceivedFeedbacks.vue"),
    beforeEnter: ensureAuthenticated
  },
  {
    path: "/sent_feedbacks",
    name: "SentFeedbacks",
    component: () => import("../views/SentFeedbacks.vue"),
    beforeEnter: ensureAuthenticated
  },
  {
    path: "/signin",
    name: "Sigin",
    component: () => import("../views/Signin.vue")
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../views/Signup.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
