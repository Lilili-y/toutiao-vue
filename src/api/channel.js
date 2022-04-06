/* 
  频道列表请求模块
*/
import request from '@/utils/request'
// 获取所有频道列表
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels',
  })
}
//设置用户频道
export const getUserChannels = channel => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: channel,
    },
  })
}
