import request from '@/common/request'

// 所有接口放这里
export default {
  // 列表
  getListHome(data) {
    return request({
      url: '/api/list',
      method: 'GET',
      data
    })
  },
}