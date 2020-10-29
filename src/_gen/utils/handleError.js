import leanerr from "@src/_gen/utils/leanerr";

// 处理leancloud错误
export const handleError = ({ error }) => {
  Taro.showToast({
    title: leanerr[`${Number(error.code)}`],
    icon: "none",
    duration: 2000
  });
};
