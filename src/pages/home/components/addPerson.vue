<template>
  <view class="container">
    <!-- 1. 贷款人模块 -->
    <view class="section-box">
      <view class="section-label"><text class="required">*</text>贷款人</view>
      <view class="person-card" v-for="(item, index) in lenderList" :key="index">
        <view class="card-info">
          <view class="name-row">
            <text class="name">{{ item.name }}</text>
            <text class="tag lender-tag">{{ item.type }}</text>
          </view>
          <text class="phone">手机号：{{ item.phone }}</text>
        </view>
        <text class="delete-icon" @click="deletePerson('lender', index)">🗑️</text>
      </view>
      <view class="add-btn" @click="addPerson('lender')">
        <text class="plus">+</text> 添加贷款人
      </view>
    </view>

    <!-- 2. 借款人模块 -->
    <view class="section-box">
      <view class="section-label"><text class="required">*</text>借款人</view>
      <view class="person-card" v-for="(item, index) in borrowerList" :key="index">
        <view class="card-info">
          <view class="name-row">
            <text class="name">{{ item.name }}</text>
            <text class="tag">{{ item.type }}</text>
          </view>
          <text class="phone">手机号：{{ item.phone }}</text>
        </view>
        <text class="delete-icon" @click="deletePerson('borrower', index)">🗑️</text>
      </view>
      <view class="add-btn" @click="addPerson('borrower')">
        <text class="plus">+</text> 添加借款人
      </view>
    </view>

    <!-- 3. 抵押人模块 -->
    <view class="section-box">
      <view class="section-label">抵押人</view>
      <view class="person-card" v-for="(item, index) in pledgerList" :key="index">
        <view class="card-info">
          <view class="name-row"><text class="name">{{ item.name }}</text></view>
          <text class="phone">手机号：{{ item.phone }}</text>
        </view>
        <text class="delete-icon" @click="deletePerson('pledger', index)">🗑️</text>
      </view>
      <view class="add-btn" @click="addPerson('pledger')">
        <text class="plus">+</text> 添加抵押人
      </view>
    </view>

    <!-- 4. 保证人模块 -->
    <view class="section-box">
      <view class="section-label">保证人</view>
      <view class="person-card" v-for="(item, index) in guarantorList" :key="index">
        <view class="card-info">
          <view class="name-row"><text class="name">{{ item.name }}</text></view>
          <text class="phone">手机号：{{ item.phone }}</text>
        </view>
        <text class="delete-icon" @click="deletePerson('guarantor', index)">🗑️</text>
      </view>
      <view class="add-btn" @click="addPerson('guarantor')">
        <text class="plus">+</text> 添加保证人
      </view>
    </view>

    <!-- 5. 共同还款人模块 -->
    <view class="section-box">
      <view class="section-label">共同还款人</view>
      <view class="person-card" v-for="(item, index) in coPayerList" :key="index">
        <view class="card-info">
          <view class="name-row"><text class="name">{{ item.name }}</text></view>
          <text class="phone">手机号：{{ item.phone }}</text>
        </view>
        <text class="delete-icon" @click="deletePerson('coPayer', index)">🗑️</text>
      </view>
      <view class="add-btn" @click="addPerson('coPayer')">
        <text class="plus">+</text> 添加共同还款人
      </view>
    </view>

    <!-- 底部下一步按钮（改为随页面滚动展示） -->
    <view class="footer">
      <button class="next-btn" @click="handleNext">下一步</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const lenderList = ref([{ name: '邮储银行金融港支行', type: '企业代理', phone: '155****7890' }])
const borrowerList = ref([{ name: '周候', type: '个人', phone: '155****7890' }])
const pledgerList = ref([])
const guarantorList = ref([])
const coPayerList = ref([])

const addPerson = (type) => {
  uni.navigateTo({ url: `/pages/person/edit-person?type=${type}` })
}

const deletePerson = (type, index) => {
  if (type === 'lender') lenderList.value.splice(index, 1)
  else if (type === 'borrower') borrowerList.value.splice(index, 1)
  else if (type === 'pledger') pledgerList.value.splice(index, 1)
  else if (type === 'guarantor') guarantorList.value.splice(index, 1)
  else if (type === 'coPayer') coPayerList.value.splice(index, 1)
}

const handleNext = () => {
  if (lenderList.value.length === 0 || borrowerList.value.length === 0) {
    return uni.showToast({ title: '贷款人与借款人为必填项', icon: 'none' })
  }
  uni.navigateTo({ url: '/pages/home/components/contract-info' })
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
}

.section-label { 
  font-size: 28rpx; 
  color: #333; 
  margin-bottom: 20rpx; 
  .required { 
    color: #ff4d4f; 
  } 
}

.person-card { 
  background-color: #fafafa; 
  border: 2rpx solid #eee; 
  border-radius: 8rpx; 
  padding: 20rpx; 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  margin-bottom: 20rpx; 
}

.name { 
  font-size: 30rpx; 
  font-weight: bold; 
}

.add-btn { 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  border: 2rpx dashed #1890ff; 
  padding: 20rpx 0; 
  color: #1890ff; 
  background-color: #f0f8ff; 
  border-radius: 8rpx;
}

/* 修改处：取消 fixed 固定定位，改为普通流式布局，随滚动条拉到最底部才显示 */
.footer { 
  padding: 30rpx 0 50rpx 0; 
  background: transparent; 
  box-shadow: none; 
}

.next-btn { 
  background-color: #1890ff; 
  color: #fff; 
  border-radius: 40rpx; 
  font-size: 32rpx;
  height: 84rpx;
  line-height: 84rpx;
}
</style>[cite: 5]