// pages/login/login.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    signinid: null,
    courseid: null,
    key: null,
    code: null,
    studentid: null,
    name: "",
    message: ""
  },

  //处理numInput的触发事件
  numInput: function (e) {
    var number = e.detail.value;
    if (number != '') {
      this.setData({ studentid: number });
    }
  },
  //处理nameInput的触发事件
  nameInput: function (e) {
    var studentName = e.detail.value;
    if (studentName != '') {
      this.setData({ name: studentName });
    }
  },
  //处理signin的触发事件
  signin: function (e) {
    wx.request({
      url: 'http://qr.nobler.xyz:8082/signin',
      //定义传到后台的数据
      data: {
        //从全局变量data中获取数据
        signinid: app.globalData.signinid,
        studentid: this.data.studentid,
        courseid: app.globalData.courseid,
        name: this.data.name,
        key: app.globalData.key,
        code: app.globalData.code
      },
      method: 'get',//定义传到后台接受的是post方法还是get方法
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        if (res.data == true) {
          wx.showToast({
            title: '签到成功',
          })
        }
        else if (res.data.message == "签到已经结束。") {
          wx.showModal({
            title: '提示',
            content: '签到已结束',
            showCancel: false
          })
        }
        else if (res.data.message == "此次输入的信息与此课程第一次签到绑定的学号和姓名不符。") {
          wx.showModal({
            title: '提示',
            content: '不能代替别人签到！！！',
            showCancel: false
          })
        }
        else if (res.data.message == "输入的姓名和数据库中的不匹配。" || res.data.message == "输入的学号和数据库中的不匹配。") {
          wx.showModal({
            title: '提示',
            content: '请检查输入信息是否正确或向教师确认是否在签到名单中',
            showCancel: false
          })
        }
        else {
          wx.showModal({
            title: '提示',
            content: '签到失败，请退出重试',
            showCancel: false
          })
        }
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            if (res.code) {
              app.globalData.code = res.code
              console.log(app.globalData.code)
            } else {
              console.log("失败！")
            }
          }
        })
      },
      fail: function (res) {
        console.log("调用API失败");
      }
    })
  }
})