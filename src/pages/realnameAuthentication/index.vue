<template>
  <view class="realname-authentication">
    <view class="top-block">
      <view class="left-c">
        <view class="tit">认证状态</view>
        <view class="tips">请"担保人实名认证"后可使用更多功能</view>
      </view>
      <view class="right-c">未认证</view>
    </view>
    <view class="form-block">
      <uni-forms :modelValue="formData" :rules="formRules" ref="formRef">
        <view class="form-item">
          <view class="border-out">
            <view class="label">真实姓名</view>
            <uni-forms-item name="userName">
              <uni-easyinput
                v-model.trim="formData.userName"
                placeholder="请输入"
              ></uni-easyinput>
            </uni-forms-item>
          </view>
        </view>
        <view class="form-item">
          <view class="border-out">
            <view class="label">身份证号</view>
            <uni-forms-item name="idNo">
              <uni-easyinput
                v-model.trim="formData.idNo"
                placeholder="请输入"
              ></uni-easyinput>
            </uni-forms-item>
          </view>
        </view>
      </uni-forms>
    </view>
    <view class="idcard-block">
      <view class="idcard-out">
        <view class="tit">身份证照片</view>
        <view class="idcard-c">
          <view class="item" @click="getLocalImg('z')">
            <template v-if="!realImgz">
              <view class="default">
                <image
                  class="imc-con"
                  :src="idcardDefaultImg"
                  mode="aspectFit"
                ></image>
                <view class="text">拍摄身份证人像面</view>
              </view>
            </template>
            <template v-else>
              <view class="real-img">
                <image
                  class="real-img-i"
                  :src="realImgz"
                  mode="aspectFit"
                ></image>
                <view class="idcard-cover">
                  <image
                    class="idcard-cover-i"
                    mode="aspectFit"
                    :src="idcardCover"
                  ></image>
                </view>
              </view>
            </template>
          </view>
          <view class="item" @click="getLocalImg('f')">
            <template v-if="!realImgf">
              <view class="default">
                <image
                  class="imc-con"
                  :src="idcardDefaultImg"
                  mode="aspectFit"
                ></image>
                <view class="text">拍摄身份证国徽面</view>
              </view>
            </template>
            <template v-else>
              <view class="real-img">
                <image
                  class="real-img-i"
                  :src="realImgf"
                  mode="aspectFit"
                ></image>
                <view class="idcard-cover">
                  <image
                    class="idcard-cover-i"
                    mode="aspectFit"
                    :src="idcardCover"
                  ></image>
                </view>
              </view>
            </template>
          </view>
        </view>
        <view class="error-mes" v-if="shenFenValid">身份证照片必传</view>
        <view class="bottom-tips">
          请上传清晰的身份证照片,确保信息清晰可见
        </view>
      </view>
    </view>
    <view class="btn-out">
      <button class="btn" type="default" @click="save" :loading="loading">
        提交认证
      </button>
    </view>
  </view>
</template>
<script setup>
import { ref, reactive, watch, toRefs, defineProps, computed } from "vue";
// 身份证图片默认背景图
import idcardDefaultImg from "@/static/images/home/idCardDefault.png";
// 身份证图片认证遮挡图
import idcardCover from "@/static/images/home/idcardCover.png";
// 身份证照片获取手机照片
const realImgz = ref(null); // 正面图
const realImgf = ref(null); // 反面图
const shenFenValid = ref(false);
// 获取手机图片
const getLocalImg = (type) => {
  // type: z->正面 f->反面
  shenFenValid.value = false; // 暂时清掉校验信息，保存时会再次验证
  uni.chooseMedia({
    count: 1, // 最多选几张图
    mediaType: ["image"], // 文件类型，限定为图片
    success: (res) => {
      // 成功回调函数
      console.log("res!", res);
      const tempObj = {
        z: realImgz.value,
        f: realImgf.value,
      };
      tempObj[type] = res.tempFiles[0].tempFilePath;
      // 身份证需要走行内ocr系统
      if (["z", "f"].includes(type)) {
      }
    },
    fail: (err) => {
      // 失败回调函数
      console.log("err!", err);
    },
  });
};

// 表单数据
let formData = reactive({
  userName: "", // 姓名
  idNo: "",
});

