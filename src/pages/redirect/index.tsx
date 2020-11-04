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
    const { params } = this.$router;
    const redirectUrl = decodeURIComponent(
      decodeURIComponent(params.q)
        .split("?")[1]
        .split("=")[1]
    );

    Taro.redirectTo({
      url: redirectUrl,
    });
  }

  render() {
    return <View className="intro"></View>;
  }
}

export default Index;
