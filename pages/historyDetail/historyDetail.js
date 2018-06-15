// pages/historyDetail/historyDetail.js

const TAG = "hository detail"
var app = getApp()
var e_id = ''

Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl: [],
    content: "",
    title: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    e_id = options.e_id
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getHistoryDetilData(true, e_id)
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
  getHistoryDetilData: function (isShowLoading, e_id) {
    console.log(TAG, "e_id:" + e_id)
    // return
    if (isShowLoading) {
      wx.showLoading({
        title: '正在获取数据',
      })
    }
    var that = this
    wx.request({
      url: app.globalData.today_detail_url + e_id,
      data: {
        x: '',
        y: ''
      },
      success: res => {
        console.log("history", res)
        if (res.data.error_code == 0) {
          console.log(TAG, res.data)
          wx.setNavigationBarTitle({
            title: res.data.result[0].title,
          })
          that.setData({
            content: res.data.result[0].content,
            picUrl: res.data.result[0].picUrl,
            title: res.data.result[0].title
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
          wx.stopPullDownRefresh()
      }
    })
  }
})