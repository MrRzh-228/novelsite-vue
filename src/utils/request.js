import axios from "axios";
import { ElMessage } from "element-plus";
import router from "../router"
let baseURL = "http://127.0.0.1:8000/api";
const service = axios.create({
    baseURL,
    timeout: 8000
});

service.interceptors.request.use(
    config => {
        const token = window.localStorage.getItem("accessToken");
        if (token) {
            config.headers.common.Authorization = 'Bearer '+ token;
        }
        return config
    },
    error => Promise.reject(error)
);

service.interceptors.response.use(
    response => {
        const res = response.data;

        if (response.status = 200) {
            return Promise.resolve(res);
        } else if (response.status = 201) {
            return Promise.resolve(res);
        } else {
            return Promise.reject(res);
        }
    },
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                case 400:
                    if (error.response.data.username) {
                        ElMessage({
                            message: error.response.data.username[0],
                            type: 'error',
                        });
                    } else if (error.response.data.telephone) {
                        ElMessage({
                            message: '该手机号已被注册',
                            type: 'error',
                        });
                    } else if (error.response.data.code) {
                        ElMessage({
                            message: error.response.data.code[0],
                            type: 'error',
                        });
                    } else {
                        ElMessage.error(error.response.data[0])
                    }
                    break;

                case 401:
                    const refreshToken = window.localStorage.getItem("refreshToken");
                    if(refreshToken) {
                        try {
                            const res = axios({
                                url: 'http://127.0.0.1:8000/api/users/login/refresh/',
                                method: 'POST',
                                header: {
                                    Authorization: 'Bearer '+ refreshToken
                                }
                            })
                            console.log(res)
                            localStorage.setItem("accessToken", res.data.access);
                        }
                        catch (error) {
                            window.localStorage.clear()
                            router.push('/login')
                            return Promise.reject(error)
                        }
                    }
                    else  {
                        window.localStorage.clear()
                        router.push('/login')
                        return Promise.reject(error)
                    }
                    break;
                case 403:
                    ElMessage({
                        message: '您还不是vip用户，请先充值',
                        type: 'error',
                    });
                    router.replace('/recharge')
                    break;
            }
        }
        return Promise.reject(error.response);
    }
);
export default service;