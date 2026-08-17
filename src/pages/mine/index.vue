<template>
  <view class="mine-page">
    <!-- 顶部背景图 -->
    <image
      class="bg-top"
      src="@/static/images/mine-bg.png"
      mode="widthFix"
    ></image>

    <!-- 用户信息栏 -->
    <view class="user-info">
      <image class="avatar" src="@/static/images/defaultHead.svg"></image>
      <view class="user-info-mes">
        <view class="user-name" v-if="isLogin">刘安奎</view>
        <view class="user-name unlogin" v-else>未登录</view>
        <view class="user-phone" v-if="isLogin">18033441984</view>
        <view class="user-phone" v-else></view>
      </view>
      <view class="right-btn" @click="goToPage('/pages/personMes/index')">
        <view class="text">修改信息</view>
        <view class="arrow-right"></view
      ></view>
    </view>

    <!-- 绿色押金背景 -->
    <image
      class="bg-deposit"
      src="@/static/images/mine-bg1.png"
      mode="widthFix"
    ></image>
    <view class="deposit-box">
      <text class="deposit-label">当前监管押金（元）</text>
      <text class="deposit-value" v-if="isLogin">1220.30</text>
      <text class="deposit-value" v-else>****.**</text>
    </view>

    <!-- 我的订单 -->
    <view class="order-section">
      <view class="section-header">
        <text class="title">我的订单</text>
        <text class="more" @click="toOrdersPage('all')">查看全部</text>
      </view>
      <view class="order-list">
        <view class="order-item" @click="toOrdersPage('toSign')">
          <image
            class="order-icon"
            src="@/static/images/icon-wait-sign.png"
          ></image>
          <text class="order-text">待签约</text>
        </view>
        <view class="order-item" @click="toOrdersPage('toPay')">
          <image
            class="order-icon"
            src="@/static/images/icon-wait-pay.png"
          ></image>
          <text class="order-text">待付款</text>
        </view>
        <view class="order-item" @click="toOrdersPage('payed')">
          <image class="order-icon" src="@/static/images/icon-paid.png"></image>
          <text class="order-text">已付款</text>
        </view>
        <view class="order-item" @click="toOrdersPage('refund')">
          <image
            class="order-icon"
            src="@/static/images/icon-refund.png"
          ></image>
          <text class="order-text">退款</text>
        </view>
      </view>
    </view>

    <!-- 我的家人 -->
    <view class="family-section">
      <view class="section-header">
        <text class="title">我的家人</text>
        <text
          class="add"
          @click="goToPage('/pages/myOldman/index?pageType=add')"
          >+ 添加家人</text
        >
      </view>
      <view class="family-content">
        <view
          class="family-item"
          @click="goToPage(`/pages/myOldman/index?pageType=edit&id=${item.id}`)"
          v-for="item in familyData"
        >
          <view class="family-info">
            <text class="family-name">{{ item.userName }}</text>
            <text class="family-age">年龄:{{ toAge(item.idNo) }}岁</text>
          </view>
          <view class="family-right">
            <view class="label">{{ toGuanxi(item.rltvRelCd) }}</view>
            <view class="arrow-right"></view>
          </view>
        </view>
        <view v-if="familyData.length === 0">暂无数据，请添加</view>
      </view>
      <!-- <view class="family-empty" v-else>暂无家人信息</view> -->
    </view>

    <!-- 通用设置 -->
    <view class="setting-section">
      <view class="title">通用设置</view>
      <view
        class="setting-item"
        @click="goToPage('/pages/realnameAuthentication/index')"
      >
        <text class="item-label">实名认证</text>
        <view class="right-box">
          <text class="item-value" v-if="isLogin">已认证</text>
          <text class="item-value" v-else>未认证</text>
          <view class="arrow-right"></view>
        </view>
      </view>
      <!-- <view class="setting-item" @click="goToPage('/pages/personMes/index')">
        <text class="item-label">个人信息</text>
        <view class="right-box">
          <text class="item-value">查看</text>
          <view class="arrow-right"></view>
        </view>
      </view> -->
    </view>

    <!-- 退出登录 -->
    <view class="logout-btn" v-if="isLogin" @click="handleLogout"
      >退出登录</view
    >
  </view>
</template>

<script setup>
import { onLoad, onShow } from "@dcloudio/uni-app";
import { ref, onMounted, getCurrentInstance } from "vue";
import { toAge } from "@/common/index";
import { checkPermissionOtherTabbar } from "@/common/permission";
const isLogin = ref(false);

// 获取公共信息
const app = getApp({
  allowDefault: true,
});
const apiSucCode = app.apiSucCode;

onMounted(() => {
  const token = uni.getStorageSync("token");
  isLogin.value = !!token;
});

const goToPage = (url) => {
  // if (!isLogin.value) {
  //   uni.showToast({ title: '请先登录', icon: 'none' })
  //   setTimeout(() => {
  //     uni.navigateTo({ url: '/pages/login/login' })
  //   }, 500)
  //   return
  // }
  uni.navigateTo({ url });
};

const toOrdersPage = (parameter) => {
  uni.navigateTo({
    url: `/pages/myOrders/index?type=${parameter}`,
  });
};

