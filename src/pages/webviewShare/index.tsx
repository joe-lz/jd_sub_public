import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component } from "react";
import { View, Button, Text, Navigator, WebView } from "@tarojs/components";
import { observer, inject } from "mobx-react";

import "./index.scss";

type PageStateProps = {
  store: {};
};

interface Index {
  props: PageStateProps;
}

@inject("store")
@observer
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
    };
  }

  componentDidMount() {
    const {
      params: { url },
    } = getCurrentInstance().router;
    this.setState({ url });

    Taro.setNavigationBarTitle({
      title: "",
    });
  }

  onShareAppMessage(res) {
    // const {
    //   brandStore: { curBrand },
    // } = this.props;
    // if (res.from === "button") {
    //   // 来自页面内转发按钮
    //   console.log(res.target);
    // }
    // return {
    //   title: `「${curBrand.title}」品牌官网`,
    //   path: `/pages/webviewShare/index?bId=${curBrand.jxId}&&brand_id=${curBrand.objectId}&&url=${REACT_APP_FRONT}/official/${curBrand.objectId}`,
    // };
  }

  _handleMessage() {}

  render() {
    const { url } = this.state;
    return <WebView src={url ? decodeURIComponent(url) : `${REACT_APP_FRONT}`} onMessage={this._handleMessage} />;
  }
}

export default Index;
