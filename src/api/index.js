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
    });
}

export function code(param) {
    return request({
        url: "/users/code/",
        method: "post",
        data: param
    });
}

export function register(param) {
    return request({
        url: "/users/register/",
        method: "post",
        data: param
    });
}

export function getUserInfo() {
    return request({
        url: "/users/update/",
        method: "get"
    });
}

export function updateUserInfo(param) {
    return request({
        url: "/users/update/",
        method: "patch",
        data: param
    });
}

export function voteMonthTicket(param) {
    return request({
        url: "/user-action/vote-mon/",
        method: "post",
        data: param
    });
}

export function getVoteMonthTicket(parm) {
    return request({
        url: "/user-action/vote-mon/",
        method: "get"
    });
}

export function voteRecommendTicket(param) {
    return request({
        url: "/user-action/vote-recom/",
        method: "post",
        data: param
    });
}

export function getVoteRecommendTicket(param) {
    return request({
        url: "/user-action/vote-recom/",
        method: "get"
    });
}

export function getRecent() {
    return request({
        url: "/user-action/recent/",
        method: "get"
    });
}

export function getComment() {
    return request({
        url: "/user-action/comment/",
        method: "get"
    });
}

export function addBookshelf(param) {
    return request({
        url: "/user-action/bookshelf/",
        method: "post",
        data: param
    });
}

export function getBookshelf() {
    return request({
        url: "/user-action/bookshelf/",
        method: "get"
    });
}

export function recharge(param) {
    return request({
        url: "/user-action/recharge/",
        method: "post",
        data: param
    });
}

export function getAuthorInfo() {
    return request({
        url: "/users/write/",
        method: "get"
    });
}

export function getOwenrBook(param) {
    return request({
        url: "/novel/novel/",
        method: "get",
        params: param
    });
}

export function createBook(param) {
    return request({
        url: "/novel/novel/",
        method: "post",
        data: param
    });
}