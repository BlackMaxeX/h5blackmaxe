<template>
  <view class="container">
    <!-- 1. 借款合同模块 -->
    <view class="section-box">
      <view class="section-title"><text class="required">*</text>借款合同</view>
      <view class="action-row">
        <button class="btn query-btn" @click="goToQueryMaterial">查询材料</button>
        <button class="btn upload-btn" @click="uploadMaterial('借款合同')">上传材料</button>
      </view>
    </view>

    <!-- 2. 担保/保证合同模块 -->
    <view class="section-box">
      <view class="section-title">担保/保证合同</view>
      <view class="action-row">
        <button class="btn upload-btn" @click="uploadMaterial('担保/保证合同')">上传材料</button>
      </view>
    </view>

    <!-- 3. 其他材料模块 -->
    <view class="section-box">
      <view class="section-title">其他材料</view>
      <view class="action-row">
        <button class="btn upload-btn" @click="uploadMaterial('其他材料')">上传材料</button>
      </view>
    </view>

    <!-- 4. 填写合同信息表格模块 -->
    <view class="section-box">
      <view class="section-title">填写合同信息</view>
      <view class="table">
        <view class="tr" v-for="(item, key) in formFields" :key="key">
          <view class="td label">
            <text class="required">*</text>{{ item.label }}
          </view>
          <view class="td input">
            <input 
              class="input-field" 
              :placeholder="'请输入' + item.label" 
              v-model="formData[key]" 
            />
          </view>
        </view>
      </view>
    </view>

    <!-- 5. 底部双按钮操作栏（跟随滚动） -->
    <view class="footer-box">
      <button class="footer-btn draft-btn" @click="handleDraft">保存草稿</button>
      <button class="footer-btn submit-btn" @click="handleSubmit">提交申请</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const formFields = {
  contractNo: { label: '合同编号' },
  contractName: { label: '合同名称' },
  interestRate: { label: '借款利率' },
  amount: { label: '借款金额（元）' },
  period: { label: '借款期限' },
  date: { label: '合同签订日期' }
}

const formData = ref({
  contractNo: '',
  contractName: '',
  interestRate: '',
  amount: '',
  period: '',
  date: ''
})

// 监听从“查询材料”页面回传的数据
onLoad(() => {
  uni.$on('selectContract', (res) => {
    if (res) {
      formData.value.contractNo = res.no || ''
      formData.value.contractName = res.name || ''
      formData.value.date = res.date || ''
    }
  })
})

const goToQueryMaterial = () => {
  uni.navigateTo({ url: '/pages/home/components/query-material' })
}

const uploadMaterial = (typeName) => {
  uni.showToast({ title: `点击上传${typeName}`, icon: 'none' })
}

const handleDraft = () => {
  console.log('保存草稿：', formData.value)
  uni.showToast({ title: '保存草稿成功', icon: 'success' })
}

const handleSubmit = () => {
  for (let key in formFields) {
    if (!formData.value[key]) {
      return uni.showToast({ title: `请输入${formFields[key].label}`, icon: 'none' })
    }
  }
  console.log('提交申请：', formData.value)
  uni.showToast({ title: '提交成功', icon: 'success' })
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

  .section-title {
    font-size: 30rpx;
    color: #333;
    font-weight: 500;
    margin-bottom: 20rpx;

    .required {
      color: #ff4d4f;
      margin-right: 4rpx;
    }
  }

  // 按钮行排版：缩小并左对齐
  .action-row {
    display: flex;
    justify-content: flex-start;
    gap: 20rpx;
    padding-top: 10rpx;

    .btn {
      min-width: 130rpx;
      height: 52rpx;
      line-height: 52rpx;
      font-size: 24rpx;
      border-radius: 6rpx;
      margin: 0;
      padding: 0 20rpx;
      text-align: center;
    }

    .query-btn {
      background-color: #1890ff;
      color: #fff;
    }

    .upload-btn {
      background-color: #1890ff;
      color: #fff;
    }
  }
}

// 表格样式
.table {
  border: 1rpx solid #e5e5e5;
  border-radius: 4rpx;
  overflow: hidden;

  .tr {
    display: flex;
    border-bottom: 1rpx solid #e5e5e5;

    &:last-child {
      border-bottom: none;
    }
  }

  .td {
    padding: 22rpx 20rpx;
    font-size: 28rpx;
    display: flex;
    align-items: center;
  }

  .label {
    width: 260rpx;
    background-color: #fff;
    color: #333;

    .required {
      color: #ff4d4f;
      margin-right: 4rpx;
    }
  }

  .input {
    flex: 1;
    background-color: #fff;

    .input-field {
      width: 100%;
      font-size: 28rpx;
    }
  }
}

// 底部双按钮（随页面滚动，不固定）
.footer-box {
  display: flex;
  gap: 30rpx;
  padding: 40rpx 20rpx 60rpx 20rpx;
  box-sizing: border-box;

  .footer-btn {
    flex: 1;
    border-radius: 40rpx;
    font-size: 32rpx;
    height: 84rpx;
    line-height: 84rpx;
    margin: 0;
  }

  .draft-btn {
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