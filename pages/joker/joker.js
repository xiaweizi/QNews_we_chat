// pages/joker/joker.js
var app = getApp()
var util = require('../../utils/util.js')
const TAG = "joker"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    jokerList:[],
    content:'有一次跟哥们聊天，电脑开qq稍微有点儿慢，每次都是一顿打字以后直接发送，之后电脑慢慢反应，字出来之后就发出去了，本想说“你干嘛呢？”结果不知道哪个字母打错了，联想成“你在干你妈呢？”直接发过去了，卧槽，坑死我了，还好没在身边，不然非打死我……"',
    time:'1421994635',
    page: 1
  },

  itemClick: function(event) {
    console.log(TAG, event.currentTarget.dataset)
    wx.setClipboardData({
      data: event.currentTarget.dataset.content,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getRandomJoker(true)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      page: 1
    })
    this.getRandomJoker(false)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getRandomJoker(true)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 获取随机的段子数据
  getRandomJoker: function (isShowLoading) {
    console.log("joker", "get random joker " + isShowLoading)
    if (!app.openSwith.jokerOpen) {
      return
    }
    if (isShowLoading) {
      wx.showLoading({
        title: '正在获取数据',
      })
    } else {
      wx.showNavigationBarLoading()
    }
    var that = this
    let page = that.data.page
    console.log(TAG, "page:" + page)
    console.log(app.globalData.joker_url + page)
    wx.request({
      url: app.globalData.joker_url + page,
      data: {
        x: '',
        y: ''
      },
      success: res => {
        console.log(TAG, res.data)
        that.dealData(res.data)
      },
      complete: () => {
        wx.hideLoading(),
        wx.stopPullDownRefresh(),
        wx.hideNavigationBarLoading()
      }
    })
  },

  // 对时间戳进行转换
  dealData: function(data) {
    var tempData = data.result.data
    console.log(tempData)

    let length = tempData.length;
    for (let i = 0; i < length; ++i) {
      tempData[i].unixtime = util.formatTime(tempData[i].unixtime, 'Y/M/D h:m:s')
    }
    let tempPage = this.data.page + 1;
    this.setData({
      jokerList: tempPage == 2 ? tempData : this.data.jokerList.concat(tempData),
      page: tempPage
    })
  }
})