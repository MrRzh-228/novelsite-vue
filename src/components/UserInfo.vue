<script setup>
import { reactive, ref, onMounted } from 'vue';
import { getUserInfo } from "../api";
import { useUserStore } from '../store/user';
import { storeToRefs } from 'pinia';
import { Money, Wallet, Collection } from '@element-plus/icons-vue'

const useUser = useUserStore()
const { username, vip_type, vip_days, monthly_ticket, recommend_ticket } = storeToRefs(useUser)

// const init = () => {
//   getUserInfo()
//   .then(res => {
//     useUser.updateUsername(res.username)
//     useUser.updateVipType(res.vip_type)
//     useUser.updateMonthlyTicket(res.monthly_ticket)
//     useUser.updateRecommendTicket(res.recommend_ticket)
//     // useUser.$subscribe((mutation, state) => {
//     //   sessionStorage.setItem('UserStore', JSON.stringify(state))
//     // })
//     console.log(res)
//   })
//   .catch(error => console.log(error))
// }

// onMounted(() => {
//     init();
// });
</script>

<template>
  <div style="margin: 0 20px 0 20px;">
    <el-card :body-style="{ padding: '0px' }" style="margin-bottom: 30px;">
        <img style="width: 770px; height: 110px;" src="/images/bg_book.png"/>
        <div style="padding: 14px">
          <span style="font-size: 20px; font-weight: 600;">欢迎，书友 {{ username }}</span>
        </div>
    </el-card>
    <el-row>
      <el-col :span="8">
        <el-card :body-style="{ padding: '20px' }">
          <span class="home-msg-title">
            <el-icon style="color: orange;"><Money /></el-icon>
            <span>会员中心</span>
          </span>
          <p class="home-msg-data">
            <router-link to="/" v-if="vip_type==0">
              您还不是会员
            </router-link>
            <router-link to="/" v-else>
              <a>{{ vip_days }}</a>后到期
            </router-link>
          </p>
          <el-divider style="margin: 0 0 14px 0;"/>
          <router-link to="/recharge">充值</router-link>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card :body-style="{ padding: '20px' }">
          <span class="home-msg-title">
            <el-icon style="color: rgb(30,207,167);"><Wallet /></el-icon>
            <span>我的票夹</span>
          </span>
          <p class="home-msg-data" style="height: 26px;">
            <router-link to="/">
              <el-row>
                <el-col :span="6"><a>{{ monthly_ticket }}</a>月票</el-col>
                <el-col :span="1"></el-col>
                <el-col :span="10"><a>{{ recommend_ticket }}</a>推荐票</el-col>
              </el-row>
            </router-link>
          </p>
          <el-divider style="margin: 0 0 14px 0;"/>
          <router-link to="/">立即查看</router-link>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card :body-style="{ padding: '20px' }">
          <span class="home-msg-title">
            <el-icon style="color: rgb(17,137,228);"><Collection /></el-icon>
            <span>我的书架</span>
          </span>
          <p class="home-msg-data">
            <router-link to="/">
              <a>{{ recommend_ticket }}</a>本藏书
            </router-link>
          </p>
          <el-divider style="margin: 0 0 14px 0;"/>
          <router-link to="/">立即查看</router-link>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="less" scoped>
.el-icon {
    vertical-align: middle;
}
.home-msg-title span {
    vertical-align: middle;
    margin-left: 8px;
    font-size: 14px;
    font-weight: 700;
}
.home-msg-data {
  font-size: 14px;
  a {
    color: black;
    margin-right: 6px;
    text-decoration: none;
    a {
      font-size: 20px;
      font-weight: 600;
    }
  }
}
a {
  color: rgb(63,88,149);
  font-size: 14px;
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
</style>