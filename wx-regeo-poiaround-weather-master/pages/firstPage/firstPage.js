//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: '欢迎使用O(∩_∩)O',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //实现左抽屉
    CustomBar: app.globalData.CustomBar,
    tabList:["天气查询","同城标记","同城聊天","关于开发者"]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  toWeatherPage:function(){
    wx.navigateTo({
      url: '/pages/weather/weather',
    })
  },
  toMyposition:function(){
    wx.navigateTo({
      url: '/pages/testPage/testPage',
    })
  },
  toPositionRecord:function(){
    wx.navigateTo({
      url: '/pages/positionLine/positionLine',
    })
  },
  toTheHot:function(){
    wx.navigateTo({
      url: '/pages/poi/poi',
    })
  },
  toTheRoute:function(){
    wx.navigateTo({
      url: '/pages/firstOfNavigation/firstOfNavigation',
    })
  },
  toMyTrackPage:function(){
    wx.navigateTo({
      url: "/pages/myTrackPage/myTrackPage",
    })
  },

  //实现左抽屉索引的函数
  leftFunction:function(e){
    //实现各工具栏间页面的跳转
    if(e.target.id==0){
      wx.navigateTo({
        url: '/pages/weather/weather',
      })
    }else if(e.target.id==1){
      wx.navigateTo({
        url: '/pages/theSameCityMark/theSameCityMark',
      })
    }else if(e.target.id==2){
      wx.navigateTo({
        url: '/pages/chat/chat',
      })
    }else{
      wx.navigateTo({
        url: '/pages/aboutme/aboutme',
      })
    }
  },
  //下面这一部分是左抽屉的实现js


  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  }


})
