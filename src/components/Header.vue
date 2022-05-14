<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import router from '../router'

const searchWord = ref('');

const logout = () => {
    window.localStorage.clear()
    window.location.reload()
}
let userinfo = window.localStorage.getItem("userinfo");
const isShow = !userinfo

const search = () => {
    router.push('/search')
}

</script>

<template>
  <el-row class="row-bg" justify="space-between">
      <el-col :span="6">
          <div>
            <router-link to="/">
                <el-image alt="logo" src="/logo/logo1_2.png" style="width: 207; height: 65px;"/>
            </router-link>
          </div>
      </el-col>
      <el-col :span="6">
          <div>
            <el-input
            v-model="searchWord"
            placeholder="搜索你喜爱的书籍"
            class="input-with-button"
            size="large"
            >
            <template #append>
                <el-button :icon="Search" @click="search"/>
            </template>
            </el-input>
          </div>
      </el-col>

      <el-col :span="2">
          <div>
              <el-button size="large" type="info" plain class="btn" @click="router.push('/space')">我的书架</el-button>
          </div>
      </el-col>
      <el-col :span="3">
          <div>
            <router-link to="/login" v-if="isShow">登录/注册</router-link>         
            <router-link to="/space">{{ userinfo }}</router-link>
            <el-button type="text" @click="logout" v-if="userinfo" style="color: black;">退出</el-button>
          </div>
      </el-col>
  </el-row>
</template>

<style scoped>
.row-bg {
  padding: 10px 0;
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  /* background-color: #f9fafc; */
}
.row-bg .el-col:nth-child(2n) {
    margin: 20px 0;
}
.row-bg .el-col:nth-child(3) {
    margin: 20px 0;
}
a {
    color: rgb(59,56,55);
    margin-right: 5px;
    text-decoration: none;
}
.router-link-active {
    text-decoration: none;
}
</style>