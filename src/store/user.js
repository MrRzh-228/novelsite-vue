import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('UserStore', {
    // 定义state
    state: () => {
      return { 
        username: '',
        vip_type: 0,
        vip_days: 0,
        monthly_ticket: 0,
        recommend_ticket: 0,
        accessToken: '',
        refreshToken: '',
        userSetting: {
            id: '',
            email: '',
            telephone: '',
            birth_date: ''
        }
      }
    },
    // 定义action
    actions: {
        updateUsername(name) {
            this.username = name
        },
        updateVipType(vipType) {
            this.vip_type = vipType
        },
        updateVipDays(vipDays) {
            this.vip_days = vipDays
        },
        updateMonthlyTicket(MonTicket) {
            this.monthly_ticket = MonTicket
        },
        updateRecommendTicket(RecomTicket) {
            this.recommend_ticket = RecomTicket
        },
        updateAccessToken(AccessToken) {
            this.accessToken = AccessToken
        },
        updateRefreshToken(RefreshToken) {
            this.refreshToken = RefreshToken
        },
        updateUserSetting(obj) {
            this.userSetting = obj
        },
    },
    // 定义getters

    // 开启数据缓存
    persist: {
        enabled: true,
        strategies: [
            {
              storage: localStorage,
              paths: ['username', 'vip_type', 'vip_days', 'monthly_ticket', 'recommend_ticket']
            }
        ]
    }
});