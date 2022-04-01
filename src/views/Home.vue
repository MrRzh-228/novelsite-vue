<script setup>
import Carousel from '../components/Carousel.vue'
import ClassifyList from '../components/ClassifyList.vue'
import Header from '../components/Header.vue'
import TopNav from '../components/TopNav.vue'


</script>

<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <div class="common-layout">
    <el-container>
      <el-header><Header/></el-header>
      <el-main>
          <div class="main-layout">
            <el-container>
              <el-aside width="200px"><ClassifyList/></el-aside>
              <el-container>
                <el-header style="height: 60px;"><TopNav/></el-header>
                <el-main><Carousel/></el-main>
              </el-container>
            </el-container>
          </div>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<style>

@media screen and (min-width: 1000px) {
  .common-layout {
    width: 1200px;
    height: auto;
    margin: 0 auto;
  }
}
.common-layout .el-header {
  background-color: #d9ecff;
  text-align: center;
  height: 100px;
  position: relative;
  padding: 0%;
}
.common-layout .el-aside {
  width: 240px;
  color: var(--el-text-color-primary);
  background: #fff !important;
  border-right: solid 1px #e9e9eb;
  box-sizing: border-box;
}
.common-layout .el-main {
  padding: 0%;
  text-align: left;
  position: relative;
  background-color: white;
  color: var(--el-text-color-primary);
}
.common-layout .el-footer {
  text-align: center;
  position: relative;
  background-color: #e9e9eb;
  color: var(--el-text-color-primary);
}

.main-layout .el-header {
  text-align: left;
  position: relative;
  color: var(--el-text-color-primary);
}
.main-layout .el-aside {
  width: auto;
  color: var(--el-text-color-primary);
  border-right: solid 1px #e6e6e6;
  box-sizing: border-box;
}
</style>
