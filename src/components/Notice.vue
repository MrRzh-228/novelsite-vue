<script setup>

</script>

<template>
  <div class="notice-box">
    <div class="edit-rec">
        <h3 class="h3">编辑力荐</h3>
        <p>乱世将至，九帝一圣必降临世间</p>
        <h2>
            <p>
            <el-link type="primary">《宗主之女想害我》</el-link>
            <el-divider direction="vertical" />
            <el-link type="info">直死</el-link>
            </p>
        </h2>
    </div>
    <div>
      <el-divider />
    </div>
    <div class="dynamic-list">
        <h3 class="h3">频道动态</h3>
        <div>
            <ul style="padding: 0;">
                <li>
                    <el-link :underline="false" href="https://acts.yuewen.com/2021/20210302/index.html">「资讯」优秀网络文艺专栏</el-link>
                </li>
                <li>
                    <el-link :underline="false" href="https://acts.qidian.com/2021/210525/index.html">「资讯」第六届现实征文大赛</el-link>
                </li>
                <li>
                    <el-link :underline="false" href="https://acts.qidian.com/2021/20210423/index.html">「资讯」“百年风华”专栏上线</el-link>
                </li>
                <li>
                    <el-link :underline="false" href="https://www.qidian.com/news/detail/068893553">「公告」玄幻王者征文获奖名单</el-link>
                </li>
            </ul>
        </div>
    </div>
  </div>
</template>

<style scoped>
.notice-box {
    height: 450px;
    background-color: rgb(247,246,242);
    padding-left: 10px;
    padding-right: 10px;
}
.edit-rec {
    padding-top: 25px;
}
.edit-rec .h3 {
    text-align: center;
    width: 80px;
    background-color: rgb(191, 44, 36);
    color: white;
    margin: 0;
}
.dynamic-list ul li{
    list-style:none;
    padding: 0;
    margin: 0;
}
.dynamic-list .h3 {
    text-align: center;
    width: 80px;
    background-color: rgb(230, 114, 37);
    color: white;    
}

</style>