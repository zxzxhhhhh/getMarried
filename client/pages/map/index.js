// pages/map/index.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mainInfo: app.globalData.mainInfo,
    lng: app.globalData.mainInfo.lng, // 全局属性，用来取定位坐标
    lat: app.globalData.mainInfo.lat,
    markers: [{
      iconPath: "/images/nav.png",
      id: 0,
      latitude: app.globalData.mainInfo.lat, // 页面初始化 options为页面跳转所带来的参数 
      longitude: app.globalData.mainInfo.lng,
      width: 50,
      height: 50
    }],    
  },
  markertap(e) {
    wx.openLocation({
      latitude: parseFloat(lat),
      longitude: parseFloat(lng),
      scale: 18,
      name: app.globalData.mainInfo.hotel,
      address: app.globalData.mainInfo.address
    }) 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    //console.log(that.data);
    return {
      title: that.data.mainInfo.share,
      imageUrl: that.data.mainInfo.thumb,
      path: 'pages/index/index',
      success: function (res) {
        wx.showToast({
          title: '分享成功',
        })
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '分享取消',
        })
      }
    }
  },
  callhe: function (event) {
    wx.makePhoneCall({
      phoneNumber: this.data.mainInfo.he_tel
    })
  },
  callshe: function (event) {
    wx.makePhoneCall({
      phoneNumber: this.data.mainInfo.she_tel
    })
  }
})