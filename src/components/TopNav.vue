<script setup>

const emit = defineEmits(['showNav'])

</script>

<template>
  <el-menu mode="horizontal" class="top-nav"  background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item index="1" @click="emit('showNav', 'all')">全部作品</el-menu-item>
      <el-menu-item index="2" @click="emit('showNav', 'rank')">排行</el-menu-item>
      <el-menu-item index="3" @click="emit('showNav', 'end')">完本</el-menu-item>
      <el-menu-item index="4" @click="emit('showNav', 'free')">免费</el-menu-item>
      <el-menu-item index="5" @click="emit('showNav', 'write')">作家专区</el-menu-item>
      <el-menu-item index="6" @click="emit('showNav', 'search')">搜索</el-menu-item>
  </el-menu>
</template>

<style scoped>
.top-nav .el-menu-item {
    width: 16%;
}
</style>