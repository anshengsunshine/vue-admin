import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    redirect: "login",
    hidden: true,
    meta: {
      name: "主页"
    }
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    meta: {
      name: "登录"
    },
    component: () =>
      import( /* webpackChunkName: "login" */ "views/login/Login.vue")
  },
  {
    path: "/console",
    name: "Console",
    redirect: "index",
    meta: {
      name: "控制台"
    },
    component: () =>
      import( /* webpackChunkName: "layout" */ "views/layout/Layout.vue"),
    children: [{
      path: "/index",
      name: "Index",
      meta: {
        name: "首页"
      },
      component: () =>
        import( /* webpackChunkName: "consoleIndex" */ "views/console/Console.vue"),
    }]
  },
  {
    path: "/info",
    name: "Info",
    meta: {
      name: "信息管理"
    },
    component: () =>
      import( /* webpackChunkName: "layout" */ "views/layout/Layout.vue"),
    children: [{
        path: "/infoList",
        name: "InfoList",
        meta: {
          name: "信息列表"
        },
        component: () =>
          import( /* webpackChunkName: "consoleIndex" */ "views/info/InfoList.vue"),
      },
      {
        path: "/infoCategory",
        name: "InfoCategory",
        meta: {
          name: "信息分类"
        },
        component: () =>
          import( /* webpackChunkName: "consoleIndex" */ "views/info/InfoCategory.vue"),
      }
    ]
  },
  /**
   * 用户管理
   */
  {
    path: "/user",
    name: "User",
    meta: {
      name: "用户管理"
    },
    component: () =>
      import( /* webpackChunkName: "layout" */ "views/layout/Layout.vue"),
    children: [{
      path: "/userList",
      name: "UserList",
      meta: {
        name: "用户列表"
      },
      component: () =>
        import( /* webpackChunkName: "consoleIndex" */ "views/user/UserList.vue"),
    }, ]
  }
];

const router = new VueRouter({
  routes
});

export default router;