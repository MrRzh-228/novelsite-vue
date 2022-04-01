<script lang="ts" setup>
// import router from '../router';
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const openeds = ['1']
</script>

<template>

      <el-menu
        background-color="#545c64"
        text-color="#fff"
        router
        :default-openeds="openeds"
        :default-active="$route.path"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1" class="el-menu"> 
          <template #title>
            <el-icon><location /></el-icon>
            <span>作品分类</span>
          </template>
            <el-menu-item index="/xiuzhen">
              <el-icon><location /></el-icon>
              <span>修真</span>
            </el-menu-item>
            <el-menu-item index="/xuanhuan">
              <el-icon><location /></el-icon>
              <span>玄幻</span>
            </el-menu-item>
            <el-menu-item index="/dushi">
              <el-icon><location /></el-icon>
              <span>都市</span>
            </el-menu-item>
            <el-menu-item index="/chuanyue">
              <el-icon><location /></el-icon>
              <span>穿越</span>
            </el-menu-item>
            <el-menu-item index="/wangyou">
              <el-icon><location /></el-icon>
              <span>网游</span>
            </el-menu-item>
            <el-menu-item index="/kehuan">
              <el-icon><location /></el-icon>
              <span>科幻</span>
            </el-menu-item>
        </el-sub-menu>

      </el-menu>

</template>

<style scoped>
.el-menu {
  width: auto;
}

.el-menu .el-menu-item {
  width: auto;
}

</style>