import { mockData } from "@/common/mockData";
export const BASE_URL = "https://gfc.psbc-ltd.cn/person";
export const OSS_URL = "https://gfc.psbc-ltd.cn/oss";
export const apiSucCode = "0000000000000000";
const request = (options) => {
  console.log("request start!");
  const token = uni.getStorageSync("token") || "122345678"; // 获取本地存储的token

  // if (options.url != "/api/sysUser/login") {
  //   if (!token) {
  //     // 除登录接口外的接口 判断没有权限，直接跳转至登录页
  //     uni.showToast({
  //       title: "未登录",
  //       icon: "error",
  //       success() {
  //         setTimeout(() => {
  //           uni.redirectTo({
  //             url: "/pages/login/index",
  //           });
  //         }, 1000);
  //       },
  //     });

  //     return Promise.reject("无权");
  //   }
  // }
  let header = {};
  if (token && options.url != "/api/sysUser/login") {
    // 请求头
    header = {
      "Content-Type": "application/json",
      ...options.header,
    };
  }
  // 假数据。。。开发阶段，服务未部署，或无法访问时，暂时放开

  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(mockData[options.url]);
  //   }, 500);
  // });

  return new Promise((resolve, reject) => {
    uni
      .request({
        method: options.method || "POST",
        url: BASE_URL + options.url,
        data: options.data || {},
        header,
        dataType: "json",
        timeout: 15000,
      })
      .then((response: any) => {
        // setTimeout(() => {
        //   uni.hideLoading();
        // }, 200);
        //接口所返回信息中表示要跳到登录页的code值： Y{0}PA0520FW Y{0}PA0521FW Y{0}PA0522FW Y{0}PA0550FW
        const code = response.data.code;
        const curCode = code.slice(0, 1) + code.slice(-8);

        if (
          ["YPA0520FW", "YPA0521FW", "YPA0522FW", "YPA0550FW"].includes(curCode)
        ) {
          // 公共处理跳转登录
          uni.showModal({
            title: response.data.message,
            showCancel: false,
            success: (res) => {
              if (res.confirm) {
                uni.redirectTo({
                  url: "/pages/login/index",
                });
              }
            },
          });
          // reject("已跳转登录");
        } else {
          if (code !== apiSucCode) {
            // uni.showModal({
            //   title: response.data.message,
            //   showCancel: false,
            // });
            uni.showToast({
              title: response.data.message,
              icon: "none",
            });
          }
          resolve(response.data);
        }
      })
      .catch((error) => {
        console.log(error, typeof error);
        let errMessage = error.errMsg;
        if (errMessage.indexOf("timeout") !== -1) {
          errMessage = "您的请求已超时，请稍后重试";
        }

        uni.showToast({
          title: errMessage,
          showCancel: false,
        });

        reject(error);
      });
  });
};

export default request;
