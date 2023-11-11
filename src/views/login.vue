<script setup>
import { ref } from 'vue';
import axios from 'axios';
import router from '../router';
import { ElMessage } from 'element-plus'
import { useUsersStore } from "../store/user"
import {User,Lock,Menu as IconMenu} from '@element-plus/icons-vue'

const userStore = useUsersStore()

const username = ref("")
const password = ref("")

/**
 * 登录方法
 */
const login = () => {
    // 校验用户名和密码是否为空
    if(username.value == '' || password.value == ''){
        ElMessage.warning("请输入用户名和密码！")
        return "请输入用户名或密码！";
    }
    console.log("用户名" + username.value)
    console.log("密码" + password.value)
    // 请求登录接口
    axios.post('', {
        username: username.value,
        password: password.value
    })
    .then(function (response) {
        console.log(response);
        // 判断请求是否成功
        if(response.data.code == 200){
            ElMessage.success(response.data.message)
            // 存储toekn
            localStorage.setItem("token", response.data.result.token)
            // 存储user_id到pinia
            localStorage.setItem('user_id', response.data.result.user_id)
            // 路由到首页
            router.push({
                path:'/index',
            })
        }else{
            ElMessage.error(response.data.message)
        }
    })
    .catch(function (error) {
        ElMessage.error('Server Error 500')
        console.log(error);
    });
}

/**
 * 注册方法
 */
const register = () => {
    router.push({
        path:'/register'
    })
}
</script>

<template>
    <div style="width: 100vw;height: 100vh;overflow: hidden;display: flex;">
        <!-- 登陆界面背景 -->
        <div style="background-color:aliceblue;flex: 4;">
            <div class="welcome-title"  style="margin-top: 2%;margin-left: 2%;font-size:50px;">
                Todo
            </div>
            <!-- 使用本地资源作为背景 -->
            <img style="margin-top: 15%;margin-left: 30%;width: 40%; height: 60%" src="../assets/bg.png" alt="">
            <!-- 使用网络资源作为背景 -->
            <!-- <el-image style="margin-top: 15%;margin-left: 30%;width: 40%; height: 60%" :src="'https://cdn4.iconfinder.com/data/icons/back-to-school-283/1750/Doing_Homework-1024.png'"/> -->
        </div>
        <!-- 登录框 -->
        <div style="flex: 2;">
            <div class="welcome-title1" style="position:absolute;font-size:36px;color: black;text-align: center;margin: 10% 0% 10% 4.5%;">
                Welcome *** Application
            </div>
            <div style="margin: 60% 0% 60% 0%;">
                <el-input :prefix-icon="User" @keyup.enter.native="login()" style="width: 40%;height: 4vh;margin-left: 29%;" v-model.trim="username" placeholder="username"/>
                <br>
                <br>
                <el-input :prefix-icon="Lock" @keyup.enter.native="login()" type="password" style="width: 40%;height: 4vh;margin-left: 29%;" v-model.trim="password" placeholder="password"/>
                <br>
                <br>
                <div style="margin-left: 29%;">
                    <el-button @click="login()" type="success" round>login</el-button>
                    <el-button @click="register()" style="margin-left: 26%;" type="primary" round>register</el-button>
                </div>
            </div> 
        </div>
        
    </div>
</template>

<style scoped>
    .welcome-title {
    position: absolute;
    color:tomato;
    text-shadow: 0 0 5px black;
}
</style>