<template>
  <view class="content">
    <view class="logo-out">
      <image class="logo" :src="getLogo" />
    </view>

    <view class="text-area">
      <text class="title">智慧公证</text>
    </view>
    <view class="btn-out">
      <!-- 让这个容器变成横向 Flex 并居中 -->
      <view class="btn-row">
          <button class="btn-login" type="default" @click="loginFn" :loading="loading">
            <text>机构</text>
            <text>用户</text>
          </button>
          <button class="btn-login" type="default" @click="loginFn" :loading="loading">
            <text>个人</text>
            <text>用户</text>
          </button>
      </view>
      <button class="btn-refuse" type="default" @click="notLogin">不允许</button>
    </view>
    <view class="protocol">
      <checkbox-group class="checkbox" @change="protocolChange">
        <checkbox
          value="agree"
          :checked="protocolAgree"
          activeBackgroundColor="#466FFF"
          activeBorderColor="#466FFF"
          iconColor="#fff"
        ></checkbox>
      </checkbox-group>
      <view class="text">
        <text>为了更好的保障您的合法权益，请您阅读并同意一下协议</text>
        <navigator class="blue inline" url="/pages/protocol/index"
          ><text>《用户服务协议》</text></navigator
        >和<navigator class="blue inline" url="/pages/secretText/index"
          ><text class="blue">《隐私政策》</text></navigator
        >
      </view>
    </view>
    <uni-popup type="center" ref="popupProtocol">
      <view class="diy-alert-box">
        <view class="tit">服务政策和隐私协议</view>
        <view class="con">
          <text>为了更好的保障您的合法权益，请您阅读并同意一下协议</text>
          <navigator class="blue inline" url="/pages/protocol/index"
            ><text>《用户服务协议》</text></navigator
          >和<navigator class="blue inline" url="/pages/secretText/index"
            ><text class="blue">《隐私政策》</text></navigator
          >
        </view>
        <view class="foot">
          <view class="btn retohome" @click="retoCurPage">返回</view>
          <button class="btn bind" :loading="loading" @click="agreeAndLogin">
            同意并登录
          </button>
        </view>
      </view>
    </uni-popup>
    <uni-popup type="center" ref="bindPhoneBox" :mask-click="false">
      <view class="diy-alert-box">
        <view class="tit">绑定手机号</view>
        <view class="con"
          >为了更好的为您提供服务，建议绑定手机号，以便您及时接收通知！</view
        >
        <view class="foot">
          <!-- <view class="btn retohome" @click="retohomePage">返回首页</view> -->
          <view class="btn bind" @click="gotoBind">去绑定</view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onReady } from "@dcloudio/uni-app";
// 获取公共信息
const app = getApp({
  allowDefault: true,
});
const apiSucCode = app.apiSucCode; // 请求成功的相应码

const getLogo = ``;

// 点击不允许
const notLogin = () => {
  uni.reLaunch({
    url: "/pages/home/index",
  });
};
// 点击微信登录

const popupProtocol = ref(null); //未同意服务协议时的提示弹框
const loginFn = () => {
  if (loading.value) {
    return;
  }
  if (!protocolAgree.value) {
    // 未同意协议
    popupProtocol.value.open();
  } else {
    // 同意协议
    getLoginToken();
  }
};
// 登录loading标记
const loading = ref(false);
// 获取登录token，根据返回结果，判断是否提示绑定手机号，并跳转首页
const getLoginToken = () => {
  uni.login({
    success(res) {
      console.log("res!", res);
      const params = {
        jsCode: res.code,
        grantType: "authorization_code", // 授权类型，写死
      };

      loading.value = true;
      app
        .$request({
          url: "/api/sysUser/login",
          data: params,
        })
        .then((res) => {
          console.log("res", res);
          loading.value = false;
          if (res.code == apiSucCode) {
            // 登录成功
            popupProtocol.value.close();
            const data = res.data;
            // 获取token，存储token
            uni.setStorageSync("token", data.token);

            // 通过 phoneSaveFlagp（是否保存过手机号） 判断是否 弹出提示手机号绑定的框框
            if (data.phoneSaveFlag == "0") {
              // 未保存手机号情况下,需要重新绑定
              bindPhoneBox.value.open();
              uni.setStorageSync("phoneBindFlag", "0"); // 没绑定手机号的状态-0
            } else {
              // 已保存手机号，直接跳转首页
              uni.setStorageSync("phoneBindFlag", "1"); // 绑定手机号的状态-1
              uni.redirectTo({
                url: "/pages/home/index",
              });
            }
          }
        })
        .catch((err) => {
          loading.value = false;
        });
    },
    fail(err) {
      console.log("err", err);
      uni.showToast({ duration: 2000, title: "登录出问题", icon: "error" });
    },
  });
};

