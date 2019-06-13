var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');
var lonlat;
var city;
var isstartOrEnd;
Page({
  data: {
    tips: {}
  },
  onLoad: function(e){
    lonlat = e.lonlat;
    city = e.city;
    isstartOrEnd = e.isStartOrEnd;
  },
  bindInput: function(e){
    var that = this;
    var keywords = e.detail.value; 
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({key: key});
    myAmapFun.getInputtips({
      keywords: keywords,
      location: lonlat,
      city: city,
      success: function(data){
        if(data && data.tips){
          that.setData({
            tips: data.tips
          });
        }
      }
    })
  },
  bindSearch: function(e){
    var keywords = e.target.dataset.keywords;
    //这里有一个传回我们页面的操作，为什么之前找不到输入地方的经纬度，是因为这里的问题，之前传给了poi页面
    if (isstartOrEnd=='start'){
      var url = '../firstOfNavigation/firstOfNavigation?keywords=' + keywords;
      wx.redirectTo({
        url: url
      })
    }else{
      var url = '../endOfNavigation/endOfNavigation?keywords=' + keywords;
      wx.redirectTo({
        url: url
      })
    }
    
  }
})