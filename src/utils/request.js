import axios from "axios";
let baseURL = "http://127.0.0.1:8000/api";
const service = axios.create({
    baseURL,
    timeout: 5000
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

        if (response.status != 200) {
            return Promise.reject(new Error(res.message || "Error"));
        } else {
            return res;
        }
    },
    error => {
        console.log("返回错误");
        return Promise.reject(error);
    }
);
export default service;