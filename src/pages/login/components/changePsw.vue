<template>
  <view class="register-container">
    <!-- 手机号 -->
    <view class="form-item">
      <input
        class="input"
        type="number"
        maxlength="11"
        placeholder="请输入注册手机号码"
        v-model="form.phone"
        :class="{ error: errors.phone }"
        @blur="validatePhone"
      />
      <text v-if="errors.phone" class="error-text">{{ errors.phone }}</text>
    </view>

    <!-- 验证码 -->
    <view class="form-item code-row">
      <view class="code-input-wrap">
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

    <!-- 设置密码 -->
    <view class="form-item">
      <input
        class="input"
        type="password"
        placeholder="请设置6-20位登录密码"
        v-model="form.password"
        :class="{ error: errors.password }"
        @blur="validatePassword"
      />
      <text v-if="errors.password" class="error-text">{{
        errors.password
      }}</text>
    </view>

    <!-- 确认密码 -->
    <view class="form-item">
      <input
        class="input"
        type="password"
        placeholder="请再次确认登录密码"
        v-model="form.rePassword"
        :class="{ error: errors.rePassword }"
        @blur="validateRePassword"
      />
      <text v-if="errors.rePassword" class="error-text">{{
        errors.rePassword
      }}</text>
    </view>

    <!-- 用户协议 -->
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
    <button class="register-btn" @tap="handleRegister">提交</button>

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
  password: "",
  rePassword: "",
  agree: false,
});

// 错误提示
const errors = reactive({
  phone: "",
  code: "",
  password: "",
  rePassword: "",
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

// 密码校验
const validatePassword = () => {
  if (!form.password) {
    errors.password = "请设置密码";
    return false;
  }
  if (form.password.length < 6 || form.password.length > 20) {
    errors.password = "密码长度需为6-20位";
    return false;
  }
  errors.password = "";
  return true;
};

// 确认密码校验
const validateRePassword = () => {
  if (!form.rePassword) {
    errors.rePassword = "请再次输入密码";
    return false;
  }
  if (form.rePassword !== form.password) {
    errors.rePassword = "两次输入的密码不一致";
    return false;
  }
  errors.rePassword = "";
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
  // 校验所有字段
  const isPhoneOk = validatePhone();
  const isCodeOk = validateCode();
  const isPwdOk = validatePassword();
  const isRePwdOk = validateRePassword();

  if (!isPhoneOk || !isCodeOk || !isPwdOk || !isRePwdOk || !form.agree) {
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

<style scoped>
.register-container {
  background: #fff;
  padding: 60rpx 40rpx;
}

.form-item {
  margin-bottom: 0;
  border-bottom: 1rpx solid #eee;
}

.input {
  width: 100%;
  height: 120rpx;
  border: none;
  padding: 0 20rpx;
  font-size: 30rpx;
  box-sizing: border-box;
}

.input.error {
  color: #f56c6c;
}

.error-text {
  font-size: 24rpx;
  color: #f56c6c;
  margin: 8rpx 20rpx 16rpx;
}

.code-row {
  display: flex;
  align-items: center;
}

.code-input-wrap {
  flex: 1;
}

.send-btn {
  width: 200rpx;
  font-size: 26rpx;
  border: 1rpx solid #007aff;
  color: #007aff;
  background: #fff;
  border-radius: 8rpx;
  margin-right: 20rpx;
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

.register-btn[disabled] {
  background: #66b1ff;
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
