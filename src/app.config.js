export default {
  resizable: true,
  darkmode: true,
  themeLocation: "theme.json",
  // pages: ["pages/index/index", "pages/index-detail/index"],
  // window: {
  //   navigationBarTitleText: "WeChat",
  //   navigationBarBackgroundColor: "@navBgColor",
  //   navigationBarTextStyle: "@navTxtStyle",
  //   backgroundColor: "@bgColor",
  //   backgroundTextStyle: "@bgTxtStyle",
  //   backgroundColorTop: "@bgColorTop",
  //   backgroundColorBottom: "@bgColorBottom"
  // },
  // tabBar: {
  //   color: "@tabFontColor",
  //   selectedColor: "@tabSelectedColor",
  //   backgroundColor: "@tabBgColor",
  //   borderStyle: "@tabBorderStyle",
  //   list: [
  //     {
  //       pagePath: "pages/index/index",
  //       iconPath: "@iconPath1",
  //       selectedIconPath: "@selectedIconPath1",
  //       text: "首页"
  //     },
  //     {
  //       pagePath: "pages/me/index",
  //       iconPath: "@iconPath2",
  //       selectedIconPath: "@selectedIconPath2",
  //       text: "我的"
  //     }
  //   ]
  // }
  pages: ["pages/index/index", "pages/webview/index", "pages/webviewShare/index", "pages/auth/index", "pages/intro/index", "pages/redirect/index", "pages/test/index"],
  subpackages: [],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black"
  },
  navigateToMiniProgramAppIdList: ["wx8abaf00ee8c3202e", "wx6885acbedba59c14"]
};