import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component } from "react";
import { View, Button, Text, Navigator, Image } from "@tarojs/components";
import { observer, inject } from "mobx-react";

import "./index.scss";

type PageStateProps = {
  store: {};
};

interface Index {
  props: PageStateProps;
}

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  handleScan() {
    Taro.scanCode({
      success(res) {
        Taro.showModal({
          title: "扫码结果",
          content: `${JSON.stringify(res)}`,
          showCancel: Boolean(res.path),
          cancelText: "跳转地址",
        }).then(modalres => {
          if (modalres.confirm) {
            console.log("用户点击确定");
          } else if (modalres.cancel) {
            Taro.navigateTo({
              url: `/${res.path}`,
            });
          }
        });
      },
    });
  }

  render() {
    return (
      <View className="test">
        <Button type="primary" onClick={this.handleScan.bind(this)}>
          扫一扫
        </Button>
      </View>
    );
  }
}

export default Index;
