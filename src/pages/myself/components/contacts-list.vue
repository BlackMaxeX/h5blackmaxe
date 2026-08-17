<template>
  <view class="container">
    <!-- 1. 新增常用人信息按钮 -->
    <view class="add-bar" @click="handleAddContact">
      <text class="plus-icon">➕</text>
      <text class="add-text">新增常用人信息</text>
    </view>

    <!-- 2. 常用人列表区域 -->
    <view class="contact-list">
      <view class="contact-card" v-for="(item, index) in contactList" :key="index">
        <view class="card-info">
          <view class="name-row">
            <text class="name">{{ item.name }}</text>
            <text class="tag" :class="getTagClass(item.type)">{{ item.type }}</text>
          </view>
          <text class="phone">手机号：{{ item.phone }}</text>
        </view>
        <view class="edit-icon-wrap" @click="handleEditContact(item)">
          <text class="edit-icon">✏️</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 模拟常用人列表数据（与原型图完全一致）
const contactList = ref([
  { id: 1, name: '阳阳', type: '个人', phone: '155****7890' },
  { id: 2, name: '周舟', type: '个人代理', phone: '155****7890' },
  { id: 3, name: 'xx公司', type: '法人', phone: '155****7890' },
  { id: 4, name: '王兰', type: '法人代理', phone: '155****7890' }
])

// 根据不同类型返回对应的标签样式类
const getTagClass = (type) => {
  // 可以根据需要扩展不同标签的颜色
  return 'default-tag'
}

// 点击新增常用人
const handleAddContact = () => {
  uni.navigateTo({
    url: '/pages/myself/components/edit-person?mode=add'
  })
}

// 点击编辑常用人
const handleEditContact = (item) => {
  uni.navigateTo({
    url: `/pages/myself/components/edit-person?mode=edit&id=${item.id}`
  })
}
</script>

<style scoped lang="scss">
.container {
  min-height: 100vh;
  background-color: #f7f7f7;
  padding: 20rpx;
  box-sizing: border-box;
}

// 新增按钮栏
.add-bar {
  background-color: #fff;
  border-radius: 12rpx;
  padding: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.02);

  .plus-icon {
    font-size: 28rpx;
    margin-right: 12rpx;
    color: #1890ff;
  }

  .add-text {
    font-size: 30rpx;
    color: #1890ff;
    font-weight: 500;
  }
}

// 列表区域
.contact-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;

  .contact-card {
    background-color: #fff;
    border-radius: 12rpx;
    padding: 24rpx 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.02);

    .card-info {
      flex: 1;

      .name-row {
        display: flex;
        align-items: center;
        margin-bottom: 12rpx;

        .name {
          font-size: 32rpx;
          font-weight: bold;
          color: #333;
          margin-right: 16rpx;
        }

        .tag {
          font-size: 22rpx;
          color: #fff;
          background-color: #1890ff;
          padding: 2rpx 12rpx;
          border-radius: 4rpx;
        }
      }

      .phone {
        font-size: 26rpx;
        color: #666;
      }
    }

    .edit-icon-wrap {
      padding: 10rpx;
      
      .edit-icon {
        font-size: 32rpx;
      }
    }
  }
}
</style>