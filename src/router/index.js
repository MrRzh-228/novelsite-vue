import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
    {
        path: "/",
        name: "home",
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
            keepAlive: false
        },
        component: () => import("../views/Login.vue")
    },
    {
        path: "/register",
        name: "Register",
        meta: {
            title: "注册",
            keepAlive: false
        },
        component: () => import("../views/Register.vue")
    },
    {
        path: "/space",
        name: "space",
        meta: {
            id: 9,
            title: "个人中心",
            keepAlive: false
        },
        component: () => import("../views/Personal.vue")
    },
    {
        path: "/recharge",
        name: "recharge",
        meta: {
            id: 9,
            title: "充值中心",
            keepAlive: false
        },
        component: () => import("../views/Recharge.vue")
    },
    {
        path: "/info/:id",
        name: "bookInfo",
        meta: {
            title: "小说详情",
            keepAlive: true
        },
        component: () => import("../views/BookInfo.vue")
    },
    {
        path: "/chapter/:bookid/:index",
        name: "chapterInfo",
        meta: {
            title: "章节详情",
            keepAlive: false
        },
        component: () => import("../views/ChapterInfo.vue")
    },
    {
        path: "/xiuzhen",
        name: "xiuzhen",
        meta: {
            id: 14,
            title: "修真",
            keepAlive: false
        },
        component: () => import("../views/CategoryInfo.vue")
    },
    {
        path: "/xuanhuan",
        name: "xuanhuan",
        meta: {
            id: 13,
            title: "玄幻",
            keepAlive: false
        },
        component: () => import("../views/CategoryInfo.vue")
    },
    {
        path: "/dushi",
        name: "dushi",
        meta: {
            id: 12,
            title: "都市",
            keepAlive: false
        },
        component: () => import("../views/CategoryInfo.vue")
    },
    {
        path: "/chuanyue",
        name: "chuanyue",
        meta: {
            id: 11,
            title: "穿越",
            keepAlive: false
        },
        component: () => import("../views/CategoryInfo.vue")
    },
    {
        path: "/wangyou",
        name: "wangyou",
        meta: {
            id: 10,
            title: "网游",
            keepAlive: false
        },
        component: () => import("../views/CategoryInfo.vue")
    },
    {
        path: "/kehuan",
        name: "kehuan",
        meta: {
            id: 9,
            title: "科幻",
            keepAlive: false
        },
        component: () => import("../views/CategoryInfo.vue")
    },
    {
        path: "/write",
        name: "write",
        meta: {
            title: "作家专区",
            keepAlive: false
        },
        component: () => import("../views/Author.vue")
    },
    {
        path: "/portal/:id",
        name: "portal",
        meta: {
            title: "创作小说",
            keepAlive: false
        },
        component: () => import("../views/EditBook.vue")
    },
    {
        path: "/search",
        name: "search",
        meta: {
            title: "搜索",
            keepAlive: false
        },
        component: () => import("../views/Search.vue")
    },
];
const router = createRouter({
    history: createWebHashHistory(),
    routes
});
export default router;