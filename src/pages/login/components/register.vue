<template>
  <view class="register-container">
    <!-- 手机号输入框 -->
    <view class="form-item">
      <text class="label"><text class="star">*</text>手机号</text>
      <input
        class="input"
        type="number"
        maxlength="11"
        v-model="form.phone"
        :class="{ error: errors.phone }"
        @blur="validatePhone"
        placeholder="请输入注册手机号码"
      />
      <text v-if="errors.phone" class="error-text">{{ errors.phone }}</text>
    </view>

    <!-- 验证码输入框 -->
    <view class="form-item code-row">
      <view class="code-input-wrap">
        <text class="label"><text class="star">*</text>验证码</text>
        <input
          class="input"
          type="number"
          maxlength="6"
          placeholder="请输入短信验证码"
          v-model="form.code"
          :class="{ error: errors.code }"
          @blur="validateCode"
        />
        <text v-if="errors.code" class="error-text">{{ errors.code }}</text>
      </view>
      <button
        class="send-btn"
        :disabled="isSending || countdown > 0"
        @tap="sendCode"
      >
        {{ countdown > 0 ? `${countdown}s` : "发送验证码" }}
      </button>
    </view>

    <!-- 用户协议勾选 -->
    <view class="agreement">
      <view
        class="checkbox"
        :class="{ checked: form.agree }"
        @tap="form.agree = !form.agree"
      >
        <text v-if="form.agree" class="check-icon">✓</text>
      </view>
      <text class="text">
        同意
        <text class="link-text" @tap="openProtocol">《用户服务协议》</text>
      </text>
    </view>

    <!-- 注册按钮 -->
    <button class="register-btn" @tap="handleRegister">
      <text v-if="loading" class="loading-icon">⏳</text>
      {{ loading ? "注册中..." : "注册" }}
    </button>

    <!-- 底部登录入口 -->
    <view class="login-link" @tap="toLogin"> 已有账户，立即登录 </view>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";

const emit = defineEmits(["showLogin"]);

// 表单数据
const form = reactive({
  phone: "",
  code: "",
  agree: false,
});

// 错误提示
const errors = reactive({
  phone: "",
  code: "",
});

// 状态
const isSending = ref(false);
const countdown = ref(0);
const loading = ref(false);

// 手机号校验
const validatePhone = () => {
  if (!form.phone) {
    errors.phone = "请输入手机号";
    return false;
  }
  if (!/^1[3-9]\d{9}$/.test(form.phone)) {
    errors.phone = "请输入正确的手机号";
    return false;
  }
  errors.phone = "";
  return true;
};

// 验证码校验
const validateCode = () => {
  if (!form.code) {
    errors.code = "请输入验证码";
    return false;
  }
  if (form.code.length !== 6) {
    errors.code = "请输入6位验证码";
    return false;
  }
  errors.code = "";
  return true;
};

// 发送验证码
const sendCode = () => {
  if (!validatePhone()) return;

  isSending.value = true;
  console.log("发送验证码到", form.phone);

  // 倒计时
  countdown.value = 60;
  const timer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(timer);
      isSending.value = false;
    }
  }, 1000);

  uni.showToast({ title: "验证码已发送", icon: "none" });
};

// 注册
const handleRegister = async () => {
  // 校验
  const isPhoneOk = validatePhone();
  const isCodeOk = validateCode();
  if (!isPhoneOk || !isCodeOk || !form.agree) {
    if (!form.agree) {
      uni.showToast({ title: "请先同意用户协议", icon: "none" });
    }
    return;
  }

  loading.value = true;

  try {
    // 这里替换为你的注册接口
    console.log("注册信息", form);

    // 模拟接口请求
    await new Promise((resolve) => setTimeout(resolve, 1000));

    uni.showToast({ title: "注册成功", icon: "success" });
    // 注册成功后跳转到登录页
    uni.navigateBack();
  } catch (err) {
    uni.showToast({ title: "注册失败，请重试", icon: "error" });
  } finally {
    loading.value = false;
  }
};

// 打开用户协议
const openProtocol = () => {
  uni.showModal({
    title: "用户服务协议",
    content: "这里是用户服务协议的内容...",
    confirmText: "同意",
    cancelText: "不同意",
    success: (res) => {
      if (res.confirm) {
        form.agree = true;
      }
    },
  });
};

// 跳转到登录页
const toLogin = () => {
  emit("showLogin");
};
</script>

<style scoped lang="scss">
.register-container {
  background: #fff;
  border-radius: 20rpx;
  margin: 40rpx;
  padding: 60rpx 40rpx;
  box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
}

.form-item {
  margin-bottom: 40rpx;
}

.label {
  display: block;
  font-size: 30rpx;
  color: #333;
  margin-bottom: 16rpx;
}

.star {
  color: red;
}

.input {
  width: 100%;
  height: 90rpx;
  border: 1rpx solid #ddd;
  border-radius: 8rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
  box-sizing: border-box;
}

.input.error {
  border-color: #f56c6c;
}

.error-text {
  font-size: 24rpx;
  color: #f56c6c;
  margin-top: 8rpx;
}

.code-row {
  display: flex;
  align-items: flex-start;
}

.code-input-wrap {
  flex: 1;
  margin-right: 20rpx;
}

.send-btn {
  width: 200rpx;
  font-size: 26rpx;
  border: 1rpx solid #007aff;
  color: #007aff;
  background: #fff;
  border-radius: 8rpx;
  margin-top: 60rpx;
}

.send-btn[disabled] {
  color: #999;
  border-color: #ccc;
}

.agreement {
  display: flex;
  align-items: center;
  margin: 40rpx 0;
}

.checkbox {
  width: 40rpx;
  height: 40rpx;
  border: 1rpx solid #007aff;
  border-radius: 4rpx;
  margin-right: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox.checked {
  background: #007aff;
}

.check-icon {
  color: #fff;
  font-size: 26rpx;
}

.text {
  font-size: 28rpx;
  color: #333;
}

.link-text {
  color: #007aff;
}

.register-btn {
  width: 100%;
  height: 90rpx;
  line-height: 90rpx;
  background: #007aff;
  color: #fff;
  font-size: 32rpx;
  border-radius: 12rpx;
  border: none;
}

.loading-icon {
  margin-right: 8rpx;
}

.login-link {
  text-align: center;
  margin-top: 60rpx;
  font-size: 28rpx;
  color: #007aff;
}
</style>
