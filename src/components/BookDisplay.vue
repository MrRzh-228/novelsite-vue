<script setup>
import { reactive, onMounted  } from 'vue';
import { getNovelById } from "../api";

const props = defineProps({
    bookid: {
        type: String,
        default: '148'
    }
});

const book = reactive({
    name: '',
    author: '',
    cover: '',
    intro: '',
    tag1: '',
    tag2: ''
});

const init = () => {
    getNovelById(props.bookid)
    .then(res => {
        book.name = res.novel_name
        book.author = res.novel_author.writer_name
        book.cover = res.cover
        book.intro = res.intro
        if (res.status) {
            book.tag1 = '连载'
        } else { book.tag1 = '完结' }
        if (res.novel_category == 9) {
            book.tag2 = '科幻'
        } else if (res.novel_category == 10) {
            book.tag2 = '网游'
        } else if (res.novel_category == 11) {
            book.tag2 = '穿越'
        } else if (res.novel_category == 12) {
            book.tag2 = '都市'
        } else if (res.novel_category == 13) {
            book.tag2 = '玄幻'
        } else {
            book.tag2 = '修真'
        }
        console.log(book)
    })
    .catch(err => console.log(err)) 
}

onMounted(() => {
    init()
});
</script>

<template>
  <div>
      <el-row class="book-info">
          <el-col :span="8">
            <router-link to="/">
                <el-image alt="" :src=book.cover style="width: auto; height: 100px;"/>
            </router-link>
          </el-col>
          <el-col :span="16">
            <div class="book-up">
                <p>{{ book.name }}</p>
                <p>{{ book.intro }}</p>
            </div>
            <el-row class="state-box" :gutter="10" justify="space-between" >
                <el-col :span="10" style="text-align: left;">
                    <p>{{ book.author }}</p>
                </el-col>
                <el-col :span="7">
                    <el-tag type="info">{{ book.tag1 }}</el-tag>
                </el-col>
                <el-col :span="7">
                    <el-tag type="danger">{{ book.tag2 }}</el-tag>
                </el-col>
            </el-row>
          </el-col>
      </el-row>
  </div>
</template>

<style scoped>
.book-info {
    width: 300px;
    height: 100px;
}
.book-up {
    margin: 0;
}
.book-up p:nth-child(1) {
    margin: 0;
    font-weight: bloder;
    font-size: large;
    color: #000000;
}
.book-up p:nth-child(2) {
    margin: 5px 0 0;
    font-weight: lighter;
    font-size: small;

    overflow:hidden;
    text-overflow:ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: #000000;
}
.state-box {
    position: absolute;
    bottom: 5px;
}
.state-box p {
    margin: 3px auto;
    
    font-weight: lighter;
    font-size: small;
    color: rgb(166,166,166);
}
</style>
    