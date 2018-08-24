// pages/bless/index.js
const app = getApp()
const config = require('../../config.js')
const qcloud = require('../../vendor/wafer2-client-sdk/index.js');
Page({
    /**
     * 页面的初始数据
     */
    data: {
      userInfo: null,
      locationAuthType: app.data.locationAuthType
    },
    /**
     * 生命周期函数--监听页面加载
     */

    getZanLog(cb){
      wx.showLoading({
        title: '商品数据加载中',
      })
      qcloud.request({
        url: config.service.zan,
        success: (result) => {
          wx.hideLoading()
          if (!result.data.code) {
            console.log(result)
            this.setData({
              zanLog: result.data.data.zanLog,
              zanNum: result.data.data.zanNum,
              mainInfo: app.globalData.mainInfo
            })
          }
          else {
            wx.showToast({
              icon:'none',
              title: '加载失败',
            })
          }

        },
        fail: result => {
          wx.hideLoading()
          wx.showToast({
            icon: 'none',
            title: '加载失败',
          })
          console.log(result);
        },
        complete:()=>{
          cb&&cb()
        }
      });
    },
    onLoad: function(options) {
      this.getZanLog();
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
      this.getZanLog(()=>{
        wx.stopPullDownRefresh()
      });
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        var that = this;
        //console.log(that.data);
        return {
          title: app.globalData.mainInfo.share,
          imageUrl: app.globalData.mainInfo.thumb,
            path: 'pages/index/index',
            success: function(res) {
                wx.showToast({
                    title: '分享成功',
                })
            },
            fail: function(res) {
                // 转发失败
                wx.showToast({
                    title: '分享取消',
                })
            }
        }
    },

  onTapLogin(res) {
    app.login({
      success: ({ userInfo }) => {
        this.setData({
          userInfo,
          locationAuthType: app.data.locationAuthType
        })
        console.log('app.data.locationAuthType is:' + app.data.locationAuthType)
      },
      error: () => {
        console.log('login failed in trolley!')
        this.setData({
          locationAuthType: app.data.locationAuthType
        })
      }
    })
  },

  zan: function (event) {
      wx.showLoading({
        title: '数据上传中',
      })
      qcloud.request({
        url: config.service.zan,
        login: true,
        method: 'PUT',
        success: (result) => {
          wx.hideLoading()
          console.log(result)
          if (!result.data.code) {
            wx.showToast({
              icon:'none',
              title: result.data.data.msg,
            })
          }
          else {
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          }
        },
        fail: result => {
          wx.hideLoading()
          wx.showToast({
            icon:'none',
            title: '上传失败',
          })
          console.log(result)
          console.log('error!');
        }
      });
    },

  /**
* 生命周期函数--监听页面显示
*/
  onShow: function () {
    console.log('check session in  user')
    app.checkSessionAndGetData({
      success: ({ userInfo }) => {
        this.setData({
          userInfo
        })
      }
    })
  },

})