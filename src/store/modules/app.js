import {
    Login
} from "@/api/login";

const state = {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false
}

const getters = {
    isCollapse: state => state.isCollapse
}

const mutations = {
    SET_Collapse(state) {
        console.log("app")
        state.isCollapse = !state.isCollapse;
        // 临时存储
        sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse))
    }
}

const actions = {
    login(content, requestData) {
        return new Promise((resolve, reject) => {
            Login(requestData).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};