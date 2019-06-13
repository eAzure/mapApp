// pages/theXiangQingPage/theXiangQingPage.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.theRecordID)
    var that = this;
    wx.request({
      url: 'http://47.102.218.151:8080/user/findTheOneRecordPosition?UserID='+app.globalData.userid+'&ConcreteID=' + options.theRecordID,
      method: 'GET',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log(res.data)
        that.setData({
          theRecordMessage: res.data
        })
        console.log(that.data.theRecordMessage[0].myLatitude)
        //拼接一下照片路径供调度
        that.setData({
          imageSrc: "http://47.102.218.151:8080/" + that.data.theRecordMessage[0].picturePos
        })
      }
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