<script setup>
import { reactive, onMounted  } from 'vue';
import { getNovel } from "../api";
import Carousel from '../components/Carousel.vue';

const props = defineProps({
    category: {
        type: Number,
        default: ''
    }
});

const book = reactive([]);

const init = () => {
    const param = {
        novel_category: props.category
    }
    getNovel(param)
    .then(res => {
        for(var i=0;i<4;i++) {
        const obj = {
            id: res.results[0].id,
            title: res.results[i].novel_name,
            cover: res.results[i].cover
        };
        book.push(obj);
        }
        console.log(res)
    })
    .catch(err => console.log(err))
};

onMounted(() => {
    init()
});
</script>

<template>
  <div style="background-color: rgb(247,246,242);height: 450px;">
    <div>
      <el-carousel :interval="4000" type="card" height="180px" style="text-align: center;">
        <span>
          <el-carousel-item v-for="item in book" :key="item.id" >
              <el-image :alt="item.title" :src="item.cover" style="width: 160px; height: auto; " />
          </el-carousel-item>
        </span>
      </el-carousel>
    </div>
    <div>
      <el-divider />
    </div>
    <div>
      <el-row :gutter="10" style="width: 100%; margin: 0;">
        <el-col
          v-for="item in book"
          :key="item.id"
          :span="6"
        >
          <el-card :body-style="{ padding: '0px' }">
            <img class="image" :src="item.cover" style="height: 100%;"/>
            <div style="padding: 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-align: center;">
              <span>{{ item.title }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>    
    </div>
  </div>
</template>

<style scoped>

.image {
  width: 100%;
  display: block;
}
</style>