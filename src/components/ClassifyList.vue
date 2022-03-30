<script lang="ts" setup>
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
</script>

<template>

      <el-menu
        default-active="2"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1" class="el-menu"> 
          <template #title>
            <el-icon><location /></el-icon>
            <span>作品分类</span>
          </template>
            <el-menu-item index="1-1">
              <el-icon><location /></el-icon>
              <span>玄幻</span>
            </el-menu-item>
            <el-menu-item index="1-2">
              <el-icon><location /></el-icon>
              <span>修仙</span>
            </el-menu-item>
        </el-sub-menu>

      </el-menu>

</template>

<style>
/* .el-menu {
    background-color: rgb(49,48,53);
} */

.el-menu .el-menu-item:nth-child(2n) {
    background-color: rgb(247,246,242);
}
.el-menu .el-menu-item:nth-child(2n+1) {
    background-color: rgb(252,252,250);
}
</style>