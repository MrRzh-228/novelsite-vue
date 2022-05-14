<script setup>
import { ref, reactive, onMounted } from 'vue';

const props = defineProps({
  msg: {
      type: Array,
      default: []
  }
});

const emit = defineEmits(['createBook'])

const createBook = () => {
  emit('createBook', 'second')
}

</script>

<template>
  <div style="margin: 0 20px 0 20px;">
    <el-card :body-style="{ padding: '20px' }" style="margin-bottom: 30px;">
      <h4>个人信息</h4>
      <el-divider />
      <el-row>
        <el-col :span="3">
          <el-avatar :size="75" src="/images/writer.png" />
        </el-col>
        <el-col :span="9">
          <h3 style="font-size: 20px; font-weight: 600;">{{ msg[0].name }}</h3>
        </el-col>
        <el-col :span="4" class="writer-col">
          <span>
            <h3>{{ msg[0].creative_days }}</h3>
            <p>创作天数</p>
          </span>
        </el-col>
        <el-col :span="4" class="writer-col">
          <span>
            <h3>2.3w</h3>
            <p>累计字数</p>
          </span>
        </el-col>
        <el-col :span="4" class="writer-col">
          <span>
            <h3>{{ msg[0].work_num }}</h3>
            <p>作品数量</p>
          </span>
        </el-col>
      </el-row>
    </el-card>
    <el-card :body-style="{ padding: '20px' }" style="margin-bottom: 30px;">
      <el-row justify="space-between">
        <el-col :span="4">
          <h4>作品管理</h4>
        </el-col>
        <el-col :span="4">
          <el-button type="text" @click="createBook" style="padding-top: 0;">新建作品</el-button>
        </el-col>
      </el-row>
      <el-divider style="margin-top: 3px;" />
      <el-row>
        <el-col :span="4">
          <router-link :to="`/info/${bookid}`">
            <el-image alt="" :src="msg[1].cover" style="width: auto; height: 144px;"/>
          </router-link>
        </el-col>
        <el-col :span="8">
          <div class="book-info">
            <h3>{{ msg[1].name }}</h3>
            <p>{{ msg[1].name }}</p>
            <p style="position: absolute; bottom: 0px;">收藏 {{ msg[1].col_num }}</p>
          </div>
        </el-col>
        <el-col :span="6" :offset="5">
          <div style="position: absolute; bottom: 0px;">
            <el-button>作品管理</el-button>
            <el-button type="primary">去写作</el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-card :body-style="{ padding: '20px' }" style="margin-bottom: 30px;">
      <h4>征文活动</h4>
      <el-divider />
      <el-row>
        <el-col :span="8" class="zhengwen-col">
          <el-image src="/images/zhengwen1.jpg" />
          <h4>“喜迎二十大 青春著华章”主题征文活动</h4>
        </el-col>
        <el-col :span="8" class="zhengwen-col">
          <el-image src="/images/zhengwen2.jpg" />
          <h4>第二届Webnovel·出海作品征文大赛</h4>
        </el-col>
        <el-col :span="8" class="zhengwen-col">
          <el-image src="/images/zhengwen4.jpg" />
          <h4>第六届现实题材网络文学征文大赛</h4>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.writer-col {
    span {
        text-align: center;
    }
    h3 {
        font-weight: 400;
        margin: 10px 0 10px;
    }
    p {
        margin-top: 0px;
        color: rgba(21, 26, 48, 0.5);
    }
}
.book-info {
    height: 100%;
    h3 {
        font-size: 20px;
        font-weight: 600;
        margin: 0;
    }
    p {
        margin-top: 10px;
        font-size: 14px;
        color: rgba(21, 26, 48, 0.5);
    }
}
h4 {
    margin-top: 0;
}
.zhengwen-col {
    .el-image {
       width: 230px;
       height: auto; 
    }
    h4 {
        font-size: 16;
        font-weight: 600;
        white-space: nowrap;
        width: 95%;
        overflow: hidden;
        text-overflow:ellipsis;
    }
}
</style>