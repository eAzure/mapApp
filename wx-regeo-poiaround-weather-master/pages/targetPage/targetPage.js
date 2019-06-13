// pages/targetPage/targetPage.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentDay:"",
    currentTime:"",
    currentMinute:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      longitude:options.longitude,
      latitude:options.latitude,
      name:options.name,
      desc:options.desc
    })
    console.log(this.data.longitude)
    console.log(this.data.latitude)
    console.log(this.data.name)
    console.log(this.data.desc)
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

  },


  // 拍照功能
  getLocalImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        // 这里无论用户是从相册选择还是直接用相机拍摄，拍摄完成后的图片临时路径都会传递进来
        app.startOperating("保存中")
        var filePath = res.tempFilePaths[0];
        console.log(filePath)
        that.setData({
          img_path:filePath
        })
        var imageName=that.data.longitude+""+that.data.latitude;
        // 这里顺道展示一下如何将上传上来的文件返回给后端，就是调用wx.uploadFile函数
        wx.uploadFile({
          url: 'http://47.102.218.151:8080/user/weChat/uploadImage?ImageName='+imageName ,
          filePath: filePath,
          name: 'file',
          success: function (res) {
            app.stopOperating();
            // 下面的处理其实是跟我自己的业务逻辑有关
            var data = res.data;
            console.log(res.data);
          }
        })
      },
      fail: function (error) {
        console.error("调用本地相册文件时出错")
        console.warn(error)
      },
      complete: function () {

      }
    })
  },
  //上面那个调用摄像头及系统相册的程序可以成功运行
  //现在我们要干的就是让标记位置函数起作用
  //先获取输入框里自己记录的位置信息
  getTheInputMessage:function(e){
    this.setData({
      positionMessage:e.detail.value
    })
    console.log(this.data.positionMessage)
  },
  targetPosition:function(){
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
    var currentDay=Y+"-"+M+"-"+D;
    console.log(Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s);
    that.data.currentTime = currentTime;
    that.data.currentDay=currentDay;
    //我们在这里就要发送我们所标记的位置的所有信息
    //先获取我们记录里有多少条数据
    wx.request({
      url: 'http://47.102.218.151:8080/user/countPositionNum',
      method:"GET",
      header:{'content-type':'application/json'},
      success:function(res){
        that.setData({
          positionCount:res.data
        })
        var varpositionCount=that.data.positionCount*10/10+1;
        var picturePos=that.data.longitude+''+that.data.latitude+'.jpg';
        //在这里插入我们要插入的各条信息

        //先获取该用户下有多少条记录信息
        wx.request({
          url: 'http://47.102.218.151:8080/user/findTheCountOfOneUserPosition?UserID='+app.globalData.userid,
          success:function(res){
            var resData=res.data*10/10+1;
            wx.request({
              url: 'http://47.102.218.151:8080/user/addMyPosition?RecordID=' + varpositionCount + '&MyLatitude=' + that.data.latitude + '&MyLongitude=' + that.data.longitude + '&MyRecordContent=' + that.data.positionMessage + '&RecordTime=' + that.data.currentMinute + '&Day=' + that.data.currentDay + '&PicturePos=' + picturePos + '&Name=' + that.data.name + '&Desname=' + that.data.desc + '&UserID=' + app.globalData.userid + '&OpenID=' + app.globalData.openid+'&ConcreteID='+resData,
              method: 'GET',
              header: { 'content-type': 'application/json' },
              success: function (res) {
                wx.showToast()
              }
            })


          }
        })

        


      }
    })
  }






})