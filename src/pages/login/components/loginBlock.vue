<template>
  <view class="login-container">
    <!-- 手机号输入框 -->
    <view class="form-item">
      <text class="label"><text class="star">*</text>手机号</text>
      <input
        class="input"
        type="number"
        maxlength="11"
        placeholder="手机号码"
        v-model="form.phone"
        :class="{ error: errors.phone }"
        @blur="validatePhone"
      />
      <text v-if="errors.phone" class="error-text">{{ errors.phone }}</text>
    </view>

    <!-- 密码输入框（带可见切换） -->
    <view class="form-item">
      <text class="label"><text class="star">*</text>密码</text>
      <view class="pwd-wrap">
        <input
          class="input psw"
          :password="!pwdVisible"
          placeholder="登录密码"
          v-model="form.password"
          :class="{ error: errors.password }"
          @blur="validatePassword"
        />
        <view class="eye-btn" @click="switchPswType">
          <uni-icons
            v-show="pwdVisible"
            type="eye"
            size="30"
            color="#007aff"
          ></uni-icons>
          <uni-icons
            v-show="!pwdVisible"
            type="eye-slash"
            size="30"
            color="#007aff"
          ></uni-icons>
        </view>
      </view>
      <text v-if="errors.password" class="error-text">{{
        errors.password
      }}</text>
    </view>

    <!-- 验证码行 -->
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
        @click="sendCode"
      >
        {{ countdown > 0 ? `${countdown}s` : "发送验证码" }}
      </button>
    </view>

    <!-- 登录按钮（带loading） -->
    <button class="login-btn" :disabled="loading" @click="handleLogin">
      登录
    </button>

    <!-- 底部链接 -->
    <view class="bottom-links">
      <text class="link" @click="toRegister">注册新用户</text>
      <text class="link" @click="toForget">找回密码</text>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from "vue";

const app = getApp({
  allowDefault: true,
});
const apiSucCode = app.apiSucCode; // 请求成功的相应码

const emit = defineEmits(["showRegister", "showForget"]);

// 表单数据
const form = reactive({
  phone: "",
  password: "",
  code: "",
});

// 错误提示
const errors = reactive({
  phone: "",
  password: "",
  code: "",
});

// 状态
const pwdVisible = ref(false);
const isSending = ref(false);
const countdown = ref(0);
const loading = ref(false);

// 切换密码框状态
const switchPswType = () => {
  console.log("click!!!!");
  pwdVisible.value = !pwdVisible.value;
};

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

// 密码校验
const validatePassword = () => {
  if (!form.password) {
    errors.password = "请输入密码";
    return false;
  }
  if (form.password.length < 6) {
    errors.password = "密码长度不能少于6位";
    return false;
  }
  errors.password = "";
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
  // 这里替换为你的真实接口
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

// 登录
const handleLogin = async () => {
  uni.switchTab({
    url: "/pages/home/index",
  });
  // 先校验所有字段
  const isPhoneOk = validatePhone();
  const isPwdOk = validatePassword();
  const isCodeOk = validateCode();

  if (!isPhoneOk || !isPwdOk || !isCodeOk) return;

  loading.value = true;

  try {
    // 这里替换为你的真实登录接口
    console.log("登录信息", {
      phone: form.phone,
      password: form.password,
      code: form.code,
    });

    // 模拟接口请求
    await new Promise((resolve) => setTimeout(resolve, 1000));

    uni.showToast({ title: "登录成功", icon: "success" });
    // 登录成功跳转示例
    // uni.switchTab({ url: '/pages/index/index' })
  } catch (err) {
    uni.showToast({ title: "登录失败，请重试", icon: "error" });
  } finally {
    loading.value = false;
  }
};

// 跳转注册
const toRegister = () => {
  emit("showRegister");
};

// 跳转找回密码
const toForget = () => {
  emit("showForget");
};
</script>

<style scoped lang="scss">
.login-container {
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
  &.psw {
    width: 520rpx;
  }
}

.input.error {
  border-color: #f56c6c;
}

.error-text {
  font-size: 24rpx;
  color: #f56c6c;
  margin-top: 8rpx;
}

.pwd-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.eye-btn {
  font-size: 32rpx;
}

.code-row {
  display: flex;
  align-items: center;
}

.code-input-wrap {
  flex: 1;
  margin-right: 20rpx;
}

.send-btn {
  width: 200rpx;
  //   padding: 20rpx 0;
  font-size: 26rpx;
  border: 1rpx solid #007aff;
  color: #007aff;
  background: #fff;
  border-radius: 8rpx;
  margin-top: 52rpx;
}

.send-btn[disabled] {
  color: #999;
  border-color: #ccc;
}

.login-btn {
  width: 100%;
  height: 90rpx;
  line-height: 90rpx;
  background: #007aff;
  color: #fff;
  font-size: 32rpx;
  border-radius: 12rpx;
  border: none;
  margin-top: 20rpx;
}

.login-btn[disabled] {
  background: #66b1ff;
}

.loading-icon {
  margin-right: 8rpx;
}

.bottom-links {
  display: flex;
  justify-content: space-between;
  margin-top: 60rpx;
}

.link {
  color: #007aff;
  font-size: 28rpx;
}
</style>
