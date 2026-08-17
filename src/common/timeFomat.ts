export function timeFormat(time: string | Date, cFormat: string) {
  // time仅支持时间戳字符串形式或者时间对象
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = cFormat || "Y-M-D h:m:s";
  let date = new Date(time);

  const formatObj = {
    Y: date.getFullYear(),
    M: date.getMonth() + 1,
    D: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/([YMDhmsa])+/g, (result, key) => {
    const value = formatObj[key];
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    return value.toString().padStart(2, "0");
  });
  return time_str;
}
