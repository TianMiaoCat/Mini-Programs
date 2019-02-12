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
    name: null,
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
      url: 'http://qr.nobler.xyz:8082/signin',//后面详细介绍
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
        if (res.data) {
          wx.showToast({
            title: '成功',
          })
        }
        else {
          wx.showModal({
            title: '提示',
            content: '错误',
            showCancel: false
          })
        }
      },
      fail: function (res) {
        console.log("调用API失败");
      }
    })
  }
})