<script setup>
import router from '../router';
import { register } from '../api';
import { reactive } from 'vue'

const registerForm = reactive ({
  telephone: '',
  username: '',
  password: '',
  code: ''
})

const getCode = () => {
    alert("获取验证码")
}

const onSubmit = () => {
    alert("注册成功")
}

const registerFormRules = {
  telephone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { min: 11, max: 11, message: '手机号格式错误', trigger: 'blur' }
  ],
  username: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 3, max: 11, message: '昵称长度在3-11个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度应在6-15个字符', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 6, max: 6, message: '验证码格式错误', trigger: 'blur' }
  ]
}
</script>
 
<template>
<div class="common-layout">
    <el-container class="login_container">
      <el-header><Header/></el-header>
      <el-main>
        <div>
          <div class="login_box">
            <!-- 头像区域 -->
            <!-- <div class="avatar_box">
              <img src="../assets/logo.png" alt="" />
            </div> -->
            
            <el-steps :active="2" finish-status="success" simple>
                <el-step title="Step 1" />
                <el-step title="Step 2" />
            </el-steps>

            <!-- 登录表单区域 -->
            <el-form label-width="0px" class="login_form" :model="registerForm" :rules="registerFormRules">
              <!-- 手机号 -->
              <el-form-item prop="telephone">
                <el-input v-model="registerForm.telephone" placeholder="请输入手机号" />
              </el-form-item> 
              <!-- 用户名 -->
              <el-form-item prop="username">
                <el-input v-model="registerForm.username" placeholder="请输入昵称" />
              </el-form-item>
              <!-- 密码 -->
              <el-form-item prop="password">
                <el-input type="password" v-model="registerForm.password" placeholder="请输入密码" />
              </el-form-item>
              <!-- 验证码 -->
              <el-form-item prop="code">
                <el-input v-model="registerForm.code" placeholder="请输入短信验证码" >
                  <template #append>
                      <el-button @click="getCode">获取验证码</el-button>
                  </template>
                </el-input>
              </el-form-item>
              <!-- 按钮区域 -->
              <el-form-item class="login_btn">
                <el-button type="primary" @click="onSubmit" >立即注册</el-button>
              </el-form-item>
              <el-row justify="end">
                <el-form-item>
                  <router-link to="/login">返回登录</router-link>
                </el-form-item>
              </el-row>
            </el-form>
          </div>
        </div>        
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>

</template>
 
<style lang="less" scoped>
@media screen and (min-width: 1000px) {
  .common-layout {
    width: 1200px;
    height: auto;
    margin: 0 auto;
  }
}
.login_container {
  background-color: rgb(243, 237, 237);
  height: 100vh;
}
.common-layout .el-header {
  height: 100px;
  position: relative;
  padding: 0%;
}
.common-layout .el-footer {
  text-align: center;
  position: relative;
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
}
.login_box {
  width: 450px;
  height: 400px;
  background-color: #fff;
  // 圆角边框3像素
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  // 进行位移，并且在横轴上位移-50%，纵轴也位移-50%
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 100px;
    width: 100px;
    // 边框线1像素 实线
    border: 1px solid #eee;
    // 圆角
    border-radius: 50%;
    // 内padding
    padding: 10px;
    // 添加阴影 向外扩散10像素 颜色ddd
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    // 位移
    transform: translate(-50%, -50%);
    // 背景
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form {
  width: 70%;
  height: 70%;
  position: absolute;
  bottom: 10%;
  left: 15%;
  padding: 0 20px;
  box-sizing: border-box;
}
.login_btn .el-button{
  width: 100%;
}
a {
    color: rgb(59,56,55);
    text-decoration: none;
}
</style>