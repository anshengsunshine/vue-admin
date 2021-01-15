import { GetCategory } from "@/api/info";
import { Promise } from "core-js";
const actions = {  // 可以回调处理事情
    getInfoCategory(content, requestData) {
        return new Promise((resolve, reject) => {
            GetCategory({}.then((res) => {
                resolve(response)
            }).catch(err => {
                reject(err)
            }))
        })
    }
}

export default {
    namespaced: true,
    actions
}