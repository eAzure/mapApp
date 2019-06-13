const app=getApp();
Page({
  data: {
    InputBottom: 0,
    messageList:"",
    theChatContent:"",
    userid:""
    
  },
  InputFocus(e) {
    this.setData({
      InputBottom: e.detail.height
    })
  },
  onLoad:function(){
    this.setData({
      userid:app.globalData.userid
    })
    this.timing()
  },
  onUnload:function(){
    clearTimeout(this.data.timerNumber)
    console.log(this.data.messageList)
    console.log("页面退出")
  },
  getTheChatContent:function(e){

    this.setData({
      theChatContent:e.detail.value
    })

  },
  //定时器的开启
  timing: function () {
    console.log("刷新消息列表")
    var thi_ = this;
    var timerTem = setTimeout(function () {
      wx.request({
        url: 'http://47.102.218.151:8080/user/findTheMessageList',
        success:function(res){
          thi_.setData({
            messageList:res.data
          })
        }
      })
      thi_.timing()
    }, 5000)
    this.setData({
      timerNumber: timerTem
    })
  },
  send:function(){
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
    var currentMinute = h + ":" + m + ":" + s;
    var currentTime = Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
    var currentDay = Y + "-" + M + "-" + D;


    //发送聊天信息
    wx.request({
      url: 'http://47.102.218.151:8080/user/findTheNumOfChat',
      success:function(res){
        var chatNum=res.data*10/10+1;
        wx.request({
          url: 'http://47.102.218.151:8080/user/addChatContent?RecordID='+chatNum+'&UserID='+app.globalData.userid+'&ChatContent='+that.data.theChatContent+'&ChatTime='+currentTime,
          success:function(){
            that.setData({
              theChatContent:""
            })
          }
        })
      }
    })
  },
  InputBlur(e) {
    this.setData({
      InputBottom: 0
    })
  }
})