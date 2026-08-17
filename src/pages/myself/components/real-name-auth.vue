<template>
  <view class="container">
    <!-- 0. 用户类型与状态快捷切换（仅用于演示时切换看效果，实际开发可根据接口角色判断） -->
    <view class="switch-bar">
      <view class="switch-item" :class="{ active: userRole === 'personal' }" @click="userRole = 'personal'">个人用户</view>
      <view class="switch-item" :class="{ active: userRole === 'institution-other' }" @click="userRole = 'institution-other'">机构用户-非我行</view>
      <view class="switch-item" :class="{ active: userRole === 'institution-my' }" @click="userRole = 'institution-my'">机构用户-我行</view>
      <view class="switch-item status-switch" @click="toggleStatus">
        状态: {{ isVerified ? '已认证' : '未认证' }} (点击切换)
      </view>
    </view>

    <!-- 1. 实名认证主表单 -->
    <view class="section-box">
      <view class="section-title">实名认证</view>
      
      <view class="form-table">
        <!-- 认证状态 -->
        <view class="tr">
          <view class="td label">认证状态</view>
          <view class="td val status-text" :class="isVerified ? 'verified' : 'unverified'">
            {{ isVerified ? '已认证' : '未认证' }}
          </view>
        </view>

        <!-- 真实姓名 -->
        <view class="tr">
          <view class="td label">真实姓名</view>
          <view class="td val">
            <text v-if="isVerified">{{ formData.realName }}</text>
            <input v-else placeholder="请输入" v-model="formData.realName" />
          </view>
        </view>

        <!-- 身份证号 -->
        <view class="tr">
          <view class="td label">身份证号</view>
          <view class="td val">
            <text v-if="isVerified">{{ formData.idCard }}</text>
            <input v-else placeholder="请输入" v-model="formData.idCard" />
          </view>
        </view>

        <!-- 所属银行（机构用户专属） -->
        <view class="tr" v-if="userRole !== 'personal'">
          <view class="td label">所属银行</view>
          <view class="td val">
            <text v-if="isVerified">{{ formData.bank }}</text>
            <input v-else placeholder="请输入" v-model="formData.bank" />
          </view>
        </view>

        <!-- 柜员号（机构用户-我行专属） -->
        <view class="tr" v-if="userRole === 'institution-my'">
          <view class="td label">柜员号</view>
          <view class="td val">
            <text v-if="isVerified">{{ formData.tellerNo }}</text>
            <input v-else placeholder="请输入" v-model="formData.tellerNo" />
          </view>
        </view>
      </view>
    </view>

    <!-- 2. 身份证照片模块 -->
    <view class="section-box">
      <view class="sub-title">身份证照片</view>
      <view class="idcard-upload-row">
        <view class="upload-box" @click="uploadImage('front')">
          <text class="upload-icon">🖼️</text>
          <text class="upload-text">上传身份证头像面</text>
        </view>
        <view class="upload-box" @click="uploadImage('back')">
          <text class="upload-icon">🖼️</text>
          <text class="upload-text">上传身份证国徽面</text>
        </view>
      </view>
      <text class="tip-text">请上传清晰的身份证照片,确保信息清晰可见</text>
    </view>

    <!-- 3. 底部提交按钮（仅在“未认证”状态下显示，流式布局不固定） -->
    <view class="footer-box" v-if="!isVerified">
      <button class="submit-btn" @click="handleSubmit">提交认证</button>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 用户角色：'personal'(个人), 'institution-other'(机构-非我行), 'institution-my'(机构-我行)
const userRole = ref('personal')

// 认证状态：false为未认证，true为已认证
const isVerified = ref(false)

// 表单数据
const formData = ref({
  realName: '',
  idCard: '',
  bank: '',
  tellerNo: ''
})

