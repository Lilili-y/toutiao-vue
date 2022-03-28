/* 
用户相关请求模块
*/
import request from './request'
//登录
export const loginAPI = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data,
  })
}
//发送验证码
//每个手机号每分钟只能发送一次
export const sendSmsAPI = mobile => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`,
  })
}
