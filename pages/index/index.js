// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        msg: '北方的汉子',
        userInfo: {},
        isShow: true
    },
    handleClick() {
        //点击跳转到list页面
        console.log('点击跳转到list页面');
        wx.switchTab({
            url: '/pages/list/list',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //做一些初始化工作，发送请求，开启定时器
        console.log('onLoad');
        console.log(this);
        this.getUserInfo();
    },
    getUserInfo() {
        //判断用户是否授权了
        wx.getSetting({
            success: (data) => {
                console.log(data);
                if (data.authSetting['scope.userInfo']) {
                    //用户已经授权
                    this.setData({
                        isShow: false
                    })

                } else {
                    //用户没有授权
                    this.setData({
                        isShow: true
                    })

                }
            }
        })

        //获取用户登录信息
        wx.getUserInfo({
            success: (data) => {
                console.log(data);
                //更新data中的userInfo
                this.setData({
                    userInfo: data.userInfo
                });
            },
            fail: () => {
                console.log('获取用户数据失败')
            }
        })
    },
    handleGetUserInfo(data) {
        console.log('用户点击了', data);
        //判断用户点击的时候是允许
        if (data.detail.rawData) {
            //用户点击的是允许
            this.getUserInfo();
        } else {
            console.log('拒绝')
        }
    },
})