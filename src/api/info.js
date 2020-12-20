import request from "@/api/request.js";
/**
 * 列表
 */

/**
 * 新增
 */

/**
 * 编辑
 */

/**
 * 删除
 */

/**
 * 一级分类-添加
 */
export function AddFristCategory(data) {
    return request.request({
        method: "post",
        url: "/news/addFirstCategory/",
        data
    })
}

/**
 * 获取分类
 */
export function GetCategory(data) {
    return request.request({
        method: "post",
        url: "/news/getCategory/",
        data
    })
}