<template>
  <van-button v-if="value" :loading="loading" round size="small" @click="onFollow"
    >已关注</van-button
  >
  <van-button
    v-else
    :loading="loading"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="onFollow"
    >关注</van-button
  >
</template>

<script>
import { followUser, cancelUser } from '@/api/user'
export default {
  data() {
    return {
      loading: false, //控制关注按钮加载状态
    }
  },
  props: {
    value: {
      //父组件使用v-model绑定数据，会向自组件传递一个value属性，并且监听自定义input事件
      type: [Boolean],
      required: true,
    },
    autId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  methods: {
    async onFollow() {
      this.loading = true //关注按钮加载状态，等待请求响应
      try {
        if (this.value) {
          //   已关注，取消关注
          await followUser(this.autId)
          this.$emit('input', !this.value)
        } else {
          // 未关注，关注用户
          await cancelUser(this.autId)
          this.$emit('input', !this.value)
        }
      } catch (error) {
        let message = '操作失败，请重试'
        if (error.response && error.response.status == 400) {
          message = '你不能关注你自己'
        }
        this.$toast(message)
      }
      this.loading = false
    },
  },
}
</script>

<style></style>
