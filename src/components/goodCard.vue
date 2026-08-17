<template>
  <!-- 列表项组件 -->
  <view class="shop-item" @click="onClick">
    <image class="pic" :src="imgUrl(item.filePath)" mode="aspectFill"></image>
    <view class="item-content">
      <view class="item-top">
        <view class="item-name">{{ item.deptName }}</view>
        <view class="item-tag">{{
          switchinstCategCodeTolabel(item.instCategCode)
        }}</view>
      </view>
      <view class="item-bottom">
        <view class="item-address">{{ item.commAddr }}</view>
        <view class="item-area" v-if="!rightNoregion">
          <!-- <image class="area-icon" src="@/static/images/address.svg"></image> -->
          <!-- {{ item.countyAdmDiviName }} -->
          {{ item.areaName }}
        </view>
      </view>
      <view class="item-bottom">
        <view class="item-phone">{{ item.instContTel }}</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { OSS_URL } from "@/common/request";
// 获取公共信息
const app = getApp({
  allowDefault: true,
});
const apiSucCode = app.apiSucCode; // 请求成功的相应码

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  rightNoregion: {
    type: Boolean,
  },
});

const instCategCodeOptions = app.instCategCodeOptions;
const switchinstCategCodeTolabel = (val) => {
  return (
    instCategCodeOptions.find((item) => item.value === val)?.text ?? "----"
  );
};

// 图片地址拼接
const imgUrl = (val) => {
  if (val) {
    return OSS_URL + "/" + val[0];
  } else {
    return "";
  }

  // return OSS_URL + "/" + "group1/M00/05/19/FOAnG2oCyc-AO8EJAAWgJmoyn1g902.png";
};

const emit = defineEmits(["click"]);
const onClick = () => emit("click", props.item);
</script>

<style scoped>
.shop-item {
  padding: 32rpx 32rpx 0;
  display: flex;
  align-items: flex-start;
  gap: 20rpx;
}
.pic {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  background-color: #b8b8b8;
}
.item-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.item-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20rpx;
}
.item-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #1e2228;
}
.item-tag {
  background: #d2f0e3;
  color: #1eb673;
  font-size: 24rpx;
  padding: 6rpx 16rpx;
  border-radius: 8rpx;
}
.item-address {
  font-size: 26rpx;
  color: #4e5769;
  line-height: 1.4;
}
.item-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10rpx;
}
.item-phone {
  font-size: 26rpx;
  color: #4e5769;
}
.item-area {
  display: flex;
  align-items: center;
  gap: 8rpx;
  font-size: 26rpx;
  color: #4e5769;
}
.area-icon {
  width: 16px;
  height: 16px;
}
</style>
