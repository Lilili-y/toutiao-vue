/* 
dayjs基础封装
 */
import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
// 更改语言
dayjs.locale('zh-cn')
//引入相对时间格式处理插件
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
//时间格式过滤器
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
