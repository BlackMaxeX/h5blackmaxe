<template>
  <view class="home-container">
    <!-- 背景层：预留的背景坑位，默认给了渐变色，你可以直接将其替换为设计图导出的背景图 -->
    <view class="bg-wrapper"></view>

    <!-- 主体内容层 -->
    <view class="content-wrapper">
      
      <!-- 1. 顶部公证处定位栏（胶囊样式） -->
      <view class="location-pill" @click="goToChooseProvince">
        <text class="location-text">{{ currentOffice }}</text>
        <text class="switch-icon">⇌</text>
      </view>
      
      <!-- 2. 头部文字与插图区 -->
      <view class="header-section">
        <view class="text-part">
          <text class="main-title">智慧公证</text>
          <text class="sub-title">公证一体化服务平台</text>
        </view>
        <!-- 右侧插图预留位（请替换为你切好的电脑图标） -->
        <image class="header-img" src="/static/img-placeholder.png" mode="aspectFit"></image>
      </view>

      <!-- 3. 在线申办区域 -->
      <view class="section-card">
        <view class="section-title">
          <view class="title-indicator"></view>
          <text class="title-text">在线申办</text>
        </view>

        <!-- 两个平铺的业务卡片 -->
        <view class="biz-row">
          <!-- 业务卡片 1：赋强公证（浅蓝背景） -->
          <view class="biz-item blue-card" @click="handleSupertow">
            <view class="icon-wrap">
              <!-- 替换为蓝色的盾牌/证书图标 -->
              <image class="biz-icon" src="/static/img-placeholder.png" mode="aspectFit" />
            </view>
            <text class="biz-name">赋强公证</text>
            <text class="biz-desc">按贷款金额比例收费0.06%</text>
          </view>

          <!-- 业务卡片 2：执行公证（浅绿背景） -->
          <view class="biz-item green-card" @click="handleExecute">
            <view class="icon-wrap">
              <!-- 替换为绿色的印章图标 -->
              <image class="biz-icon" src="/static/img-placeholder.png" mode="aspectFit" />
            </view>
            <text class="biz-name">执行公证</text>
            <text class="biz-desc">按件固定收费300元/件</text>
          </view>
        </view>
      </view>

      <!-- 4. 消息通知区域 -->
      <view class="notice-card" @click="handleNotice">
        <!-- 替换为橘黄色的消息气泡图标 -->
        <image class="notice-icon" src="/static/img-placeholder.png" mode="aspectFit"></image>
        
        <view class="notice-content">
          <text class="notice-text">您申请的赋强公证业务待补充材料</text>
          <text class="notice-time">2026-08-12 10:00:00</text>
        </view>
        
        <text class="arrow">></text>
      </view>

    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const currentOffice = ref('北京市丰台区公证处')

const goToChooseProvince = () => {
  uni.navigateTo({
    url: '/pages/home/components/location' 
  })
}

onMounted(() => {
  uni.$on('updateOffice', (name) => {
    currentOffice.value = name
  })
})

const handleSupertow = () => {
  uni.navigateTo({
    url: '/pages/home/components/addPerson' 
  })
}

const handleExecute = () => {
  console.log('点击了执行公证')
}

const handleNotice = () => {
  uni.navigateTo({
    url: '/pages/home/components/notification'
  })
}
</script>

<style lang="scss" scoped>
.home-container {
  position: relative;
  min-height: 100vh;
  background-color: #f5f7fa; // 兜底底层背景色
}

/* 1. 背景层设置（方便你后续替换背景图） */
.bg-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 600rpx;
  /* 这里的渐变模拟了设计图的蓝白背景，导入背景图后可以把 gradient 删掉加上 url() */
  background: url(../../static/images/home-page.png) no-repeat center center / cover;
  z-index: 0;
}

/* 2. 主体内容层（浮在背景之上） */
.content-wrapper {
  position: relative;
  z-index: 1;
  padding: 30rpx;
  padding-top: 40rpx; // 留出状态栏位置
}

/* 顶部公证处定位栏（胶囊风格） */
.location-pill {
  display: inline-flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 12rpx 24rpx;
  border-radius: 40rpx;
  margin-bottom: 40rpx;

  .location-text {
    font-size: 26rpx;
    color: #333;
    font-weight: 500;
  }

  .switch-icon {
    font-size: 28rpx;
    color: #333;
    margin-left: 10rpx;
  }
}

/* 头部文字与插图 */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50rpx;

  .text-part {
    display: flex;
    flex-direction: column;

    .main-title {
      font-size: 64rpx;
      font-weight: 900;
      color: #222;
      letter-spacing: 4rpx;
      margin-bottom: 16rpx;
    }

    .sub-title {
      font-size: 30rpx;
      color: #333;
      letter-spacing: 2rpx;
    }
  }

  .header-img {
    width: 260rpx;
    height: 200rpx;
  }
}

/* 在线申办卡片区 */
.section-card {
  background-color: #fff;
  border-radius: 24rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.03);

  .section-title {
    display: flex;
    align-items: center;
    margin-bottom: 30rpx;

    .title-indicator {
      width: 8rpx;
      height: 32rpx;
      background-color: #34a853; // 绿条指示器
      border-radius: 4rpx;
      margin-right: 16rpx;
    }

    .title-text {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
    }
  }

  .biz-row {
    display: flex;
    justify-content: space-between;
    gap: 20rpx;

    .biz-item {
      flex: 1;
      border-radius: 20rpx;
      padding: 30rpx 20rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;

      /* 浅蓝色卡片 */
      &.blue-card {
        background: linear-gradient(180deg, #f0f7ff 0%, #e6f1fc 100%);
      }

      /* 浅绿色卡片 */
      &.green-card {
        background: linear-gradient(180deg, #f0fdf4 0%, #e8f7ec 100%);
      }

      .icon-wrap {
        width: 90rpx;
        height: 90rpx;
        margin-bottom: 20rpx;
        
        .biz-icon {
          width: 100%;
          height: 100%;
        }
      }

      .biz-name {
        font-size: 30rpx;
        font-weight: bold;
        color: #333;
        margin-bottom: 12rpx;
      }

      .biz-desc {
        font-size: 22rpx;
        color: #999;
        line-height: 1.3;
      }
    }
  }
}

/* 消息通知区域 */
.notice-card {
  background-color: #fff;
  border-radius: 24rpx;
  padding: 30rpx;
  display: flex;
  align-items: center;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.03);

  .notice-icon {
    width: 60rpx;
    height: 60rpx;
    margin-right: 24rpx;
    flex-shrink: 0;
  }

  .notice-content {
    flex: 1;
    display: flex;
    flex-direction: column;

    .notice-text {
      font-size: 28rpx;
      color: #333;
      font-weight: 500;
      margin-bottom: 8rpx;
      
      // 单行超出省略号
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 450rpx; 
    }

    .notice-time {
      font-size: 24rpx;
      color: #999;
    }
  }

  .arrow {
    font-size: 32rpx;
    color: #ccc;
    margin-left: 10rpx;
  }
}
</style>