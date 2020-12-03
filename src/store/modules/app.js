import {
    Login
} from "@/api/login";
import {
    setToken,
    setUsername,
    getUsername,
    removeToken,
    removeUsername
} from "@/utils/app"

const state = {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
    to_ken: '',
    username: getUsername() || ''
}

const getters = {
    isCollapse: state => state.isCollapse,
}

const mutations = {
    SET_Collapse(state) {
        console.log("app")
        state.isCollapse = !state.isCollapse;
        // 临时存储
        sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse))
    },
    SET_TOKEN(state, value) {
        state.to_ken = value
    },
    SET_USERNAME(state, value) {
        state.username = value
    }
}

const actions = {
    login(content, requestData) {
        return new Promise((resolve, reject) => {
            Login(requestData).then(res => {
                console.log(content)
                let data = res.data.data;
                content.commit('SET_TOKEN', data.token)
                content.commit('SET_USERNAME', data.username)
                setToken(data.token)
                setUsername(data.username)
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    exit({
        commit
    }) {
        return new Promise((reslove) => {
            removeToken()
            removeUsername()
            commit('SET_TOKEN', '')
            commit('SET_USERNAME', '')
            reslove()
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