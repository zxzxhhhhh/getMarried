//index.js
//获取应用实例
const app = getApp()
var appid = app.globalData.appid;

Page({
  data: {
    userInfo: {}, 
  },  
  onLoad: function () {
    var that = this

    
    // wx.request({
    //   url: server,
    //   method: 'GET',
    //   data: { 'c': 'info', 'appid': appid},
    //   header: {
    //     'Accept': 'application/json'
    //   },
    //   success: function(res) {
      
        that.setData({      
          slideList: [
            { image: 'https://marry-1256105992.cos.ap-shanghai.myqcloud.com/IMG_1.JPG' },
            { image: 'https://marry-1256105992.cos.ap-shanghai.myqcloud.com/IMG_2.JPG' },
            { image: 'https://marry-1256105992.cos.ap-shanghai.myqcloud.com/IMG_3.JPG' },
            { image: 'https://marry-1256105992.cos.ap-shanghai.myqcloud.com/IMG_4.JPG' },
            { image: 'https://marry-1256105992.cos.ap-shanghai.myqcloud.com/IMG_5.JPG' },
            { image: 'https://marry-1256105992.cos.ap-shanghai.myqcloud.com/IMG_6.JPG' },
          ],
          mainInfo: app.globalData.mainInfo,
          
        });
    //   }
    // })
  },

  onShareAppMessage: function (res) {
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
  }
})
