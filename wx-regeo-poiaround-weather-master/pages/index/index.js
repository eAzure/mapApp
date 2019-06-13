Page({
  naviToRegeo: function (e) {
    wx.navigateTo({
      url: '../testPage/testPage'
    })
  },
  naviToWeather: function (e) {
    wx.navigateTo({
      url: '../weather/weather'
    })
  },
  naviToPoi: function (e) {
    wx.navigateTo({
      url: '../poi/poi'
    })
  },
  naviToStatic: function(){
    wx.navigateTo({
      url: '../staticmap/staticmap'
    })
  },
  naviToNavi: function(){
    wx.navigateTo({
      url: '../navigation_car/navigation'
    })
  }
})