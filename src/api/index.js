import request from "../utils/request"

export function getNovelById(id) {
    return request({
        url: "/novel/novel/" + id,
        method: "get"
    });
}

export function getNovel(param) {
    return request({
        url: "/novel/novel/",
        method: "get",
        params: param
    });
}

export function getChapterById(id) {
    return request({
        url: "/novel/chapter/" + id,
        method: "get"
    });
}

export function getChapter(param) {
    return request({
        url: "/novel/chapter/",
        method: "get",
        params: param
    });
}

export function getBanner() {
    return request({
        url: "/novel/banner/",
        method: "get"
    });
}

export function getRank(param) {
    return request({
        url: "/novel/rank/",
        method: "get",
        params: param
    });
}

export function login(param) {
    return request({
        url: "/users/login/",
        method: "post",
        data: param
    })
}

export function code(param) {
    return request({
        url: "/users/code/",
        method: "post",
        data: param
    })
}

export function register(param) {
    return request({
        url: "/users/register/",
        method: "post",
        data: param
    })
}