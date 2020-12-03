import router from "./index.js";
import {
    getToken
} from "@/utils/app.js"

const whiteRouter = ['/login']; 

// 路由守卫
router.beforeEach((to, from, next) => {
    if (getToken()) {
        console.log("存在token")
    } else {
        console.log("不存在")
        if(whiteRouter.indexOf(to.path) !== -1){
            next()
        }else{
            next("/login")
        }
    }
})