<script setup>
import Header from '../components/Header.vue'
import Recommend from '../components/Recommend.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header><Header/></el-header>
      <el-main>
        <div class="top-option">
          <el-link :underline="false">排行</el-link>
          <el-link :underline="false">完本</el-link>
          <el-link :underline="false">免费</el-link>
        </div>
        <el-divider />
        <div>
          <el-row>
            <el-col :span="10" ><Recommend :category="13" /></el-col>
            <el-col :span="14" ></el-col>
          </el-row>
          
        </div>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<style scoped>
.top-option {
  margin-top: 25px;
}
.el-link {
  margin-right: 50px;
  font-size: x-large;
  color: black;
}
</style>