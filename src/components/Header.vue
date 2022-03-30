<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

const input = ref('')
</script>

<template>
  <el-row class="row-bg" justify="space-between">
      <el-col :span="6">
          <div>
              <el-image alt="logo" src="/public/images/1.jpg" style="width: 240; height: 80px;"/>
          </div>
      </el-col>
      <el-col :span="6">
          <div>
            <el-input
            v-model="input"
            placeholder="Please input"
            class="input-with-button"
            size="large"
            >
            <template #append>
                <el-button :icon="Search" />
            </template>
            </el-input>
          </div>
      </el-col>

      <el-col :span="2">
          <div>
              <el-button size="large" type="info" plain class="btn">我的书架</el-button>
          </div>
      </el-col>
      <el-col :span="3">
          <div>
            <router-link to="/login">登录/注册</router-link>
          </div>
      </el-col>
  </el-row>
</template>

<style>
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