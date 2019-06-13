// pages/theConcreteTracePage/theConcreteTracePage.js
//该页面的主要作用为显示静态图中的路径
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
  onLoad: function (options) {
    console.log(options.id)
    var that=this;
    wx.request({
      url: 'http://47.102.218.151:8080/user/findTheConcreteTrace?TraceID='+options.id,
      method:'GET',
      header:{'content-type':'application/json'},
      success:function(res){
        that.setData({
          theInitialTraceData:res.data
        })
        var lengthOfRes=res.data.length;
        //这里仍需要注意的就是我们应该在theInitialTraceData这个值赋完之后，才能进行下面的操作
        var key = config.Config.key;
        var myAmapFun = new amapFile.AMapWX({ key: key });
        wx.getSystemInfo({
          success: function (data) {
            var height = data.windowHeight;
            var width = data.windowWidth;
            var size = width + "*" + height;
            var test = that.data.theInitialTraceData[0].longitude + "," + that.data.theInitialTraceData[0].latitude;
            console.log(test);
            //需要在这里按规定对path进行相应的组装赋值
            var pathValue="10,0x0000ff,1,,:";
            for(var i=0;i<lengthOfRes;i++){
              pathValue=pathValue+that.data.theInitialTraceData[i].longitude+','+that.data.theInitialTraceData[i].latitude;
              if(i!=lengthOfRes-1){
                pathValue=pathValue+';';
              }
            }
            console.log(pathValue)
            myAmapFun.getStaticmap({
              zoom: 15,
              size: size,
              scale: 1,

              //location: "117.8,36.40",
              location: test,

              markers: "mid,0xFF0000,A:116.37359,39.92437;116.47359,39.92437",
              labels: "朝阳公园,2,0,16,0xFFFFFF,0x008000:116.48482,39.94858",
              //绘制区域的
              // paths: "10,0x0000ff,0.1,0x0000ff,0.7:116.31604,39.96491;116.320816,39.966606;116.321785,39.966827;116.32361,39.966957;116.39361,39.966957;116.39361,39.936957",
              //绘制路径的
             // paths: '10,0x0000ff,1,,:116.31604,39.96491;116.320816,39.966606;116.321785,39.966827;116.32361,39.966957',
             paths:pathValue,
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



      }
    })
    //同时我还需要找到第一个的经纬度来确定静态图的位置，直接用下标就可以了
    
    


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