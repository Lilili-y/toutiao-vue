<template>
  <div class="search-container">
    <!-- 搜索框 -->
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :searchText="searchText" />
    <!-- 搜索建议 -->
    <search-suggestion v-else-if="searchText" :searchText="searchText" @search="onSearch" />
    <!-- 搜索历史 -->
    <search-history
      v-else
      :searchHistories="searchHistories"
      @search="onSearch"
      @clearAllHistory="searchHistories = []"
    />
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import SearchResult from './components/search-result.vue'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  data() {
    return {
      searchText: '', //搜索文本
      isResultShow: false, //控制搜索结果显示
      searchHistories: getItem('toutiao_search_histories') || [], //搜索历史记录
    }
  },
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult,
  },
  methods: {
    onSearch(val) {
      this.searchText = val //搜索建议传输过来的文本
      this.searchHistories = this.searchHistories.filter(item => item != val) //过滤掉重复的，目的是将最新的显示在最上面
      this.searchHistories.unshift(val)
      this.isResultShow = true
    },
    onCancel() {
      this.$router.back()
    },
  },
  watch: {
    //搜索历史持久化存储
    searchHistories(val) {
      setItem('toutiao_search_histories', val)
    },
  },
}
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 54px;
  .van-search--show-action {
    .van-search__action {
      color: #fff;
    }
  }
  .search-form {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 5;
  }
}
</style>
