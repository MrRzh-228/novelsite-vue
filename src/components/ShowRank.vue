<script setup>
import Rank from './Rank.vue';
</script>

<template>
  <div class="show-rank-layout">
    <h3 class="lang">人气榜单</h3>
    <el-divider />
    <el-row justify="space-between">
      <el-col :span="10">
        <h3 class="wrap-title-lang">推荐榜</h3>
        <el-divider style="margin: 10px 0 10px 0;" />
        <Rank :msg="{category: '' ,rank_type:'rcommend'}" />
      </el-col>
      <el-col :span="10">
        <h3 class="wrap-title-lang">月票榜</h3>
        <el-divider style="margin: 10px 0 10px 0;" />
        <Rank :msg="{category: '' ,rank_type:'monthly'}" />
      </el-col>
    </el-row>

    <el-row justify="space-between">
      <el-col :span="10">
        <h3 class="wrap-title-lang">收藏榜</h3>
        <el-divider style="margin: 10px 0 10px 0;" />
        <Rank :msg="{category: '' ,rank_type:'collect'}" />
      </el-col>
      <el-col :span="10">
        <h3 class="wrap-title-lang">免费榜</h3>
        <el-divider style="margin: 10px 0 10px 0;" />
        <Rank :msg="{category: '' ,rank_type:'free'}" />
      </el-col>
    </el-row>

  </div>
</template>

<style scoped>
.show-rank-layout {
    margin: 0 20px 0 20px;
}
.lang {
    margin-bottom: 0;
    font-size: 26px;
    font-weight: 400;
    text-align: left;
    line-height: 26px;
    color: rgb(38, 38, 38)
}
.wrap-title-lang {
    margin: 0;
    padding-left: 12px;
    font-size: 18px;
    font-weight: 400;
    text-align: left;
    line-height: 25px;
}
</style>