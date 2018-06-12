jewel.screens["splash-screen"] = (function(){
  var game = jewel.game,
      dom = jewel.dom,
      firstRun = true;

  function setup(){
    //dom.bind은 문자열을 이용하여 요소를 탐색한다.
    //지정된 이벤트 Clcik을 처리할 핸들러 함수를 연결한다.
    dom.bind("#splash-screen", "click", function() {
      game.showScreen("main-menue");
    });
  }

  function run(){
    if(firstRun){
      setup();
      firstRun = false;
    }
  }

  return {
    run : run
  };
})();
