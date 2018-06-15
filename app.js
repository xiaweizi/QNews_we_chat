
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    news_url:"https://v.juhe.cn/toutiao/index?key=d78b502268f7456b79fbe7228cecdd46&type=",
    joker_url: "https://v.juhe.cn/joke/content/text.php?key=ae240f7fba620fc370b803566654949e&pagesize=10&page=",
    home_url:"https://v.juhe.cn/weixin/query?key=0275f79f7ef36e40aee1dbfdb3e4b72a",
    today_url:"https://v.juhe.cn/todayOnhistory/queryEvent.php?key=f5f7d655ef148f6bb777c80167f7f6de&date=",
    today_detail_url:"https://v.juhe.cn/todayOnhistory/queryDetail.php?key=f5f7d655ef148f6bb777c80167f7f6de&e_id=",
    chat_url:"https://op.juhe.cn/robot/index?key=98b8f13ededd2f7e1d593819a6bb3639&info="
  },
  openSwith: {
    newOpen: true,
    jokerOpen: true,
    todayOpen: true,
    chatOpen: true
  }
})