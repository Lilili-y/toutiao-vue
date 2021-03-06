/* 
  对axios进行基础封装
 */

import axios from 'axios'
import store from '@/store'
import JSONbig from 'json-bigint'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/', //基础路径
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  //处理超出安全整数的数字
  transformResponse: [
    function (data) {
      // 对 data 进行任意转换处理
      try {
        return JSONbig.parse(data)
      } catch (error) {}
      return data
    },
  ],
})

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
export default request
