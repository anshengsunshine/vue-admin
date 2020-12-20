import axios from "axios"
import {
    Message
} from 'element-ui';
import { getToken,getUsername } from "@/utils/app.js"

// 创建axios，赋值变量
const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devApi';

const request = axios.create({
    baseURL: BASEURL,
    timeout: 15000,
});

/**
 * 请求接口前，做一些数据处理
 * 添加请求拦截器
 * */ 
request.interceptors.request.use(config => {
    // 在发送之前做些什么

    config.headers['Token'] = getToken();
    config.headers['UserName'] = getUsername();


    return config;
}, error => {
    return Promise.reject(error)
});

/**
 * 请求接口，返回数据进行拦截
 * 添加响应拦截器
 * */
request.interceptors.response.use(response => {
    // 对相应数据做点什么
    let data = response.data;
    if (data.resCode !== 0) {
        Message.error(data.message)
        return Promise.reject(data)
    } else {
        return response;
    }
}, error => {
    // 对响应错误做点什么
    return Promise.reject(error)
})

export default request