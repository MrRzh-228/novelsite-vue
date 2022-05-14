<script setup>

</script>

<template>
  <div class="edit-layout">
    <el-container style="height: 100%;">
      <el-header height="50px">
        <div style="width: 900px; margin: 0 auto;">
          <h3>Header</h3>
        </div>
      </el-header>
      <el-main>
        <div class="edit-main" style="width: 990px; margin: 0 auto;">
          <h3>Main</h3>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.edit-layout {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(245,246,247);
    .el-header {
        background-color: rgb(255,255,255);
    }
}
</style>