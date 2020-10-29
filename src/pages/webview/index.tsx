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

  _handleMessage() {}

  render() {
    const { url } = this.state;
    return <WebView src={url ? decodeURIComponent(url) : `${REACT_APP_FRONT}`} onMessage={this._handleMessage} />;
  }
}

export default Index;
