import request from "@/api/request.js";

/**
 * 获取验证码
 */
export function GetSms(data) {
    request.request({
        method: 'post',
        url: '/getSms/',
        data
    })
}
/**
 * 获取用户角色
 */

/**
 * 登录
 */


/**
 * 注册
 */