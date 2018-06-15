// pages/newsDetail/newsDetail.js
const TAG = 'newsDetail'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData: {},
    imgUrls: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let itemData = JSON.parse(options.data)
    wx.setNavigationBarTitle({
      title: itemData.title,
    })
    var imageData = []
    imageData.push(itemData.thumbnail_pic_s)
    if (itemData.thumbnail_pic_s02 != null) {
      imageData.push(itemData.thumbnail_pic_s02)
    }
    if (itemData.thumbnail_pic_s03 != null) {
      imageData.push(itemData.thumbnail_pic_s03)
    }
    this.setData({
      detailData: itemData,
      imgUrls: imageData
    })
    this.data.imgUrls.length
  },

  jump: function(event) {
    wx.setClipboardData({
      data: event.currentTarget.dataset.url,
    })
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
  
  }
})