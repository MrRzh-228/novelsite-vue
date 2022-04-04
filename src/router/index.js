import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
    {
        path: "/",
        name: "Home",
        meta: {
            title: "首页",
            keepAlive: true
        },
        component: () => import("../views/Home.vue"),
    },
    {
        path: "/login",
        name: "Login",
        meta: {
            title: "登录",
            keepAlive: true
        },
        component: () => import("../views/Login.vue")
    },
    {
        path: "/register",
        name: "Register",
        meta: {
            title: "注册",
            keepAlive: true
        },
        component: () => import("../views/Register.vue")
    },
    {
        path: "/xuanhuan",
        name: "xuanhuan",
        meta: {
            title: "玄幻",
            keepAlive: true
        },
        component: () => import("../views/CategoryInfo.vue")
    },
    {
        path: "/book",
        name: "book",
        meta: {
            title: "小说",
            keepAlive: true
        },
        component: () => import("../components/BookDisplay.vue")
    },
    
];
const router = createRouter({
    history: createWebHashHistory(),
    routes
});
export default router;