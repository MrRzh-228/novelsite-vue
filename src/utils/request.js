import axios from "axios";
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
            config.headers.common.Authorization = token;
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
                    ElMessage({
                        message: '用户名或密码错误',
                        type: 'error',
                    });
                    // router.replace({
                    //     path: '/login'
                    // });
                    break;
            }
        }
        return Promise.reject(error.response);
    }
);
export default service;