// pages/theConcreteRecordPage/theConcreteRecordPage.js
var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'http://47.102.218.151:8080/user/findTheAllRecordPosition',
      method: 'GET',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log(res.data)
        that.setData({
          theRecordMessage: res.data
        })
        console.log(that.data.theRecordMessage[0].myLatitude)
        that.getTheStaticMap()
      }
    })



  },
  getTheStaticMap: function () {
    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: key });
    wx.getSystemInfo({
      success: function (data) {
        var height = data.windowHeight;
        var width = data.windowWidth;
        var size = width + "*" + height;
        var test = that.data.theRecordMessage[0].myLongitude + "," + that.data.theRecordMessage[0].myLatitude;
        console.log(test);
        var markers ="mid,0xFF0000,A:";
        for(var i=0;i<that.data.theRecordMessage.length;i++){
          if (i == that.data.theRecordMessage.length-1){
            markers += that.data.theRecordMessage[i].myLongitude + "," + that.data.theRecordMessage[i].myLatitude
          }else{
            markers += that.data.theRecordMessage[i].myLongitude + "," + that.data.theRecordMessage[i].myLatitude+";"
          }
        }
        myAmapFun.getStaticmap({
          zoom: 12,
          size: size,
          scale: 1,

          //location: "117.8,36.40",
          location: test,

          //markers: "mid,0xFF0000,A:116.37359,39.92437;116.47359,39.92437",
          
          markers:markers,
          //labels: "朝阳公园,2,0,16,0xFFFFFF,0x008000:116.48482,39.94858",
          // labels: that.data.theRecordMessage[0].myRecordContent + ",2,0,16,0xFFFFFF,0x008000:" + that.data.theRecordMessage[0].myLongitude + "," + that.data.theRecordMessage[0].myLatitude,
          // paths: "10,0x0000ff,0.1,0x0000ff,0.7:116.31604,39.96491;116.320816,39.966606;116.321785,39.966827;116.32361,39.966957;116.39361,39.966957;116.39361,39.936957",
          paths: '10,0x0000ff,1,,:116.31604,39.96491;116.320816,39.966606;116.321785,39.966827;116.32361,39.966957',
          success: function (data) {
            that.setData({
              src: data.url
            })
          },
          fail: function (info) {
            // wx.showModal({title:info.errMsg})
          }
        })

      }
    })
  },
  toTheSameCityConcretePage:function(){
    wx.navigateTo({
      url: '/pages/theSameCityConcrete/theSameCityConcrete',
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