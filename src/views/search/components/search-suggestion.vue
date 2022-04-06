<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(text, index) in suggestions"
      :key="index"
      icon="search"
      @click="$emit('search', text)"
    >
      <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      suggestions: [], //储存搜索建议
    }
  },
  watch: {
    searchText: {
      immediate: true,
      handler: debounce(function (val) {
        this.suggestions = [] //先清空，防止搜索建议一直显示第一次的建议列表
        this.onloadSearchSuggestion(val)
      }, 200),
    },
  },
  methods: {
    async onloadSearchSuggestion(q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.suggestions = data.data.options
      } catch (error) {
        this.$toast('获取数据失败，请稍后重试！')
      }
    },
    highlight(text) {
      if (text) {
        const htmlStr = `<span class='light'>${this.searchText}</span>`
        const reg = new RegExp(this.searchText, 'gi') //创建正则表达式
        return text.replace(reg, htmlStr)
      }
      return
    },
  },
}
</script>

<style lang="less" scoped>
.search-suggestion {
  /deep/ span.light {
    color: #3296fa;
  }
}
</style>