// 切换状态（方便调试查看未认证/已认证两种UI）
const toggleStatus = () => {
  isVerified.value = !isVerified.value
  if (isVerified.value) {
    // 模拟已认证的脱敏数据
    formData.value.realName = '周**'
    formData.value.idCard = '420***********8769'
    formData.value.bank = userRole.value === 'personal' ? '' : '中国邮政储蓄银行'
    formData.value.tellerNo = userRole.value === 'institution-my' ? '8888' : ''
  } else {
    formData.value = { realName: '', idCard: '', bank: '', tellerNo: '' }
  }
}

// 图片上传
const uploadImage = (type) => {
  if (isVerified.value) return // 已认证状态下可限制不可更改
  uni.showToast({ title: `上传身份证${type === 'front' ? '头像面' : '国徽面'}`, icon: 'none' })
}

// 提交认证
const handleSubmit = () => {
  if (!formData.value.realName) {
    return uni.showToast({ title: '请输入真实姓名', icon: 'none' })
  }
  if (!formData.value.idCard) {
    return uni.showToast({ title: '请输入身份证号', icon: 'none' })
  }
  
  uni.showLoading({ title: '提交中...' })
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({ title: '提交认证成功', icon: 'success' })
    isVerified.value = true
    // 自动变更为脱敏显示
    formData.value.realName = '周**'
    formData.value.idCard = '420***********8769'
    if (userRole.value !== 'personal') formData.value.bank = '兴业银行'
    if (userRole.value === 'institution-my') formData.value.tellerNo = '6666'
  }, 1000)
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

// 顶部调试切换栏样式
.switch-bar {
  display: flex;
  gap: 10rpx;
  margin-bottom: 20rpx;
  background: #fff;
  padding: 16rpx;
  border-radius: 12rpx;
  flex-wrap: wrap;

  .switch-item {
    flex: 1;
    min-width: 140rpx;
    height: 50rpx;
    line-height: 50rpx;
    text-align: center;
    font-size: 22rpx;
    background-color: #f0f2f5;
    color: #666;
    border-radius: 6rpx;

    &.active {
      background-color: #1890ff;
      color: #fff;
      font-weight: bold;
    }

    &.status-switch {
      background-color: #faad14;
      color: #fff;
      flex-grow: 2;
    }
  }
}

.section-box {
  background-color: #fff;
  border-radius: 12rpx;
  padding: 24rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.02);

  .section-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    text-align: center;
    margin-bottom: 20rpx;
  }

  .sub-title {
    font-size: 28rpx;
    font-weight: 500;
    color: #333;
    margin-bottom: 20rpx;
  }
}

.form-table {
  border-top: 1rpx solid #f0f0f0;

  .tr {
    display: flex;
    border-bottom: 1rpx solid #f0f0f0;
    align-items: center;

    &:last-child {
      border-bottom: none;
    }

    .td {
      padding: 24rpx 10rpx;
      font-size: 28rpx;
    }

    .label {
      width: 200rpx;
      color: #333;
    }

    .val {
      flex: 1;
      color: #333;

      input {
        font-size: 28rpx;
        width: 100%;
      }
    }

    .status-text {
      font-weight: 500;
      &.unverified { color: #999; }
      &.verified { color: #52c41a; }
    }
  }
}

.idcard-upload-row {
  display: flex;
  justify-content: space-between;
  gap: 20rpx;
  margin-bottom: 12rpx;

  .upload-box {
    flex: 1;
    height: 180rpx;
    border: 2rpx dashed #dcdcdc;
    border-radius: 8rpx;
    background-color: #fafafa;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .upload-icon {
      font-size: 40rpx;
      margin-bottom: 10rpx;
    }

    .upload-text {
      font-size: 24rpx;
      color: #999;
    }
  }
}

.tip-text {
  font-size: 22rpx;
  color: #bbb;
}

// 底部流式提交按钮（不固定，随页面滚动到底部才展示）
.footer-box {
  padding: 30rpx 0;

  .submit-btn {
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