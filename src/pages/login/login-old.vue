<template>
  <view class="login">
    <LoginBlock
      @showRegister="showRegister"
      @showForget="showForget"
      v-show="loginVisible"
    ></LoginBlock>
    <RegisterBlock
      @showLogin="showLogin"
      v-show="registerVisible"
    ></RegisterBlock>
    <ChangePsw @showLogin="showLogin" v-show="forgetVisible"></ChangePsw>
  </view>
</template>
<script setup>
import { ref } from "vue";
import LoginBlock from "./components/loginBlock.vue";
import RegisterBlock from "./components/register.vue";
import ChangePsw from "./components/changePsw.vue";

// 获取公共信息
const app = getApp({
  allowDefault: true,
});
const apiSucCode = app.apiSucCode; // 请求成功的相应码

const loginVisible = ref(true);
const registerVisible = ref(false);
const forgetVisible = ref(false);
const showRegister = () => {
  loginVisible.value = false;
  registerVisible.value = true;
  uni.setNavigationBarTitle({
    title: "注册",
  });
};

const showLogin = () => {
  loginVisible.value = true;
  registerVisible.value = false;
  forgetVisible.value = false;
  uni.setNavigationBarTitle({
    title: "登录",
  });
};

const showForget = () => {
  forgetVisible.value = true;
  loginVisible.value = false;
  uni.setNavigationBarTitle({
    title: "修改密码",
  });
};
</script>
<style lang="scss" scoped></style>
