import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component } from "react";
import { View, Button, Text, Navigator, Image, Input } from "@tarojs/components";
import { observer, inject } from "mobx-react";

import AV from "@_gen/utils/leancloud-storage/dist/av-weapp.js";
import "./index.scss";
import { handleError } from "@_gen/utils/handleError";
import robot from "@_gen/utils/robot";

const img_logo = require("@src/images/logo/logo-login.png");
type PageStateProps = {
  store: {};
};

interface Index {
  props: PageStateProps;
}

const titleMap = [
  {
    title: "入驻鲸典",
    desc: ["请填写您的手机号码", "我们的专属客服会尽快和您取得联系"],
  },
  {
    title: "登录",
    desc: ["已有账户？手机号码登录并绑定当前微信"],
  },
  {
    title: "绑定手机",
    desc: [],
  },
];
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curTitle: titleMap[0],
      mobile: null,
      code: null,
      sendCodeMsg: "获取验证码",
      isCounting: false,
    };
  }

  componentWillMount() {
    const {
      params: { type },
    } = getCurrentInstance().router;
    const curType = type ? Number(type) : 0;
    const curTitle = titleMap[curType];
    this.setState({ curTitle });
    Taro.setNavigationBarTitle({ title: curTitle.title });
  }

  componentDidMount() {
    Taro.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"],
    });
    let user = AV.User.current();
    if (user && user.mobilePhoneNumber) {
      user = AV.User.current().toJSON();
      this.setState({ mobile: user.mobilePhoneNumber });
    }
  }

  onShareAppMessage(res) {
    if (res.from === "button") {
      // 来自页面内转发按钮
      console.log(res.target);
    }
    return {
      title: "入住鲸典设计",
    };
  }

  onShareTimeline(res) {
    return {
      title: "入住鲸典设计",
    };
  }

  // 倒计时
  _countDown() {
    this.setState({ isCounting: true });
    let second = 60;
    const timer = setInterval(() => {
      if (second <= 0) {
        clearInterval(timer);
        this.setState({ sendCodeMsg: "发送验证码", isCounting: false });
        return;
      }
      second = second - 1;
      this.setState({ sendCodeMsg: `${second}s` });
    }, 1000);
  }

  // 发送验证码
  _sendCode() {
    const { mobile, isCounting } = this.state;
    if (isCounting) {
      return;
    }
    if (!mobile) {
      Taro.showToast({ title: "请输入手机号", icon: "none", duration: 1000 });
      return;
    }
    if (!/^[1]([3-9])[0-9]{9}$/.test(mobile)) {
      Taro.showToast({ title: "手机号输入错误", icon: "none", duration: 1000 });
      return;
    }
    Taro.showModal({
      title: "提醒",
      content: `将发送验证码至${mobile}`,
    }).then(res => {
      if (res.confirm) {
        Taro.showLoading({ title: "发送中..." });
        const {
          params: { type },
        } = getCurrentInstance().router;
        const curType = Number(type);
        if (curType === 2) {
          // 绑定手机
          // 设置并保存手机号
          const user = AV.User.current();
          user.setMobilePhoneNumber(mobile);
          user.save().then(
            userResult => {
              const mobileNew = userResult.getMobilePhoneNumber();
              AV.User.requestMobilePhoneVerify(mobileNew).then(
                () => {
                  Taro.hideLoading();
                  Taro.showToast({
                    title: "发送成功",
                    icon: "success",
                    duration: 1000,
                  });
                  this._countDown();
                },
                error => {
                  Taro.hideLoading();
                  handleError({ error });
                }
              );
            },
            error => {
              Taro.hideLoading();
              handleError({ error });
            }
          );
        } else {
          // 发送验证码
          AV.Cloud.requestSmsCode(`+86${mobile}`).then(
            () => {
              Taro.hideLoading();
              Taro.showToast({
                title: "发送成功",
                icon: "success",
                duration: 1000,
              });
              this._countDown();
            },
            error => {
              Taro.hideLoading();
              handleError({ error });
            }
          );
        }
      }
    });
  }

  // 去登录
  _handleSubmit() {
    const { mobile, code } = this.state;
    if (!mobile) {
      Taro.showToast({ title: "请输入手机号", icon: "none", duration: 1000 });
      return;
    }
    if (!/^[1]([3-9])[0-9]{9}$/.test(mobile)) {
      Taro.showToast({ title: "手机号输入错误", icon: "none", duration: 1000 });
      return;
    }
    if (!code || code.length !== 6) {
      Taro.showToast({ title: "请输入验证码", icon: "none", duration: 1000 });
      return;
    }
    Taro.showLoading({ title: "操作中..." });
    const {
      params: { type },
    } = getCurrentInstance().router;
    const curType = Number(type);
    if (curType === 2) {
      // 验证手机
      AV.User.verifyMobilePhone(code).then(
        () => {
          // mobilePhoneVerified 将变为 true
          Taro.hideLoading();
          AV.User.become(AV.User.current()._sessionToken).then(() => {
            Taro.showToast({
              title: "绑定成功",
              icon: "success",
              duration: 3000,
            });
            const pages = Taro.getCurrentPages();
            if (pages.length > 1) {
              let delta = 2;
              if (pages.length === 2) {
                delta = 1;
              }
              Taro.navigateBack({ delta });
            } else {
              Taro.redirectTo({
                url: "/pages/index/index",
              });
            }
          });
        },
        error => {
          // 验证码不正确
          Taro.hideLoading();
          handleError({ error });
        }
      );
    } else {
      // 登录
      AV.User.logInWithMobilePhoneSmsCode(mobile, code).then(
        user => {
          Taro.hideLoading();
          AV.User.become(AV.User.current()._sessionToken).then(res => {
            Taro.setStorageSync("lean_user", res.toJSON());
            // 登录成功，绑定当前微信
            user.associateWithWeappWithUnionId();
            // 如果是入驻鲸典，机器人通知
            if (curType === 0) {
              robot({ user: AV.User.current().toJSON() });
            }
            Taro.showToast({
              title: "登录成功",
              icon: "success",
              duration: 3000,
            });
            const pages = Taro.getCurrentPages();
            if (pages.length > 1) {
              let delta = 2;
              if (pages.length === 2) {
                delta = 1;
              }
              Taro.navigateBack({ delta });
            } else {
              Taro.redirectTo({
                url: "/pages/index/index",
              });
            }
          });
        },
        error => {
          // 验证码不正确
          Taro.hideLoading();
          handleError({ error });
        }
      );
    }
  }

  render() {
    const { mobile, code, sendCodeMsg, isCounting, curTitle } = this.state;
    const {
      params: { type },
    } = getCurrentInstance().router;
    const curType = type ? Number(type) : 0;

    return (
      <View className="index">
        <View className="top">
          <Image mode="aspectFit" src="../../images/logo/logo-login.png" />
          {curTitle.desc.map((obj, index) => {
            return (
              <Text className="top-title" key={`${index + 1}`}>
                {obj}
              </Text>
            );
          })}
        </View>
        <View className="form-group">
          <View className="input-group">
            <Input
              className="input-item"
              placeholder="手机号码"
              placeholder-style="font-size:14px;color:#A7B6C9;"
              type="number"
              maxlength={11}
              value={mobile}
              onInput={e => {
                this.setState({ mobile: e.currentTarget.value });
              }}
            />
          </View>
          <View className="input-group">
            <Input
              className="input-item"
              style={{ flex: 1, marginRight: "15px" }}
              placeholder="验证码"
              placeholder-style="font-size:14px;color:#A7B6C9;"
              type="number"
              value={code}
              maxlength={6}
              onInput={e => {
                this.setState({ code: e.currentTarget.value });
              }}
            />
            <Button
              style={{ width: "120px" }}
              className={`input-item input-btn ${isCounting || !mobile ? "input-btn-disabled" : ""}`}
              disabled={isCounting || !mobile}
              hover-class="input-btn-active"
              onClick={() => {
                this._sendCode();
              }}
            >
              {sendCodeMsg}
            </Button>
          </View>
          <View className="input-group">
            <Button
              className={`input-item input-btn ${!code && "input-btn-disabled"}`}
              hover-class="input-btn-active"
              disabled={!mobile || !code}
              onClick={() => {
                this._handleSubmit();
              }}
            >
              确定
            </Button>
          </View>
          {curType === 0 && (
            <View className={`bottom-contact`}>
              <Text className="bottom-contact-desc">或者，您也可以直接</Text>
              <Button className={`bottom-contact-btn`} open-type="contact">
                联系我们
              </Button>
            </View>
          )}
        </View>
      </View>
    );
  }
}

export default Index;
