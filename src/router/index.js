import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    redirect: "login"
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import( /* webpackChunkName: "login" */ "views/login/Login.vue")
  },
  {
    path: "/console",
    name: "Console",
    component: () =>
      import( /* webpackChunkName: "layout" */ "views/layout/Layout.vue"),
    children: [{
      path: "/console",
      name: "ConsoleIndex",
      component: () =>
        import( /* webpackChunkName: "consoleIndex" */ "views/console/Console.vue"),
    }]
  }
];

const router = new VueRouter({
  routes
});

export default router;