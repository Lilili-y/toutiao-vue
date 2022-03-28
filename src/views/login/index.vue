<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" class="page-nav-bar">
      <van-icon name="cross" slot="left" @click="$router.back()" />
    </van-nav-bar>
    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        maxlength="11"
        type="Number"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        maxlength="6"
        type="number"
        trigger="onBlur"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 60"
            format="ss 秒"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            class="send-sms-btn"
            native-type="button"
            @click="onSendSms"
            round
            size="small"
            type="default"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button block type="info" class="login-btn" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginAPI, sendSmsAPI } from '@/api/user'
export default {
  name: 'LoginPage',
  data() {
    return {
      user: {
        mobile: '13911111111',
        code: '',
      },
      userFormRules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          {
            pattern: /^1[3|5|7|8|9]\d{9}$/, //正则表达式
            message: '手机号格式错误',
          },
        ],
        code: [
          { required: true, message: '请填写验证码' },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误',
          },
        ],
      },
      isCountDownShow: false, //显示倒计时组件
    }
  },
  methods: {
    async onSubmit() {
      const user = this.user
      // 全局注册 vant 组件后，会自动在 Vue 的 prototype 上挂载 $toast 方法
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true, //禁用背景点击
        duration: 0, // 持续展示 toast
      })
      //提交表单请求登录
      try {
        const { data } = await loginAPI(user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('密码或验证码错误，请重新输入！')
        } else {
          this.$toast.fail('登录失败，请稍后重试！')
        }
      }
    },
    async onSendSms() {
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        this.$toast.fail('手机号格式错误')
      }
      //验证通过，显示倒计时
      this.isCountDownShow = true
      //发送验证码
      try {
        await sendSmsAPI(this.user.mobile)
        this.$toast.success('验证码发送成功')
      } catch (err) {
        if (err.response.status === 429) {
          this.$toast.fail('发送太频繁，请稍后重试')
        } else {
          this.$toast.fail('发送失败，请稍后重试')
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
.login-container {
  .toutiao {
    font-size: 18px;
  }
  i {
    margin-right: 10px;
    &.toutiao-yanzhengma {
      display: block;
      margin-top: 2px;
    }
  }
  .send-sms-btn {
    width: 80px;
    height: 23px;
    line-height: 23px;
    background-color: #ededed;
    font-size: 12px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 27px 14px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
