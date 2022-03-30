import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//记载动态设置REM基准值
import 'amfe-flexible'
import Vant from 'vant'
import 'vant/lib/index.css'
import '@/styles/index.less'
import '@/utils/dayjs'
Vue.use(Vant)
Vue.filter()
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
