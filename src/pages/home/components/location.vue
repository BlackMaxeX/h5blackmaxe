<template>
  <view class="container">
    <!-- 1. 搜索栏区域 -->
    <view class="search-box">
      <view class="search-input-wrap">
        <text class="search-icon">🔍</text>
        <input 
          type="text" 
          v-model="keyword" 
          placeholder="请输入公证处名称进行搜索" 
          placeholder-class="placeholder-style"
          @focus="enterSearchMode"
          @input="handleSearch"
        />
      </view>
      <!-- 动态切换：搜索/取消 -->
      <text class="search-btn" @click="toggleSearchAction">
        {{ isSearching ? '取消' : '搜索' }}
      </text>
    </view>

    <!-- 2. 未搜索状态：左右联动布局 -->
    <view class="content-wrapper" v-if="!isSearching">
      <!-- 左侧：城市列表 -->
      <scroll-view scroll-y class="left-sidebar">
        <view 
          class="city-item" 
          v-for="(city, index) in cityList" 
          :key="index"
          :class="{ active: activeCityIndex === index }"
          @click="selectCity(index, city)"
        >
          <!-- 选中时的绿色竖线指示器 -->
          <view class="active-line" v-if="activeCityIndex === index"></view>
          <text>{{ city.name }}</text>
        </view>
      </scroll-view>

      <!-- 右侧：该城市下的公证处列表 -->
      <scroll-view scroll-y class="right-content">
        <view 
          class="office-item" 
          v-for="(office, index) in officeList" 
          :key="index" 
          @click="selectItem(office)"
        >
          <text class="office-name">{{ office.name }}</text>
          <!-- 选中时的绿色对勾 -->
          <text class="check-icon" v-if="selectedOffice === office.name">✓</text>
        </view>
      </scroll-view>
    </view>

    <!-- 3. 搜索中状态：单列全屏列表 -->
    <scroll-view scroll-y class="search-result-wrapper" v-else>
      <view 
        class="result-item" 
        v-for="(item, index) in searchResultList" 
        :key="index" 
        @click="selectItem(item)"
      >
        <text class="office-name">{{ item.name }}</text>
      </view>
      
      <!-- 搜索无结果提示 -->
      <view class="empty-tip" v-if="searchResultList.length === 0 && keyword">
        <text>暂无匹配的公证处</text>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const keyword = ref('')
const isSearching = ref(false) // 控制是否处于搜索状态
const activeCityIndex = ref(0) // 当前选中的城市索引
const selectedOffice = ref('') // 当前选中的公证处

// 数据源
const cityList = ref([])
const officeList = ref([])
const searchResultList = ref([])

// ================= 接口预留区 =================

// 1. 获取城市列表接口
const fetchCityList = async () => {
  // TODO: 在此调用接口获取市级列表
  // const res = await api.getCityList()
  
  // 模拟接口返回数据
  cityList.value = [
    { id: 1, name: '北京市' },
    { id: 2, name: '成都市' },
    { id: 3, name: '重庆市' },
    { id: 4, name: '长沙市' },
    { id: 5, name: '常州市' },
    { id: 6, name: '东莞市' },
    { id: 7, name: '丹阳市' },
    { id: 8, name: '大理市' }
  ]
}

// 2. 获取指定城市下的公证处接口
const fetchOfficeList = async (cityId) => {
  uni.showLoading({ title: '加载中' })
  // TODO: 在此调用接口查询对应市级下的公证处
  // const res = await api.getOfficeList({ cityId })
  
  setTimeout(() => {
    // 模拟接口返回数据
    officeList.value = [
      { id: 101, name: 'XXXXX公证处' },
      { id: 102, name: 'AAAAA公证处' },
      { id: 103, name: 'BBBBB公证处' }
    ]
    uni.hideLoading()
  }, 300)
}

// 3. 全局搜索接口
const fetchSearchResult = async (keyword) => {
  // TODO: 在此调用接口查询搜索结果
  // const res = await api.searchOffice({ keyword })
  
  // 模拟搜索结果
  searchResultList.value = [
    { id: 201, name: `${keyword}市XXX公证处` },
    { id: 202, name: `${keyword}市AAAAA公证处` },
    { id: 203, name: `${keyword}市BBBBB公证处` },
    { id: 204, name: `${keyword}市CCCCC公证处` }
  ]
}

