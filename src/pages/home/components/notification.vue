<template>
  <view class="container">
    <!-- 消息通知列表 -->
    <view class="notification-list">
      <view 
        class="notification-card" 
        v-for="(item, index) in messageList" 
        :key="index"
        @click="handleView(item)"
      >
        <view class="content-box">
          <text class="msg-title">{{ item.title }}</text>
          <text class="msg-time">{{ item.time }}</text>
        </view>
        <view class="right-box">
          <!-- 未读小红点 -->
          <view class="red-dot" v-if="item.isUnread"></view>
          <!-- 右箭头 -->
          <text class="arrow">></text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 模拟消息通知列表数据（包含未读状态字段 isUnread）
const messageList = ref([
  { title: '您申请的赋强公证业务待补充材料', time: '2024-12-31 12:00:00', isUnread: true },
  { title: '您申请的赋强公证业务待补充材料', time: '2024-12-31 12:00:00', isUnread: false },
  { title: '您申请的赋强公证业务待补充材料', time: '2024-12-31 12:00:00', isUnread: false },
  { title: '您申请的赋强公证业务待补充材料', time: '2024-12-31 12:00:00', isUnread: false },
  { title: '您申请的赋强公证业务待补充材料', time: '2024-12-31 12:00:00', isUnread: false },
  { title: '您申请的赋强公证业务待补充材料', time: '2024-12-31 12:00:00', isUnread: false }
])

// 点击卡片的逻辑
const handleView = (item) => {
  // 点击后将该条消息标记为已读（消除红点）
  if (item.isUnread) {
    item.isUnread = false
  }
  
  console.log('点击查看详情：', item)
  // TODO: 可在此处通过 uni.navigateTo 跳转到对应的业务详情页
  uni.showToast({ title: '加载中...', icon: 'loading', duration: 800 })
}
</script>

<style scoped lang="scss">
.container {
  min-height: 100vh;
  background-color: #f5f6f8; // 使用UI图中略带灰色的背景
  padding: 24rpx;
  box-sizing: border-box;
}

.notification-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.notification-card {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 32rpx 24rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;

  // 点击态效果，提升用户体验
  &:active {
    background-color: #fafafa;
  }

  .content-box {
    flex: 1;
    margin-right: 20rpx;

    .msg-title {
      font-size: 30rpx;
      color: #333;
      display: block;
      margin-bottom: 12rpx;
      line-height: 1.4;
      font-weight: 500;
    }

    .msg-time {
      font-size: 24rpx;
      color: #999;
      display: block;
    }
  }

  .right-box {
    display: flex;
    align-items: center;

    .red-dot {
      width: 12rpx;
      height: 12rpx;
      background-color: #ff4d4f; // 红色提示点
      border-radius: 50%;
      margin-right: 16rpx;
    }

    .arrow {
      font-size: 32rpx;
      color: #ccc;
    }
  }
}
</style>