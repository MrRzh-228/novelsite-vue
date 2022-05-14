<script setup>
import { reactive, ref } from 'vue';
import { useUserStore } from '../store/user';
import { storeToRefs } from 'pinia';
import { updateUserInfo } from "../api";
import { ElMessage } from 'element-plus'
import { rule } from 'postcss';
import router from '../router'

const useUser = useUserStore()
const { username, userSetting } = storeToRefs(useUser)
const settingForm = ref()
const passForm = reactive({
    pass: '',
    checkPass: ''
})

const validateEmail = (rule, value, callback) => {
    const regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (value === '') {
        callback(new Error('请输入邮箱地址'));
    } else if (regEmail.test(value)) {
        callback();
    } else {
        callback(new Error('请输入正确的邮箱格式'));
    }
}

const validatePass = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次输入新密码'));
    } else if (value !== passForm.pass) {
        callback(new Error('两次密码不一致'));
    } else {
        callback();
    }
}

const SettingFormRules = ref({
  email: [
    { validator: validateEmail, trigger: 'blur' }
  ], 
  pass: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度应在6-15个字符', trigger: 'blur' }
  ],
  checkPass: [
    { validator: validatePass, trigger: 'blur' }
  ]
})

const submit = () => {
    const params = {
        username: username.value,
        email: userSetting.value.email,
        birth_date: userSetting.value.birth_date,
    }
    console.log(params)
    updateUserInfo(params)
    .then(res => {
        console.log(res)
        ElMessage({
            showClose: false,
            offset: 30,
            message: '保存成功！',
            type: 'success',
        })
    })
    .catch(err => console.log(err))
}

const onSubmit = () => {
    settingForm.value.validate((valid) => {
        if(valid) {
            const param = {
                password: passForm.pass
            }
            updateUserInfo(param)
            .then(res => {
                ElMessage({
                    showClose: false,
                    offset: 30,
                    message: '修改成功！请重新登录',
                    type: 'success',
                })
                window.localStorage.clear()
                router.push('/login')
            })
            .catch(err => console.log(err))
        } else {
            console.log('error submit')
        }
    })
}
</script>

<template>
  <div class="user-setting">
    <el-tabs type="border-card">
        <el-tab-pane label="基本设置">
            <el-form :model="userSetting"  :rules="SettingFormRules" label-width="80px">
                <el-form-item label="昵称">
                  <el-input v-model="username" style="width: 120px;" />
                </el-form-item>
                <el-form-item label="UID">
                  <p style="margin: 0;">{{ userSetting.id }}</p>
                </el-form-item>
                <el-form-item label="手机号">
                  <p style="margin: 0;">{{ userSetting.telephone }}</p>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="userSetting.email" style="width: 180px;" />
                </el-form-item>
                <el-form-item label="生日">
                    <el-date-picker
                    v-model="userSetting.birth_date"
                    value-format="YYYY-MM-DD"
                    type="date"
                    style="width: 180px"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button @click="submit">保存</el-button>
                </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="密码设置">
            <el-form :model="passForm" ref="settingForm" :rules="SettingFormRules" label-width="80px">
                <el-form-item label="新密码" prop="pass">
                  <el-input type="password" v-model="passForm.pass" style="width: 120px;" />
                </el-form-item>
                <el-form-item label="再次输入" prop="checkPass">
                  <el-input type="password" v-model="passForm.checkPass" style="width: 120px;" />
                </el-form-item>
                <el-form-item>
                    <el-button @click="onSubmit">确认修改</el-button>
                </el-form-item>
            </el-form>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.el-button {
    width: 100px;
    height: 36px;
    background-color: rgb(191,44,36);
    color: white;
}
.el-button:hover{
        background-color: rgb(238,66,89);
    }
</style>

<style lang="less">
.user-setting 
{
    margin: 0 20px 0 20px;
    .el-tabs__nav-scroll {
        background-color: rgb(252,252,250);
    }
    .el-tabs__item {
        width: 100px;
        margin-bottom: 0px;
        color: rgb(127,127,127) !important;
    }
    .is-active {
        color: black !important;
        font-weight: 600;
    }
    .el-form-item {
        margin: 0;
        padding: 10px 0 10px 0;
    }
    .el-form-item__label {
        color: rgb(127,127,127);
    }
    .el-input__inner {
        height: 36px;
    }
}

</style>