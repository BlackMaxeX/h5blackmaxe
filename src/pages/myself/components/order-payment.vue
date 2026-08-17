<template>
  <view class="container">
    <!-- 1. 基础订单信息模块 -->
    <view class="section-box">
      <view class="info-row">
        <text class="label">订单编号：{{ orderNo }}</text>
        <text class="status-text">待支付</text>
      </view>
      <view class="info-row">
        <text class="label">公证事项</text>
        <text class="value">赋予债权文书强制执行效力</text>
      </view>
      <view class="info-row">
        <text class="label">申请时间</text>
        <text class="value">2026-06-26 12:00:00</text>
      </view>
    </view>

    <!-- 2. 结算明细模块 -->
    <view class="section-box">
      <view class="section-title">结算明细</view>
      <view class="sub-table">
        <view class="sub-row">
          <text class="sub-label">公证类型</text>
          <text class="sub-value">赋强公证</text>
        </view>
        <view class="sub-row">
          <text class="sub-label">结算方式</text>
          <text class="sub-value">按贷款金额比例收费</text>
        </view>
        <view class="sub-row">
          <text class="sub-label">结算金额</text>
          <text class="sub-value">0.06%</text>
        </view>
        <view class="sub-row">
          <text class="sub-label">贷款金额（元）</text>
          <text class="sub-value">50,000元</text>
        </view>
        <view class="sub-row">
          <text class="sub-label red-text">待支付金额</text>
          <text class="sub-value red-text font-bold">300元</text>
        </view>
      </view>
    </view>

    <!-- 3. 底部操作按钮（不固定，跟随滚动展示） -->
    <view class="footer-box">
      <button class="pay-btn" @click="handlePay">立即支付</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const orderNo = ref('xxx')

onLoad((options) => {
  if (options && options.orderNo) {
    orderNo.value = options.orderNo
  }
})

// 立即支付点击事件
const handlePay = () => {
  uni.showToast({ title: '正在调起支付...', icon: 'none' })
  setTimeout(() => {
    uni.showToast({ title: '支付成功', icon: 'success' })
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  }, 1000)
}
</script>

<style scoped lang="scss">
.container {
  min-height: 100vh;
  background-color: #f7f7f7;
  padding: 20rpx;
  box-sizing: border-box;
}

.section-box {
  background-color: #fff;
  border-radius: 12rpx;
  padding: 24rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.02);

  .section-title {
    font-size: 28rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 16rpx;
  }

  .info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 28rpx;
    line-height: 50rpx;

    .label {
      color: #333;
    }

    .value {
      color: #333;
    }

    .status-text {
      color: #1890ff;
    }
  }
}

.sub-table {
  border-top: 1rpx solid #f0f0f0;

  .sub-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 22rpx 0;
    border-bottom: 1rpx solid #f0f0f0;
    font-size: 28rpx;

    &:last-child {
      border-bottom: none;
    }

    .sub-label {
      color: #333;
    }

    .sub-value {
      color: #333;
    }

    .red-text {
      color: #ff4d4f;
    }

    .font-bold {
      font-weight: bold;
    }
  }
}

// 底部流式按钮（不固定，滚动到下方显示）
.footer-box {
  padding: 40rpx 20rpx 60rpx 20rpx;
  box-sizing: border-box;

  .pay-btn {
    width: 100%;
    background-color: #1890ff;
    color: #fff;
    border-radius: 40rpx;
    font-size: 32rpx;
    height: 84rpx;
    line-height: 84rpx;
    margin: 0;
  }
}
</style>