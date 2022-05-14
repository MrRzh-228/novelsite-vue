<script setup>
import { reactive, ref, onMounted } from 'vue';
import { getVoteMonthTicket, getVoteRecommendTicket } from '../api'


const monTableData = reactive([])
const recTableData = reactive([])

const init = () => {
    getVoteMonthTicket()
    .then(res => {
        for (var i=0; i<res.results.length; i++) {
            const obj = {
                time: res.results[i].vote_time,
                number: res.results[i].vote_num,
                novel: res.results[i].novel
            }
            monTableData.push(obj)
        }
    })
    .catch(err => console.log(err))

    getVoteRecommendTicket()
    .then(res => {
        for (var i=0; i<res.results.length; i++) {
            const obj = {
                time: res.results[i].vote_time,
                number: res.results[i].vote_num,
                novel: res.results[i].novel
            }
            recTableData.push(obj)
        }
    })
    .catch(err => console.log(err))
}

onMounted(() => {
    init();
});
</script>

<template>
  <div class="user-setting ">
      <el-tabs type="border-card">
          <el-tab-pane label="投月票记录">
              <el-table :data="monTableData" empty-text="目前暂无月票投票记录">
                <el-table-column prop="time" label="投票时间" />
                <el-table-column prop="number" label="票数" />
                <el-table-column prop="novel" label="投票小说" />
              </el-table>
          </el-tab-pane>
          <el-tab-pane label="投推荐票记录">
              <el-table :data="recTableData" empty-text="目前暂无推荐票投票记录">
                <el-table-column prop="time" label="投票时间" />
                <el-table-column prop="number" label="票数" />
                <el-table-column prop="novel" label="投票小说" />
              </el-table>
          </el-tab-pane>
      </el-tabs>
  </div>
</template>

<style scoped>

</style>
<style>

</style>