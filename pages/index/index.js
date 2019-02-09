//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Daily签',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
   bindViewTap: function() {
     wx.navigateTo({
       url: '../signin/signin'
     })
   },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        motto: "Welcome!"
      })
      setTimeout(function () {
        wx.navigateTo({
          url: '../signin/signin'
        })
      }, 1000)
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          motto: "Welcome!"
        })
        setTimeout(function () {
          wx.navigateTo({
            url: '../signin/signin'
          })
        }, 1000)
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
        },
        fail: res => {
          app.globalData.userInfo = null
          this.setData({
            userInfo: null,
            hasUserInfo: true
          })
        }  
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    if(e.detail.errMsg == "getUserInfo:ok") {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
        motto: "welcome!"
      })
      setTimeout(function () {
        wx.navigateTo({
          url: '../signin/signin'
        })
      }, 1000)
    }else {
      app.globalData.userInfo = null
      this.setData({
        userInfo: null,
        hasUserInfo: false,
        motto: "无法使用小程序"
      })
    }
  }
})