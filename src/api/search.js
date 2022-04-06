/* 
搜索相关请求模块
*/
import request from '@/utils/request'
//搜索建议
export const getSearchSuggestions = q => {
  return request({
    method: 'Get',
    url: '/v1_0/suggestion',
    params: {
      q,
    },
  })
}
//搜索结果
export const getSearchResults = params => {
  return request({
    method: 'Get',
    url: '/v1_0/search',
    params,
  })
}
