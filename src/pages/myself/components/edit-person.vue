<template>
  <view class="container">
    <!-- 1. 人员类型切换模块 -->
    <view class="section-box">
      <view class="section-label"><text class="required">*</text>人员类型</view>
      <view class="type-tabs">
        <view 
          class="tab-btn" 
          v-for="(item, index) in typeList" 
          :key="index"
          :class="{ active: currentType === item.value }"
          @click="switchType(item.value)"
        >
          {{ item.label }}
        </view>
      </view>
    </view>

    <!-- 2. 个人信息模块（【个人】、【个人经办】时显示） -->
    <view class="section-box" v-if="currentType === 'personal' || currentType === 'personal-agent'">
      <view class="section-label"><text class="required">*</text>个人信息</view>
      
      <view class="sub-block">
        <text class="sub-title">身份证照片</text>
        <view class="idcard-upload-row">
          <view class="upload-box" @click="uploadIdCard('personal', 'front')">
            <text class="upload-icon">🖼️</text>
            <text class="upload-text">上传身份证头像面</text>
          </view>
          <view class="upload-box" @click="uploadIdCard('personal', 'back')">
            <text class="upload-icon">🖼️</text>
            <text class="upload-text">上传身份证国徽面</text>
          </view>
        </view>
        <text class="tip-text">请上传清晰的身份证照片，确保信息清晰可见</text>
      </view>

      <view class="form-table">
        <view class="tr"><view class="td label">姓名</view><view class="td val"><input placeholder="请输入姓名" v-model="form.personal.name" /></view></view>
        <view class="tr"><view class="td label">身份证号</view><view class="td val"><input placeholder="请输入身份证号" v-model="form.personal.idCard" /></view></view>
        <view class="tr"><view class="td label">手机号码</view><view class="td val"><input placeholder="请输入手机号码" v-model="form.personal.phone" /></view></view>
        <view class="tr"><view class="td label">户籍地址</view><view class="td val"><input placeholder="请输入户籍地址" v-model="form.personal.address" /></view></view>
      </view>
    </view>

    <!-- 3. 企业信息模块（【企业】、【企业经办】时显示） -->
    <view class="section-box" v-if="currentType === 'enterprise' || currentType === 'enterprise-agent'">
      <view class="section-label"><text class="required">*</text>企业信息</view>
      
      <view class="sub-block">
        <view class="license-upload-box" @click="uploadLicense">
          <text class="license-icon">🏢</text>
          <text class="license-text">点击上传营业执照</text>
        </view>
      </view>

      <view class="form-table">
        <view class="tr"><view class="td label">企业名称</view><view class="td val"><input placeholder="请输入企业名称" v-model="form.enterprise.name" /></view></view>
        <view class="tr"><view class="td label">统一社会信用代码</view><view class="td val"><input placeholder="请输入统一社会信用代码" v-model="form.enterprise.code" /></view></view>
        <view class="tr"><view class="td label">企业地址</view><view class="td val"><input placeholder="请输入企业地址" v-model="form.enterprise.address" /></view></view>
      </view>
    </view>

    <!-- 4. 法人信息模块（【企业】、【企业经办】时显示） -->
    <view class="section-box" v-if="currentType === 'enterprise' || currentType === 'enterprise-agent'">
      <view class="section-label"><text class="required">*</text>法人信息</view>
      
      <view class="sub-block">
        <text class="sub-title">身份证照片</text>
        <view class="idcard-upload-row">
          <view class="upload-box" @click="uploadIdCard('legal', 'front')">
            <text class="upload-icon">🖼️</text>
            <text class="upload-text">上传身份证头像面</text>
          </view>
          <view class="upload-box" @click="uploadIdCard('legal', 'back')">
            <text class="upload-icon">🖼️</text>
            <text class="upload-text">上传身份证国徽面</text>
          </view>
        </view>
        <text class="tip-text">请上传清晰的身份证照片，确保信息清晰可见</text>
      </view>

      <view class="form-table">
        <view class="tr"><view class="td label">姓名</view><view class="td val"><input placeholder="请输入法人姓名" v-model="form.legal.name" /></view></view>
        <view class="tr"><view class="td label">身份证号</view><view class="td val"><input placeholder="请输入身份证号" v-model="form.legal.idCard" /></view></view>
        <view class="tr"><view class="td label">手机号码</view><view class="td val"><input placeholder="请输入手机号码" v-model="form.legal.phone" /></view></view>
        <view class="tr"><view class="td label">户籍地址</view><view class="td val"><input placeholder="请输入户籍地址" v-model="form.legal.address" /></view></view>
      </view>
    </view>

    <!-- 5. 代理人信息模块（【个人经办】、【企业经办】时显示） -->
    <view class="section-box" v-if="currentType === 'personal-agent' || currentType === 'enterprise-agent'">
      <view class="section-label"><text class="required">*</text>代理人信息</view>
      
      <view class="sub-block">
        <text class="sub-title">身份证照片</text>
        <view class="idcard-upload-row">
          <view class="upload-box" @click="uploadIdCard('agent', 'front')">
            <text class="upload-icon">🖼️</text>
            <text class="upload-text">上传身份证头像面</text>
          </view>
          <view class="upload-box" @click="uploadIdCard('agent', 'back')">
            <text class="upload-icon">🖼️</text>
            <text class="upload-text">上传身份证国徽面</text>
          </view>
        </view>
        <text class="tip-text">请上传清晰的身份证照片，确保信息清晰可见</text>
      </view>

      <view class="form-table">
        <view class="tr"><view class="td label">姓名</view><view class="td val"><input placeholder="请输入代理人姓名" v-model="form.agent.name" /></view></view>
        <view class="tr"><view class="td label">身份证号</view><view class="td val"><input placeholder="请输入身份证号" v-model="form.agent.idCard" /></view></view>
        <view class="tr"><view class="td label">手机号码</view><view class="td val"><input placeholder="请输入手机号码" v-model="form.agent.phone" /></view></view>
        <view class="tr"><view class="td label">户籍地址</view><view class="td val"><input placeholder="请输入户籍地址" v-model="form.agent.address" /></view></view>
        <view class="tr"><view class="td label">与被代理人关系</view><view class="td val"><input placeholder="请输入与被代理人关系" v-model="form.agent.relation" /></view></view>
      </view>
    </view>

    <!-- 6. 底部流式双按钮（不固定，随页面滚动展示） -->
    <view class="footer-box">
      <button class="footer-btn cancel-btn" @click="handleCancel">取消</button>
      <button class="footer-btn submit-btn" @click="handleSubmit">提交</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 4种人员类型
