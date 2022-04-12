<script setup>
import { reactive, ref, onMounted, getCurrentInstance } from 'vue';
import { storeToRefs } from 'pinia'
import { useNovelStore } from '../store/novel'
import { getChapterById } from "../api";
import { ArrowRight, Tickets, Collection, Cellphone, Ticket, Management, EditPen } from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/display.css'
import Header from '../components/Header.vue'

const { proxy } = getCurrentInstance();

const Chapter = reactive({
    id: '',
    index: '',
    name: '',
    text: ''
});
const TextList = ref([]);

// 小说状态管理
const useNovel = useNovelStore()
const { category, book, author, chapterList } = storeToRefs(useNovel)

const catalogVisible = ref(false)
const showCatalog = () => {
    catalogVisible.value = false;

}

const init = () => {
    getChapterById(proxy.$route.params.id)
    .then(res => {
        Chapter.id = proxy.$route.params.id;
        Chapter.index = res.chapter_num;
        Chapter.name = res.chapter_name;
        Chapter.text = res.chapter_text;
        TextList.value = Chapter.text.split('　　');
    })
    .catch(err => console.log(err))
}

onMounted(() => {
    init();
});

</script>

<template>
    <div class="chapter-layout">
        <el-container>
        <el-header>
            <div class="hidden-md-and-down" style="width: 1200px; margin:0 auto;"><Header style="background-color: rgb(243,239,232);"/></div>
            <div class="hidden-md-and-up" style="width: 900px; margin:0 auto;"><Header style="background-color: rgb(243,239,232);"/></div>
        </el-header>
        <el-main>
            <div class="main-layout">
                <el-container>
                <el-aside>
                    <el-affix :offset="0">
                      <ul style="padding: 0;list-style-type: none;">
                          <li><el-button :icon="Tickets" @click="catalogVisible = true">目录</el-button></li>
                          <li><el-button :icon="Collection">书架</el-button></li>
                          <li><el-button :icon="Cellphone">书页</el-button></li>
                          <li><el-button :icon="Ticket">投票</el-button></li>
                      </ul>
                    </el-affix>
                </el-aside>
                <el-container>
                    <el-main >
                        <el-dialog v-model="catalogVisible" title="目录" width="800px" append-to-body="true"> 
                            <ul style="padding: 0; list-style-type: none; height: 700px; overflow: auto;" >
                                <li v-for="(item, index) in Math.ceil(chapterList.length / 2)">
                                <el-row >
                                    <el-col :span="12" v-for="itemI in chapterList.slice(index*2,item*2)"><router-link :to="{path:`/chapter/${book.id}/${itemI.id}`}"><a style="font-size: 16px;">{{ itemI.name }}</a></router-link></el-col>
                                </el-row>
                                <el-divider style="margin: 15px 0 15px 0;"/>
                                </li>
                            </ul>
                        </el-dialog>
                        <el-breadcrumb :separator-icon="ArrowRight" style="left: 0;">
                            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                            <el-breadcrumb-item :to="{ path: category.path }">{{ category.name }}</el-breadcrumb-item>
                            <el-breadcrumb-item :to="{ path: book.path }">{{ book.name }}</el-breadcrumb-item>
                            <el-breadcrumb-item >{{ Chapter.name }}</el-breadcrumb-item>
                        </el-breadcrumb>
                        <div style="background-color: rgb(248,243,233); padding: 60px;">
                          <h2 style="margin:0 0 10px 0; font-weight:normal;">{{ Chapter.name }}</h2>
                          <el-row>
                              <el-col :span="7">
                                <router-link to="/">
                                    <Management style="width: 1em; height: 1em; margin-right: 8px; color: rgb(149,146,140);"/>
                                    <a style="position: absolute; font-size: x-small; color: rgb(149,146,140);">{{ book.name }}</a>
                                </router-link>
                              </el-col>
                              <el-col :span="7">
                                <router-link to="/">
                                    <EditPen style="width: 1em; height: 1em; margin-right: 8px; color: rgb(149,146,140);"/>
                                    <a style="position: absolute; font-size: x-small;color: rgb(149,146,140);">{{ author.name }}</a>
                                </router-link>
                              </el-col>
                          </el-row>
                          <p v-for="item in TextList" style="font-size: 18px; line-height: 32.4px; word-break: break-all"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item }}</span></p>
                        </div>
                    </el-main>
                    <el-footer>
                        <el-row style="background-color: rgb(248,243,233);">
                            <el-col :span="8"><router-link to="/"><p style="width: 100%; font-size: 18px; text-align: center;">上一章</p></router-link></el-col>
                            <el-col :span="8"><router-link :to="book.path"><p style="width: 100%; font-size: 18px; text-align: center;">目录</p></router-link></el-col>
                            <el-col :span="8"><router-link to="/"><p style="width: 100%; font-size: 18px; text-align: center;">下一章</p></router-link></el-col>
                        </el-row>
                    </el-footer>
                </el-container>
                </el-container>
            </div>
        </el-main>
        <el-footer>Footer</el-footer>
        </el-container>
    </div>
</template>

<style scoped>
.chapter-layout {
    background-color: rgb(231,225,212);
}
.chapter-layout .el-header {
    height: 100px;
    position: relative;
    padding: 0;
    background-color: rgb(243,239,232);
}
.el-button {
    width: 60px;
    height: 60px;
    background-color: rgb(248,243,233);
}
.el-breadcrumb {
    margin: 20px 0;
}
.main-layout {
    width: 880px;
    margin:0 auto;
}
.main-layout .el-aside {
    margin: 54px 0;
    width: 70px;
    color: var(--el-text-color-primary);
    border-right: solid 1px #e6e6e6;
    box-sizing: border-box;
}
.main-layout .el-main {
    text-align: left;
    position: relative;
    color: var(--el-text-color-primary);
}
a {
    text-decoration: none;
}
.router-link-active {
    text-decoration: none;
}
</style>

<style>
.el-dialog{  
    background: rgb(250,249,243);  
}  
</style>