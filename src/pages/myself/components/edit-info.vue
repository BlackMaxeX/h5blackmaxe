<template>
  <view class="container">
    <!-- 修改信息表单表格 -->
    <view class="form-box">
      <view class="table">
        <!-- 1. 昵称 -->
        <view class="tr">
          <view class="td label">昵称</view>
          <view class="td input">
            <input class="input-field" placeholder="请输入昵称" v-model="formData.nickname" />
          </view>
        </view>

        <!-- 2. 手机号 -->
        <view class="tr">
          <view class="td label">手机号</view>
          <view class="td input">
            <input class="input-field" placeholder="请输入手机号" v-model="formData.phone" />
          </view>
        </view>

        <!-- 3. 图形验证码 -->
        <view class="tr">
          <view class="td label">图形验证码</view>
          <view class="td input captcha-row">
            <input class="input-field" placeholder="输入图形验证码" v-model="formData.imgCode" />
            <view class="captcha-img" @click="refreshCaptcha">
              <text>{{ captchaText }}</text>
            </view>
          </view>
        </view>

        <!-- 4. 手机验证码 -->
        <view class="tr">
          <view class="td label">验证码</view>
          <view class="td input sms-row">
            <input class="input-field" placeholder="输入手机验证码" v-model="formData.smsCode" />
            <button class="sms-btn" :disabled="isCountDown" @click="getSmsCode">
              {{ countDownText }}
            </button>
          </view>
        </view>
      </view>
    </view>

    <!-- 保存按钮 -->
    <view class="footer">
      <button class="save-btn" @click="handleSave">保存</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  nickname: '阳阳',
  phone: '15512347890',
  imgCode: '',
  smsCode: ''
})

// 图形验证码文本（模拟）
const captchaText = ref('6 7 J h')

// 验证码倒计时相关
const isCountDown = ref(false)
const countDownText = ref('获取验证码')
let timer = null

// 刷新图形验证码
const refreshCaptcha = () => {
  // 模拟随机刷新图形验证码
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let res = ''
  for (let i = 0; i < 4; i++) {
    res += chars.charAt(Math.floor(Math.random() * chars.length)) + ' '
  }
  captchaText.value = res.trim()
}

// 获取手机验证码
const getSmsCode = () => {
  if (!formData.value.phone) {
    return uni.showToast({ title: '请先输入手机号', icon: 'none' })
  }
  
  uni.showToast({ title: '验证码已发送', icon: 'success' })
  
  // 倒计时逻辑
  let seconds = 60
  isCountDown.value = true
  countDownText.value = `${seconds}s`
  
  timer = setInterval(() => {
    seconds--
    if (seconds > 0) {
      countDownText.value = `${seconds}s`
    } else {
      clearInterval(timer)
      isCountDown.value = false
      countDownText.value = '获取验证码'
    }
  }, 1000)
}

// 保存逻辑
const handleSave = () => {
  if (!formData.value.nickname) {
    return uni.showToast({ title: '请输入昵称', icon: 'none' })
  }
  if (!formData.value.phone) {
    return uni.showToast({ title: '请输入手机号', icon: 'none' })
  }
  
  console.log('保存的数据：', formData.value)
  uni.showToast({ title: '保存成功', icon: 'success' })
  
  setTimeout(() => {
    uni.navigateBack()
  }, 1500)
}
</script>

<style scoped lang="scss">
.container {
  min-height: 100vh;
  background-color: #f7f7f7;
  padding: 30rpx;
  box-sizing: border-box;
}

.form-box {
  background-color: #fff;
  border-radius: 12rpx;
  overflow: hidden;
  margin-bottom: 60rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.02);
}

.table {
  border: 1rpx solid #eee;

  .tr {
    display: flex;
    border-bottom: 1rpx solid #eee;

    &:last-child {
      border-bottom: none;
    }
  }

  .td {
    padding: 24rpx 20rpx;
    font-size: 28rpx;
    display: flex;
    align-items: center;
  }

  .label {
    width: 220rpx;
    background-color: #fafafa;
    color: #333;
  }

  .input {
    flex: 1;
    background-color: #fff;

    .input-field {
      width: 100%;
      font-size: 28rpx;
    }
  }

  // 图形验证码行布局
  .captcha-row {
    justify-content: space-between;
    
    .input-field {
      flex: 1;
    }

    .captcha-img {
      background-color: #f0f0f0;
      padding: 6rpx 20rpx;
      border-radius: 6rpx;
      border: 1rpx solid #ddd;
      letter-spacing: 4rpx;
      font-weight: bold;
      color: #333;
      font-size: 28rpx;
      margin-left: 20rpx;
    }
  }

  // 手机验证码行布局
  .sms-row {
    justify-content: space-between;

    .input-field {
      flex: 1;
    }

    .sms-btn {
      background-color: transparent;
      color: #1890ff;
      font-size: 26rpx;
      border: none;
      padding: 0 10rpx;
      margin: 0;
      line-height: normal;

      &::after {
        border: none;
      }

      &:disabled {
        color: #999;
      }
    }
  }
}

.footer {
  display: flex;
  justify-content: center;

  .save-btn {
    width: 60%;
    background-color: #1890ff;
    color: #fff;
    border-radius: 40rpx;
    font-size: 32rpx;
    height: 80rpx;
    line-height: 80rpx;
    box-shadow: 0 4rpx 12rpx rgba(24, 144, 255, 0.3);
  }
}
</style>