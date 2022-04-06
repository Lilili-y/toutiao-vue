<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false"
      ><div slot="title" class="title-text">我的频道</div>
      <van-button class="edit-btn" type="danger" plain size="mini" round @click="isEdit = !isEdit">
        {{ isEdit ? '完成' : '编辑' }}
      </van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in myChannels"
        :key="index"
        icon="close"
        :text="channel.name"
        @click="onChannelChange(channel, index)"
      >
        <van-icon
          slot="icon"
          v-show="isEdit && !fixedChannel.includes(channel.id)"
          name="close"
        ></van-icon>
        <span class="text" :class="{ active: active === index }" slot="text">
          {{ channel.name }}
        </span>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false"><div slot="title" class="title-text">频道推荐</div> </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(value, index) in recommendChannels"
        :key="index"
        icon="plus"
        :text="value.name"
        @click="onAddChannel(value)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, getUserChannels } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  props: {
    myChannels: {
      type: Array,
      require: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      allChannels: [], //所有频道列表
      isEdit: false, //控制编辑删除按钮
      fixedChannel: [0], //固定标签不显示
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannels() {
      return this.allChannels.filter(item => {
        //返回不相等的
        return !this.myChannels.find(val => {
          return val.id === item.id
        })
      })
    },
  },
  created() {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
        console.log(this.allChannels)
        // if (Math.random() > 0.3) {
        //   JSON.parse('dsfsdfg')
        // }
      } catch (error) {
        this.$toast('频道推荐数据请求失败，请稍后重试！')
      }
    },
    async onAddChannel(channel) {
      this.myChannels.push(channel)
      //   数据持久化
      try {
        if (this.user) {
          // 登录状态,将数据发送到后端
          await getUserChannels(this.myChannels, this.myChannels.length)
        } else {
          //未登录，将数据存放到本地
          setItem('toutiao-myChannel', this.myChannels)
        }
      } catch (error) {
        this.$toast('操作失败，请稍后重试！')
      }
    },
    onChannelChange(channel, index) {
      if (this.isEdit) {
        // 固定频道，不执行删除
        if (this.fixedChannel.includes(channel.id)) {
          return
        }
        // 编辑状态，删除频道功能
        if (index <= this.active) {
          //删除的是选中之前的，激活频道的索引-1
          this.$emit('changeChannel', this.active - 1, true)
        }
        this.myChannels.splice(index, 1)
      } else {
        //非编辑状态，切换频道功能
        this.$emit('changeChannel', index, false)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 42px 0;
  .title-text {
    font-size: 16px;
    color: #333;
  }
  .edit-btn {
    width: 52px;
    height: 24px;
    font-size: 13px;
    color: #f85959;
    border: 1px dashed #f85959;
  }
  .grid-item {
    width: 80px;
    height: 43px;
    /deep/ .van-grid-item__content {
      background-color: #f5f5f6;
      .van-grid-item__text,
      .text {
        color: #222;
        font-size: 14px;
        white-space: nowrap;
      }

      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  /deep/ .recommend-grid {
    .van-grid-item__content {
      flex-direction: row;
      color: #222;
      .van-icon {
        font-size: 12px;
        margin-right: 3px;
      }

      .van-grid-item__text {
        font-size: 14px;
        margin-top: 0;
      }
    }
  }
  /deep/ .van-icon-close {
    position: absolute;
    right: -8px;
    top: -8px;
    font-size: 18px;
    color: #acacac;
    z-index: 5;
  }
}
</style>
