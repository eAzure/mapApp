App({
  onLaunch: function () {

    //调用colorUI
    //导入colorUI的部分
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })


    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    
    //获取用户的openID
    var that=this;
    var user=wx.getStorageSync('user')||{};
    var userInfo=wx.getStorageSync('userInfo')||{};
    if ((!user.openid || (user.expires_in || Date.now()) < (Date.now() + 600)) && (!userInfo.nickName)) {
      wx.login({
        success: function (res) {
          if (res.code) {
            wx.getUserInfo({
              success: function (res) {
                var objz = {};
                objz.avatarUrl = res.userInfo.avatarUrl;
                objz.nickName = res.userInfo.nickName;
                //console.log(objz);
                wx.setStorageSync('userInfo', objz);//存储userInfo
              }
            });
            var d = that.globalData;//这里存储了appid、secret、token串  
            var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appid + '&secret=' + d.secret + '&js_code=' + res.code + '&grant_type=authorization_code';
            wx.request({
              url: l,
              data: {},
              method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
              // header: {}, // 设置请求的 header  
              success: function (res) {
                var obj = {};
                obj.openid = res.data.openid;
                that.globalData.openid = res.data.openid;

                wx.request({
                  url: 'http://47.102.218.151:8080/user/findTheIfExitOpenID?OpenID='+res.data.openid,
                  success:function(res){
                    console.log(res.data)
                    if(res.data){
                      //若用户数据存在则返回该用户的userid
                      wx.request({
                        url: 'http://47.102.218.151:8080/user/findtheUserID?OpenID=' + that.globalData.openid,
                        success:function(res){
                          console.log(res.data)
                          that.globalData.userid=res.data
                        }
                      })
                    }else{
                      //若用户数据不存在则赋给该用户一个新的userid
                      wx.request({
                        url: 'http://47.102.218.151:8080/user/findTheNumOfTheUser',
                        success:function(res){
                          that.globalData.userid=res.data*10/10+1;
                          console.log(that.globalData.userid);
                        }
                      })
                    }
                  }
                })

                console.log(that.globalData.openid)
                obj.expires_in = Date.now() + res.data.expires_in;
                console.log(obj);
                wx.setStorageSync('user', obj);//存储openid  
              }
            });
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
    }









  },
  getUserInfo:function(cb){
    var that = this;
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });
    }
  },


  // 成功
  showSuccess: function (message) {
    wx.showToast({
      title: message,
      duration: 2000,
      image: "/images/Common/Success.png",
    })
  },
  // 错误      
  showError: function (message) {
    wx.showToast({
      title: message,
      duration: 2000,
      image: "/images/Common/Error.png",
    })
  },
  // 警告   
  showWarn: function (message) {
    wx.showToast({
      title: message,
      duration: 2000,
      image: "/images/Common/Warn.png",
    })
  },
  // 提示用户数据保存中
  startOperating: function (info) {
    wx.showLoading({
      title: info,
      mask: true
    })
  },
  stopOperating: function () {
    wx.hideLoading();
  },


  globalData:{
    userInfo:null,
    longitude:"",
    theCurrentLatitude:"",
    theCurrentLongitude:"",
    latitude:"",
    startLatitude:"",
    startLongitude:"",
    endLatitude:"",
    endLongitude:"",
    appid:"***",
    secret:"***",
    openid:"",
    userid:"",
    //导入colorUI的部分
    ColorList: [{
      title: '嫣红',
      name: 'red',
      color: '#e54d42'
    },
    {
      title: '桔橙',
      name: 'orange',
      color: '#f37b1d'
    },
    {
      title: '明黄',
      name: 'yellow',
      color: '#fbbd08'
    },
    {
      title: '橄榄',
      name: 'olive',
      color: '#8dc63f'
    },
    {
      title: '森绿',
      name: 'green',
      color: '#39b54a'
    },
    {
      title: '天青',
      name: 'cyan',
      color: '#1cbbb4'
    },
    {
      title: '海蓝',
      name: 'blue',
      color: '#0081ff'
    },
    {
      title: '姹紫',
      name: 'purple',
      color: '#6739b6'
    },
    {
      title: '木槿',
      name: 'mauve',
      color: '#9c26b0'
    },
    {
      title: '桃粉',
      name: 'pink',
      color: '#e03997'
    },
    {
      title: '棕褐',
      name: 'brown',
      color: '#a5673f'
    },
    {
      title: '玄灰',
      name: 'grey',
      color: '#8799a3'
    },
    {
      title: '草灰',
      name: 'gray',
      color: '#aaaaaa'
    },
    {
      title: '墨黑',
      name: 'black',
      color: '#333333'
    },
    {
      title: '雅白',
      name: 'white',
      color: '#ffffff'
    },
    ]
  }
})