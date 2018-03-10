//index.js
//获取应用实例
var lineData = require("../index/data/lineData.js");
var DataBus = require("../index/data/DataBus.js");
var BackGround = require("../index/backGroud/background.js");
var Player = require("../index/player/index.js");
const app = getApp()
var screenWidth = app.globalData.system.screenWidth
var screenHeight = app.globalData.system.screenHeight
var databus = DataBus.DataBus;
var background = BackGround.BackGround
var player = Player.Player;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    screenWidth:0,
    screenHeight:0,
    windowWidth: 0,
    windowHeight: 0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  touchstart:function(e){
    let self = this;
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY
    // console.log(111111111111);
    self.longTimeOut = setTimeout(function () {
      // self.isLongStatus = 1;
      player.setTouchStatus(1);
      player.setY(1);
    }, 500);//这里设置长按响应时间  

  },
  touchmove:function(e){
    // console.log(222222);
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY
    clearTimeout(this.longTimeOut);
    // this.isLongStatus = 0;
    player.setTouchStatus(0);
  },
  touchend:function(e){
    clearTimeout(this.longTimeOut);
    player.up();
    // console.log(33333);
    // this.isLongStatus = 0;
    player.setTouchStatus(0);
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
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
        }
      })
    }
  },
  onReady:function(){
    
    this.ctx = wx.createCanvasContext('firstCanvas')

    // console.log(databus);
    // return;
    databus.reset();

    // background.render(this.ctx);
    // player.drawToCanvas(this.ctx)
    // // 清除上一局的动画
    clearTimeout(this.aniId);
    
    // 这里没有自动刷新的函数 手动模拟
    this.aniId = setTimeout(
      this.loop
    ,1000/60)


  },
  render:function() {
    // return;
    if (databus.getStatus())
      return;
    // console.log(screenWidth, screenHeight);
    this.ctx.clearRect(0, 0, screenWidth, screenHeight)

    background.render(this.ctx)

    // 每次刷新 自由落体下
    player.setY();
    player.drawToCanvas(this.ctx)



  },

  // 游戏逻辑更新主函数
  update :function() {
    if (databus.getStatus())
      return;

    background.update(this.ctx)



  },

  // 实现游戏帧循环
  loop:function() {
    // console.log(databus.frame);
    databus.subFrame()
    this.update()
    this.render()

    this.aniId = setTimeout(
      this.loop
    ,1000/60)
  },
  getUserInfo: function(e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