// 表单规则
const formRules = {
  userName: {
    rules: [
      {
        required: true,
        errorMessage: "真实姓名必填",
      },
      {
        maxLength: 20,
        errorMessage: "真实姓名最大长度为20",
      },
    ],
  },
  idNo: {
    rules: [
      {
        required: true,
        errorMessage: "身份证号必填",
      },
      {
        pattern: /^\d{17}[\dX]$/,
        errorMessage: "身份证号格式不正确",
      },
    ],
  },
};
//
const save = () => {
  if (!realImgz.value || !realImgf.value) {
    shenFenValid.value = true;
  } else {
    shenFenValid.value = false;
  }
  formRef.value.validate((err, formData) => {
    if (!err && !shenFenValid.value) {
      console.log("formData", formData);
      let params = {};
      params = { ...formData };
      // 身份证正面图路径
      params.idcardFtsdPicPath = uni
        .getFileSystemManager()
        .readFileSync(realImgz.value);
      // 身份证反面图路径
      params.picAddr = uni.getFileSystemManager().readFileSync(realImgf.value);
      // 亲属关系证明图片路径
      if (filePathImg.value) {
        params.filePath = uni
          .getFileSystemManager()
          .readFileSync(filePathImg.value);
      }

      console.log("params!前", params);
      let url = "用户实名认证";

      uni.uploadFile({
        url,

        // 这里不能空着，会报错
        filePath: realImgz.value,

        // 这里不能空着，会报错
        name: "demo",
        formData: params,

        // token 照常放
        // header: {
        //   'Authorization': 'Bearer ' + uni.getStorageSync('token')
        // },

        success: (res) => {
          console.log("上传成功", res.data);
          uni.navigateBack({
            delta: 1,
            success: () => {
              // 获取页面栈
              const pages = getCurrentPages();
              // 取上一页
              const prevPage = pages[pages.length - 2];
              if (prevPage && prevPage.$vm) {
                // 更新上一页的认证状态
              }
            },
          });
        },
        fail: (err) => {
          console.log("上传失败", err);
        },
      });
    }
  });
  // let params = new FormData(); 小程序不支持 FormData
};
</script>
<style lang="scss" scoped>
.realname-authentication {
  box-sizing: border-box;
  padding-top: 24rpx;
  min-height: 100vh;
  background-color: #f2f4f7;
  .top-block {
    padding: 20rpx 32rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    .left-c {
      .tit {
        margin-bottom: 16rpx;
        color: #1e2228;
        font-size: 32rpx;
        font-weight: 600;
      }
      .tips {
        color: #828b9b;
        font-size: 24rpx;
      }
    }
    .right-c {
      color: #f63939;
      font-size: 28rpx;
    }
  }
  .form-block {
    margin-top: 24rpx;
    .uni-forms {
      .form-item {
        padding: 0 32rpx;
        background-color: #fff;
        .border-out {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          height: 88rpx;
          border-bottom: 1rpx solid #e4e7ed;
          position: relative;

          .label {
            width: 220rpx;
            font-size: 28rpx;
            color: #1e2228;
          }
        }
        ::v-deep .uni-forms-item {
          flex-grow: 1;
          font-size: 28rpx;
          margin-bottom: 0;
          .content-clear-icon.easyinput--content-clear-icon {
            padding: 0;
          }
          .uni-icons.icons--uni-icons.uniui-clear.icons--uniui-clear {
            font-size: 48rpx !important;
          }
          .uni-date__icon-clear {
            padding: 0;
          }
          .uni-easyinput__content {
            border: 0;
          }
          .uni-easyinput__content-input {
            padding: 0 !important;
            border: 0;
          }

          .select--align-left {
            padding-left: 10rpx;
          }
          .input-placeholder {
            font-size: 28rpx;
            color: #a6aebd;
          }
          .select--uni-select__input-placeholder,
          .data-picker--placeholder {
            font-size: 28rpx;
            color: #a6aebd;
          }
          .select--uni-select {
            padding: 0;
            border: 0;
          }
          .wx-radio-wrapper {
            margin-top: 12rpx;
            margin-right: 24rpx;
            .wx-radio-input {
              width: 40rpx;
              height: 40rpx;
            }
          }
          .datetime-picker--uni-date-x--border {
            border: 0;
          }
          .icons--uniui-calendar:before {
            display: none;
          }
          .datetime-picker--uni-date__x-input {
            left: -6rpx;
            color: #a6aebd;
          }
          .uni-forms-item__error {
            z-index: 2;
          }
          .uni-forms-item__error {
            padding-top: 0;
          }
          .data-picker--input-value-border {
            border: 0;
            padding: 0;
          }
          // v-deep end
        }
      }
    }
  }
  .idcard-block {
    margin-top: 24rpx;
    padding: 24rpx 32rpx;
    background-color: #fff;
    .idcard-out {
      // 身份证模块
      .tit {
        margin-bottom: 40rpx;
        font-size: 32rpx;
        color: #1e2228;
        font-weight: 600;
      }
      .idcard-c {
        display: flex;
        justify-content: space-between;
        .item {
          width: 327rpx;
          height: 240rpx;
          border-radius: 8px;
          box-shadow: 0px 4px 24px 0px #6465661e;
          .default {
            display: flex;
            flex-flow: column;
            align-items: center;
            .imc-con {
              margin-top: 36rpx;
              margin-bottom: 22rpx;
              width: 167rpx;
              height: 110rpx;
            }
            .text {
              font-size: 24rpx;
              color: #828b9b;
            }
          }
          .real-img {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 327rpx;
            height: 240rpx;
            .real-img-i {
              width: 280rpx;
              height: 176rpx;
            }
            .idcard-cover {
              position: absolute;
              width: 327rpx;
              height: 240rpx;
              left: 0;
              top: 0;
              overflow: hidden;
              .idcard-cover-i {
                position: absolute;
                top: -28rpx;
                right: -28rpx;
                width: 170rpx;
                height: 170rpx;
              }
            }
          }
        }
      }
      .error-mes {
        padding: 12rpx 0 0 32rpx;
        font-size: 24rpx;
        color: #f56c6c;
      }
      .bottom-tips {
        margin-top: 32rpx;
        font-size: 24rpx;
        color: #828b9b;
      }
    }
  }
  .btn-out {
    position: fixed;
    z-index: 3;
    padding-top: 16rpx;
    padding-bottom: 60rpx;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    .btn {
      background-color: #1eb673;
      margin: 0 auto;
      width: 686rpx;
      height: 88rpx;
      line-height: 88rpx;
      text-align: center;
      border-radius: 8rpx;
      color: #fff;
      font-size: 28rpx;
    }
  }
}
</style>
