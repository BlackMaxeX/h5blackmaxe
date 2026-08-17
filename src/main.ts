import { createSSRApp } from "vue";
import App from "./App.vue";
// 引入封装好的请求
import request from '@/common/request'
// 引入接口
import api from '@/api/index'
export function createApp() {
  const app = createSSRApp(App);
	// 全局挂载
  app.config.globalProperties.$request = request
  app.config.globalProperties.$api = api
  return {
    app,
  };
}
