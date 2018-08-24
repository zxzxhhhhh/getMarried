// pages/chat/index.js
const app = getApp()
const config = require('../../config.js')
const qcloud = require('../../vendor/wafer2-client-sdk/index.js');
const _ = require('../../utils/util.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
      userInfo: null,
      locationAuthType: app.data.locationAuthType,
      inputValue: '',
      mainInfo: app.globalData.mainInfo
    },

  addComment(){

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
  //获取评论详情
  getCommentList() {
    wx.showLoading({
      title: '评论数据加载中',
    })
    qcloud.request({
      url: config.service.comment,
      login: true,
      method: 'GET',
      success: (result) => {
        wx.hideLoading()
        if (!result.data.code) {
          console.log(result)
          this.setData({
            chatList: result.data.data.map(item => {
              let itemDate = new Date(item.create_time)
              item.createTime = _.formatTime(itemDate)
              return item
            })
          })
        }
        else {
          wx.showToast({
            title: '加载失败',
          })
        }

      },
      fail: result => {
        wx.hideLoading()
        wx.showToast({
          title: '加载失败',
        })
        console.log('error!');
      }
    });

  },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      this.getCommentList()
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

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },


    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
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

    bindKeyInput: function(e) {
        this.setData({
            inputValue: e.detail.value
        })
        
    },
    
    foo: function() {
        if (this.data.inputValue) {
            //留言内容不是空值
          wx.showLoading({
            title: '评论上传中。。。',
          })
          
            qcloud.request({
              url: config.service.comment,
              login: true,
              method: 'PUT',
              data: {
                content: this.data.inputValue,
              },
              success: (result) => {
                wx.hideLoading()
                if (!result.data.code) {
                  wx.showToast({
                    title: '评论成功',
                  })
                }
                else {
                  wx.showToast({
                    icon: 'none',
                    title: '评论失败',
                  })
                }

              },
              fail: result => {
                wx.hideLoading()
                wx.showToast({
                  icon: 'none',
                  title: '评论失败了',
                })
                console.log('error!' + result);
              }
            });
        } else {
            //Catch Error
            wx.showModal({
                title: '提示',
                content: '您还没有填写内容',
                showCancel: false
            })
        }
        this.setData({
            inputValue: '' //将data的inputValue清空
        });
        return;
    }
})