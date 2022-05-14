<script setup>
import { ref, onMounted } from 'vue';
import { getUserInfo } from "../api";
import { useUserStore } from '../store/user';
import { storeToRefs } from 'pinia';
import UserInfo from '../components/UserInfo.vue';
import UserSetting from '../components/UserSetting.vue';
import commonTable from '../components/commonTable.vue';
import commonList from '../components/commonList.vue';

import { HomeFilled, Collection, Bell, ArrowDown, Wallet, Comment, EditPen, Setting } from '@element-plus/icons-vue'

const userinfo = window.localStorage.getItem("userinfo");
const showHome = ref(true);
const showBookshelf = ref(false);
const showMessage = ref(false);

const useUser = useUserStore();
const { username, vip_type, monthly_ticket, recommend_ticket, userSetting } = storeToRefs(useUser)

const init = () => {
  getUserInfo()
  .then(res => {
      useUser.updateUsername(res.username)
      useUser.updateVipType(res.vip_type)
      useUser.updateVipDays(res.vip_days)
      useUser.updateMonthlyTicket(res.monthly_ticket)
      useUser.updateRecommendTicket(res.recommend_ticket)
      useUser.updateUserSetting({
          id: res.id,
          email: res.email,
          telephone: res.telephone,
          birth_date: res.birth_date
      })
    // useUser.$subscribe((mutation, state) => {
    //   sessionStorage.setItem('UserStore', JSON.stringify(state))
    // })
  })
  .catch(error => console.log(error))
}

onMounted(() => {
    init();
});
</script>

<template>
  <div class="personal-layout">
    <el-container style="height: 100%;">
      <el-header height="70px">
          <div class="personal-header" style="width: 990px; margin: 0 auto;">
            <el-row>
                <el-col :span="6">
                    <router-link to="/space">
                        <el-image alt="logo" src="/logo/logo1_1.png" style="width: 207; height: 65px;"/>
                    </router-link>
                </el-col>
                <el-col :span="3">
                    <el-button type="text" :icon="HomeFilled" @click="showHome=true;showBookshelf=false">我的首页</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="text" :icon="Collection" @click="showHome=false;showBookshelf=true">我的书架</el-button> 
                </el-col>
                <el-col :span="3">
                    <el-button type="text" :icon="Bell">消息中心</el-button> 
                </el-col>
                <el-col :span="3">
                    <router-link to="/"><el-button type="text" style="font-size: 14px;">首页</el-button></router-link>
                </el-col>
                <el-col :span="6">
                    <el-dropdown style="position: absolute; top: 24px;">
                        <span style="font-size: 14px; color: white;">
                            {{ userinfo }}
                            <el-icon>
                                <arrow-down />
                            </el-icon>
                        </span>
                        <template #dropdown>
                        <el-dropdown-menu>
                            <router-link to="/recharge"><el-dropdown-item>充值</el-dropdown-item></router-link>
                            <el-dropdown-item>个人设置</el-dropdown-item>
                            <el-dropdown-item>退出</el-dropdown-item>
                        </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </el-col>
            </el-row>
          </div>
      </el-header>
      <el-main style="padding-top: 40px;">
          <div class="personal-main" style="width: 990px; margin: 0 auto;">
            <el-tabs v-if="showHome" tab-position="left" :stretch="true" class="user-tabs" >
                <el-tab-pane>
                    <template #label>
                        <span class="user-tabs-label">
                            <el-icon><HomeFilled /></el-icon>
                            <span>我的首页</span>
                        </span>
                    </template>
                    <UserInfo />
                </el-tab-pane>
                <el-tab-pane>
                    <template #label>
                        <span class="user-tabs-label">
                            <el-icon><Wallet /></el-icon>
                            <span>我的票夹</span>
                        </span>
                    </template>
                    <h2 class="title">
                        我的票夹
                        <span style="font-size: 14px;font-weight: 0;">最多显示最近 10 次投票纪录</span>
                    </h2>
                    <commonTable />
                </el-tab-pane>
                <el-tab-pane>
                    <template #label>
                        <span class="user-tabs-label">
                            <el-icon><Comment /></el-icon>
                            <span>我的书评</span>
                        </span>
                    </template>
                    <commonList msg='comment' />
                </el-tab-pane>
                <el-tab-pane>
                    <template #label>
                        <span class="user-tabs-label">
                            <el-icon><EditPen /></el-icon>
                            <router-link to="/write"><span>作家专区</span></router-link>
                        </span>
                    </template>
                    <h2 class="title">作家专区</h2>
                </el-tab-pane>
                <el-tab-pane>
                    <template #label>
                        <span class="user-tabs-label">
                            <el-icon><Setting /></el-icon>
                            <span>个人设置</span>
                        </span>
                    </template>
                    <h2 class="title">个人设置</h2>
                    <UserSetting />
                </el-tab-pane>
            </el-tabs>
            <el-tabs v-if="showBookshelf" tab-position="left" :stretch="true" class="user-tabs" >
                <el-tab-pane>
                    <template #label>
                        <span class="user-tabs-label">
                            <el-icon><HomeFilled /></el-icon>
                            <span>最近阅读</span>
                        </span>
                    </template>
                    <!-- <h2 class="title">
                        最近阅读
                        <span style="font-size: 14px;font-weight: 0;">最多显示最近阅读的 10 本书</span>
                    </h2> -->
                    <commonList msg='recent' />
                </el-tab-pane>
                <el-tab-pane>
                    <template #label>
                        <span class="user-tabs-label">
                            <el-icon><Wallet /></el-icon>
                            <span>我的书架</span>
                        </span>
                    </template>
                    <!-- <h2 class="title">
                        我的书架
                        <span style="font-size: 14px;font-weight: 0;">共 n 本书籍</span>
                    </h2> -->
                    <commonList msg='bookshelf' />
                </el-tab-pane>
            </el-tabs>
          </div>
      </el-main>
      <!-- <el-footer>
          <div style="width: 990px; margin: 0 auto;">
            Footer
          </div>
      </el-footer> -->
    </el-container>
  </div>
</template>

<style lang="less" scoped>
.personal-layout {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(247,246,242);
    .el-header {
        background-color: rgb(62,61,67);
    }
}
.personal-header {
    .el-button {
        width: 100%;
        height: 100%;
        background-color: rgb(62,61,67);
        color: white;
        font-size: 16px;
    }
    .el-button:hover{
        background-color: rgb(0,0,0);
    }
    .el-button:focus{
        background-color: rgb(238,66,89);
    }
}
.user-tabs .user-tabs-label {
    .el-icon {
        vertical-align: middle;
    }
    font-size: 14px;
    line-height: 36px;
    position: absolute;
    left: 20px;
}
.user-tabs .user-tabs-label span{
    vertical-align: middle;
    margin-left: 8px;
}

a {
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
</style>

<style>
.el-tabs__item {
    text-align: center;
    width: 170px !important;
    margin-bottom: 20px;
    color: black !important;
}
.is-active {
    background-color: rgb(255,255,255) !important;
    color: red !important;
}
.title {
    margin: 0 0 20px 20px;
    font-size: 24px;
    font-weight: 400;
}
</style>