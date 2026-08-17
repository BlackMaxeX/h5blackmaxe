<template>
  <view class="container">
    <!-- 1. 背景层：预留背景坑位，默认给了浅绿色渐变，你可以直接替换为UI的背景图 -->
    <view class="bg-wrapper"></view>

    <!-- 主体内容层 -->
    <view class="content-wrapper">
      
      <!-- 2. 个人信息头部 -->
      <view class="user-header">
        <image class="avatar" src="/static/img-placeholder.png" mode="aspectFill"></image>
        <view class="user-info">
          <view class="name-row">
            <text class="username">华春齐</text>
            <!-- 绑定点击跳转实名认证页面 -->
            <view class="auth-tag" @click="handleAuth">
              <!-- 可替换为设计图中的盾牌√图标 -->
              <text class="auth-icon">☑️</text> 实名认证
            </view>
          </view>
          <text class="phone">18033441984</text>
        </view>
      </view>

      <!-- 3. 功能列表卡片 -->
      <view class="menu-card">
        <view class="menu-item" @click="handleMenu('supertow')">
          <view class="item-left">
            <!-- 替换为对应的业务图标 -->
            <image class="menu-icon" src="/static/img-placeholder.png" mode="aspectFit" />
            <text class="menu-text">赋强公证业务</text>
          </view>
          <text class="arrow">></text>
        </view>

        <view class="menu-item" @click="handleMenu('execute')">
          <view class="item-left">
            <image class="menu-icon" src="/static/img-placeholder.png" mode="aspectFit" />
            <text class="menu-text">执行公证业务</text>
          </view>
          <text class="arrow">></text>
        </view>

        <view class="menu-item" @click="handleMenu('contacts')">
          <view class="item-left">
            <image class="menu-icon" src="/static/img-placeholder.png" mode="aspectFit" />
            <text class="menu-text">常用人维护</text>
          </view>
          <text class="arrow">></text>
        </view>

        <!-- 修改信息移到了菜单列表中 -->
        <view class="menu-item no-border" @click="handleMenu('editInfo')">
          <view class="item-left">
            <image class="menu-icon" src="/static/img-placeholder.png" mode="aspectFit" />
            <text class="menu-text">修改信息</text>
          </view>
          <text class="arrow">></text>
        </view>
      </view>

      <!-- 4. 退出登录按钮 -->
      <button class="logout-btn" @click="handleLogout">退出登录</button>

    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 点击实名认证标签[cite: 5]
const handleAuth = () => {
  uni.navigateTo({
    url: '/pages/myself/components/real-name-auth'
  })
}

// 统一的菜单点击事件[cite: 5]
const handleMenu = (type) => {
  if (type === 'supertow') {
    uni.navigateTo({ url: '/pages/myself/components/supertow-list' })
  } else if (type === 'execute') {
    console.log('跳转到执行公证业务')
  } else if (type === 'contacts') {
    uni.navigateTo({ url: '/pages/myself/components/contacts-list' })
  } else if (type === 'editInfo') {
    // 修改信息统一整合进菜单跳转[cite: 5]
    uni.navigateTo({ url: '/pages/myself/components/edit-info' })
  }
}

// 退出登录事件[cite: 5]
const handleLogout = () => {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        uni.showToast({ title: '已退出登录', icon: 'success' })
      }
    }
  })
}
</script>

<style scoped lang="scss">
.container {
  position: relative;
  min-height: 100vh;
  background-color: #f5f6f8; // 兜底灰色背景
}

/* 1. 背景层设置（方便替换背景图） */
.bg-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 500rpx;
  /* 默认给了一个浅绿色到透明的渐变。导入背景图后可以把 background 替换成 url(...) */
  background: linear-gradient(180deg, #e3f5ec 0%, #f5f6f8 100%);
  z-index: 0;
}

/* 2. 主体内容层 */
.content-wrapper {
  position: relative;
  z-index: 1;
  padding: 40rpx 30rpx;
}

/* 头部个人信息 */
.user-header {
  display: flex;
  align-items: center;
  margin-top: 20rpx;
  margin-bottom: 50rpx;

  .avatar {
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    margin-right: 30rpx;
    background-color: #ccc;
    border: 4rpx solid #fff; // 给头像加个白边提升质感
  }

  .user-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .name-row {
      display: flex;
      align-items: center;
      margin-bottom: 12rpx;

      .username {
        font-size: 38rpx;
        font-weight: bold;
        color: #333;
        margin-right: 16rpx;
      }

      .auth-tag {
        display: inline-flex;
        align-items: center;
        font-size: 22rpx;
        color: #d46b08; // 橙色字体
        background-color: #fff7e6; // 浅橙色背景
        padding: 4rpx 14rpx;
        border-radius: 20rpx;
        cursor: pointer;

        .auth-icon {
          font-size: 24rpx;
          margin-right: 6rpx;
        }
      }
    }

    .phone {
      font-size: 28rpx;
      color: #999;
    }
  }
}

/* 菜单列表卡片 */
.menu-card {
  background-color: #fff;
  border-radius: 24rpx;
  padding: 10rpx 30rpx;
  margin-bottom: 50rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);

  .menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 36rpx 0;
    border-bottom: 1rpx solid #f2f2f2;

    &:active {
      opacity: 0.7; // 简单点击反馈
    }

    &.no-border {
      border-bottom: none;
    }

    .item-left {
      display: flex;
      align-items: center;

      .menu-icon {
        width: 40rpx;
        height: 40rpx;
        margin-right: 20rpx;
      }

      .menu-text {
        font-size: 30rpx;
        color: #333;
      }
    }

    .arrow {
      font-size: 32rpx;
      color: #ccc;
    }
  }
}

/* 退出登录按钮 */
.logout-btn {
  width: 100%;
  background-color: #26b16c; // 设计图中的主题绿
  color: #fff;
  font-size: 32rpx;
  height: 96rpx;
  line-height: 96rpx;
  border-radius: 16rpx;
  border: none;
  
  &::after {
    border: none; // 去除小程序端原生按钮边框
  }
  
  &:active {
    background-color: #21995d; // 按下时稍微变暗
  }
}
</style>