<template>
  <div class="search-history">
    <van-cell title="搜索历史" value="内容">
      <div v-if="isDeleteShow">
        <span @click="$emit('clearAllHistory')">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else name="delete-o" @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistories"
      :key="index"
      @click="deleteOrSearchHistory(item, index)"
    >
      <van-icon v-if="isDeleteShow" name="delete-o" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchHistories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isDeleteShow: false, //控制删除按钮显示
    }
  },
  methods: {
    deleteOrSearchHistory(item, index) {
      if (this.isDeleteShow) {
        //删除状态点击执行删除操作
        this.searchHistories.splice(index, 1)
      } else {
        //非删除状态点击执行搜索操作
        this.$emit('search', item)
      }
    },
  },
}
</script>

<style></style>
