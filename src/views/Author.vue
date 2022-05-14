<script setup>
import { ref, reactive, onMounted } from 'vue';
import { getAuthorInfo, getNovel } from "../api";
import { Monitor, Tickets, Files, DataAnalysis, Edit } from '@element-plus/icons-vue'
import Workbench from '../components/Workbench.vue';
import NovelManage from '../components/NovelManage.vue';

const activeName = ref('first')

const authorinfo = reactive({
    id: '',
    name: '',
    work_num: 0,
    creative_days: 0
})

const add = (data) => {
    activeName.value = data
}

const bookList = reactive([])

const workMsg = reactive([
          {id: '', name: '', work_num: 0, creative_days: 0},
          {cover: '', name: '', intro: '', col_num: 0}
        ])

const init = () => {
    getAuthorInfo()
    .then(res => {
        authorinfo.id = res[0].id
        authorinfo.name = res[0].writer_name
        authorinfo.work_num = res[0].work_num
        authorinfo.creative_days = res[0].creative_days
        const param = {novel_author: authorinfo.id}
        getNovel(param)
        .then(res2 => {
            for(var i=0;i<res2.results.length;i++) {
                const obj = {
                    id: res2.results[i].id,
                    cover: res2.results[i].cover,
                    name: res2.results[i].novel_name,
                    intro: res2.results[i].intro,
                    col_num: res2.results[i].col_num  
                }
                bookList.push(obj)
            }
            workMsg[0] = authorinfo
            workMsg[1] = bookList[0]
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

onMounted(() => {
    init();
});
</script>

<template>
  <div class="write-layout">
    <el-container style="height: 100%;">
      <el-header height="65px">
        <div style="width: 900px; margin: 0 auto;">
          <el-row >
            <el-col :span="6">
              <router-link to="/">
                <el-image alt="logo" src="/logo/logo1_2.png" style="width: 207px; height: 65px;"/>
              </router-link>
            </el-col>
            <el-col :span="6">
              <h2 style="color: rgb(48,57,71); font-family: DFKai-SB; font-size: 24px; font-weight: 600;">作家专区</h2>
            </el-col>
          </el-row>
        </div>
      </el-header>
      <el-main>
          <div class="write-main" style="width: 990px; margin: 0 auto;">
            <el-tabs tab-position="left" :stretch="true" class="write-tabs" v-model="activeName">
                <el-tab-pane name="first">
                    <template #label>
                        <span class="write-tabs-label">
                            <el-icon><Monitor /></el-icon>
                            <span>工作台</span>
                        </span>
                    </template>
                    <Workbench :msg=workMsg @createBook="add" />
                </el-tab-pane>
                <el-tab-pane name="second">
                    <template #label>
                        <span class="write-tabs-label">
                            <el-icon><Files /></el-icon>
                            <span>作品管理</span>
                        </span>
                    </template>
                    <NovelManage :msg=bookList />
                </el-tab-pane>

                <!-- <el-tab-pane name="third">
                    <template #label>
                        <span class="write-tabs-label">
                            <el-icon><DataAnalysis /></el-icon>
                            <span>数据中心</span>
                        </span>
                    </template>
                </el-tab-pane> -->

                <el-tab-pane>
                    <template #label>
                        <span class="write-tabs-label">
                            <el-icon><Edit /></el-icon>
                            <span>写作</span>
                        </span>
                    </template>
                    <h2 class="title">作家专区</h2>
                </el-tab-pane>
            </el-tabs>
          </div>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.write-layout {
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
.write-tabs .write-tabs-label {
    .el-icon {
        vertical-align: middle;
    }
    font-size: 14px;
    line-height: 36px;
    position: absolute;
    left: 20px;
}
.write-tabs .write-tabs-label span{
    vertical-align: middle;
    margin-left: 8px;
}
</style>

<style>
.el-tabs__nav {
    background-color: rgb(255,255,255) !important;
}
.el-tabs__item {
    text-align: center;
    width: 150px !important;
    margin-bottom: 20px;
    color: black !important;
}
.is-active {
    color: rgb(64,158,255) !important;
    font-weight: 700
}
</style>