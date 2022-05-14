<script setup>
import { ref, reactive, onMounted } from 'vue'
import Carousel from '../components/Carousel.vue'
import ClassifyList from '../components/ClassifyList.vue'
import Header from '../components/Header.vue'
import TopNav from '../components/TopNav.vue'
import ShowBook from '../components/ShowBook.vue'
import ShowRank from '../components/ShowRank.vue'
import router from '../router'
import Rank from '../components/Rank.vue';
import HomeList from '../components/HomeList.vue';

const showMain = ref('home')

const switchNav = (data) => {
  if(data == 'write') {
    router.push('/write')
  } else if (data == 'search') {
    router.push('/search')
  } else {
    showMain.value = data
  }
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header><Header/></el-header>
      <el-main>
        <el-row>
          <el-col :span="6">
            <ClassifyList />
          </el-col>
          <el-col :span="18">
            <TopNav @showNav="switchNav"/>
            <Carousel v-if="showMain=='home'" />
            <ShowBook v-else-if="showMain=='all'" :msg="showMain"/>
            <ShowBook v-else-if="showMain=='end'" :msg="showMain"/>
            <ShowBook v-else-if="showMain=='free'" :msg="showMain"/>
            <ShowRank v-else-if="showMain=='rank'" />
          </el-col>
        </el-row>
        <div style="padding: 30px 0;" v-if="showMain=='home'">
          <el-row>
            <el-col :span="6">
              <Rank :msg="{category: '' ,rank_type:'monthly'}" />
            </el-col>
            <el-col :span="12">
              <div>
                <HomeList />
              </div>
            </el-col>
            <el-col :span="6">
              <Rank :msg="{category: '' ,rank_type:'rcommend'}" />
            </el-col>
          </el-row>
        </div>
      </el-main>
      <!-- <el-footer>Footer</el-footer> -->
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
  background-color: white;
  text-align: center;
  height: 100px;
  position: relative;
  padding: 0%;
}
.common-layout .el-aside {
  width: 240px;
  color: var(--el-text-color-primary);
  background: #fff !important;
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
</style>
