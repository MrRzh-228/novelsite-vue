<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getNovel } from "../api";

const bookList = reactive([]);

const init = () => {
  getNovel()
  .then(res => {
    for(var i=4;i<10;i++) {
      const obj = {
        id: res.results[i].id,
        name: res.results[i].novel_name,
        cover: res.results[i].cover,
        intro: res.results[i].intro,
        collect: res.results[i].col_num
      };
      bookList.push(obj); 
    }    
    console.log(bookList)
  })
  .catch(err => console.log(err))
}

onMounted(() => {
    init()
})
</script>

<template>
    <ul style="padding: 0; list-style-type: none; height: 567px; overflow: auto;" >
        <li v-for="(item, index) in Math.ceil(bookList.length / 2)">
        <el-card class="book-card">
            <el-row justify="space-around" >
                <el-col :span="12" v-for="itemI in bookList.slice(index*2,item*2)">
                    <router-link :to="`/info/${itemI.id}`">
                        <h3 class="name">{{ itemI.name }}</h3>
                    </router-link>
                    <p class="collect">{{ itemI.collect }}人在追</p>
                    <p class="intro">{{ itemI.intro }}</p>
                </el-col>
            </el-row>
        </el-card>
        </li>
    </ul>
    <!-- <el-card >
      {{ bookList[1].name }}
    </el-card> -->
</template>

<style lang="scss" scoped>
h3 {
    margin: 0;
}
ul {
    margin: 0;
}
.name {
    font-size: 18px;
    font-weight: 400;
    text-align: left;
    color: rgb(26, 26, 26);
    text-decoration-color: rgb(26,26,26);
    text-decoration-style: solid
}
.collect {
    font-size: 14px;
    vertical-align: middle;
    color: rgb(191, 44, 36);
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
a {
    color: black;
    text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
</style>
<style lang="scss">
.book-card {
    .el-card__body {
        padding: 15px!important;
    }
}

</style>