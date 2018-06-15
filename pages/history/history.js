// pages/history/history.js
var app = getApp()
const TAG = "history"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "",
    todayList: []
  },

  /**
   * 获取当前的日期
   */
  getTodayData: function () {
    var date = new Date()
    var month = date.getMonth() + 1
    var day = date.getDate()
    console.log("month1:", month)
    this.setData({
      date: ""+month+"/"+day
    })
    console.log(TAG, this.data.date)
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
    this.getTodayData()
    this.getHistoryData(true, this.data.date)
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
    this.getHistoryData(false, this.data.date)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  itemClick: function(event) {
    let e_id = event.currentTarget.dataset.e_id
    console.log(TAG, e_id)
    wx.navigateTo({
      url: '../historyDetail/historyDetail?e_id=' + e_id,
    })
  },

  /**
   * 获取历史上的今天数据
   */
  getHistoryData: function (isShowLoading, date) {
    console.log("history", "date:" + date)
    if (!app.openSwith.todayOpen) {
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
    wx.request({
      url: app.globalData.today_url+date,
      data: {
        x: '',
        y: ''
      },
      success: res => {
        console.log("history", res)
        if (res.data.error_code == 0) {
          that.setData({
            todayList: res.data.result
          })
        } else {
          wx.showToast({
            title: res.data.reason,
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail: (res) => {
        wx.showToast({
          title: '连接服务器异常',
          icon: 'none'
        })
      },
      complete: () => {
        wx.hideLoading(),
          wx.stopPullDownRefresh(),
          wx.hideNavigationBarLoading()
      }
    })
  }
})