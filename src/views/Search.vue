<script setup>
import { ref, reactive, onMounted } from 'vue';
import { ArrowDown } from '@element-plus/icons-vue';
import { getNovel } from "../api";

const userinfo = window.localStorage.getItem("userinfo");

const showResult = ref(true)
const searchWord = ref('')
const bookList = reactive([])

const submit = () => {
    const param = {search: searchWord.value}
    getNovel(param)
    .then(res => {
        for(var i=0;i<res.results.length;i++) {
            const obj = {
               id: res.results[i].id,
               cover: res.results[i].cover,
               name: res.results[i].novel_name,
               author: res.results[i].novel_author,
               category: res.results[i].novel_category,
               intro: res.results[i].intro,
               status: res.results[i].status
            }
            if (obj.status) {
                obj.status = '连载'
            } else {obj.status = '完结'}
            bookList[i] = obj
        }
        console.log(bookList)
    })
    .catch(err => console.log(err))
}
</script>

<template>
  <div class="search-layout">
    <el-container style="height: 100%;">
        <el-header height="70px">
            <div class="search-header" style="width: 990px; margin: 0 auto;">
                <el-row justify="space-between">
                    <el-col :span="6">
                        <router-link to="/">
                            <el-image alt="logo" src="/logo/logo1_1.png" style="width: 207; height: 65px;"/>
                        </router-link>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="text" @click="$router.push('/xiuzhen')">修真</el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="text" @click="$router.push('/xuanhuan')">玄幻</el-button> 
                    </el-col>
                    <el-col :span="2">
                        <el-button type="text" @click="$router.push('/dushi')">都市</el-button> 
                    </el-col>
                    <el-col :span="2">
                        <el-button type="text" @click="$router.push('/chuanyue')">穿越</el-button> 
                    </el-col>
                    <el-col :span="2">
                        <el-button type="text" @click="$router.push('/wangyou')">网游</el-button> 
                    </el-col>
                    <el-col :span="2">
                        <el-button type="text" @click="$router.push('/kehuan')">科幻</el-button> 
                    </el-col>
                    <el-col :span="4">
                        <el-dropdown style="position: absolute; top: 24px;">
                            <span style="font-size: 14px; color: white;">
                                {{ userinfo }}
                                <el-icon>
                                    <arrow-down />
                                </el-icon>
                            </span>
                            <template #dropdown>
                            <el-dropdown-menu>
                                <router-link to="/recharge"><el-dropdown-item>充值</el-dropdown-item></router-link>
                                <el-dropdown-item>退出</el-dropdown-item>
                            </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </el-col>
                </el-row>
            </div>
        </el-header>
        <el-main style="padding-top: 40px;">
            <div class="search-main" style="width: 990px; margin: 0 auto;">
                <div class="search-input">
                    <el-input v-model="searchWord" placeholder="搜索你喜爱的书籍" size="large">
                        <template #append>
                            <el-button @click="submit">搜索</el-button>
                        </template>
                    </el-input>
                </div>
                <div class="search-result" v-if="showResult">
                    <div v-for="item in bookList" class="search-item">
                        <el-row>
                            <el-col :span="4">
                                <router-link :to="`/info/${item.id}`">
                                    <el-image :src=item.cover style="width: 102px; height: 136px;"/>
                                </router-link>
                            </el-col>
                            <el-col :span="14">
                                <div class="bookItem-layout-up">
                                    <router-link :to="`/info/${item.id}`"><h3>{{ item.name }}</h3></router-link>
                                    <p class="category">
                                        <el-row class="state-box">
                                            <el-col :span="2">
                                                <a href="">{{ item.category }}</a>
                                            </el-col>
                                            <el-col :span="1"><el-divider direction="vertical" /></el-col>
                                            <el-col :span="2">
                                                <a href="">{{ item.status }}</a>
                                            </el-col>
                                        </el-row>
                                    </p>
                                    <p class="intro">{{ item.intro }}</p>
                                    <div class="author">
                                        <img src="/icon/small.png" >
                                        <a href="" >{{ item.author }}</a>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
        </el-main>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
.search-layout {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(247,246,242);
    .el-header {
        background-color: rgb(62,61,67);
    }
}
.search-header {
    .el-button {
        width: 100%;
        height: 100%;
        background-color: rgb(62,61,67);
        color: white;
        font-size: 16px;
    }
    .el-button:hover{
        background-color: rgb(0,0,0);
    }
    .el-button:focus{
        background-color: rgb(238,66,89);
    }
}
.search-input {
    position:absolute;
    margin: auto;
    left:0;
    top: 30%;
    bottom: 0;
    right: 0;
    width: 500px;
}
.search-result {
    position:absolute;
    margin: auto;
    left:0;
    top: 40%;
    bottom: 0;
    right: 0;
    width: 900px;
}
.search-item {
    background-color: rgb(255,255,255);
    padding: 20px;
}
.bookItem-layout-up {
    h3 {
        margin: 5px 0 5px;
        color: black;
        font-size: 18px;
        font-weight: 400;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    p {
        a {
            color: rgb(166,166,166);
            font-size: 12px;
            width: 75px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
        
    }
}
.category {
    margin: 5px auto;
}
.intro {
    margin: 5px auto;
    font-size: 14px;
    line-height: 24px;
    color: rgb(102, 102, 102);
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.author {
    position: absolute;
    bottom: 5px;
    img {
        width: 20px;
        vertical-align: middle;
        margin-right: 8px;
    }
    a {
        color: rgb(166,166,166);
    }
}
a {
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
</style>

<style>
.el-input-group__append {
    background-color: rgb(191,44,36);
    color: rgb(255,255,255);
}
.el-input-group__append:hover {
    background-color: rgb(237,66,89);
    color: rgb(255,255,255);
}
</style>