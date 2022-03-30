<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      success-duration="1000"
      :success-text="successText"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <article-item
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item/index.vue'
export default {
  name: 'ArticleList',
  props: {
    channel: { type: Object, require: true },
  },
  data() {
    return {
      list: [], // 存储列表数据
      loading: false, // 控制加载中 loading 状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null, //	请求前一页历史数据的时间戳
      error: false, //控制请求加载失败的错误提示
      refreshing: false, //控制下拉刷新状态
      successText: '', //下拉刷新成功提示
    }
  },
  components: { ArticleItem },
  methods: {
    async onLoad() {
      // 异步更新数据
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
        })
        const { results } = data.data
        this.list.push(...results)
        console.log(results)
        // 加载状态结束
        this.loading = false
        //判断数据是否全部加载完成
        if (results.length) {
          //请求前一页历史数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据了
          this.finished = true
        }
      } catch (error) {
        //显示错误提示
        this.error = true
        this.loading = false
      }

      // 数据全部加载完成，要将finished设置为true
    },
    async onRefresh() {
      // 异步更新数据
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(), //向前添加，所以每次都获取最新的数据
        })
        const { results } = data.data
        this.list.unshift(...results)
        // 下拉状态结束
        this.refreshing = false
        this.successText = `刷新成功，更新了${results.length}条数据`
      } catch (error) {
        //关闭下拉状态
        this.refreshing = false
        this.$toast('刷新失败，请稍后重试')
      }
    },
  },
}
</script>

<style lang="less" scoped>
.article-list {
  //给固定的高，溢出部分滚动
  height: 80vh;
  overflow-y: auto;
}
</style>
