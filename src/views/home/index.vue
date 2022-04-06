<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        type="info"
        slot="title"
        round
        size="small"
        icon="search"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- 频道列表 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
        <article-list :channel="channel" />
      </van-tab>

      <!-- 这是一个占位符 -->
      <div class="placeholder" slot="nav-right"></div>
      <div class="hamburger" slot="nav-right" @click="isChannelEditShow = true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道编辑弹出层 -->
    <van-popup
      v-model="isChannelEditShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <channel-edit :active="active" :myChannels="channels" @changeChannel="onUpdateActive" />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'

export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit,
  },
  data() {
    return {
      active: 0,
      channels: [], //用户频道列表
      isChannelEditShow: false, //控制频道编辑弹出层显示与否
    }
  },
  computed: {
    ...mapState(['user']),
  },
  created() {
    //获取用户频道列表
    this.loadChannels()
  },
  methods: {
    async loadChannels() {
      try {
        let channelsList = []
        if (this.user) {
          // 已登录
          const { data } = await getUserChannels()
          channelsList = data.data.channels
        } else {
          // 未登录
          if (getItem('toutiao-myChannel')) {
            //本地存储有的话，直接取
            channelsList = getItem('toutiao-myChannel')
          } else {
            const { data } = await getUserChannels()
            channelsList = data.data.channels
          }
        }
        this.channels = channelsList
      } catch (error) {
        this.$toast('获取频道数据失败，请稍后重试')
      }
    },
    onUpdateActive(index, iscomplete = true) {
      console.log(1)
      this.active = index
      this.isChannelEditShow = iscomplete
    },
  },
}
</script>

<style lang="less" scoped>
.home-container {
  padding-bottom: 50px;
  padding-top: 88px;
  /deep/ .van-nav-bar__title {
    //加了scoped之后，要使用深度影响才能生效后代所有元素，如/deep/，>>>

    max-width: unset;
  }
  .search-btn {
    width: 278px;
    height: 32px;
    background-color: #5babfb;
    border: none;
  }
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      min-width: 100px;
      position: fixed;
      top: 46px;
      z-index: 10;
      left: 0;
      right: 0;
      height: 41px;
      .van-tab {
        border-right: 1px solid #edeff3;
        color: #777777;
        font-size: 14px;
      }
      .van-tab--active {
        color: #333333;
      }
      .van-tabs__nav {
        padding: 0;
      }
      .van-tabs__line {
        width: 16px;
        height: 3px;
        background-color: #3296fa;
        border-radius: 2px;
        bottom: 4px;
      }
      .hamburger {
        position: fixed;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 33px;
        height: 41px;
        background-color: #fff;
        opacity: 0.9;
        i {
          font-size: 17px;
        }
        &::before {
          content: '';
          position: absolute;
          left: 0;
          width: 1px;
          height: 70%;
          background: url(~@/assets/gradient-gray-line.png);
          background-size: contain;
        }
      }
      .placeholder {
        flex-shrink: 0; //不参与分配弹性盒子，固定大小
        width: 32px;
        height: 41px;
      }
    }
  }
}
</style>
