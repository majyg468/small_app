var LineData = require("../data/lineData.js");
var DataBus = require("../data/DataBus.js");
var Player = require("../player/index.js");
const app = getApp();
var screenWidth = app.globalData.system.screenWidth
var screenHeight = app.globalData.system.screenHeight
var player = Player.Player;
var BackGround = (function(){
  
    var t = 0,
      cp = 2, 
      yingshe = cp * 60 / 1000, 
      index = 0, base = 0,
      left = 0, 
      lineData = LineData.LineData,
      examEnd = [],
      examStart = [],
      databus = DataBus.DataBus;

      // lineData = {
      //   data: [
      //     {
      //       "begin": 1108,
      //       "duration": 354,
      //       "noteHeight": 25
      //     }
      //     ,
      //     {
      //       "begin": 1572,
      //       "duration": 310,
      //       "noteHeight": 63
      //     }
      //     // ,
      //     // {
      //     //   "begin": 1698,
      //     //   "duration": 367,
      //     //   "noteHeight": 63
      //     // },
      //     // {
      //     //   "begin": 1798,
      //     //   "duration": 367,
      //     //   "noteHeight": 63
      //     // },
      //     // {
      //     //   "begin": 1898,
      //     //   "duration": 367,
      //     //   "noteHeight": 63
      //     // },
      //     // {
      //     //   "begin": 1998,
      //     //   "duration": 367,
      //     //   "noteHeight": 63
      //     // }
      //   ]
      // }
      

      examEnd = lineData.data[lineData.data.length - 1],
      examStart = lineData.data[0];
      // console.log(screenWidth, screenHeight);
    function update(ctx){
      left += cp
    }

    function render(ctx) {
    // return;
      var self = this;
      base++ ;
      // console.log(new Date());
      var timeStamp = new Date().getTime();
      
      ctx.fillStyle = "#EEEEFF";
      // base < 2 && console.log(screenHeight);
      // console.log(screenWidth, screenHeight);
      ctx.fillRect(0, 0, screenWidth, screenHeight);
      if(index == lineData.data.length - 1){
        databus.setStatus(true);
        ctx.fillStyle = "blue";
        // ctx.font = "40px";
        ctx.fillText(
          '游戏结束',
          screenWidth / 2 - 40,
          screenHeight / 2 - 100 + 50
        )
      }


      // ctx.beginPath();
      for (var i = index; i < lineData.data.length; i++){
        var item = lineData.data[i];
       
        var begin = item.begin * yingshe;
        var duration = item.duration * yingshe;
        var currentPos = base * cp;

        if (!begin){
          break;
        }
        // base<200 && console.log(begin , currentPos + screenWidth);
        // 如果画图起点超过当前位置和屏幕宽度和 直接退出当次画图
        if (examStart.begin * yingshe> currentPos + screenWidth){
          // console.log(234);
          ctx.fillStyle = "blue";
          // ctx.font = "20";
          ctx.fillText(
            '开始时间：' + parseInt(item.begin / 1000 - databus.getFrame() / 60,10) + 's后',
            20,
            20
          )
          break;
        }
        if (begin > currentPos + screenWidth) {
          // console.log(234);

          break;
        }
        if (begin < currentPos - screenHeight) {

          index++;
        }

        // base < 3000 && console.log(i);
        ctx.strokeStyle = 'red';
        // console.log(begin - currentPos, (item.noteHeight / 100) * screenHeight)
        // console.log((begin + duration) - currentPos, (item.noteHeight / 100) * screenHeight)
        ctx.moveTo(begin - currentPos,(item.noteHeight / 100) * screenHeight);
        ctx.lineTo((begin + duration) - currentPos,(item.noteHeight / 100) * screenHeight);
        ctx.fillStyle = "blue";
        // ctx.font = "20";
        ctx.fillText(
          '当前得分0',
          20,
          20
        )
        
      }

      player.drawToCanvas(ctx);
      
      // ctx.closePath();
      // ctx.fill();
      ctx.stroke();
      ctx.draw();
      // console.log(new Date() - timeStamp);
    }

    return{
      update: update,
      render: render
    }
}())

module.exports = {
  BackGround: BackGround
};



