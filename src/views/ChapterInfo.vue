<script setup>
import { reactive, ref, onMounted, getCurrentInstance } from 'vue';
import { storeToRefs } from 'pinia'
import { useNovelStore } from '../store/novel'
import { getChapterById, voteMonthTicket, voteRecommendTicket } from "../api";
import { ArrowRight, Tickets, Collection, Cellphone, Ticket, Management, EditPen } from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/display.css'
import Header from '../components/Header.vue';

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
const VoteFormVisible = ref(false);
const monthlyTicket = ref(true);
const recomTicket = ref(false);
const voteRadio = ref('1')
const param = ref({
    novel: '',
    vote_num: ''
})

const voteTicket = () => {
    param.value.novel = book.value.id;
    param.value.vote_num = voteRadio.value

    if (monthlyTicket.value) {
        voteMonthTicket(param.value)
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err))
    } else if (recomTicket.value) {
        voteRecommendTicket(param.value)
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err))
    } else {
        console.log('未知错误')
    }
}

const init = () => {
    // const param = {
    //     chapter_novel: book.value.id,
    //     chapter_num: proxy.$route.params.index
    // }
    // getChapter(param)
    const chapterId =  chapterList.value[proxy.$route.params.index-1].id
    getChapterById(chapterId)
    .then(res => {
        Chapter.id = res.id;
        Chapter.index = proxy.$route.params.index;
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
  <div class="vote">
    <el-dialog v-model="VoteFormVisible" width="400px">
        <div>
            <el-row justify="space-evenly" style="background-color: rgb(255,255,255);">
                <el-col :span="12"><el-button type="text" @click="monthlyTicket=true; recomTicket=false">月票</el-button></el-col>
                <el-col :span="12"><el-button type="text" @click="recomTicket=true; monthlyTicket=false">推荐票</el-button></el-col>
            </el-row>
            <div style="text-align: center; display:block;">
                <el-radio-group v-model="voteRadio" size="large">
                    <ul style="padding: 0;">
                        <li style="line-height:80px">
                            <el-row :gutter="50">
                                <el-col :span="12"><el-radio-button label="1" >一张</el-radio-button></el-col>
                                <el-col :span="12"><el-radio-button label="2" >两张</el-radio-button></el-col>
                            </el-row>                      
                        </li>
                        <li style="line-height:80px">
                            <el-row :gutter="50">
                                <el-col :span="12"><el-radio-button label="3">三张</el-radio-button></el-col>
                                <el-col :span="12"><el-radio-button label="4">四张</el-radio-button></el-col>
                            </el-row>  
                        </li>              
                    </ul>        
                </el-radio-group>
            </div>
        </div>
        <template #footer>
            <div class="vote-commit">
                <el-button type="danger" @click="voteTicket" v-show="monthlyTicket" style="width: auto;">确认投月票</el-button>
                <el-button type="danger" @click="voteTicket" v-show="recomTicket" style="width: auto;">确认投推荐票</el-button>
            </div>
        </template>
    </el-dialog>
  </div>

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
                          <li><router-link :to="book.path"><el-button :icon="Cellphone" >书页</el-button></router-link></li>
                          <li><el-button :icon="Ticket" @click="VoteFormVisible = true">投票</el-button></li>
                      </ul>
                    </el-affix>
                </el-aside>
                <el-container>
                    <el-main >
                        <el-dialog v-model="catalogVisible" title="目录" width="800px" append-to-body="true"> 
                            <ul style="padding: 0; list-style-type: none; height: 700px; overflow: auto;" >
                                <li v-for="(item, index) in Math.ceil(chapterList.length / 2)">
                                <el-row >
                                    <el-col :span="12" v-for="itemI in chapterList.slice(index*2,item*2)"><router-link :to="{path:`/chapter/${book.id}/${itemI.index}`}"><a style="font-size: 16px;">{{ itemI.name }}</a></router-link></el-col>
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
                            <el-col :span="8" v-if="Chapter.index==1"><el-button type="text" disabled style="width: 100%; height: 100%; font-size: 18px; background-color: rgb(248,243,233);">上一章</el-button></el-col>
                            <el-col :span="8" v-else><router-link :to="{path:`/chapter/${book.id}/${parseInt(Chapter.index)-1}`}"><el-button type="text" style="width: 100%; height: 100%; font-size: 18px;color: black;">上一章</el-button></router-link></el-col>
                            <el-col :span="8"><router-link :to="book.path"><p style="width: 100%; font-size: 18px; text-align: center;">目录</p></router-link></el-col>
                            <el-col :span="8" v-if="Chapter.index==chapterList.length"><el-button type="text" disabled style="width: 100%; height: 100%; font-size: 18px; background-color: rgb(248,243,233);">下一章</el-button></el-col>
                            <el-col :span="8" v-else><router-link :to="{path:`/chapter/${book.id}/${parseInt(Chapter.index)+1}`}"><el-button type="text" style="width: 100%; height: 100%; font-size: 18px;color: black;">下一章</el-button></router-link></el-col>
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
.el-affix .el-button {
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
    color: rgb(38,38,38);
    text-decoration: none;
}
.router-link-active {
    text-decoration: none;
}

</style>

<style lang="less">
.el-dialog{  
    background: rgb(250,249,243);  
}
.vote .el-dialog {
    .el-dialog__header {
        display: none;
    }
    .el-dialog__body {
        padding: 0;
    }
}
.vote .el-button {
    width: 100%;
    color: rgb(166, 166, 166); 
    background-color: rgb(255,255,255); 
    font-size: x-large;
}
.vote .el-button:focus,.vote .el-button:hover {
    color: red;
    background-color: rgb(252,252,250);
}
.vote-commit {
    text-align: center;
    display: block;
    .el-button {
        height: 40px;
        color: white;
        background-color: rgb(191,44,36);
    }
    .el-button:focus,.el-button:hover {
        color: white;
        background-color: rgb(237,66,89);
    }
}
</style>