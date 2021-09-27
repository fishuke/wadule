import Vue from "vue";
import VueRouter from "vue-router";
import Loading from "../views/Loading.vue";
import Messages from "../views/messages/Mesages.vue";
import Login from "../views/Login";
import Layout from "../design/Layout";
import NewMessage from "../views/messages/NewMessage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Loading",
    component: Loading,
  },
  {
    path: "",
    component: Layout,
    children: [
      {
        path: "/messages",
        name: "Scheduled Messages",
        component: Messages,
      },
      {
        path: "/messages/new",
        name: "New Message",
        component: NewMessage,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
