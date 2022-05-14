<script setup>
import { ref, reactive, onMounted } from 'vue';
import { recharge } from "../api";
import router from '../router';
const userinfo = window.localStorage.getItem("userinfo");
const radio1 = ref('1')
const radio2 = ref('1')
const pay_url = ref('')

const init = () => {

}

const commit = () => {
    const param = {
        vip_type: radio2.value,
        pay_type: radio1.value
    }
    recharge(param)
    .then(res => {
        pay_url.value = res.alipay_url
        window.open(pay_url.value)
        ElMessageBox({
            title: '等待支付',
            message: '请在新打开的页面中完成支付',
            showCancelButton: true,
            confirmButtonText: '已完成支付',
            cancelButtonText: '关闭',
            beforeClose: (action, instance, done) => {
                if (action === 'confirm') {
                    router.push({
                        path: '/space'
                    })
                    done()
                }
                else {
                    done()
                }
            }
        })
    })
    .catch(err => console.log(err))
}

onMounted(() => {
    init();
});
</script>

<template>
  <div class="pay-layout">
    <el-container style="height: 100%;">
      <el-header height="65px">
        <div style="width: 900px; margin: 0 auto;">
          <el-row >
            <el-col :span="6">
              <router-link to="/">
                <el-image alt="logo" src="/logo/logo1_2.png" style="width: 207px; height: 65px;"/>
              </router-link>
            </el-col>
            <el-col :span="6">
                <h2 style="color: rgb(48,57,71); font-size: 24px; font-weight: 400;">充值中心</h2>
            </el-col>
          </el-row>
        </div>
      </el-header>
      <el-main>
        <div class="pay-main-layout">
          <div style="margin-bottom: 24px;">
            <h6>账号</h6>
            <p>
              <img src="/icon/user.png" style="width: 24px; height: 24px; margin-right: 8px; vertical-align: middle;">
              <span style="height: auto;">{{ userinfo }}</span>
            </p>
          </div>
          <div style="margin-bottom: 24px;">
            <h6>充值方式</h6>
            <el-radio-group v-model="radio1" size="large" class='pay-list-radio'>
              <el-radio-button label="1">
                <img src="/icon/alipay.jpg" style="width: 24px; height: 24px; margin-right: 8px; vertical-align: middle;">
                <span>支付宝</span>
              </el-radio-button>
              <el-radio-button label="2">
                <img src="/icon/weixinpay.jpg" style="width: 24px; height: 24px; margin-right: 8px; vertical-align: middle;">
                <span>微信</span>
              </el-radio-button>
            </el-radio-group>
          </div>
          <div style="margin-bottom: 14px; display: block;">
            <h6>会员类型</h6>
            <el-radio-group v-model="radio2" size="large" class='radioDiv'>
              <div><el-radio-button label="1">月度会员（￥35）</el-radio-button></div>
              <div><el-radio-button label="2">季度会员（￥90）</el-radio-button></div>
              <div><el-radio-button label="3">年度会员（￥228）</el-radio-button></div>
            </el-radio-group>
          </div>
          <div><el-button @click="commit">立即支付</el-button></div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.pay-layout {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(247,247,247);
    .el-header {
        background-color: rgb(255,255,255);
    }
}

.pay-main-layout {
  width: 800px;
  height: 500px;
  margin: 0 auto;
  padding: 48px;
  background-color: rgb(255,255,255);
  h6 {
      margin-top: 0;
      margin-bottom: 12px;
      color: rgb(166,166,166);
  }
  p {
      margin: 0;
      span {
        vertical-align: middle;
      }
  }
  .radioDiv {
      text-align: left;
      display: table;
      .el-radio-button {
          margin-bottom: 10px;
      }
      ::v-deep {
        .el-radio-button__inner {
            position: relative;
            width: 240px;
            border-style: solid;
            border-color: rgb(220,223,230);
        }
        .el-radio-button.is-active {
            .el-radio-button__inner {
                color: black;
                background-color: white !important;
                border-color: rgb(64,158,255) !important;
            }
        }
      }
  }
}
.pay-list-radio {
    .el-radio-button {
        margin-right: 35px;
    }
    ::v-deep {
      .el-radio-button__inner {
          position: relative;
          width: 150px;
          border-style: solid;
          border-color: rgb(220,223,230);
          border-left-width: 1px !important;
      }
      .el-radio-button.is-active {
          .el-radio-button__inner {
              color: black;
              background-color: white !important;
              border-color: rgb(64,158,255) !important;
          }
      }
    }
}
.el-button {
    width: 180px;
    height: 40px;
    background-color: rgb(46,157,231);
    color: white;
    font-size: 16px;
}
.el-button:hover{
    background-color: rgb(41,114,204);
}
.el-button:focus{
    background-color: rgb(41,114,204);
}
</style>