<script setup>
import { ref, reactive, onMounted } from 'vue';
import { getNovel } from "../api";

const props = defineProps({
  msg: {
      type: String,
      default: true
  }
});
const param = reactive({
    page: 1,
    status: '',
    is_free: ''
})

const bookList = reactive([])
const pageInfo = reactive({
    count: 0,
    pagenum: 1
})

const getBookList = (val) => {
    if (props.msg == 'all') {
        param.page = val
        param.status = ''
        param.is_free = ''
    } else if (props.msg == 'end') {
        param.page = val
        param.status = false
        param.is_free = ''
    } else if (props.msg == 'free') {
        param.page = val
        param.status = ''
        param.is_free = true
    }
    getNovel(param)
    .then(res => {
        pageInfo.count = res.count
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
        // console.log(res)
    })
    .catch(err => console.log(err))
}

const init = () => {
    getBookList(1)
}

const handleCurrentChange = (val) => {
    
    pageInfo.pagenum = val
    console.log(pageInfo.pagenum)
    getBookList(pageInfo.pagenum)
}

onMounted(() => {
    init()
})
</script>

<template>
  <div class="showBook-layout">
    <ul style="padding: 0;list-style-type: none;">
      <li v-for="(item, index) in Math.ceil(bookList.length / 2)">
        <el-row >
          <el-col :span="12" v-for="itemI in bookList.slice(index*2,item*2)">
            <div>
              <el-row>
                <el-col :span="8">
                  <router-link :to="`/info/${itemI.id}`">
                    <el-image :src=itemI.cover style="width: 102px; height: 136px;"/>
                  </router-link>
                </el-col>
                <el-col :span="14">
                  <div class="showBook-layout-up">
                    <router-link :to="`/info/${itemI.id}`"><h3>{{ itemI.name }}</h3></router-link>
                    <p class="category">
                      <el-row class="state-box">
                        <el-col :span="2">
                          <a href="">{{ itemI.category }}</a>
                        </el-col>
                        <el-col :span="1"><el-divider direction="vertical" /></el-col>
                        <el-col :span="2">
                          <a href="">{{ itemI.status }}</a>
                        </el-col>
                      </el-row>
                    </p>
                    <p class="intro">{{ itemI.intro }}</p>
                    <div class="author">
                      <img src="/icon/small.png" >
                      <a href="" >{{ itemI.author }}</a>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-divider />
      </li>
    </ul>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="pageInfo.pagenum"
      :page-size="20"
      :total="pageInfo.count"
      layout="prev, pager, next"
    />
  </div>
</template>

<style lang="scss" scoped>
.showBook-layout-up {
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
    color: black;
    text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
</style>