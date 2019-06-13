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
    transits: [],
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
    var startPlace = app.globalData.startLongitude + ',' + app.globalData.startLatitude;
    var endPlace = app.globalData.endLongitude + ',' + app.globalData.endLatitude;
    myAmapFun.getTransitRoute({
      origin: startPlace,
      destination: endPlace,
      city: '济南',
      success: function(data){
        if(data && data.transits){
          var transits = data.transits;
          for(var i = 0; i < transits.length; i++){
            var segments = transits[i].segments;
            transits[i].transport = [];
            for(var j = 0; j < segments.length; j++){
              if(segments[j].bus && segments[j].bus.buslines && segments[j].bus.buslines[0] && segments[j].bus.buslines[0].name){
                var name = segments[j].bus.buslines[0].name
                if(j!==0){
                  name = '--' + name;
                }
                transits[i].transport.push(name);
              }
            }
          }
        }
        that.setData({
          transits: transits
        });
          
      },
      fail: function(info){

      }
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