const retoCurPage = () => {
  popupProtocol.value.close();
};

const bindPhoneBox = ref(null); //绑定手机号的弹框
const retohomePage = () => {
  // 点击返回首页按钮
  bindPhoneBox.value.close();
  uni.redirectTo({
    url: "/pages/home/index",
  });
};
const gotoBind = () => {
  // 跳转绑定手机号页面
  uni.navigateTo({
    url: "/pages/photoBind/index",
  });
};

let protocolAgree = ref(false); // 是否同意了服务协议，默认false没同意
const protocolChange = <T,>(val: { detail: { value: [] } }) => {
  // 点击是否同意协议的复选按钮
  if (val.detail?.value.length > 0) {
    protocolAgree.value = true;
  } else {
    protocolAgree.value = false;
  }
};

// 服务政策和隐私协议的提示弹框，点击同意并登录
const agreeAndLogin = () => {
  if (loading.value) {
    return;
  }
  protocolAgree.value = true; // 页面上复选框同步勾选上
  getLoginToken();
};
</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* 按钮外层容器占满整行并居中 */
  .btn-out {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20rpx;
  }

  /* 核心：控制两个按钮水平并排 */
  .btn-row {
    display: flex;
    align-items: center;
    gap: 40rpx;                 /* 两个正方形按钮之间的间距 */
    margin-bottom: 30rpx;
    margin-top: 30rpx;
  }

  /* 单个按钮样式保持不变或微调 */
  .btn-login {
    width: 180rpx;
    height: 180rpx;
    background-color: #466fff;
    color: #fff;
    font-size: 36rpx;
    border-radius: 24rpx;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 1.3;
  }

  /*自定义弹框样式  确认，取消*/
  ::v-deep .diy-alert-box {
    width: 622rpx;
    background-color: #fff;
    border-radius: 16rpx;
    .tit {
      padding-top: 52rpx;
      color: #1e2228;
      font-size: 32rpx;
      text-align: center;
    }
    .con {
      margin: 16rpx 48rpx;
      color: #828b9b;
      line-height: 40rpx;
      font-size: 28rpx;
      .inline {
        display: inline;
      }
      .blue {
        color: #466fff;
      }
    }
    .foot {
      margin-top: 52rpx;
      display: flex;
      justify-content: space-between;
      border-top: 2rpx solid #e4e7ed;
      .btn {
        background-color: #fff;
        text-align: center;
        width: 50%;
        font-size: 32rpx;
        height: 96rpx;
        line-height: 96rpx;
      }
      .retohome {
        color: #1e2228;
        border-right: 2rpx solid #e4e7ed;
      }
      .bind {
        flex-grow: 1;
        color: #466fff;
      }
    }
  }
}
.logo-out {
  margin-top: 160rpx;
  width: 224rpx;
  height: 224rpx;
  background: #999;
  border-radius: 50%;
  overflow: hidden;
  .logo {
    width: 224rpx;
    height: 224rpx;
  }
}

.text-area {
  margin-top: 46rpx;
  display: flex;
  justify-content: center;
}
.title {
  font-size: 36rpx;
  color: #3d3d3d;
}

.btn-refuse {
  margin-top: 32rpx;
  width: 630rpx;
  height: 88rpx;
  background-color: transparent;
  color: #466fff;
  font-size: 32rpx;
  border-radius: 44rpx;
  border: 2rpx solid #466fff;
}
.protocol {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 46rpx;
  width: 630rpx;
  .text {
    margin-left: 16rpx;
    font-size: 28rpx;
    line-height: 40rpx;
    color: #828b9b;
    .inline {
      display: inline;
    }
    .blue {
      color: #466fff;
    }
  }
  ::v-deep .wx-checkbox-input {
    width: 40rpx;
    height: 40rpx;
    border-radius: 50%;
    margin-right: 0;
    &.wx-checkbox-input-checked {
      background-color: #466fff;
      border-color: #466fff;
    }
  }
  ::v-deep .wx-checkbox-input.wx-checkbox-input-checked:before {
    color: #fff;
  }
}
uni-navigator {
  display: inline-block;
}
</style>
