<script>
import axios from "axios"
import { novel } from "../api"

  export default {
    name: 'Carousel',
    data() {
      return {
        items: [
          {
            id: 1,
            title: '李治你别怂',
            url: '/public/images/1.jpg'
          },
          {
            id: 2,
            title: '我世袭狱卒',
            url: '/public/images/2.jpg'
          },
          {
            id: 3,
            title: '我世袭狱卒',
            url: '/public/images/3.jpg'
          },
          {
            id: 4,
            title: '美综大枭雄',
            url: '/public/images/4.jpg'
          }
        ],
        info: '',
      }
    },
    mounted() {
      novel().then(res => console.log(res)).catch(err => console.log(err))
    },
  }
</script>



<template>
  <el-carousel :interval="5000" arrow="always">
    <el-carousel-item v-for="item in items" :key="item" :label="item.title">
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
