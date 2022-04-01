import request from "../utils/request"

export function getAllnovel() {
    return request({
        url: "/novel/novel",
        method: "get"
    });
}

export function getNovel(params) {
    return request({
        url: "/novel/novel",
        method: "get",
        params: params
    });
}

export function getBanner(params) {
    return request({
        url: "/novel/banner",
        method: "get",
        params: params
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