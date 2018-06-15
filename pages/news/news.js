var app = getApp();
const TAG = 'news'
Page({
  data: {
    statusType: [
      { name: "头条", key: "top" },
      { name: "社会", key: "shehui" },
      { name: "国内", key: "guonei" },
      { name: "国际", key: "guoji" },
      { name: "娱乐", key: "yule" },
      { name: "体育", key: "tiyu" },
      { name: "军事", key: "junshi" },
      { name: "科技", key: "keji" },
      { name: "财经", key: "caijing" },
      { name: "时尚", key: "shishang" }],
    currentType: 0,
    list: [[], [], [], [], [], [], [], [], [], []],
    windowHeight: ''
  },

  itemClick: function(event) {
    let itemData = event.currentTarget.dataset.data
    console.log(TAG, itemData)
    wx.navigateTo({
      url: '../newsDetail/newsDetail?data=' + JSON.stringify(itemData),
    })
  },

  onLoad(options) {
    this.getNewsData();
    var systemInfo = wx.getSystemInfoSync()
    this.setData({
      windowHeight: systemInfo.windowHeight,
      currentType: options.id ? options.id : 0
    })
  },

  // 点击tab切换 
  swichNav: function (res) {
    console.log(TAG, res.detail.currentNum)
    if (this.data.currentType == res.detail.currentNum) return;
    this.setData({
      currentType: res.detail.currentNum
    })
  },

  bindChange: function (e) {
    console.log(TAG, e)
    this.setData({
      currentType: e.detail.current
    })
    if (!this.data.list[e.detail.current].length)
      this.getNewsData();
  },

  getNewsData: function () {
    console.log(TAG, app.openSwith.newOpen)
    if (!app.openSwith.newOpen) {
      return
    }
    wx.showLoading({
      title: '正在获取数据',
    })
    var that = this
    var _key = that.data.statusType[that.data.currentType].key
    console.log(TAG, "key:" + _key)
    wx.request({
      url: app.globalData.news_url + _key,
      success: (res) => {
        console.log(TAG, "data:" + res.data.result)
        var param = {}, str1 = "list[" + that.data.currentType + "]";
        if (res.data.error_code == 0) {
          param[str1] = res.data.result.data
        } else {
          param[str1] = [];
          wx.showToast({
            title: res.data.reason,
          })
        }
        this.setData(param);
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  }
})