// ================= 生命周期与交互逻辑 =================

onMounted(async () => {
  // 1. 一进入页面调用接口查询有多少市
  await fetchCityList()
  
  // 2. 然后调用接口查询第一个返回市级下的公证处
  if (cityList.value.length > 0) {
    activeCityIndex.value = 0
    await fetchOfficeList(cityList.value[0].id)
  }
})

// 点击左侧城市
const selectCity = (index, city) => {
  activeCityIndex.value = index
  fetchOfficeList(city.id)
}

// 进入搜索模式
const enterSearchMode = () => {
  isSearching.value = true
  uni.setNavigationBarTitle({ title: '搜索' }) // 动态修改导航栏标题
}

// 退出或执行搜索
const toggleSearchAction = () => {
  if (isSearching.value) {
    // 点击取消：退出搜索模式
    isSearching.value = false
    keyword.value = ''
    searchResultList.value = []
    uni.setNavigationBarTitle({ title: '选择公证处' }) // 恢复导航栏标题
  } else {
    // 点击搜索按钮（如果处于非搜索模式下需要强制触发时）
    if (keyword.value) {
      enterSearchMode()
      fetchSearchResult(keyword.value)
    }
  }
}

// 监听输入框实时搜索
const handleSearch = () => {
  if (!keyword.value) {
    searchResultList.value = []
    return
  }
  fetchSearchResult(keyword.value)
}

// 点击选中公证处[cite: 5]
const selectItem = (item) => {
  selectedOffice.value = item.name // 显示对勾
  
  setTimeout(() => {
    uni.$emit('updateOffice', item.name)
    uni.navigateBack()
  }, 200) // 延迟200ms返回，让用户能看清绿色对勾的反馈
}
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

/* 1. 搜索栏样式 */
.search-box {
  display: flex;
  align-items: center;
  padding: 20rpx 30rpx;
  background-color: #fff;
  z-index: 10;

  .search-input-wrap {
    flex: 1;
    display: flex;
    align-items: center;
    background-color: #f7f7f7;
    border-radius: 36rpx;
    padding: 14rpx 24rpx;
    margin-right: 20rpx;

    .search-icon {
      margin-right: 12rpx;
      font-size: 28rpx;
      color: #999;
    }

    input {
      flex: 1;
      font-size: 28rpx;
      background: transparent;
    }

    .placeholder-style {
      color: #999;
      font-size: 28rpx;
    }
  }

  .search-btn {
    font-size: 30rpx;
    color: #333;
  }
}

/* 2. 左右联动内容区 */
.content-wrapper {
  flex: 1;
  display: flex;
  overflow: hidden;

  /* 左侧城市列表 */
  .left-sidebar {
    width: 220rpx;
    background-color: #f7f7f7;
    height: 100%;

    .city-item {
      position: relative;
      padding: 30rpx 0;
      text-align: center;
      font-size: 28rpx;
      color: #333;

      &.active {
        background-color: #fff;
        font-weight: bold;
      }

      /* 绿色的选中指示线 */
      .active-line {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 8rpx;
        height: 32rpx;
        background-color: #07c160; 
        border-radius: 0 4rpx 4rpx 0;
      }
    }
  }

  /* 右侧公证处列表 */
  .right-content {
    flex: 1;
    background-color: #fff;
    height: 100%;

    .office-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30rpx 40rpx;
      border-bottom: 1rpx solid #f2f2f2;

      .office-name {
        font-size: 28rpx;
        color: #333;
      }

      .check-icon {
        color: #07c160;
        font-size: 32rpx;
        font-weight: bold;
      }
    }
  }
}

/* 3. 搜索结果全屏区 */
.search-result-wrapper {
  flex: 1;
  background-color: #fff;
  padding: 0 30rpx;

  .result-item {
    padding: 30rpx 10rpx;
    border-bottom: 1rpx solid #f2f2f2;

    .office-name {
      font-size: 28rpx;
      color: #333;
    }
  }

  .empty-tip {
    text-align: center;
    padding-top: 100rpx;
    color: #999;
    font-size: 28rpx;
  }
}
</style>