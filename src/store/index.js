import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)
const token_key = 'toutiao_user' //使用常量是为了防止书写错误
export default new Vuex.Store({
  state: {
    //当前登录用户信息（如token等）
    // user: JSON.parse(window.localStorage.getItem(token_key)),
    user: getItem(token_key),
  },
  getters: {},
  mutations: {
    setUser(state, data) {
      state.user = data
      // window.localStorage.setItem(token_key, JSON.stringify(state.user))
      setItem(token_key, state.user)
    },
  },
  actions: {},
  modules: {},
})
