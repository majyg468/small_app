const app = getApp()
var screenWidth = app.globalData.system.screenWidth
var screenHeight = app.globalData.system.screenHeight


var  Player = (function(){

    // 玩家默认处于屏幕底部居中位置
    var width = 15,
      height = 15, 
      x = (screenWidth - width) / 2,
      // // y = screenHeight - height - 30
      // y = screenHeight - height,
      // x=30,
      // y=30,
      // 用于在手指移动的时候标识手指是否已经在飞机上了
      touched = false,
      // x = 90,
      y = 550,

      longTimeOut = 0,


      downSpeed = 0.6,
      upSpeed = 4,
      isLongStatus = 0;

      console.log(x,y);

  /**
   * 每帧自由落体2
   * 判断手指是否在飞机上
   */
  function setY(type) {
    // type = 1 表示长按效果
    let self = this;
    if (type == 1) {
      // console.log(y - upSpeed, screenHeight - height, y);
      y = (y - upSpeed) >= 0 && (y - upSpeed) || y
      if (isLongStatus) {
        setTimeout(function () {
          self.setY(1);
        }, 1000 / 60);
      }
    } else {
      y = (y + downSpeed) <= 550 && (y + downSpeed) || y
    }

    // console.log(y);
  }

  function setTouchStatus(type){
    isLongStatus = type || 0;
  }

  function up(){
    y = (y - upSpeed >= 0) && (y - upSpeed) || 0;
  }

  function drawToCanvas(ctx) {
    // console.log(x,y,width,height);
    ctx.drawImage(
      "images/qqmusic.png",
      x,
      y,
      width,
      height
    )
    // ctx.draw()
  }



  return {
    setY: setY,
    up: up,
    setTouchStatus: setTouchStatus,
    drawToCanvas: drawToCanvas
  }

}()) 

  module.exports = {
    Player: Player
  };