const handleLogout = () => {
  uni.showModal({
    title: "提示",
    content: "确定退出登录？",
    success: (res) => {
      if (res.confirm) {
        uni.removeStorageSync("token");
        isLogin.value = false;
        uni.reLaunch({ url: "/pages/login/index" });
      }
    },
  });
};

const familyData = ref([]); // 我的家人数据
const toGuanxi = (val) => {
  const guanxiObj = {
    0: "本人",
    1: "父亲",
    2: "母亲",
    3: "爷爷",
    4: "奶奶",
    5: "外公",
    6: "外婆",
    7: "其他家属",
  };
  return guanxiObj[val];
};

const getFamilyData = () => {
  console.log("获取老人数据");
  app
    .$request({
      url: "/api/elderInfo/list",
    })
    .then((res) => {
      familyData.value = res.data;
    });
};

onShow(() => {
  // checkPermissionOtherTabbar();
});

// 必须把方法挂载到 global
const instance = getCurrentInstance();
const proxy = instance?.proxy;

onLoad((options) => {
  proxy.getFamilyData = getFamilyData;
  getFamilyData();
});
</script>

<style scoped lang="scss">
.mine-page {
  min-height: 100vh;
  background: #f5f5f5;
  position: relative;
  // padding-bottom: 40rpx;
}

.bg-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 0;
}

.user-info {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  padding: 60rpx 30rpx 40rpx;
  .right-btn {
    display: flex;
    align-items: center;
    position: absolute;
    right: 36rpx;
    top: 50%;
    transform: translateY(-40%);
    // color: #07c160;
    .text {
      margin-right: 8rpx;
    }
  }
}
.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  background: #fff;
  margin-right: 20rpx;
}
.user-info-mes {
  display: flex;
  flex-direction: column;
}
.user-name {
  font-size: 40rpx;
  font-weight: bold;
  color: #333;
}
.user-name.unlogin {
  color: #1e2228;
}
.user-phone {
  font-size: 28rpx;
  color: #666;
  margin-top: 10rpx;
}

.bg-deposit {
  position: absolute;
  top: 200rpx;
  left: 30rpx;
  width: calc(100% - 60rpx);
  z-index: 1;
  border-radius: 20rpx;
}
.deposit-box {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx 40rpx;
  margin: 0 30rpx;
  border-radius: 20rpx;
}
.deposit-label {
  font-size: 32rpx;
  color: #fff;
  font-weight: 500;
}
.deposit-value {
  font-size: 36rpx;
  color: #333;
  font-weight: bold;
  background: #fff;
  padding: 10rpx 30rpx;
  border-radius: 40rpx;
}

.order-section {
  padding: 32rpx 0;
  background: #fff;
  margin: 30rpx 30rpx 20rpx;
  border-radius: 20rpx;
  position: relative;
  z-index: 2;
}
.section-header {
  padding: 0 32rpx;
  display: flex;
  justify-content: space-between;
  margin-bottom: 32rpx;
}
.title {
  font-size: 34rpx;
  font-weight: bold;
  color: #333;
}
.more,
.add {
  font-size: 28rpx;
  color: #828b9b;
}
.add {
  color: #07c160;
}
.order-list {
  display: flex;
  justify-content: space-around;
}
.order-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.order-icon {
  width: 80rpx;
  height: 80rpx;
  margin-bottom: 16rpx;
}
.order-text {
  font-size: 28rpx;
}

.family-section {
  background: #fff;
  margin: 0 30rpx 20rpx;
  border-radius: 20rpx;
  padding: 32rpx 0;
}
.family-content {
  padding-left: 56rpx;
  padding-right: 32rpx;
}
.family-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 0;
  .family-right {
    display: flex;
    align-items: center;
    .label {
      margin-right: 8rpx;
      color: #828b9b;
      font-size: 28rpx;
    }
  }
}
.family-info {
  display: flex;
  flex-direction: column;
}
.family-name {
  font-size: 30rpx;
  color: #1d2129;
}
.family-age {
  font-size: 24rpx;
  color: #666;
  margin-top: 6rpx;
}
.family-empty {
  text-align: center;
  padding: 30rpx 0;
  color: #999;
}

.setting-section {
  background: #fff;
  margin: 0 30rpx 20rpx;
  border-radius: 20rpx;
  padding: 32rpx 32rpx 1rpx;
  .title {
    margin-bottom: 24rpx;
  }
}
.setting-item {
  margin-bottom: 8rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32rpx 0;
  border-bottom: 2rpx solid #f5f5f5;
}
.setting-item:last-child {
  border-bottom: none;
}
.item-label {
  font-size: 32rpx;
  color: #333;
}
.item-value {
  font-size: 28rpx;
  color: #828b9b;
  margin-right: 10rpx;
}
.right-box {
  display: flex;
  align-items: center;
}

.arrow-right {
  width: 16rpx;
  height: 16rpx;
  border-top: 3rpx solid #828b9b;
  border-right: 3rpx solid #828b9b;
  transform: rotate(45deg);
  box-sizing: border-box;
}

.logout-btn {
  background: #07c160;
  color: #fff;
  text-align: center;
  line-height: 88rpx;
  font-size: 32rpx;
  border-radius: 16rpx;
  margin: 0 30rpx;
}
</style>
