// pages/chat/chat.js
const TAG = 'chat'
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chatList: [{
      content: '小爱小爱',
      isSend: true
    },
    {
      content: '我在~',
      isSend: false
    }
    ],
    inputContent: '',
    sendDisable: true,
    sendLoading: false,
    toView: '',
    uid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let uid = wx.getStorageSync("uid")
    if (uid == '') {
      uid = Math.floor(Math.random() * 100) + ''
      wx.setStorageSync("uid", uid)
    }
    console.log("uid:", uid)
    this.setData({
      uid: uid
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

  },

  /**
   * 键盘点击确认事件处理
   */
  chatConfirm: function () {
    var that = this
    console.log(TAG, this.data.inputContent)
    that.sendMsg(this.data.inputContent)
    that.createSendMsg(this.data.inputContent)
  },

  /**
   * input 组件输入框内容监听
   */
  chatInputListener: function (event) {
    let value = event.detail.value
    this.setData({
      sendDisable: value == '',
      inputContent: value
    })
  },

 /** 
 * 点击发送按钮的事件处理
 */
  sendClick: function () {
    var that = this
    console.log(TAG, this.data.inputContent)
    that.sendMsg(this.data.inputContent)
    that.createSendMsg(this.data.inputContent)
  },

  /**
   * 创建发送消息
   */
  createSendMsg: function (content) {
    let sendMsg = {
      content: content,
      isSend: true
    }
    let list = this.data.chatList
    list.push(sendMsg)
    console.log(TAG, "size:" + list.length)
    this.setData({
      chatList: list,
      inputContent: '',
      sendDisable: true,
      toView: 'view' + (list.length - 1)
    })
  },

  /**
   * 创建接收消息
   */
  createReceiverMsg: function (content) {
    let receiverMsg = {
      content: content,
      isSend: false
    }
    let list = this.data.chatList
    list.push(receiverMsg)
    this.setData({
      chatList: list,
      toView: 'view' + (list.length - 1)
    })
  },

  /**
   * 请求发送消息的接口
   */
  sendMsg: function (msg) {
    console.log(TAG + "sendMsg", msg)
    if (!app.openSwith.chatOpen) {
      return
    }
    wx.showNavigationBarLoading()
    var that = this
    that.setData({
      sendLoading: true
    })
    wx.request({
      url: app.globalData.chat_url + msg + "&userid=" + that.data.uid,
      data: {
        x: '',
        y: ''
      },
      success: res => {
        console.log(TAG, res.data)
        if (res.data.error_code == 0) {
          let content = res.data.result.text
          that.createReceiverMsg(content)
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
        wx.hideNavigationBarLoading()
        that.setData({
          sendLoading: false
        })
      }
    })
  }
})