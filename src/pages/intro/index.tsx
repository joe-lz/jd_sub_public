import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component } from "react";
import { View, Button, Text, Navigator, Image } from "@tarojs/components";
import { observer, inject } from "mobx-react";

import "./index.scss";
import checkAuth from "@_gen/utils/checkAuth";

type PageStateProps = {
  store: {};
};

interface Index {
  props: PageStateProps;
}
const img_logo = require("@src/images/logo/logo.png");
const img_logoslogan = require("@src/images/logo/slogan.png");
const img_temp1 = require("@src/images/temp/1.png");
const img_temp2 = require("@src/images/temp/2.png");
const img_temp3 = require("@src/images/temp/3.png");
const logo_round = require("@src/images/share/logo_round.png");
const share_index = require("@src/images/share/index.jpg");
// @inject("store")
// @observer
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    Taro.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"],
    });
  }

  handleAuth(params) {
    checkAuth({
      params,
      callback: () => {
        Taro.navigateBack({
          delta: 2,
        });
      },
    });
  }

  onShareAppMessage(res) {
    if (res.from === "button") {
      // 来自页面内转发按钮
      console.log(res.target);
    }
    return {
      title: "鲸典设计-激活千万品牌价值",
      imageUrl: "../../images/share/index.jpg",
    };
  }

  onShareTimeline(res) {
    return {
      title: "鲸典设计-激活千万品牌价值",
      imageUrl: "../../images/share/logo_round.png",
    };
  }

  render() {
    const { url } = this.state;
    return (
      <View className="intro">
        <View className="intro-top">
          <Image className="intro-logo" mode="aspectFit" src="../../images/logo/logo.png" />
          <Image className="intro-slogan" mode="aspectFit" src="../../images/logo/slogan.png" />
        </View>
        <View className="intro-middle">
          <Image
            mode="aspectFit"
            src="../../images/temp/1.png"
            onClick={() => {
              // this.handleAuth({ type: 0 });
            }}
          />
          <Image
            mode="aspectFit"
            src="../../images/temp/2.png"
            onClick={() => {
              // this.handleAuth({ type: 0 });
            }}
          />
          <Image
            mode="aspectFit"
            src="../../images/temp/3.png"
            onClick={() => {
              // this.handleAuth({ type: 0 });
            }}
          />
        </View>
        <View className="intro-bottom">
          <Button
            className="intro-bottom-btn`, `${CSS_PREFIX}-intro-bottom-btn-active"
            hover-class="intro-bottom-btn-active-hover"
            onClick={() => {
              this.handleAuth({ type: 0 });
            }}
          >
            入驻鲸典
          </Button>
          <Button
            className="intro-bottom-btn"
            hover-class="intro-bottom-btn-hover"
            onClick={() => {
              this.handleAuth({ type: 1 });
            }}
          >
            登录
          </Button>
        </View>
      </View>
    );
  }
}

export default Index;