const typeList = ref([
  { label: '个人', value: 'personal' },
  { label: '个人经办', value: 'personal-agent' },
  { label: '企业', value: 'enterprise' },
  { label: '企业经办', value: 'enterprise-agent' }
])

// 默认选中“个人”
const currentType = ref('personal')

// 表单数据双向绑定对象
const form = ref({
  personal: { name: '', idCard: '', phone: '', address: '' },
  enterprise: { name: '', code: '', address: '' },
  legal: { name: '', idCard: '', phone: '', address: '' },
  agent: { name: '', idCard: '', phone: '', address: '', relation: '' }
})

// 切换人员类型
const switchType = (val) => {
  currentType.value = val
}

// 模拟上传图片
const uploadIdCard = (target, type) => {
  uni.showToast({ title: `上传${target}身份证${type}`, icon: 'none' })
}

const uploadLicense = () => {
  uni.showToast({ title: '上传营业执照', icon: 'none' })
}

// 取消
const handleCancel = () => {
  uni.navigateBack()
}

// 提交
const handleSubmit = () => {
  uni.showToast({ title: '提交成功', icon: 'success' })
  setTimeout(() => {
    uni.navigateBack()
  }, 1500)
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
    box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.02);
    }

    .section-label {
    font-size: 28rpx;
    color: #333;
    margin-bottom: 20rpx;
    font-weight: 500;
    .required {
        color: #ff4d4f;
        margin-right: 4rpx;
    }
    }

    // 类型切换按钮组
    .type-tabs {
    display: flex;
    gap: 20rpx;

    .tab-btn {
        flex: 1;
        height: 64rpx;
        line-height: 64rpx;
        text-align: center;
        background-color: #f0f2f5;
        color: #666;
        font-size: 26rpx;
        border-radius: 8rpx;

        &.active {
        background-color: #1890ff;
        color: #fff;
        font-weight: bold;
        }
    }
    }

    .sub-block {
    margin-bottom: 24rpx;

    .sub-title {
        font-size: 26rpx;
        color: #333;
        display: block;
        margin-bottom: 16rpx;
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

    .license-upload-box {
        height: 220rpx;
        border: 2rpx dashed #dcdcdc;
        border-radius: 8rpx;
        background-color: #fafafa;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .license-icon {
        font-size: 50rpx;
        margin-bottom: 10rpx;
        color: #1890ff;
        }

        .license-text {
        font-size: 26rpx;
        color: #666;
        }
    }
    }

    // 表单输入表格
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
        padding: 22rpx 10rpx;
        font-size: 28rpx;
        }

        .label {
        width: 220rpx;
        color: #333;
        }

        .val {
        flex: 1;
        input {
            font-size: 28rpx;
            width: 100%;
        }
        }
    }
    }

    // 底部流式双按钮（不固定，滚动到下方展示）
    .footer-box {
    display: flex;
    gap: 30rpx;
    padding: 40rpx 0 60rpx 0;
    box-sizing: border-box;

    .footer-btn {
        flex: 1;
        border-radius: 40rpx;
        font-size: 32rpx;
        height: 84rpx;
        line-height: 84rpx;
        margin: 0;
    }

    .cancel-btn {
        background-color: #fff;
        color: #333;
        border: 1rpx solid #dcdcdc;
    }

    .submit-btn {
        background-color: #1890ff;
        color: #fff;
    }
    }
</style>