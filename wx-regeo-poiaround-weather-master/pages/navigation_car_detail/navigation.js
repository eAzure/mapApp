var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');
const app=getApp();
Page({
  data: {
    steps: {}
  },
  onLoad: function() {
    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({key: key});
    var startPlace = app.globalData.startLongitude + ',' + app.globalData.startLatitude;
    var endPlace = app.globalData.endLongitude + ',' + app.globalData.endLatitude;
    myAmapFun.getDrivingRoute({
      //origin: '116.481028,39.989643',
      origin:startPlace,
      //destination: '116.434446,39.90816',
      destination:endPlace,
      success: function(data){
        if(data.paths && data.paths[0] && data.paths[0].steps){
          that.setData({
            steps: data.paths[0].steps
          });
        }
          
      },
      fail: function(info){

      }
    })
  }
})