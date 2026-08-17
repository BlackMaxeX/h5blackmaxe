<template>
  <view class="container">
    <!-- 1. 顶部搜索框 -->
    <view class="search-box">
      <view class="search-input-wrap">
        <text class="search-icon">🔍</text>
        <input class="search-input" placeholder="请输入申请人姓名或合同编号搜索" v-model="keyword" />
      </view>
    </view>

    <!-- 2. 状态标签栏 (Tabs) -->
    <scroll-view scroll-x class="tab-scroll" :scroll-with-animation="true">
      <view class="tab-box">
        <view 
          class="tab-item" 
          v-for="(item, index) in tabList" 
          :key="index"
          :class="{ active: currentTab === index }"
          @click="switchTab(index)"
        >
          <text>{{ item }}</text>
          <view class="tab-line" v-if="currentTab === index"></view>
        </view>
      </view>
    </scroll-view>

    <!-- 3. 业务列表区域 -->
    <view class="list-container">
      <view class="card-item" v-for="(item, index) in filteredList" :key="index" @click="goToDetail(item)">
        <view class="card-header">
          <text class="order-no">订单编号：{{ item.orderNo }}</text>
          <text class="order-status">{{ item.status }}</text>
        </view>

        <view class="card-body">
          <view class="info-row">
            <text class="label">合同编号</text>
            <text class="value">{{ item.contractNo }}</text>
          </view>
          <view class="info-row">
            <text class="label">人员信息</text>
            <text class="value">{{ item.personInfo }}</text>
          </view>
          <view class="info-row">
            <text class="label">申请时间</text>
            <text class="value">{{ item.time }}</text>
          </view>
        </view>

        <view class="card-footer" v-if="getButtonsByStatus(item.status).length > 0" @click.stop>
          <button 
            class="action-btn" 
            v-for="(btnName, bIndex) in getButtonsByStatus(item.status)" 
            :key="bIndex"
            @click="handleAction(btnName, item)"
          >
            {{ btnName }}
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

const keyword = ref('')
const currentTab = ref(0)
const tabList = ref(['全部', '待申请', '审核中', '待签署', '待付款', '待出证', '已出证', '审核不通过'])

// 为每一个状态都配备了对应的模拟数据
const listData = ref([
  { orderNo: 'ORD-001', contractNo: 'HT-2026-001', personInfo: '张三 (主借款人)', time: '2026-06-26 10:00:00', status: '待申请' },
  { orderNo: 'ORD-002', contractNo: 'HT-2026-002', personInfo: '李四 (主借款人)', time: '2026-06-26 11:00:00', status: '审核中' },
  { orderNo: 'ORD-003', contractNo: 'HT-2026-003', personInfo: '王五 (主借款人)', time: '2026-06-26 12:00:00', status: '待补充材料' },
  { orderNo: 'ORD-004', contractNo: 'HT-2026-004', personInfo: '赵六 (主借款人)', time: '2026-06-26 13:00:00', status: '待签署' },
  { orderNo: 'ORD-005', contractNo: 'HT-2026-005', personInfo: '孙七 (主借款人)', time: '2026-06-26 14:00:00', status: '待付款' },
  { orderNo: 'ORD-006', contractNo: 'HT-2026-006', personInfo: '周八 (主借款人)', time: '2026-06-26 15:00:00', status: '待出证' },
  { orderNo: 'ORD-007', contractNo: 'HT-2026-007', personInfo: '吴九 (主借款人)', time: '2026-06-26 16:00:00', status: '已出证' },
  { orderNo: 'ORD-008', contractNo: 'HT-2026-008', personInfo: '郑十 (主借款人)', time: '2026-06-26 17:00:00', status: '审核不通过' }
])

// 根据状态返回对应的按钮数组
const getButtonsByStatus = (status) => {
  switch (status) {
    case '待申请': return ['撤销', '申请']
    case '审核中': return ['咨询', '撤销', '分享']
    case '待补充材料': return ['咨询', '补充材料', '撤销', '分享']
    case '待签署': return ['咨询', '签署', '分享']
    case '待付款': return ['咨询', '付款', '分享']
    case '待出证': return ['咨询', '分享']
    case '已出证': return ['咨询', '下载', '分享']
    case '审核不通过': return ['咨询', '重新申请']
    default: return ['咨询', '分享']
  }
}

const switchTab = (index) => { currentTab.value = index }

const filteredList = computed(() => {
  return listData.value.filter(item => {
    const selectedTabName = tabList.value[currentTab.value]
    // 兼容处理：点击“审核中”Tab时，也把“待补充材料”包含进去显示
    const matchTab = currentTab.value === 0 || selectedTabName === item.status || (selectedTabName === '审核中' && item.status === '待补充材料')
    const matchKeyword = !keyword.value || item.contractNo.includes(keyword.value) || item.personInfo.includes(keyword.value)
    return matchTab && matchKeyword
  })
})

const goToDetail = (item) => {
  if (item.status === '待付款') {
    uni.navigateTo({
      url: `/pages/myself/components/order-payment?orderNo=${item.orderNo}`
    })
  } else {
    uni.navigateTo({
      url: `/pages/myself/components/order-detail?orderNo=${item.orderNo}`
    })
  }
}

const handleAction = (btnName, item) => {
  if (btnName === '付款') {
    uni.navigateTo({
      url: `/pages/myself/components/order-payment?orderNo=${item.orderNo}`
    })
  } else if (btnName === '补充材料') {
    uni.navigateTo({
      url: `/pages/myself/components/supplement-material?orderNo=${item.orderNo}`
    })
  } else {
    uni.showToast({ title: `点击了 [${btnName}]`, icon: 'none' })
  }
}
</script>

<style scoped lang="scss">
.container { min-height: 100vh; background-color: #f7f7f7; padding-bottom: 40rpx; box-sizing: border-box; }
.search-box { background-color: #fff; padding: 20rpx 30rpx; border-bottom: 1rpx solid #eee; .search-input-wrap { display: flex; align-items: center; background-color: #f0f2f5; padding: 12rpx 24rpx; border-radius: 36rpx; .search-icon { font-size: 28rpx; margin-right: 12rpx; } .search-input { flex: 1; font-size: 26rpx; } } }
.tab-scroll { background-color: #fff; white-space: nowrap; border-bottom: 1rpx solid #eee; .tab-box { display: flex; padding: 0 10rpx; .tab-item { position: relative; padding: 24rpx 24rpx; font-size: 26rpx; color: #666; text-align: center; &.active { color: #1890ff; font-weight: bold; } .tab-line { position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 40rpx; height: 6rpx; background-color: #1890ff; border-radius: 3rpx; } } } }
.list-container { padding: 20rpx; .card-item { background-color: #fff; border-radius: 12rpx; padding: 24rpx; margin-bottom: 20rpx; box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.02); .card-header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 16rpx; border-bottom: 1rpx solid #f0f0f0; font-size: 28rpx; .order-no { color: #333; font-weight: 500; } .order-status { font-size: 26rpx; color: #1890ff; } } .card-body { padding: 16rpx 0; .info-row { display: flex; justify-content: space-between; font-size: 26rpx; line-height: 48rpx; .label { color: #666; } .value { color: #333; } } } .card-footer { display: flex; justify-content: flex-end; gap: 16rpx; padding-top: 16rpx; border-top: 1rpx solid #f0f0f0; .action-btn { min-width: 130rpx; height: 56rpx; line-height: 56rpx; font-size: 26rpx; border-radius: 28rpx; margin: 0; padding: 0 24rpx; text-align: center; background-color: #1890ff; color: #fff; border: 1rpx solid #1890ff; } } } }
</style>