<script setup>
import { reactive, onMounted, getCurrentInstance, watch } from 'vue';
import { getNovel } from "../api";
import { useNovelStore } from '../store/novel'
import 'element-plus/theme-chalk/display.css'

import Header from '../components/Header.vue'
import Recommend from '../components/Recommend.vue'
import BigList from '../components/BigList.vue'
import Notice from '../components/Notice.vue';
import BookDisplay from '../components/BookDisplay.vue';
import Rank from '../components/Rank.vue';

const { proxy } = getCurrentInstance();
const bookList = reactive([]);
const book = {
  typeId: proxy.$route.meta.id,
  title: proxy.$route.meta.title
}

const useNovel = useNovelStore()

const init = () => {
    const param = {
        novel_category: book.typeId,
        ordering: '-col_num',
    };
    getNovel(param)
    .then(res => {
        for(var i=0;i<res.results.length;i++) {
          bookList[i] = res.results[i].id
        }
        useNovel.updateCategoryName(book.title, proxy.$route.path)
        useNovel.$subscribe((mutation, state) => {
          sessionStorage.setItem('NovelStore', JSON.stringify(state))
        })
    })
    .catch(err => console.log(err))
}

// watch (
//   () => proxy.$route,
//   (to,from) => {
//     console.table(to);
//   }
// );

onMounted(() => {
  init()
});
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header><Header/></el-header>
      <el-main>
        <div class="top-option">
          <el-link :underline="false" href="/">排行</el-link>
          <el-divider direction="vertical" />
          <el-link :underline="false" href="/">完本</el-link>
          <el-divider direction="vertical" />
          <el-link :underline="false" href="/">免费</el-link>
          <el-divider direction="vertical" />
        </div>
        <el-divider />
        <div>
          <el-row :gutter="20" style="width: 100%; margin: 0;">
            
              <el-col :span="6" ><keep-alive><Recommend :category=book.typeId /></keep-alive></el-col>
              <el-col :span="12" style="padding-top: 10px;"><keep-alive><BigList :category=book.typeId /></keep-alive></el-col>
              <el-col :span="6"  style="padding-top: 10px;"><keep-alive><Notice/></keep-alive></el-col>

          </el-row>
        </div>
      </el-main>
      <el-container>
        <el-main>
          <h3>{{ book.title }}新书</h3>
          <div style="margin-right: 15px;">
            <el-divider />
            <ul class="hidden-md-and-down" style="padding: 0;list-style-type: none;">
              <li>
                <el-row justify="space-between">
                  <el-col :span="8" v-for="item in bookList.slice(0,3)"><BookDisplay :bookid=item /></el-col>
                </el-row>
              </li>
              <el-divider border-style="dashed" />
              <li>
                <el-row justify="space-between">
                  <el-col :span="8" v-for="item in bookList.slice(3,6)"><BookDisplay :bookid=item /></el-col>
                </el-row>
              </li>
              <el-divider border-style="dashed" />
              <li>
                <el-row justify="space-between">
                  <el-col :span="8" v-for="item in bookList.slice(6,9)"><BookDisplay :bookid=item /></el-col>
                </el-row>
              </li>
            </ul>
            <ul class="hidden-md-and-up" style="padding: 0;list-style-type: none;">
              <li>
                <el-row justify="space-between">
                  <el-col :span="12" v-for="item in bookList.slice(0,2)"><BookDisplay :bookid=item /></el-col>
                </el-row>
              </li>
              <el-divider border-style="dashed" />
              <li>
                <el-row justify="space-between">
                  <el-col :span="12" v-for="item in bookList.slice(2,4)"><BookDisplay :bookid=item /></el-col>
                </el-row>
              </li>
              <el-divider border-style="dashed" />
              <li>
                <el-row justify="space-between">
                  <el-col :span="12" v-for="item in bookList.slice(4,6)"><BookDisplay :bookid=item /></el-col>
                </el-row>
              </li>
            </ul>
          </div>
        </el-main>
        <el-aside>
          <h3>{{ book.title }}月票榜</h3>
          <el-divider style="margin-bottom: 10px;" />
          <div><Rank :msg="{category: book.typeId,rank_type:'monthly'}" /></div>
        </el-aside>
      </el-container>
      <el-container>
        <el-main>
          <h3>人气连载</h3>
          <div style="margin-right: 15px;">
            <el-divider />
            <ul class="hidden-md-and-down" style="padding: 0;list-style-type: none;">
              <li>
                <el-row justify="space-between">
                  <el-col :span="8" v-for="item in bookList.slice(9,12)"><BookDisplay :bookid=item /></el-col>
                </el-row>
              </li>
              <el-divider border-style="dashed" />
              <li>
                <el-row justify="space-between">
                  <el-col :span="8" v-for="item in bookList.slice(12,15)"><BookDisplay :bookid=item /></el-col>
                </el-row>
              </li>
              <el-divider border-style="dashed" />
              <li>
                <el-row justify="space-between">
                  <el-col :span="8" v-for="item in bookList.slice(15,18)"><BookDisplay :bookid=item /></el-col>
                </el-row>
              </li>
            </ul>
            <ul class="hidden-md-and-up" style="padding: 0;list-style-type: none;">
              <li>
                <el-row justify="space-between">
                  <el-col :span="12" v-for="item in bookList.slice(9,11)"><BookDisplay :bookid=item /></el-col>
                </el-row>
              </li>
              <el-divider border-style="dashed" />
              <li>
                <el-row justify="space-between">
                  <el-col :span="12" v-for="item in bookList.slice(11,13)"><BookDisplay :bookid=item /></el-col>
                </el-row>
              </li>
              <el-divider border-style="dashed" />
              <li>
                <el-row justify="space-between">
                  <el-col :span="12" v-for="item in bookList.slice(13,15)"><BookDisplay :bookid=item /></el-col>
                </el-row>
              </li>
            </ul>
          </div>
        </el-main>
        <el-aside>
          <h3>{{ book.title }}收藏榜</h3>
          <el-divider style="margin-bottom: 10px;" />
          <div><Rank :category="book.typeId" :msg="{category: book.typeId,rank_type:'collect'}" /></div>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.top-option {
  margin-top: 25px;
}
.el-link {
  margin-right: 25px;
  margin-left: 25px;
  font-size: x-large;
  color: black;
}
</style>