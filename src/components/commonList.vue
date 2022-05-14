<script setup>
import { reactive, ref, onMounted } from 'vue';
import { getRecent, getBookshelf, getComment } from "../api";

const props = defineProps({
    msg: {
        type: String,
        default: 'recent'
    }
});

const tableData = reactive([])

const init = () => {
  if(props.msg == 'recent') {
    getRecent()
    .then(res => {
      for(var i=0;i<res.length;i++) {
        const obj = {
          chapterName: res[i].chapter.chapter_name,
          novelName: res[i].chapter.chapter_novel,
          author: res[i].chapter.author,
          updateTime: res[i].add_time
        }
        tableData.push(obj)
      }
    })
    .catch(err => console.log(err))
  }
  else if(props.msg == 'bookshelf') {
    getBookshelf()
    .then(res => {
      for(var i=0;i<res.length;i++) {
        const obj = {
          novelName: res[i].novel.novel_name,
          author: res[i].novel.novel_author,
          updateTime: res[i].novel.update_time
        }
        tableData.push(obj)
      }
    })
    .catch(err => console.log(err))
  }
  else {
    getComment()
    .then(res => {
      for(var i=0;i<res.length;i++) {
        const obj = {
          content: res[i].comment_text,
          commontTime: res[i].comment_date,
          commentRegion: res[i].novel
        }
        tableData.push(obj)
      }
    })
    .catch(err => console.log(err))
  }
}

onMounted(() => {
    init();
});

</script>

<template>
  <div v-if="msg == 'recent'" style="margin-left: 20px;">
    <el-card header="最近阅读">
      <el-table :data="tableData" empty-text="目前暂无阅读记录">
        <el-table-column prop="chapterName" label="章节" show-overflow-tooltip="true" />
        <el-table-column prop="novelName" label="书名" show-overflow-tooltip="true" />
        <el-table-column prop="updateTime" label="阅读时间" />
        <el-table-column prop="author" label="作者" />
      </el-table>
    </el-card>
  </div>

  <div v-if="msg == 'bookshelf'" style="margin-left: 20px;">
    <el-card header="我的书架">
      <el-table :data="tableData" empty-text="目前暂为收藏任何小说">
        <el-table-column type="selection" width="30" />
        <el-table-column prop="novelName" label="书名" show-overflow-tooltip="true" />
        <el-table-column prop="updateTime" label="更新时间" />
        <el-table-column prop="author" label="作者" />
      </el-table>
    </el-card>
  </div>

    <div v-if="msg == 'comment'" style="margin-left: 20px;">
    <el-card header="我的书评">
      <el-table :data="tableData" empty-text="目前您暂未发表评论">
        <el-table-column type="selection" width="30" />
        <el-table-column prop="content" label="书评" show-overflow-tooltip="true" />
        <el-table-column prop="commontTime" label="发表时间" />
        <el-table-column prop="commentRegion" label="所在书评区" show-overflow-tooltip="true" />
      </el-table>
    </el-card>
  </div>
</template>

<style scoped>

</style>