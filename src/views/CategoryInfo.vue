<script setup>
import Header from '../components/Header.vue'
import Recommend from '../components/Recommend.vue'
import BigList from '../components/BigList.vue'
import Notice from '../components/Notice.vue';

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header><Header/></el-header>
      <el-main>
        <div class="top-option">
          <el-link :underline="false">排行</el-link>
          <el-divider direction="vertical" />
          <el-link :underline="false">完本</el-link>
          <el-divider direction="vertical" />
          <el-link :underline="false">免费</el-link>
        </div>
        <el-divider />
        <div>
          <el-row :gutter="20" style="width: 100%; margin: 0;">
            <el-col :span="6" ><Recommend :category="13" /></el-col>
            <el-col :span="12" style="padding-top: 10px;"><BigList :category="13"/></el-col>
            <el-col :span="6"  style="padding-top: 10px;"><Notice/></el-col>
          </el-row>
        </div>
      </el-main>
      <el-main>
        <div>

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
  margin-right: 25px;
  margin-left: 25px;
  font-size: x-large;
  color: black;
}
</style>