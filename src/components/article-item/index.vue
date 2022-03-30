<template>
  <van-cell class="article-item">
    <div slot="title" class="title van-multi-ellipsis--l2">{{ article.title }}</div>
    <div slot="label">
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <van-image
          v-for="(img, index) in article.cover.images"
          fit="cover"
          :src="img"
          :key="index"
          class="cover-item"
        />
      </div>
      <div class="label-info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <div slot="default" v-if="article.cover.type === 1">
      <van-image class="right-cover" fit="cover" :src="article.cover.images[0]" />
    </div>
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped lang="less">
.article-item {
  .title {
    font-size: 16px;
    color: #3a3a3a;
  }

  .van-cell__value {
    flex: unset;
    width: 116px;
    height: 73px;
    padding-left: 12px;
  }

  .right-cover {
    width: 116px;
    height: 73px;
  }

  .label-info-wrap span {
    font-size: 11px;
    color: #b4b4b4;
    margin-right: 12px;
  }

  .cover-wrap {
    display: flex;
    padding: 15px 0;

    .cover-item {
      flex: 1;
      height: 73px;
      overflow: hidden;
      &:not(:last-child) {
        padding-right: 2px;
      }
      .cover-item-img {
        width: 100%;
        height: 73px;
      }
    }
  }
}
</style>
