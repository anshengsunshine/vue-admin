import axios from "axios"

// 创建axios，赋值变量
const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devApi';

const request = axios.create({
    baseURL: BASEURL,
    timeout: 5000,
});

// 添加请求拦截器
request.interceptors.request.use(config => {
    // 在发送之前做些什么
    return config;
}, error => {
    return Promise.reject(error)
});

// 添加响应拦截器
request.interceptors.response.use(response => {
    // 对相应数据做点什么
    return response;
}, error => {
    // 对响应错误做点什么
    return Promise.reject(error)
})

export default request