// pages/invitation/index.js
const app = getApp()
// var appid = app.globalData.appid;
var touchDot = 0;//触摸时的原点  
var time = 0;// 时间记录，用于滑动时且时间小于1s则执行左右滑动 
var interval = "";// 记录/清理时间记录 
Page({

    /**
     * 页面的初始数据
     */
    data: {
        animationData: "",
        userInfo: {},
        music_url: 'http://dl.stream.qqmusic.qq.com/C100001J5QJL1pRQYB.m4a?fromtag=46',
        isPlayingMusic: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        //创建动画
        var animation = wx.createAnimation({
            duration: 3600,
            timingFunction: "ease",
            delay: 600,
            transformOrigin: "50% 50%",
        })
        animation.scale(0.9).translate(10, 10).step();     //边旋转边放大

        //导出动画数据传递给组件的animation属性。
        this.setData({
            animationData: animation.export(),
        })

        var that = this


        // wx.request({
        //     url: server,
        //     method: 'GET',
        //     data: { 'c': 'info', 'appid': appid },
        //     header: {
        //         'Accept': 'application/json'
        //     },
        //     success: function (res) {
        //         //console.log(res.data)

        //         wx.playBackgroundAudio({
        //             dataUrl: res.data.music_url,
        //             title: '',
        //             coverImgUrl: ''
        //         })

                that.setData({
                  mainInfo: app.globalData.mainInfo,
                  music_url: app.globalData.music_url,
                });
        //     }
        // })
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
    },
    play: function (event) {
        if (this.data.isPlayingMusic) {
            wx.pauseBackgroundAudio();
            this.setData({
                isPlayingMusic: false
            })
        } else {
            wx.playBackgroundAudio({
                dataUrl: this.data.music_url,
                title: '',
                coverImgUrl: ''
            })
            this.setData({
                isPlayingMusic: true
            })
        }
    },
})