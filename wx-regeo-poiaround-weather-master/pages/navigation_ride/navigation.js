var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');
const app=getApp();

Page({
  data: {
    markers: [{
      iconPath: "../../img/mapicon_navi_s.png",
      id: 0,
      latitude: "",
      longitude: "",
      width: 23,
      height: 33
    },{
      iconPath: "../../img/mapicon_navi_e.png",
      id: 0,
      latitude: "",
      longitude: "",
      width: 24,
      height: 34
    }],
    distance: '',
    cost: '',
    polyline: []
  },
  onLoad: function() {
    this.data.markers[0].latitude = app.globalData.startLatitude;
    this.data.markers[0].longitude = app.globalData.startLongitude;
    this.data.markers[1].latitude = app.globalData.endLatitude;
    this.data.markers[1].longitude = app.globalData.endLongitude;
    //在这里需要将该值重新设定一下，否则会出现没有赋上值的情况，像上面的这样的等于的情况，只是局部将其赋值了
    this.setData({
      markers: this.data.markers
    })
    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({key: key});
    this.setData({
      startLatitude: app.globalData.startLatitude,
      startLongitude: app.globalData.startLongitude
    })
    var startPlace = app.globalData.startLongitude + ',' + app.globalData.startLatitude;
    var endPlace = app.globalData.endLongitude + ',' + app.globalData.endLatitude;
    myAmapFun.getRidingRoute({
      //origin: '116.481028,39.989643',
      origin:startPlace,
      //destination: '116.434446,39.90816',
      destination:endPlace,
      success: function(data){
        var points = [];
        if(data.paths && data.paths[0] && data.paths[0].steps){
          var steps = data.paths[0].steps;
          for(var i = 0; i < steps.length; i++){
            var poLen = steps[i].polyline.split(';');
            for(var j = 0;j < poLen.length; j++){
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            } 
          }
        }
        that.setData({
          polyline: [{
            points: points,
            color: "#0091ff",
            width: 6
          }]
        });
        if(data.paths[0] && data.paths[0].distance){
          that.setData({
            distance: data.paths[0].distance + '米'
          });
        }
        if(data.taxi_cost){
          that.setData({
            cost: '打车约' + parseInt(data.taxi_cost) + '元'
          });
        }
          
      },
      fail: function(info){

      }
    })
  },
  goDetail: function(){
    wx.navigateTo({
      url: '../navigation_ride_detail/navigation'
    })
  },
  goToCar: function (e) {
    wx.redirectTo({
      url: '../navigation_car/navigation'
    })
  },
  goToBus: function (e) {
    wx.redirectTo({
      url: '../navigation_bus/navigation'
    })
  },
  goToRide: function (e) {
    wx.redirectTo({
      url: '../navigation_ride/navigation'
    })
  },
  goToWalk: function (e) {
    wx.redirectTo({
      url: '../navigation_walk/navigation'
    })
  }
})