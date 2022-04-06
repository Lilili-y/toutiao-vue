/* 
用户相关请求模块
*/
import request from '@/utils/request'
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
//获取用户自己的信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: `/v1_0/user`,
    //请求头数据，权限接口，统一设置到请求拦截器里面
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`,
    // },
  })
}
//获取用户频道列表
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: `/v1_0/user/channels`,
  })
}
//关注用户
export const followUser = target => {
  return request({
    method: 'POST',
    url: `/v1_0/user/followings`,
    data: {
      target,
    },
  })
}
//取消关注用户
export const cancelUser = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`,
  })
}
