export const checkPermissionHome = (callback) => {
  // 测登录状态
  const token = uni.getStorageSync("token");
  const phoneBindFlag = uni.getStorageSync("phoneBindFlag");
  if (!token) {
    uni.showModal({
      title: "暂未登录",
      confirmText: "微信登录",
      success: (res) => {
        if (res.confirm) {
          uni.redirectTo({
            url: `/pages/login/index`,
          });
        }
      },
    });
    return;
  }
  if (phoneBindFlag == "0") {
    uni.showModal({
      title:
        "为了更好的为您提供服务，建议绑定手机号，以便您及时接收通知！",
      confirmText: "去绑定",
      success: (res) => {
        if (res.confirm) {
          uni.redirectTo({
            url: "/pages/photoBind/index",
          });
        }
      },
    });
    return;
  }
  callback();
};

export const checkPermissionOtherTabbar = () => {
  const token = uni.getStorageSync("token");
  const phoneBindFlag = uni.getStorageSync("phoneBindFlag");
  if (!token) {
    uni.showModal({
      title: "暂未登录",
      confirmText: "微信登录",
      success: (res) => {
        if (res.confirm) {
          uni.redirectTo({
            url: `/pages/login/index`,
          });
        } else {
          uni.switchTab({
            url: "/pages/home/index",
          });
        }
      },
    });
  }
  if (phoneBindFlag == "0") {
    uni.showModal({
      title:
        "为了更好的为您提供服务，建议绑定手机号，以便您及时接收通知！",
      confirmText: "去绑定",
      success: (res) => {
        if (res.confirm) {
          uni.redirectTo({
            url: "/pages/photoBind/index",
          });
        } else {
          uni.switchTab({
            url: "/pages/home/index",
          });
        }
      },
    });
  }
};
