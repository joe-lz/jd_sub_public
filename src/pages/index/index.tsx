import Taro from "@tarojs/taro";
import React, { Component } from "react";
import { View, Button, Text, Navigator } from "@tarojs/components";
import { observer, inject } from "mobx-react";

import "./index.scss";
import getPath from "@src/_gen/utils/getPath";

type PageStateProps = {
  store: {};
};

interface Index {
  props: PageStateProps;
}

@inject("store")
@observer
class Index extends Component {
  componentDidMount() {}

  render() {
    return (
      <View className="index">
        <Navigator
          url={getPath({
            url: "/pages/webview/index",
            moduleName: "public",
            params: {
              url: "https://www.baidu.com",
            },
          })}
        >
          <Button type="primary">webview</Button>
        </Navigator>
        <Text>/pages/webview/index</Text>
        <Navigator
          url={getPath({
            url: "/pages/webviewShare/index",
            moduleName: "public",
            params: {
              url: "https://www.baidu.com",
            },
          })}
        >
          <Button type="primary">webviewShare</Button>
        </Navigator>
        <Text>/pages/webviewShare/index</Text>
        <Navigator
          url={getPath({
            url: "/pages/auth/index",
            moduleName: "public",
          })}
        >
          <Button type="primary">登录</Button>
        </Navigator>
        <Text>/pages/auth/index</Text>
        <Navigator
          url={getPath({
            url: "/pages/intro/index",
            moduleName: "public",
          })}
        >
          <Button type="primary">关于鲸典</Button>
        </Navigator>
        <Text>/pages/intro/index</Text>
        <Navigator
          url={getPath({
            url: "/pages/redirect/index",
            moduleName: "public",
          })}
        >
          <Button type="primary">中转页面</Button>
        </Navigator>
        <Text>/pages/redirect/index</Text>
        <Navigator
          url={getPath({
            url: "/pages/test/index",
            moduleName: "public",
          })}
        >
          <Button type="primary">测试页面</Button>
        </Navigator>
        <Text>/pages/test/index</Text>
      </View>
    );
  }
}

export default Index;
