<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell v-for="(item, index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search'
export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false, //  控制加载状态
      finished: false, //是否已完成
      page: 1, //页数
      per_page: 20, //搜索条数
      error: false,
    }
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getSearchResults({
          page: this.page,
          pre_page: this.per_page,
          q: this.searchText,
        })
        const { results } = data.data
        this.list.push(...results)
        //关闭此次加载状态
        this.loading = false
        //判断是否还有数据，若有则继续发起请求，页数加1
        if (results.length) {
          this.page++
        } else {
          //没有则完成，关闭后续加载
          this.finished = true
        }
      } catch (error) {
        //错误状态，提示信息
        this.error = true
        this.loading = false
      }
    },
  },
}
</script>

<style></style>
