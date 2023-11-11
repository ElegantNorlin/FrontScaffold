import axios from "axios";
import router from '../router/index';
import { ElMessage } from 'element-plus'

const instance = axios.create({
    headers: {'withCredentials': 'true'}
});

/**
 * 请求拦截器
 */
instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token")
    if(token){
        config.headers.Token = token;
        return config;
    }else{
        router.push({
            path:'/'
        })
        console.log("token不存在")
        ElMessage.warning('token已失效，请重新登录！')
        return config;
    }
  }, function (error) {
    return Promise.reject(error);
  });

/**
 * 响应拦截器
 */
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    if(response.data.code == 401){
        ElMessage.warning('token已失效，请重新登录！')
        router.push({
            path:'/'
        })
    }
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    ElMessage.error('Server Error 500')
  });

function get(url) {
    return instance.get(url);
}

function post(url,data){
    return instance.post(url,data);
}

export {get,post}