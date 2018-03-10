

var DataBus = (function(){

    var frame      = 0
    var score      = 0
    var gameOver   = false

    function reset(){
      frame      = 0
      score      = 0
      gameOver   = false
    }
    function subFrame(){
      frame++;
    }

    function getFrame(){
      return frame
    }
    function setScore(){
      
    }
    function getScore(){ 
      return score
    }

    function setStatus(type){
      gameOver = type || true;
    }
    function getStatus(){

    }
    return{
      reset:reset,
      subFrame: subFrame,
      getFrame: getFrame,
      setScore: setScore,
      getScore: getScore,
      setStatus: setStatus,
      getStatus: getStatus
    }
}())

module.exports = {
  DataBus: DataBus
};
