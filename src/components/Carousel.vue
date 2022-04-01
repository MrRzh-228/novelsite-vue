<script setup>
import { onMounted  } from 'vue';
import { getBanner } from "../api"

const book = []

const init = () => {
  getBanner()
  .then(res => {
    for(var i=0;i<res.length;i++) {
      let obj = {
        id: res[i].id,
        title: res[i].novel.novel_name,
        url: res[i].image,
        index: res[i].index
      };
      book.push(obj);
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
  <el-carousel :interval="5000" arrow="always">
    <el-carousel-item v-for="item in book" :key="item.id" :label="item.title">
      <el-image :alt="item.title" :src="item.url" />
    </el-carousel-item>
  </el-carousel>
</template>

<style scoped>
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #e6d9d3;
}
</style>
