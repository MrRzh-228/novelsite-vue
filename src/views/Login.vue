<script setup>
import router from '../router';
import { login } from '../api';
import { ref } from 'vue'

const loginForm = ref()

const loginFormObj = {
  telephone: '',
  password: '',
}

const loginFormData = ref({loginFormObj})

const onSubmit = () => {
  loginForm.value.validate((valid) => {
    if(valid) {
      login(loginFormData.value)
      .then(res => {
        console.log(res)
        let accesstoken = res["access"];
        let refreshtoken = res["refresh"];
        let userinfo = res["username"];
        localStorage.setItem("accessToken", accesstoken);
        localStorage.setItem("refreshToken", refreshtoken);
        localStorage.setItem("userinfo", userinfo);
        router.replace({
          path: '/'
        })
        })
      .catch(error => console.log(error))
    } else {
      console.log('error submit')
    }
  })
}

const loginFormRules = ref({
  telephone: [
    { required: true, message: '请输入用户名/手机号码', trigger: 'blur' },
    { min: 3, max: 11, message: '长度在 3 到 11 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
  ]
})
</script>
 
<template>
<div class="common-layout">
    <el-container class="login_container">
      <el-header><Header/></el-header>
      <el-main>
        <div>
          <div class="login_box">
            <!-- 头像区域 -->
            <div class="avatar_box">
              <img src="../assets/logo.png" alt="" />
            </div>
            <!-- 登录表单区域 -->
            <el-form label-width="0px" class="login_form" ref="loginForm" :model="loginFormData" :rules="loginFormRules">
              <!-- 用户名 -->
              <el-form-item prop="telephone">
                <el-input v-model="loginFormData.telephone" placeholder="用户名/手机号" />
              </el-form-item>
              <!-- 密码 -->
              <el-form-item prop="password">
                <el-input type="password" v-model="loginFormData.password" placeholder="密码" />
              </el-form-item>
              <!-- 按钮区域 -->
              <el-form-item class="login_btn">
                <el-button type="primary" @click="onSubmit" >登录</el-button>
              </el-form-item>
              <el-row justify="end">
                <el-form-item>
                  <router-link to="/" style="margin-right: 5px;">找回密码</router-link>
                  <router-link to="/register">立即注册</router-link>
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
.login_container {
  background-color: rgb(252, 248, 248);
  height: 100vh;
}

.login_box {
  width: 450px;
  height: 300px;
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
  height: 60%;
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