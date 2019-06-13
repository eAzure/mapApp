// pages/myTrackPage/myTrackPage.js
var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');
const app = getApp();
var markersData = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    textData: {},
    city: '',
    traceList:[]
  },

  makertap: function (e) {
    var id = e.markerId;
    var that = this;
    that.showMarkerInfo(markersData, id);
    that.changeMarkerColor(markersData, id);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    //获取之前所记录的路径的信息
    var that=this;
    wx.request({
      url: 'http://47.102.218.151:8080/user/findTheFirstTrace',
      method:'GET',
      header:{'content-type':'application/json'},
      success:function(res){
        that.setData({
          initialTraceData:res.data
        })
        console.log(that.data.initialTraceData)
      }
    })
    this.setData({
      statusOftheTask: "开始记录"
    })
    //获取当前位置的经纬度的操作，用来之后每隔5秒对数据进行获取
    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: key });
    var params = {
      success: function (data) {
        var poisData = data.poisData;
          wx.getLocation({
            type: 'gcj02',
            success: function (res) {
              that.setData({
                latitude: res.latitude
              });
              that.setData({
                longitude: res.longitude
              });
              that.setData({
                city: '北京市'
              });
            },
            fail: function () {
              that.setData({
                latitude: 39.909729
              });
              that.setData({
                longitude: 116.398419
              });
              that.setData({
                city: '北京市'
              });
            }
          })

          that.setData({
            textData: {
              name: '抱歉，未找到结果',
              desc: ''
            }
          });

      },
      fail: function (info) {
        // wx.showModal({title:info.errMsg})
      }
    }
    myAmapFun.getPoiAround(params)
  },
  //开始记录的功能
  goStartRecord:function(){
    if(this.data.statusOftheTask=="开始记录"){
      this.setData({
        statusOftheTask:"停止记录"
      })
      //每一遍记录之前都要对路径列表进行一遍清空操作
      this.setData({
        traceList:[]
      })
      this.timing()
    }else{
      this.setData({
        statusOftheTask:"开始记录"
      })
      this.stopTiming()
    }
  },
  //位置的持续请求函数
  forverQueryForTrace:function(){
    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: key });
    var params = {
      success: function (data) {
        var poisData = data.poisData;
        wx.getLocation({
          type: 'gcj02',
          success: function (res) {
            that.setData({
              latitude: res.latitude
            });
            that.setData({
              longitude: res.longitude
            });
            that.setData({
              city: '北京市'
            });
          },
          fail: function () {
            that.setData({
              latitude: 39.909729
            });
            that.setData({
              longitude: 116.398419
            });
            that.setData({
              city: '北京市'
            });
          }
        })

        that.setData({
          textData: {
            name: '抱歉，未找到结果',
            desc: ''
          }
        });

      },
      fail: function (info) {
        // wx.showModal({title:info.errMsg})
      }
    }
    myAmapFun.getPoiAround(params)
  },
  //定时器的开启
  timing: function () {
    var thi_ = this;
    var timerTem = setTimeout(function () {
      //在这里我们要进行的操作是记录我们每一点的移动距离
      console.log('longitude:'+thi_.data.longitude+'latitude:'+thi_.data.latitude);
      //在这里应该再进行位置请求，否则只会记录最开始的位置信息，而信息不发生变化
      thi_.forverQueryForTrace()
      //获取当前时间戳 
      var that = this;
      var timestamp = Date.parse(new Date());
      timestamp = timestamp / 1000;
      //获取当前时间  
      var n = timestamp * 1000;
      var date = new Date(n);
      //年  
      var Y = date.getFullYear();
      //月  
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      //日  
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      //时  
      var h = date.getHours();
      //分  
      var m = date.getMinutes();
      //秒  
      var s = date.getSeconds();
      //获取整个时间的格式
      var currentTime = Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
      console.log(Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s);
      //拼接traceList
      var newarray=[{
        longitude:thi_.data.longitude,
        latitude:thi_.data.latitude,
        currentTime:currentTime
      }];
      thi_.data.traceList = thi_.data.traceList.concat(newarray);
      thi_.timing()
    }, 5000)
    this.setData({
      timerNumber: timerTem
    })
  },
  //定时器的结束
  stopTiming:function(){
    //这个计时器相当稳

    clearTimeout(this.data.timerNumber)
    console.log(this.data.traceList)
    //在这里要将记录好的这段时间内的轨迹即（traceList）写到数据库里，即相当于本次操作结束
    console.log(this.data.traceList.length)
    var len=this.data.traceList.length;
    //先要获取之前记录了多少条位置信息
    var that=this;
    wx.request({
      url: 'http://47.102.218.151:8080/user/findTheNumberOfTraceID',
      method:'GET',
      header:{'content-type':'application/json'},
      success:function(res){
        that.traceDataToDataBase(res.data*10/10+1,0,len);
      }
    })
    wx.showToast({
      title: '记录成功',
    })
    //在这里设置自动刷新
  },
  //将轨迹信息加入到数据库中(主要得考虑js的请求异步性以及插入数据保证其顺序)
  traceDataToDataBase:function(num,cur,len){
    var that=this;
    if(cur<len){
      wx.request({
        url: 'http://47.102.218.151:8080/user/addMyPerTrace?TraceID=' + num + '&Longitude=' + that.data.traceList[cur].longitude + '&Latitude=' + that.data.traceList[cur].latitude + '&TheFirstDate=' + that.data.traceList[cur].currentTime,

        success:function(){
          that.traceDataToDataBase(num,cur + 1, len)
        }
      })
    }
  },

  toTheConcreteTracePage:function(e){
    var valueOfID = e.target.id * 10 / 10 + 1
    wx.navigateTo({
      url: '/pages/theConcreteTracePage/theConcreteTracePage?id=' + valueOfID,
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