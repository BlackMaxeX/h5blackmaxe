<template>
  <view class="container">
    <!-- 1. 基础订单信息模块 -->
    <view class="section-box">
      <view class="info-row">
        <text class="label">订单编号：{{ orderNo }}</text>
        <text class="status-text">待签署</text>
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

    <!-- 2. 业务信息模块 -->
    <view class="section-box">
      <view class="section-title">业务信息</view>
      <view class="sub-table">
        <view class="sub-row" v-for="(item, index) in businessInfoList" :key="index">
          <text class="sub-label">{{ item.label }}</text>
          <text class="link-text" @click="handleReflect(item.label)">反显</text>
        </view>
      </view>
    </view>

    <!-- 3. 证明材料模块 -->
    <view class="section-box">
      <view class="section-title">证明材料</view>
      <view class="sub-table">
        <view class="sub-row" v-for="(item, index) in proofMaterials" :key="index">
          <text class="sub-label">{{ item }}</text>
          <text class="link-text" @click="handleView(item)">查看</text>
        </view>
      </view>
    </view>

    <!-- 4. 签署合同模块 -->
    <view class="section-box">
      <view class="section-title">签署合同</view>
      <view class="sub-table">
        <view class="sub-row" v-for="(item, index) in signContracts" :key="index">
          <text class="sub-label">{{ item }}</text>
          <text class="link-text" @click="handleView(item)">查看</text>
        </view>
      </view>
    </view>

    <!-- 5. 签署情况模块 -->
    <view class="section-box">
      <view class="section-title">签署情况</view>
      <view class="sub-table">
        <view class="sub-row">
          <text class="sub-label">张三</text>
          <text class="status-green">已签署</text>
        </view>
        <view class="sub-row">
          <text class="sub-label">李四</text>
          <text class="status-red">待签署</text>
        </view>
      </view>
    </view>

    <!-- 6. 赋强公证书模块 -->
    <view class="section-box">
      <view class="section-title">赋强公证书</view>
      <view class="sub-table">
        <view class="sub-row">
          <text class="sub-label">公证书</text>
          <text class="link-text placeholder-text">暂无</text>
        </view>
      </view>
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

// 业务信息列表字段
const businessInfoList = ref([
  { label: '贷款人' },
  { label: '借款人' },
  { label: '合同名称' },
  { label: '合同名称' },
  { label: '借款利率' },
  { label: '借款金额（元）' },
  { label: '借款期限' },
  { label: '合同签订日期' }
])

// 证明材料列表
const proofMaterials = ref(['借款合同', '担保/保证合同', '其他材料', '补充材料'])

// 签署合同列表
const signContracts = ref([
  '公证申请表',
  '通用告知书',
  '线上申办赋予债权文书强制执行效力公证专项告知书',
  '在线公证询问笔录——贷款人'
])

// 点击反显
const handleReflect = (label) => {
  uni.showToast({ title: `查看【${label}】反显详情`, icon: 'none' })
}

// 点击查看
const handleView = (name) => {
  uni.showToast({ title: `正在查看：${name}`, icon: 'none' })
}
</script>

<style scoped lang="scss">
.container {
  min-height: 100vh;
  background-color: #f7f7f7;
  padding: 20rpx;
  box-sizing: border-box;
  padding-bottom: 60rpx;
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
    padding: 20rpx 0;
    border-bottom: 1rpx solid #f0f0f0;
    font-size: 28rpx;

    &:last-child {
      border-bottom: none;
    }

    .sub-label {
      color: #333;
    }

    .link-text {
      color: #1890ff;
    }

    .placeholder-text {
      color: #999;
    }

    .status-green {
      color: #52c41a;
    }

    .status-red {
      color: #ff4d4f;
    }
  }
}
</style>