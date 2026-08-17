/**
 *  一些工具方法
 * */

export const toAge = (val) => {
  // 根据18位的身份证号转换成年龄
  if (!val || val.length !== 18) return "";

  // 截取出生日期：yyyyMMdd
  const birthDate = val.slice(6, 14);
  const birthYear = +birthDate.slice(0, 4);
  const birthMonth = +birthDate.slice(4, 6);
  const birthDay = +birthDate.slice(6, 8);

  const today = new Date();
  const nowYear = today.getFullYear();
  const nowMonth = today.getMonth() + 1;
  const nowDay = today.getDate();

  // 计算年龄
  let age = nowYear - birthYear;

  // 生日未到，减 1
  if (nowMonth < birthMonth || (nowMonth === birthMonth && nowDay < birthDay)) {
    age--;
  }

  return age < 0 ? 0 : age;
};
