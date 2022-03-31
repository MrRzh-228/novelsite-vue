import request from "../utils/request"

export function novel() {
    return request({
        url: "/novel/novel",
        method: "get"
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