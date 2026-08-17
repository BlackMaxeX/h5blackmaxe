<template>
  <view class="container">
    <!-- 1. 补充要求模块 -->
    <view class="section-box">
      <view class="section-title">补充要求</view>
      <view class="requirement-content">
        <text class="requirement-text">反显公证处录入的关于客户需要补充材料要求</text>
      </view>
    </view>

    <!-- 2. 补充材料上传模块 -->
    <view class="section-box">
      <view class="section-title">
        <text class="required">*</text>补充材料
      </view>
      <view class="action-row">
        <button class="upload-btn" @click="handleUpload">上传材料</button>
      </view>
      <!-- 上传文件列表展示区域（可根据实际上传状态动态渲染） -->
      <view class="file-list-area">
        <view class="empty-tip" v-if="fileList.length === 0">
          <!-- 预留空白区域与原型图保持一致 -->
        </view>
        <view class="file-item" v-for="(file, index) in fileList" :key="index">
          <text>{{ file.name }}</text>
          <text class="delete-icon" @click="deleteFile(index)">🗑️</text>
        </view>
      </view>
    </view>

    <!-- 3. 底部双按钮操作栏 -->
    <view class="footer-box">
      <button class="footer-btn cancel-btn" @click="handleCancel">取消</button>
      <button class="footer-btn submit-btn" @click="handleSubmit">提交</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 已上传的文件列表（模拟）
const fileList = ref([])

// 点击上传材料
const handleUpload = () => {
  // uni-app 选择或上传文件逻辑
  uni.chooseImage({
    success: (res) => {
      console.log('选中图片：', res.tempFilePaths)
      // 模拟添加进文件列表
      fileList.value.push({ name: `补充材料_${Date.now()}.jpg` })
    }
  })
}

// 删除已上传文件
const deleteFile = (index) => {
  fileList.value.splice(index, 1)
}

// 点击取消
const handleCancel = () => {
  uni.navigateBack()
}

// 点击提交
const handleSubmit = () => {
  if (fileList.value.length === 0) {
    return uni.showToast({ title: '请先上传补充材料', icon: 'none' })
  }
  console.log('提交补充材料：', fileList.value)
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
  padding-bottom: 60rpx;
}

.section-box {
  background-color: #fff;
  border-radius: 12rpx;
  padding: 24rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.02);

  .section-title {
    font-size: 28rpx;
    font-weight: 500;
    color: #333;
    margin-bottom: 20rpx;

    .required {
      color: #ff4d4f;
      margin-right: 4rpx;
    }
  }

  .requirement-content {
    background-color: #fafafa;
    border-radius: 8rpx;
    padding: 20rpx;
    
    .requirement-text {
      font-size: 26rpx;
      color: #999;
      line-height: 40rpx;
    }
  }

  .action-row {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20rpx;

    .upload-btn {
      width: 160rpx;
      height: 56rpx;
      line-height: 56rpx;
      font-size: 24rpx;
      background-color: #1890ff;
      color: #fff;
      border-radius: 8rpx;
      margin: 0;
      padding: 0;
      text-align: center;
    }
  }

  .file-list-area {
    min-height: 300rpx; // 撑开与原型图相似的大片空白交互区
    border: 1rpx dashed #eee;
    border-radius: 8rpx;
    padding: 10rpx;
    box-sizing: border-box;

    .file-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16rpx;
      background-color: #fafafa;
      border-radius: 6rpx;
      margin-bottom: 10rpx;
      font-size: 26rpx;
      color: #333;

      .delete-icon {
        cursor: pointer;
      }
    }
  }
}

// 底部双按钮操作栏
.footer-box {
  display: flex;
  gap: 30rpx;
  padding: 40rpx 20rpx;
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