import Sprite from '../base/sprite'
import LineData from '../base/lineData'
const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

const BG_IMG_SRC   = 'images/bg.jpg'
const BG_WIDTH     = 512
const BG_HEIGHT    = 512
let lineData = new LineData();
let t = 0;

/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class BackGround extends Sprite {
  constructor(ctx) {
    super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT)

    this.render(ctx)

    this.left = 0
  }

  update() {
    this.left += 0.2
    console.log(this.left);
    if (this.left >= screenHeight )
      this.left = 0
  }

  /**
   * 背景图重绘函数
   * 绘制两张图片，两张图片大小和屏幕一致
   * 第一张漏出高度为top部分，其余的隐藏在屏幕上面
   * 第二张补全除了top高度之外的部分，其余的隐藏在屏幕下面
   */
  render(ctx) {
    // if(t == 1){
      
    //   return;
    // }
    // t = 1;
    console.log(2);
    let width = screenWidth;
    // let exam = lineData.data.pop();
    let examEnd = lineData.data[5];
    let examStart = lineData.data[0];
    let cp = width / (examEnd.begin + examEnd.duration - examStart.begin);
    // console.log(examEnd.begin + examEnd.duration - examStart.begin)
    // console.log(cp);
    // ctx
    // .drawImage(
    //   this.img,
    //   0,
    //   0,
    //   this.width,
    //   this.height,
    //   0,
    //   -screenHeight + this.top,
    //   screenWidth,
    //   screenHeight
    // )
    ctx.fillStyle = "#EEEEFF";
    ctx.fillRect(0, 0,screenWidth,screenHeight);
    ctx.beginPath();
    for (let i = 0; i < lineData.data.length - 1; i++){
      let item = lineData.data[i];
      ctx.moveTo((item.begin - examStart.begin) * cp,(item.noteHeight / 100)*screenHeight);
      ctx.lineTo((item.begin - examStart.begin + item.duration)*cp, (item.noteHeight / 100) * screenHeight);
        // console.warn(item.begin)
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // ctx.drawImage(
    //   this.img,
    //   0,
    //   0,
    //   this.width,
    //   this.height,
    //   0,
    //   this.top,
    //   screenWidth,
    //   screenHeight
    // )
  }
}
