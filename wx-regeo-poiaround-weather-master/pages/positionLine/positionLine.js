// pages/positionLine/positionLine.js
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
    //先获得有多少不重复的天数
    var that=this;
    wx.request({
      url: 'http://47.102.218.151:8080/user/findTheConcreteForUserPositionRecord?UserID='+app.globalData.userid,
      method:'GET',
      header: { 'content-type': 'application/json' },
      success:function(res){
        that.setData({
          theSameDay:res.data
        })
        console.log(that.data.theSameDay)
        //获取json对象的长度的办法
        /*
        var jslength = 0;
        for (var js2 in that.data.theSameDay) {
          jslength++;
        }
        var j=0;
        for(var i=0;i<jslength;i++){
          wx.request({
            url: 'http://localhost:8080/user/findThePositionLine?Day=' + that.data.theSameDay[i].day,
            method: 'GET',
            header: { 'content-type': 'application/json' },
            success: function (res1) {
              that.data.theSameDay[j].dateLine=res1.data;
              console.log(that.data.theSameDay[j].dateLine)
              j++;
              if(j==jslength){
                console.log(that.data.theSameDay)
              }
              console.log("success")
            }
          })
        }
        */
      }
    })
  },


  //跳转至具体的页面
  toTheConcretePage:function(e){
    var id = e.target.id * 10 / 10 + 1;
    console.log(id)
    wx.navigateTo({
      url: '/pages/theConcreteRecordPage/theConcreteRecordPage?id='+id
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