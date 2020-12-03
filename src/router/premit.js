import router from "./index.js";
import store from "@/store/index";
import {
    getToken,
    removeToken,
    removeUsername
} from "@/utils/app.js"

const whiteRouter = ['/login'];

// 路由守卫
router.beforeEach((to, from, next) => {
    if (getToken()) {
        if (to.path === "/login") {
            removeToken();
            removeUsername();
            store.commit('app/SET_TOKEN', '')
            store.commit('app/SET_USERNAME', '')
            next();
        } else {
            next();
        }
        // console.log("存在token")
    } else {
        // console.log("不存在")
        if (whiteRouter.indexOf(to.path) !== -1) {
            next();
        } else {
            next("/login");
        }
    }
})