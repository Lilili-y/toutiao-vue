<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div v-if="user" class="header userInfo">
      <div class="base-info">
        <div class="left">
          <van-image class="avatar" src="https://img01.yzcdn.cn/vant/cat.jpeg" round fit="cover" />
          <span class="name">李梨鲤</span>
        </div>
        <div class="right"><van-button type="default" size="mini" round>编辑资料</van-button></div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">9</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 已登录 -->

    <!-- 未登录 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img src="~@/assets/mobile.png" class="mobile-img" alt="" />
        <span class="text-login">登录 / 注册</span>
      </div>
    </div>
    <!-- 未登录 -->

    <!-- 导航 -->
    <van-grid :column-num="2" class="grid" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- 导航 -->

    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" class="mb-9" is-link />
    <van-cell v-if="user" title="退出登录" class="logout-cell" clickable @click="onLogout" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MyIndex',
  computed: {
    ...mapState(['user']),
  },
  methods: {
    //退出登录
    onLogout() {
      this.$dialog
        .confirm({
          title: '确认退出吗？',
        })
        .then(() => {
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
  },
}
</script>

<style lang="less" scoped>
.my-container {
  .header {
    height: 180px;
    background: url('~@/assets/banner.png');
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 66px;
        height: 66px;
        margin-bottom: 8px;
      }
      .text-login {
        font-size: 14px;
        color: #fff;
      }
    }
  }
  .userInfo {
    .base-info {
      height: 115px;
      padding: 38px 16px 11px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        justify-content: center;
        align-items: center;
        .avatar {
          width: 66px;
          height: 66px;
          border: 2px solid #fff;
          margin-right: 11px;
        }
        .name {
          font-size: 15px;
          color: #fff;
        }
      }
      .right {
        .van-button {
          width: 58px;
          height: 17px;

          .van-button__text {
            font-size: 10px;
            color: #666;
          }
        }
      }
    }
    .data-stats {
      display: flex;
      .data-item {
        flex: 1;
        height: 65px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: #fff;
        .count {
          font-size: 18px;
        }
        .text {
          font-size: 12px;
        }
      }
    }
  }
  .grid {
    margin-bottom: 5px;
    .grid-item {
      .toutiao {
        font-size: 23px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      .text {
        font-size: 14px;
        color: #333;
      }
    }
  }
  .logout-cell {
    margin-top: 5px;
    text-align: center;
    color: #d86262;
  }
}
</style>
