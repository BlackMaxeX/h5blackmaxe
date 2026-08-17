<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { instCategCodeOptions } from "./globalConfig";
import manifest from "./manifest.json";
import request from "@/common/request.ts";
import { apiSucCode } from "@/common/request";
const appid = manifest["mp-weixin"].appid;
// 配置全局公共信息
const app = getApp({
  allowDefault: true,
});
// 配置请求后端接口的成功响应码
app.apiSucCode = apiSucCode;
// 配置全局请求方法
app.$request = request;

// 前端写死的下拉选项内容，全局配置
app.instCategCodeOptions = instCategCodeOptions;

onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
@import "@/static/css/global.scss";
<style>
page {
  background-color: #f7f8fa;
}
</style>
