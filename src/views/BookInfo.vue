<script setup>
import { reactive, onMounted, getCurrentInstance } from 'vue';
import { storeToRefs } from 'pinia';
import { getNovelById, getChapter } from "../api";
import { useNovelStore } from '../store/novel';
import { ArrowRight } from '@element-plus/icons-vue'
import Header from '../components/Header.vue'

const { proxy } = getCurrentInstance();

const isShowInfo = reactive(['true']);
const chapterList = reactive([]);
const chapterNum = reactive([]);

const useNovel = useNovelStore()
const { category } = storeToRefs(useNovel)

const book = reactive({
  id: proxy.$route.params.id,
  name: '',
  author: '',
  intro: '',
  cover: '',
  col_num: '',
  recom_num: '',
  mon_num: ''
});

const infoClick = () => {
  if (isShowInfo[0]==='false') {
    isShowInfo[0] = 'true';
  }
}

const catalogClicl = () => {
  if (isShowInfo[0]==='true') {
    isShowInfo[0] = 'false';
  }
}

const init = () => {
  getNovelById(book.id)
  .then(res => {
    book.name = res.novel_name;
    book.author = res.novel_author.writer_name;
    book.intro = res.intro;
    book.cover = res.cover;
    book.col_num = res.col_num;
    book.recom_num = res.rcom_tk_num;
    book.mon_num = res.mon_tk_num;
    useNovel.updateBookName(book.id, book.name, proxy.$route.path)
    useNovel.updateAuthor(book.author, '/')
  })
  .catch(err => console.log(err))
  const param = {
    chapter_novel: book.id,
    ordering: 'chapter_num'
  }

  getChapter(param)
  .then(res => {
    chapterNum[0] = res.count;
    for(var i=0;i<res.results.length;i++) {
      const obj = {
        id: res.results[i].id,
        name: res.results[i].chapter_name,
        index: res.results[i].chapter_num
      }
      chapterList.push(obj);
    }
    useNovel.updateChapter(chapterList)
    // console.log(chapterList)
  })
}

onMounted(() => {
    init()
});
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header><Header/></el-header>
      <el-main>
          <el-container class="book-information">
              <el-header style="height: 350px;">
                <div >
                  <el-breadcrumb :separator-icon="ArrowRight">
                      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                      <el-breadcrumb-item :to="{ path: category.path }">{{ category.name }}</el-breadcrumb-item>
                      <el-breadcrumb-item >{{ book.name }}</el-breadcrumb-item>
                  </el-breadcrumb>
                  <el-divider/>
                  <el-row>
                      <el-col :span="6">
                        <el-image alt="logo" :src="book.cover" style="width: auto; height: 200px; margin-top: 20px;"/>
                      </el-col>
                      <el-col :span="18">
                        <el-row class="book-info-up">
                          <el-col :span="12"><h2>{{ book.name }}</h2></el-col>
                          <el-col :span="8"><p>{{ book.author }} 著</p></el-col>
                        </el-row>
                        <el-row :gutter="15" style="width: 300px;">
                          <el-col :span="4"><el-tag size="large">连载</el-tag></el-col>
                          <el-col :span="4"><el-tag size="large">签约</el-tag></el-col>
                          <el-col :span="4"><el-tag size="large">VIP</el-tag></el-col>
                          <el-col :span="4"><el-tag type="danger" size="large">网游</el-tag></el-col>
                          <el-col :span="5"><el-tag type="danger" size="large">轻小说</el-tag></el-col>
                        </el-row>
                        <p style="text-align: left;">心潮澎湃，无限幻想，迎风挥击千层浪，少年不败热血！</p>
                        <el-row :gutter="10" style="margin-bottom: 10px;">
                          <el-col :span="4"><p style="margin: 0; text-align:left;">{{ book.col_num }}收藏</p></el-col>
                          <el-divider direction="vertical" />
                          <el-col :span="4"><p style="margin: 0; text-align:left;">{{ book.recom_num }}推荐</p></el-col>
                          <el-divider direction="vertical" />
                          <el-col :span="4"><p style="margin: 0; text-align:left;">{{ book.mon_num }}月票</p></el-col>
                        </el-row>
                        <el-row :gutter="20">
                          <el-col :span="4"> <el-button style="width: 100%;" type="primary" size="large" plain>免费试读</el-button></el-col>
                          <el-col :span="4"> <el-button style="width: 100%;" type="primary" size="large" plain>加入书架</el-button></el-col>
                          <el-col :span="4"> <el-button style="width: 100%;" type="primary" size="large" plain>投票互动</el-button></el-col>
                        </el-row> 
                      </el-col>
                  </el-row>
                  <el-row :gutter="20" class="option-button">
                    <el-col :span="4"><el-button type="text" @click="infoClick">作品信息</el-button></el-col>
                    <el-col :span="4"><el-button type="text" @click="catalogClicl">目录({{ chapterNum[0] }}章)</el-button></el-col>
                  </el-row>
                </div>
              </el-header>
              <el-main style="display: block;">
                  <el-divider/>
                  <el-container v-show="isShowInfo[0]=='true'">
                      <el-main>
                        <div class="book-info-down">
                          <p>{{ book.intro }}</p>
                          <p>… …</p>
                          <el-divider/>
                          <el-row :gutter="10">
                            <el-col :span="4"><p style="color: rgb(153,153,153);">开始阅读</p></el-col>
                            <el-col :span="20">
                              <ul style="padding: 0;list-style-type: none;">
                                <li v-for="item in chapterList.slice(0,11)" style="line-height:25px"><router-link :to="`/chapter/${book.id}/${item.id}`">{{ item.name }}</router-link></li>
                                <li>... ...</li>
                              </ul> 
                            </el-col>
                          </el-row>
                        </div>
                      </el-main>
                      <el-aside>Aside</el-aside>
                  </el-container>
                  <el-main v-show="isShowInfo[0]!='true'">
                    <div class="book-info-down">
                      <h3>正文·共{{ chapterNum[0] }}章</h3>
                      <el-divider border-style="inset" />
                      <ul style="padding: 0;list-style-type: none;">
                        <li v-for="(item, index) in Math.ceil(chapterList.length / 3)">
                          <el-row >
                            <el-col :span="8" v-for="itemI in chapterList.slice(index*3,item*3)"><router-link :to="{path:`/chapter/${book.id}/${itemI.id}`}"><a>{{ itemI.name }}</a></router-link></el-col>
                          </el-row>
                          <el-divider style="margin: 15px;"/>
                        </li>
                      </ul>
                    </div>
                  </el-main>
              </el-main>
          </el-container>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<style>
.book-information {
  width: 990px;
  margin:0 auto
}
@media screen and (max-width: 1000px) {
  .book-information {
    width: 910px;
    margin:0 auto
  }
}
.book-info-up h2 {
  text-align: left;
  margin: 15px 0;

}
.book-info-up p {
  text-align: left;
  margin-top: 20px;
  margin-bottom: 15px;
}
.option-button {
  margin-top: 20px;
}
.option-button .el-button {
  color: rgb(166,166,166);
  font-size: large;
}
.option-button .el-button:focus,.option-button .el-button:hover {
  color: red;
  background-color: white;
}
.book-info-down {
  margin-left: 30px;
  margin-right: 30px;
}
a {
  text-decoration: none;
  color: rgb(38,38,38);
}
.router-link-active {
  text-decoration: none;
}
.el-breadcrumb {
  position: relative;
  left: 40px;
  top: 10px;
}
</style>