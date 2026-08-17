<template>
  <view class="container">
    <!-- 顶部搜索框（带放大镜图标与竖线分割） -->
    <view class="search-box">
      <view class="search-left">
        <text class="search-icon">🔍</text>
        <input class="search-input" placeholder="请输入合同编号或借款人姓名" v-model="keyword" />
      </view>
      <text class="search-divider"></text>
      <text class="search-text" @click="handleSearch">搜索</text>
    </view>

    <!-- 材料列表单选组 -->
    <radio-group @change="radioChange">
      <label class="material-card" v-for="item in materialList" :key="item.id">
        <!-- 单选框 -->
        <radio :value="item.id" :checked="currentId === item.id" color="#1890ff" />
        
        <!-- 对应原型图的左右结构字段 -->
        <view class="card-info">
          <view class="info-row">
            <text class="label">合同编号</text>
            <text class="value">{{ item.no }}</text>
          </view>
          <view class="info-row">
            <text class="label">合同名称</text>
            <text class="value">{{ item.name }}</text>
          </view>
          <view class="info-row">
            <text class="label">借款人姓名</text>
            <text class="value">{{ item.borrower }}</text>
          </view>
          <view class="info-row">
            <text class="label">合同签订时间</text>
            <text class="value">{{ item.date }}</text>
          </view>
        </view>
      </label>
    </radio-group>

    <!-- 底部确认按钮 -->
    <button class="confirm-btn" @click="confirmSelect">确认</button>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const keyword = ref('')
const currentId = ref('')
const selectedItem = ref(null)

// 模拟列表数据（字段一一对应）
const materialList = ref([
  { id: '1', no: 'HT2026001', name: '个人消费贷款', borrower: '张三', date: '2026-08-11' },
  { id: '2', no: 'HT2026002', name: '房屋抵押贷款', borrower: '李四', date: '2026-08-10' },
  { id: '3', no: 'HT2026003', name: '企业经营贷款', borrower: '王五', date: '2026-08-09' }
])

// 搜索事件
const handleSearch = () => {
  console.log('搜索关键字：', keyword.value)
}

// 单选框切换
const radioChange = (e) => {
  currentId.value = e.detail.value
  selectedItem.value = materialList.value.find(item => item.id === currentId.value)
}

// 确认并回传
const confirmSelect = () => {
  if (!currentId.value) {
    return uni.showToast({ title: '请选择合同材料', icon: 'none' })
  }
  
  // 通过事件总线将选中的数据传回“填写合同信息”页面
  uni.$emit('selectContract', {
    no: selectedItem.value.no,
    name: selectedItem.value.name,
    date: selectedItem.value.date
  })
  
  uni.navigateBack()
}
</script>

<style scoped lang="scss">
.container {
  min-height: 100vh;
  background-color: #f7f7f7;
  padding: 20rpx;
  box-sizing: border-box;
  padding-bottom: 140rpx;
}

// 搜索框样式
.search-box {
  display: flex;
  align-items: center;
  background: #fff;
  padding: 12rpx 24rpx;
  border-radius: 40rpx;
  margin-bottom: 24rpx;
  border: 1rpx solid #e5e5e5;

  .search-left {
    display: flex;
    align-items: center;
    flex: 1;

    .search-icon {
      font-size: 28rpx;
      margin-right: 12rpx;
    }

    .search-input {
      flex: 1;
      font-size: 28rpx;
    }
  }

  .search-divider {
    width: 2rpx;
    height: 28rpx;
    background-color: #dcdcdc;
    margin: 0 20rpx;
  }

  .search-text {
    color: #666;
    font-size: 28rpx;
  }
}

// 列表卡片样式
.material-card {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 12rpx;
  padding: 24rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.02);

  radio {
    margin-right: 20rpx;
  }

  .card-info {
    flex: 1;

    .info-row {
      display: flex;
      justify-content: space-between;
      font-size: 28rpx;
      line-height: 50rpx;

      .label {
        color: #333;
      }

      .value {
        color: #333;
        font-weight: 500;
      }
    }
  }
}

// 底部确认按钮
.confirm-btn {
  position: fixed;
  bottom: 40rpx;
  left: 5%;
  width: 90%;
  background-color: #1890ff;
  color: #fff;
  border-radius: 40rpx;
  font-size: 32rpx;
  line-height: 80rpx;
  height: 80rpx;
  box-shadow: 0 4rpx 12rpx rgba(24, 144, 255, 0.3);
}
</style>